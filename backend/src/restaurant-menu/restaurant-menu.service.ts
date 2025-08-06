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

      console.log(
        `Available dietary requirements: ${availableDietaries.join(', ')}`,
      );

      const prompt = `
    You are analyzing a restaurant menu image. For each menu item, extract the following fields:
    - name: The exact name of the dish
    - description: Brief description of the menu item if available (use only the menu text; do NOT supplement with general knowledge)
    - price: Price if visible (as a number)
    - dietaryTags: Array of dietary restrictions that the item from this menu is explicitly marked as meeting (e.g. "Vegetarian", "Gluten-Free", or icons, badges, or sections on the menu)
    - category: Category like 'Appetisers', 'Mains', 'Desserts', etc. if identifiable

    STRICT INSTRUCTIONS for dietaryTags:
    - Only assign a dietary tag if it is explicitly stated or visually indicated for the menu item in the provided menu image (such as a badge, icon, section heading, or text like "Vegan" or "Gluten-Free" next to the item).
    - DO NOT infer, guess, or use general world knowledge about what is typically vegan/vegetarian/etc.
    - If there is no explicit dietary information for a menu item, set dietaryTags to an empty array.
        
        Only include dietary tags that exactly match the available dietary requirements.
        Return the menu items in a JSON object with a 'menu_items' key containing an array of menu items.
      `;

      const base64Data = menu.buffer.toString('base64');

      let responseJson: {
        candidates?: Array<{
          content: {
            parts: Array<{
              text: string;
            }>;
          };
        }>;
      };

      try {
        const model = this.configService.get<string>('GOOGLE_GEMINI_API_MODEL');
        const apiKey = this.configService.get<string>('GOOGLE_GEMINI_API_KEY');

        const requestBody = {
          contents: [
            {
              parts: [
                {
                  text: prompt,
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
