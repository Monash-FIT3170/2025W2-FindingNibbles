// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Param,
//   NotFoundException,
// } from '@nestjs/common';
// import { RecipeService } from './recipe.service';
// import { CreateRecipeDto } from './dto/create-recipe.dto';

// @Controller('recipe')
// export class RecipeController {
//   constructor(private readonly recipeService: RecipeService) {}

//   @Post()
//   async create(@Body() createRecipeDto: CreateRecipeDto) {
//     const generatedRecipes = await this.recipeService.generate(createRecipeDto);

//     for (const recipe of generatedRecipes) {
//       const cuisine = await this.recipeService.validateAndGetCuisine(recipe.cuisine);
//       if (!cuisine) throw new NotFoundException('Cuisine is not found.');

//       /*
//       const recipe: Prisma.RecipeCreateInput = {
//         ...generatedRecipes[i],
//         ...createRecipeDto,
//         cuisine: {
//           connect: {
//             id: cuisine.id,
//           },
//         },
//       };

//       await this.recipeService.create(recipe);
//       */
//     }

//     return { message: 'Recipes processed successfully.' };
//   }

//   @Get()
//   findAll() {
//     return this.recipeService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.recipeService.findOne(+id);
//   }
// }
