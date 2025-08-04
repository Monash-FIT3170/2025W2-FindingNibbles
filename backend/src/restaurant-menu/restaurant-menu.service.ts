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

      const dietaryRequirements = await this.db.dietaryRequirement.findMany({
        select: {
          name: true,
        },
      });

      const availableDietaries = dietaryRequirements.map((dr) => dr.name);

      // Convert file to base64 for sending to Gemini
      const base64Data = menu.buffer.toString('base64');
      const mimeType = menu.mimetype;

      const prompt = `
        Analyze this restaurant menu image and extract all menu items with their dietary restrictions.
        
        Available dietary requirements to match against: ${availableDietaries.join(', ')}.
        
        For each menu item, provide:
        - name: The exact name of the dish
        - description: Brief description if available
        - price: Price if visible (as a number)
        - dietaryTags: Array of applicable dietary restrictions from the available list (case-sensitive)
        - category: Category like 'Appetizers', 'Mains', 'Desserts', etc. if identifiable
        
        Only include dietary tags that exactly match the available dietary requirements.
        Return the menu items in a JSON object with a 'menu_items' key containing an array of menu items.
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

      try {
        const model = this.configService.get<string>('GOOGLE_GEMINI_API_MODEL');
        const apiKey = this.configService.get<string>('GOOGLE_GEMINI_API_KEY');

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: prompt,
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
                responseSchema: menuAnalysisSchema,
              },
            }),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
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
