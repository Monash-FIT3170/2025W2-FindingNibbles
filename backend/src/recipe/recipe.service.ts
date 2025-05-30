import { Injectable, BadRequestException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateRecipeDto, RecipeDifficulty } from './dto/create-recipe.dto';
import { ConfigService } from '@nestjs/config';
import { getErrorMessage } from 'src/utils';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Prisma } from 'generated/prisma';
import {
  RecipeFromFrontEnd,
  RecipeResponseDto,
} from './dto/recipe-response.dto';

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
    try {
      // Handle empty or null cuisine names
      if (!cuisineName || cuisineName.trim() === '') {
        cuisineName = 'Other';
      }

      // Normalize the cuisine name for comparison (lowercase)
      const normalizedName = cuisineName.trim().toLowerCase();

      // Try to find the cuisine case-insensitively
      const existingCuisine = await this.db.cuisine.findFirst({
        where: {
          name: {
            equals: normalizedName,
            mode: 'insensitive', // Case-insensitive search
          },
        },
      });

      // If found, return it
      if (existingCuisine) {
        console.log(
          `Found existing cuisine: ${existingCuisine.name} with ID ${existingCuisine.id}`,
        );
        return existingCuisine;
      }

      // If not found, create it with proper capitalization
      // Capitalize first letter of each word
      const capitalizedName = cuisineName
        .trim()
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(' ');

      console.log(`Creating new cuisine: ${capitalizedName}`);
      return await this.db.cuisine.create({
        data: {
          name: capitalizedName,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error in validateAndGetCuisine: ${error.message}`);
      } else {
        console.error('Error in validateAndGetCuisine: Unknown error');
      }

      // If there was an error (likely a duplicate), try to find the cuisine again
      if ((error as { code?: string }).code === 'P2002') {
        // Unique constraint failed
        const normalizedName = cuisineName.trim().toLowerCase();
        const existingCuisine = await this.db.cuisine.findFirst({
          where: {
            name: {
              equals: normalizedName,
              mode: 'insensitive',
            },
          },
        });

        if (existingCuisine) {
          return existingCuisine;
        }
      }

      // If all else fails, use a default cuisine
      const defaultCuisine = await this.db.cuisine.findFirst({
        where: {
          name: {
            equals: 'other',
            mode: 'insensitive',
          },
        },
      });

      if (defaultCuisine) {
        return defaultCuisine;
      }

      // If no default cuisine exists, create it
      return await this.db.cuisine.create({
        data: {
          name: 'Other',
        },
      });
    }
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

  async delete(id: number) {
    const recipe = await this.db.recipe.findUnique({
      where: { id },
    });
    if (!recipe) {
      throw new BadRequestException(`Recipe with ID ${id} not found`);
    }
    return this.db.recipe.delete({
      where: { id },
    });
  }

  async prepareRecipeForCreation(
    recipeData: RecipeFromFrontEnd,
  ): Promise<Prisma.RecipeCreateInput> {
    try {
      console.log('Recipe data received in prepareRecipeForCreation:');
      console.log(JSON.stringify(recipeData, null, 2));

      // Check for required fields with better error messages
      if (!recipeData.title) {
        throw new BadRequestException('Missing required field: title');
      }
      if (!recipeData.description) {
        throw new BadRequestException('Missing required field: description');
      }
      if (
        !recipeData.ingredients ||
        !Array.isArray(recipeData.ingredients) ||
        recipeData.ingredients.length === 0
      ) {
        throw new BadRequestException(
          'Missing or invalid required field: ingredients',
        );
      }
      if (
        !recipeData.instructions ||
        !Array.isArray(recipeData.instructions) ||
        recipeData.instructions.length === 0
      ) {
        throw new BadRequestException(
          'Missing or invalid required field: instructions',
        );
      }
      if (
        recipeData.estimatedTimeMinutes === undefined ||
        recipeData.estimatedTimeMinutes === null
      ) {
        console.log(
          'Warning: Missing estimatedTimeMinutes, defaulting to 30 minutes',
        );
        recipeData.estimatedTimeMinutes = 30;
      }
      if (!recipeData.servings) {
        console.log('Warning: Missing servings, defaulting to 1');
        recipeData.servings = 1;
      }
      if (
        !recipeData.nutritionalInfo ||
        !Array.isArray(recipeData.nutritionalInfo)
      ) {
        console.log(
          'Warning: Missing nutritionalInfo, defaulting to empty array',
        );
        recipeData.nutritionalInfo = [];
      }
      if (!recipeData.difficultyLevel) {
        console.log('Warning: Missing difficultyLevel, defaulting to easy');
        recipeData.difficultyLevel = RecipeDifficulty.EASY;
      }
      if (!recipeData.cuisine) {
        console.log('Warning: Missing cuisine, defaulting to Other');
        recipeData.cuisine = 'Other';
      }

      // Ensure proper enum values for difficultyLevel
      let validatedDifficultyLevel: RecipeDifficulty;
      try {
        validatedDifficultyLevel = Object.values(RecipeDifficulty).includes(
          recipeData.difficultyLevel,
        )
          ? recipeData.difficultyLevel
          : RecipeDifficulty.EASY;
      } catch {
        console.log(
          `Invalid difficulty level: ${recipeData.difficultyLevel}, defaulting to easy`,
        );
        validatedDifficultyLevel = RecipeDifficulty.EASY;
      }

      // Handle cuisine - find or create with better error handling
      let recipeCuisine: { id: number; name: string } | null;
      try {
        recipeCuisine = (await this.validateAndGetCuisine(
          recipeData.cuisine,
        )) as { id: number; name: string };
      } catch {
        // Create a default cuisine
        recipeCuisine = (await this.validateAndGetCuisine('Other')) as {
          id: number;
          name: string;
        };
      }

      // Transform RecipeDataDto to Recipe entity format
      const recipeToCreate = {
        title: recipeData.title,
        description: recipeData.description,
        estimatedTimeMinutes: recipeData.estimatedTimeMinutes,
        servings: recipeData.servings,
        ingredients: recipeData.ingredients,
        instructions: recipeData.instructions,
        nutritionalInfo: recipeData.nutritionalInfo,
        difficultyLevel: validatedDifficultyLevel,
        cuisine: {
          connect: {
            id: recipeCuisine.id,
          },
        },
        // Add any other fields needed by the database schema
      };

      // Log the recipe data being created
      console.log('Recipe data prepared for creation:');
      console.log(JSON.stringify(recipeToCreate, null, 2));

      return recipeToCreate;
    } catch (error) {
      // More detailed error logging
      console.error('Error in prepareRecipeForCreation:');
      console.error(error);
      const errorMessage = getErrorMessage(error);
      throw new BadRequestException(
        `Failed to prepare recipe for creation: ${errorMessage}`,
      );
    }
  }

  async createFromDto(recipeDto: RecipeFromFrontEnd): Promise<number> {
    console.log('Recipe data received for creation:');

    // Prepare the recipe data with proper validation and transformations
    const recipeData = await this.prepareRecipeForCreation(recipeDto);

    console.log(JSON.stringify(recipeData, null, 2));

    // Create the recipe in the database
    const newRecipe = await this.db.recipe.create({
      data: recipeData,
    });

    console.log(`Recipe created with ID: ${newRecipe.id}`);

    return newRecipe.id;
  }
}
