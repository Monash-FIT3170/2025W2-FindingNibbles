import { Injectable, BadRequestException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import { CreateRecipeDto, RecipeDifficulty } from './dto/create-recipe.dto';
import { ConfigService } from '@nestjs/config';
import { getErrorMessage } from 'src/utils';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RecipeResponseDto } from './dto/recipe-response.dto';

type RecipeGenerated = {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  estimatedTimeMinutes: number;
  servings: number;
  dietaryTags: string[];
  nutritionalInfo: string[];
  difficultyLevel: RecipeDifficulty;
  cuisine: string;
};

const responseSchema = {
  type: 'OBJECT',
  properties: {
    recipes: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          title: { type: 'STRING' },
          description: { type: 'STRING' },
          cook_time: { type: 'INTEGER' },
          servings: { type: 'INTEGER' },
          ingredients: { type: 'ARRAY', items: { type: 'STRING' } },
          steps: { type: 'ARRAY', items: { type: 'STRING' } },
          nutritional_info: {
            type: 'ARRAY',
            items: { type: 'STRING' },
          },
          difficulty: { type: 'STRING' },
          cuisine: { type: 'STRING' },
        },
        required: [
          'title',
          'description',
          'cook_time',
          'servings',
          'ingredients',
          'steps',
          'nutritional_info',
          'difficulty',
          'cuisine',
        ],
      },
    },
  },
  required: ['recipes'],
};

@Injectable()
export class RecipeService {
  constructor(
    private db: DatabaseService,
    private configService: ConfigService,
  ) {}
  async generate(recipe: CreateRecipeDto): Promise<RecipeGenerated[]> {
    try {
      const dietaries = await this.db.userDietary.findMany({
        where: {
          dietaryId: {
            in: recipe.dietaryRequirements,
          },
        },
        select: {
          dietary: true,
        },
      });
      const dietaryRequirements = dietaries.map((dr) => dr.dietary.name);

      const appliances = await this.db.userAppliance.findMany({
        where: {
          applianceId: {
            in: recipe.kitchenAppliances,
          },
        },
        select: {
          appliance: true,
        },
      });
      const kitchenAppliances = appliances.map((app) => app.appliance.name);

      const requestedDifficulty = recipe.difficultyLevel;
      const difficultyLine =
        requestedDifficulty === RecipeDifficulty.ANY
          ? ``
          : `- Recipes must be '${requestedDifficulty}' difficulty.`;

      const prompt = `
        Generate 3 recipes that meet the following criteria:
        - Use British English and the metric system.
        - Dietary restrictions: ${dietaryRequirements.join(', ') || 'none'}.
        - Use the following ingredients: ${recipe.ingredients.join(', ') || 'none'}.
        - Must be cookable using: ${kitchenAppliances.join(', ') || 'any tools'}.
        ${difficultyLine}
        Return the recipes in a JSON object with a 'recipes' key containing a list of three recipes.
        Each recipe should include:
        - Difficulty as 'easy', 'medium', or 'hard'
        - Nutritional info including: Calories (kcal), Protein (g), Carbohydrates (g and sugars), Fat (g and saturated), Fibre (g), Salt (g)
        - Cook time as an integer number of minutes.
        - Cuisine type as a string.
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
                  ],
                },
              ],
              generationConfig: {
                responseMimeType: 'application/json',
                responseSchema,
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
        throw new Error('Failed to parse LLM recipe response: ' + errorMessage);
      }

      const recipeResponse = plainToInstance(RecipeResponseDto, parsed);
      const errors = await validate(recipeResponse);

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

      const recipes = recipeResponse.recipes.map((recipeData) => ({
        title: recipeData.title,
        description: recipeData.description,
        ingredients: recipeData.ingredients,
        instructions: recipeData.steps,
        estimatedTimeMinutes: recipeData.cook_time,
        servings: recipeData.servings,
        dietaryTags: dietaryRequirements,
        nutritionalInfo: recipeData.nutritional_info,
        difficultyLevel: recipeData.difficulty,
        cuisine: recipeData.cuisine || 'unknown',
      }));

      return recipes as RecipeGenerated[];
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      throw new Error(
        'An error occurred while generating recipes: ' + errorMessage,
      );
    }
  }

  async validateAndGetCuisine(cuisineName: string) {
    const existingCuisine = await this.db.cuisine.findFirst({
      where: {
        name: cuisineName.toLowerCase(),
      },
    });
    return existingCuisine;
  }

  async create(recipe: Prisma.RecipeCreateInput) {
    return this.db.recipe.create({ data: recipe });
  }

  async findAll() {
    return this.db.recipe.findMany({
      include: {
        cuisine: true,
      },
    });
  }

  async findOne(id: number) {
    return this.db.recipe.findUnique({
      where: {
        id,
      },
    });
  }
}