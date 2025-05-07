import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';

type RecipeGenerated = {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  estimatedTimeMinutes: number;
  servings: number;
  dietaryTags: string[];
  nutritionalInfo: string[];
  difficultyLevel: number;
  cuisine: string;
};

@Injectable()
export class RecipeService {
  constructor(private db: DatabaseService) {}
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async generate(
    _recipe: CreateRecipeDto,
    user: User,
  ): Promise<RecipeGenerated> {
    // if the recipe.useDietaries is true, then we need to get the dietary tags from the user that is requesting the recipe
    // if the recipe.includeAllIngredients is true, then we need to pass through all of the ingredients that are entered in the page
    // Otherwise, we need to pass through an empty array of ingredients or even say to the llm that we don't have any specific ingredients
    // if recipe.useDietaries is true, get dietary preferences from user

    // the userDietaryTags will be set to the users dietary tags if selected, empty otherwise
    let userDietaryTags: string[] = [];
    if (recipe.useDietaries) {
      const userProfile = await this.db.user.findUnique({
        where: { id: user.id },
        include: { userDietaries: true },
      });
      userDietaryTags = userProfile.dietaryPreferences.map((pref) => pref.name);
    }
    // if recipe.includeAllIngredients is true, get all ingredients from the recipe
    // otherwise, pass an empty array
    let userIngredients: string[] = [];
    if (recipe.includeAllIngredients) {
      userIngredients = recipe.ingredients;
    }

    // TODO: call the llm here instead of this mock

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockRecipe: RecipeGenerated = {
      title: 'Classic Margherita Pizza',
      description:
        'A simple and delicious pizza topped with fresh mozzarella, basil, and tomato sauce.',
      ingredients: [
        'pizza dough',
        'tomato sauce',
        'fresh mozzarella',
        'fresh basil leaves',
        'olive oil',
        'salt',
      ],
      instructions: [
        'Preheat the oven to 500°F (260°C).',
        'Roll out the pizza dough on a floured surface.',
        'Spread tomato sauce evenly over the dough.',
        'Add slices of fresh mozzarella on top.',
        'Drizzle olive oil and sprinkle salt.',
        'Bake in the oven for 7-10 minutes until the crust is golden and cheese is bubbly.',
        'Garnish with fresh basil leaves before serving.',
      ],
      estimatedTimeMinutes: 20,
      servings: 2,
      dietaryTags: ['vegetarian'],
      nutritionalInfo: [
        'Calories: 800',
        'Protein: 25g',
        'Carbohydrates: 90g',
        'Fat: 30g',
      ],
      difficultyLevel: 1,
      cuisine: 'italian',
    };

    return mockRecipe;
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
    // return all the recipes in the database
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
