import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipeService {
  private recipes = [
    {
      id: 1,
      title: 'Spaghetti Bolognese',
      description: 'A classic Italian pasta dish with a rich meat sauce.',
      ingredients: [
        'spaghetti',
        'ground beef',
        'tomato sauce',
        'onion',
        'garlic',
      ],
      instructions: [
        'Cook spaghetti according to package instructions.',
        'In a pan, sauté onion and garlic until translucent.',
        'Add ground beef and cook until browned.',
        'Stir in tomato sauce and simmer for 20 minutes.',
        'Serve sauce over spaghetti.',
      ],
      missing_ingredients: ['parmesan cheese'],
      estimated_time_minutes: 30,
      servings: 4,
      dietary_tags: ['gluten-free'],
      difficulty_level: 2,
      image_url: 'https://example.com/spaghetti.jpg',
      nutritional_info: [
        'Calories: 500',
        'Protein: 25g',
        'Carbohydrates: 60g',
        'Fat: 15g',
      ],
      cuisineId: 1,
      cuisine: ['Italian'],
    },
  ];

  create(createRecipeDto: CreateRecipeDto) {
    // generate a new reicpe with an id
    const newRecipe = {
      id: this.recipes.length + 1,
      ...createRecipeDto,
    };

    this.recipes.push(newRecipe);
    // save the recipe to the database

    return 'This action adds a new recipe';
  }

  findAll() {
    return this.recipes;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
