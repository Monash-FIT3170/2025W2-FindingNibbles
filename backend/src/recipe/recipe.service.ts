import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import { CreateRecipeDto, RecipeDifficulty } from './dto/create-recipe.dto';
import { GoogleGenAI, Type } from '@google/genai';
import { ConfigService } from '@nestjs/config';


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

@Injectable()
export class RecipeService {

  private ai: GoogleGenAI;

  constructor(
    private db: DatabaseService,
    private configService: ConfigService, 
  ) {
    this.ai = new GoogleGenAI({
      apiKey: this.configService.get<string>('GOOGLE_GEMINI_API_KEY'), 
    });
  }
  async generate(
    recipe: CreateRecipeDto
  ): Promise<RecipeGenerated[]> {
    try {
      const dietaries = await this.db.userDietary.findMany({
        where: {
          id: {
            in: recipe.dietaryRequirements,
          },
        },
      });
      const dietaryRequirements = dietaries.map(dr => dr.name);

      const appliances = await this.db.userAppliance.findMany({
        where: {
          id: {
            in: recipe.kitchenAppliances,
          },
        },
      });
      const kitchenAppliances = appliances.map(app => app.name);

      const requestedDifficulty = recipe.difficulty_level;
      const difficultyLine = requestedDifficulty === RecipeDifficulty.ANY
        ? ``
        : `- Recipes must be '${requestedDifficulty}' difficulty.`;

      const responseSchema = {
        type: Type.OBJECT,
        properties: {
          recipes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                cook_time: { type: Type.INTEGER },
                servings: { type: Type.INTEGER },
                ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                steps: { type: Type.ARRAY, items: { type: Type.STRING } },
                nutritional_info: { type: Type.ARRAY, items: { type: Type.STRING } },
                difficulty: { type: Type.STRING },
                cuisine: { type: Type.STRING },
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

      let recipesText;
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-1.5-pro',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema,
          },
        });
        recipesText = (response as any).text;
      } catch (error) {
        throw new Error('Failed to get response from LLM: ' + error.message);
      }

      let parsed;
      try {
        parsed = JSON.parse(recipesText);
      } catch (error) {
        throw new Error('Failed to parse LLM recipe response: ' + error.message);
      }

      const recipes = parsed.recipes.map((recipeData: any) => ({
        title: recipeData.title,
        description: recipeData.description,
        ingredients: recipeData.ingredients,
        instructions: recipeData.steps,
        estimatedTimeMinutes: recipeData.cook_time,
        servings: recipeData.servings,
        dietaryTags: dietaryRequirements,
        nutritionalInfo: recipeData.nutritional_info,
        difficultyLevel: recipeData.difficulty as RecipeDifficulty,
        cuisine: recipeData.cuisine || 'unknown',
      }));

      return recipes;
    } catch (err) {
      throw new Error('An error occurred while generating recipes: ' + err.message);
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
