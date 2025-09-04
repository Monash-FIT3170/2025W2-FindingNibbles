import 'multer';
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

  async analyseAndStoreMenu(
    menu: Express.Multer.File,
    restaurantId: number,
  ): Promise<any> {
    try {
      // Validate file upload
      if (!menu?.buffer || !menu?.mimetype) {
        return {
          success: false,
          error: 'INVALID_FILE',
          message:
            'Invalid menu file provided. Please upload a valid image file.',
          restaurantId,
        };
      }

      const mimeType = detectMimeType(menu);
      const supportedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
      ];

      if (!supportedTypes.includes(mimeType)) {
        return {
          success: false,
          error: 'INVALID_FILE',
          message: `Unsupported file type: ${mimeType}. Please upload a JPEG, PNG, WebP, or GIF image.`,
          restaurantId,
        };
      }

      // Get AI-classified menu items
      let menuItems;
      try {
        menuItems = await this.analyseMenu(menu);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        return {
          success: false,
          error: 'AI_PROCESSING_FAILED',
          message:
            'Failed to analyze menu image. Please try with a clearer image.',
          restaurantId,
        };
      }

      // Store menu items in database with error handling
      try {
        const storedDishes = await this.storeMenuItems(menuItems, restaurantId);

        // Calculate summary statistics
        const categories = [
          ...new Set(storedDishes.map((dish) => dish.category).filter(Boolean)),
        ];
        const itemsWithDietaryTags = storedDishes.filter(
          (dish) => dish.dietaryTags.length > 0,
        ).length;

        return {
          success: true,
          restaurantId,
          dishesStored: storedDishes.length,
          summary: {
            totalItems: storedDishes.length,
            itemsWithDietaryTags,
            categories,
          },
          dishes: storedDishes,
        };
      } catch (storageError) {
        return {
          success: false,
          error: 'STORAGE_FAILED',
          message: 'Failed to save menu items to database.',
          restaurantId,
          details: getErrorMessage(storageError),
        };
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      return {
        success: false,
        error: 'UNKNOWN_ERROR',
        message: 'An unexpected error occurred while processing the menu.',
        restaurantId,
        details: errorMessage,
      };
    }
  }

  private async storeMenuItems(
    menuItems: MenuItemDto[],
    restaurantId: number,
  ): Promise<any[]> {
    const storedDishes: any[] = [];
    const failedItems: string[] = [];

    for (const item of menuItems) {
      try {
        // Create dish record
        const dish = await this.db.dish.create({
          data: {
            name: item.name,
            description: item.description || null,
            price: item.price || null,
            restaurantId: restaurantId,
          } as any,
        });

        // Create dietary relationships
        const dietaryTagsStored: string[] = [];
        if (item.dietaryTags && item.dietaryTags.length > 0) {
          try {
            // Get dietary requirement IDs
            const dietaryRequirements =
              await this.db.dietaryRequirement.findMany({
                where: {
                  name: { in: item.dietaryTags },
                },
                select: { id: true, name: true },
              });

            // Create dish-dietary relationships
            for (const dietary of dietaryRequirements) {
              await this.db.dishDietary.create({
                data: {
                  dishId: dish.id,
                  dietaryId: dietary.id,
                },
              });
              dietaryTagsStored.push(dietary.name);
            }
          } catch (dietaryError) {
            // Log dietary relationship errors but don't fail the whole item
            console.warn(
              `Failed to create dietary relationships for dish ${item.name}:`,
              getErrorMessage(dietaryError),
            );
          }
        }

        storedDishes.push({
          id: dish.id,
          name: dish.name,
          description: dish.description,
          price: dish.price,
          category: item.category,
          dietaryTags: dietaryTagsStored,
          createdAt: dish.createdAt,
        });
      } catch (itemError) {
        // Log individual item errors and continue with other items
        const errorMessage = getErrorMessage(itemError);
        console.error(`Failed to store dish "${item.name}":`, errorMessage);
        failedItems.push(`${item.name}: ${errorMessage}`);
      }
    }

    // If we couldn't store any items, throw an error
    if (storedDishes.length === 0 && failedItems.length > 0) {
      throw new Error(
        `Failed to store any menu items. Errors: ${failedItems.join(', ')}`,
      );
    }

    // If we had partial failures, log them but continue
    if (failedItems.length > 0) {
      console.warn(
        `Partial storage failure. Stored ${storedDishes.length}/${menuItems.length} items. Failed items: ${failedItems.join(', ')}`,
      );
    }

    return storedDishes;
  }

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
