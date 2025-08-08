import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { ConfigService } from '@nestjs/config';
import { getErrorMessage } from 'src/utils';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import {
  AnalyseRestaurantMenuResponseDto,
  MenuItemDto,
} from './dto/analyse-restaurant-menu.dto';

// Schema for step 1
const basicMenuSchema = {
  type: 'OBJECT',
  properties: {
    menu_items: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          name: { type: 'STRING' },
          description: { type: 'STRING' },
          price: { type: 'NUMBER' },
          category: { type: 'STRING' },
          explicit_dietary_tags: { type: 'ARRAY', items: { type: 'STRING' } },
          mentioned_ingredients: { type: 'ARRAY', items: { type: 'STRING' } },
        },
        required: ['name', 'mentioned_ingredients'],
      },
    },
  },
  required: ['menu_items'],
};

const menuAnalysisSchema = {
  type: 'OBJECT',
  properties: {
    menu_items: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          name: { type: 'STRING' },
          description: { type: 'STRING' },
          price: { type: 'NUMBER' },
          dietaryTags: { type: 'ARRAY', items: { type: 'STRING' } },
          category: { type: 'STRING' },
        },
        required: ['name', 'dietaryTags'],
      },
    },
  },
  required: ['menu_items'],
};

@Injectable()
export class RestaurantMenuService {
  constructor(
    private db: DatabaseService,
    private configService: ConfigService,
  ) {}

  async analyseMenu(menu: Express.Multer.File): Promise<MenuItemDto[]> {
    try {
      if (!menu.buffer || !menu.mimetype) {
        throw new BadRequestException('Invalid menu file provided');
      }

      // Detect the actual MIME type from the file buffer
      let actualMimeType = menu.mimetype;

      // If MIME type is generic octet-stream, try to detect from file signature
      if (
        menu.mimetype === 'application/octet-stream' ||
        !menu.mimetype.startsWith('image/')
      ) {
        const buffer = menu.buffer;

        // Check file signatures (magic numbers) to determine actual file type
        if (buffer.length >= 4) {
          // JPEG signatures
          if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
            actualMimeType = 'image/jpeg';
          }
          // PNG signature
          else if (
            buffer[0] === 0x89 &&
            buffer[1] === 0x50 &&
            buffer[2] === 0x4e &&
            buffer[3] === 0x47
          ) {
            actualMimeType = 'image/png';
          }
          // WebP signature
          else if (buffer.subarray(8, 12).toString() === 'WEBP') {
            actualMimeType = 'image/webp';
          }
          // GIF signatures
          else if (buffer.subarray(0, 3).toString() === 'GIF') {
            actualMimeType = 'image/gif';
          }
          // Default to JPEG if we can't detect but it looks like an image upload
          else if (
            menu.originalname &&
            /\.(jpe?g|png|gif|webp)$/i.test(menu.originalname)
          ) {
            actualMimeType = 'image/jpeg'; // Default fallback
          }
        }
      }

      const supportedTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
      ];
      if (!supportedTypes.includes(actualMimeType)) {
        throw new BadRequestException(
          `Unsupported file type: ${actualMimeType}. Please upload a JPEG, PNG, WebP, or GIF image.`,
        );
      }

      const dietaryRequirements = await this.db.dietaryRequirement.findMany({
        select: {
          name: true,
        },
      });

      const availableDietaries = dietaryRequirements.map((dr) => dr.name);

      // STEP 1 PROMPT
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

      let step1ResponseJson: {
        candidates?: Array<{
          content: {
            parts: Array<{
              text: string;
            }>;
          };
        }>;
      };

      // STEP 1: Extract basic menu info
      try {
        const model = this.configService.get<string>('GOOGLE_GEMINI_API_MODEL');
        const apiKey = this.configService.get<string>('GOOGLE_GEMINI_API_KEY');

        const requestBody = {
          contents: [
            {
              parts: [
                {
                  text: step1Prompt,
                },
                {
                  inline_data: {
                    mime_type: actualMimeType,
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

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            body: JSON.stringify(requestBody),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `API request failed: ${response.status} ${errorText}`,
          );
        }

        step1ResponseJson = (await response.json()) as typeof step1ResponseJson;
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        throw new Error('Failed to get response from LLM: ' + errorMessage);
      }

      let step1ResponseContent: string;
      try {
        const textContent =
          step1ResponseJson.candidates?.[0]?.content?.parts[0]?.text;
        if (!textContent) {
          throw new Error('No text content found in LLM response');
        }
        step1ResponseContent = textContent;
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        throw new Error('Failed to extract response from LLM: ' + errorMessage);
      }

      let step1Parsed: unknown;
      try {
        step1Parsed = JSON.parse(step1ResponseContent);
      } catch (error: any) {
        const errorMessage = getErrorMessage(error);
        throw new Error(
          'Failed to parse LLM menu analysis response: ' + errorMessage,
        );
      }

      // STEP 2 PROMPT
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

Menu items: ${JSON.stringify(step1Parsed, null, 2)}

Available dietary tags: [${availableDietaries.join(', ')}]

Return items with final "dietaryTags" array (remove explicit_dietary_tags and mentioned_ingredients from output).
      `;

      let responseJson: {
        candidates?: Array<{
          content: {
            parts: Array<{
              text: string;
            }>;
          };
        }>;
      };

      // STEP 2: Determine dietary tags
      try {
        const model = this.configService.get<string>('GOOGLE_GEMINI_API_MODEL');
        const apiKey = this.configService.get<string>('GOOGLE_GEMINI_API_KEY');

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

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            body: JSON.stringify(requestBody),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `API request failed: ${response.status} ${errorText}`,
          );
        }

        responseJson = (await response.json()) as typeof responseJson;
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        throw new Error('Failed to get response from LLM: ' + errorMessage);
      }

      let responseContent: string;
      try {
        const textContent =
          responseJson.candidates?.[0]?.content?.parts[0]?.text;
        if (!textContent) {
          throw new Error('No text content found in LLM response');
        }
        responseContent = textContent;
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        throw new Error('Failed to extract response from LLM: ' + errorMessage);
      }

      let parsed: unknown;
      try {
        parsed = JSON.parse(responseContent);
      } catch (error: any) {
        const errorMessage = getErrorMessage(error);
        throw new Error(
          'Failed to parse LLM menu analysis response: ' + errorMessage,
        );
      }

      const menuResponse = plainToInstance(
        AnalyseRestaurantMenuResponseDto,
        parsed,
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
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      throw new Error(
        'An error occurred while analyzing menu: ' + errorMessage,
      );
    }
  }
}
