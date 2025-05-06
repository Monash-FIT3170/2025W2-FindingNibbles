import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
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
  constructor(private databaseService: DatabaseService) {}
  // Create a type for a recipe that mirrors the prisma schema

  async generate(recipe: CreateRecipeDto): Promise<RecipeGenerated> {
    // TODO: call the llm here
    // Return RecipeGenerated
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
    // First try to find the cuisine
    const existingCuisine = await this.databaseService.cuisine.findFirst({
      where: {
        name: cuisineName.toLowerCase(),
      },
    });
    return existingCuisine;
  }

  async create(recipe: Prisma.RecipeCreateInput) {
    return this.databaseService.recipe.create({ data: recipe });
  }

  findAll() {
    return this.recipes;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  // async update(id: number, updateRecipeDto: Prisma.RecipeUpdateInput) {
  //   return this.databaseService.recipe.update({
  //     where: { id },
  //     data: updateRecipeDto,
  //   });
  // }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
