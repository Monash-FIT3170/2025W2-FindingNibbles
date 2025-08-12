import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { getErrorMessage, detectMimeType } from 'src/utils';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { GeminiService } from 'src/gemini/gemini.service';
import {
  AnalyseRestaurantMenuResponseDto,
  MenuItemDto,
} from './dto/analyse-restaurant-menu.dto';
import { basicMenuSchema, menuAnalysisSchema } from './schemas';

@Injectable()
export class RestaurantMenuService {
  constructor(
    private db: DatabaseService,
    private geminiService: GeminiService,
  ) {}

  async analyseMenu(menu: Express.Multer.File): Promise<MenuItemDto[]> {
    try {
      if (!menu.buffer || !menu.mimetype) {
        throw new BadRequestException('Invalid menu file provided');
      }

      const mimeType = detectMimeType(menu);

      const supportedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
      ];

      if (!supportedTypes.includes(mimeType)) {
        throw new BadRequestException(
          `Unsupported file type: ${mimeType}. Please upload a JPEG, PNG, WebP, or GIF image.`,
        );
      }

      const availableDietaries = await this.db.dietaryRequirement
        .findMany({
          select: {
            name: true,
          },
        })
        .then((dietaryRequirements) =>
          dietaryRequirements.map((dr) => dr.name),
        );

      const basicMenuData = await this.extractBasicMenuInfo(menu, mimeType);

      const finalMenuData = await this.determineDietaryTags(
        basicMenuData,
        availableDietaries,
      );

      return this.validateAndReturnMenuItems(finalMenuData);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      throw new Error(
        'An error occurred while analyzing menu: ' + errorMessage,
      );
    }
  }

  private async extractBasicMenuInfo(
    menu: Express.Multer.File,
    mimeType: string,
  ): Promise<unknown> {
    const step1Prompt = `
Extract all menu items from this restaurant menu image. For each item provide:

- name: Exact dish name from menu
- description: Menu description ONLY if available on the menu. If no description is provided, use empty string. If mentions "add chicken/beef" etc, append ". Vegetarian option available"  
- price: Price as number if visible, otherwise null
- category: Menu section like "Appetisers", "Mains", "Desserts" if identifiable, otherwise empty string
- explicit_dietary_tags: Only dietary tags clearly marked with symbols (V, VG, GF), icons, text labels, or special menu sections
- mentioned_ingredients: List any specific ingredients mentioned in the menu description. If no description exists or no ingredients are mentioned, use empty array.

IMPORTANT RULES:
- If a menu item has NO description, set description to empty string and mentioned_ingredients to empty array
- For mentioned_ingredients, only include ingredients explicitly written for that menu item (either in a dietary tag or in the description)
- Do not invent or assume any information not visible on the menu. If you do, someone might eat food that is not suitable for them.
- Only ever include explicit dietary tags that are clearly marked on the menu (symbols, icons, text labels, special sections)

Return JSON format only.
    `;

    const base64Data = menu.buffer.toString('base64');

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: step1Prompt,
            },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64Data,
              },
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: basicMenuSchema,
      },
    };

    try {
      return await this.geminiService.generateAndParseJson(requestBody);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      throw new Error('Failed to get response from LLM: ' + errorMessage);
    }
  }

  private async determineDietaryTags(
    basicMenuData: unknown,
    availableDietaries: string[],
  ): Promise<unknown> {
    const step2Prompt = `
For each menu item below, determine dietary tags based ONLY on:
1. The explicit_dietary_tags already identified from the menu
2. The mentioned_ingredients that were explicitly listed in the menu description (if any)

Rules for dietary tag assignment:
- If explicit_dietary_tags exist, include them
- If mentioned_ingredients has content, analyse them for:
  * VEGETARIAN: No meat/poultry/fish/seafood mentioned
  * VEGAN: No animal products mentioned (no meat, dairy, eggs, honey)
  * GLUTEN-FREE: No wheat, bread, pasta, or gluten-containing items mentioned
- If mentioned_ingredients is empty (no description or no ingredients listed), only use explicit_dietary_tags
- If both explicit_dietary_tags and mentioned_ingredients are empty, set dietaryTags to empty array

CONSERVATIVE APPROACH: Only assign dietary tags when you have clear evidence from the menu. When in doubt, use the empty array. If you ignore this instruction, our data will be inaccurate and people might eat food that is not suitable for them.

Menu items: ${JSON.stringify(basicMenuData, null, 2)}

Available dietary tags: [${availableDietaries.join(', ')}]

Return items with final "dietaryTags" array (remove explicit_dietary_tags and mentioned_ingredients from output).
    `;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: step2Prompt,
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseSchema: menuAnalysisSchema,
      },
    };

    try {
      return await this.geminiService.generateAndParseJson(requestBody);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      throw new Error('Failed to get response from LLM: ' + errorMessage);
    }
  }

  private async validateAndReturnMenuItems(
    menuData: unknown,
  ): Promise<MenuItemDto[]> {
    const menuResponse = plainToInstance(
      AnalyseRestaurantMenuResponseDto,
      menuData,
    );

    const errors = await validate(menuResponse);

    if (errors.length > 0) {
      const errorDetails = errors
        .map((err) => {
          return `${err.property}: ${Object.values(err.constraints || {}).join(', ')}`;
        })
        .join('; ');
      throw new BadRequestException(
        `LLM response validation failed: ${errorDetails}`,
      );
    }

    return menuResponse.menu_items;
  }
}
