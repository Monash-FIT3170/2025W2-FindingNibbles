import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Prisma, User } from 'generated/prisma';
import { CurrentUser } from 'src/auth/strategies/jwt/decorators/user_decorator';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createRecipeDto: CreateRecipeDto,
    @CurrentUser() user: User,
  ) {
    const generatedRecipe = await this.recipeService.generate(
      createRecipeDto,
      user,
    );

    const cuisine = await this.recipeService.validateAndGetCuisine(
      generatedRecipe.cuisine,
    );

    if (!cuisine) {
      throw new NotFoundException('Cuisine is not found.');
    }

    // const recipe: Prisma.RecipeCreateInput = {
    //   ...generatedRecipe,
    //   ...createRecipeDto,
    //   cuisine: {
    //     connect: {
    //       id: cuisine.id,
    //     },
    //   },
    // };

    // return this.recipeService.create(recipe);
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
