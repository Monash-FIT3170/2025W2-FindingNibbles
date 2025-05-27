import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeFromFrontEnd } from './dto/recipe-response.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  async create(@Body() createRecipeDto: CreateRecipeDto) {
    console.log('Received createRecipeDto:', createRecipeDto);
    const generatedRecipes = await this.recipeService.generate(createRecipeDto);

    return generatedRecipes;
  }

  @Get()
  findAll() {
    return this.recipeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }
  @Post('save')
  async saveRecipe(@Body() recipeData: RecipeFromFrontEnd): Promise<number> {
    console.log('Received recipeData:', recipeData);
    return this.recipeService.createFromDto(recipeData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.recipeService.delete(+id);
  }
}
