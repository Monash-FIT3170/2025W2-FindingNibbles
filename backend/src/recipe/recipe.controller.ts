import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Prisma } from 'generated/prisma';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto) {
    const generatedRecipe = await this.recipeService.generate(createRecipeDto);

    const cuisine = await this.recipeService.validateAndGetCuisine(
      generatedRecipe.cuisine,
    );

    if (!cuisine) {
      throw new NotFoundException('Cuisine is not found.');
    }

    const recipe: Prisma.RecipeCreateInput = {
      ...generatedRecipe,
      ...createRecipeDto,
      cuisine: {
        connect: {
          id: cuisine.id,
        },
      },
    };

    return this.recipeService.create(recipe);
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }
}
