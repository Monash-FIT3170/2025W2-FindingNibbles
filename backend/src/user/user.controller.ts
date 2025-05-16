import { Body, Controller, Post, Req, Get, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RequestUser } from 'src/types';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Post('favourite-restaurant')
  favouriteRestaurant(
    @Req() req: RequestUser,
    @Body('restaurantId') restaurantId: number,
  ) {
    return this.userService.favouriteRestaurant(req.user.id, restaurantId);
  }

  @Delete('favourite-restaurant')
  unfavouriteRestaurant(
    @Req() req: RequestUser,
    @Body('restaurantId') restaurantId: number,
  ) {
    console.log(`Unfavouriting restaurant ${restaurantId}`);
    return this.userService.unfavouriteRestaurant(req.user.id, restaurantId);
  }

  @Get('favourite-restaurant')
  getFavouritedRestaurants(@Req() req: RequestUser) {
    return this.userService.getFavouritedRestaurants(req.user.id);
  }

  @Post('dietary-restriction')
  addDietaryRestriction(
    @Req() req: RequestUser,
    @Body('dietaryId') dietaryId: number,
  ) {
    console.log(`Adding dietary restriction ${dietaryId}`);
    return this.userService.addDietaryRestriction(req.user.id, dietaryId);
  }

  @Delete('dietary-restriction')
  removeDietaryRestriction(
    @Req() req: RequestUser,
    @Body('dietaryId') dietaryId: number,
  ) {
    return this.userService.removeDietaryRestriction(req.user.id, dietaryId);
  }

  @Get('dietary-restriction')
  getUserDietaryRestrictions(@Req() req: RequestUser) {
    return this.userService.getDietaryRestrictions(req.user.id);
  }

  @Post('create-dietary-restriction')
  createDietaryRestriction(
    @Req() req: RequestUser,
    @Body() data: { name: string; description: string },
  ) {
    return this.userService.createUserSpecificDietaryRestriction(
      req.user.id,
      data,
    );
  }

  @Get('favourite-recipe')
  getFavouritedRecipes(@Req() req: RequestUser) {
    return this.userService.getFavouritedRecipe(req.user.id);
  }

  @Post('favourite-recipe')
  favouriteRecipe(@Req() req: RequestUser, @Body('recipeId') recipeId: number) {
    return this.userService.favouriteRecipe(req.user.id, recipeId);
  }

  @Delete('favourite-recipe')
  unfavouriteRecipe(
    @Req() req: RequestUser,
    @Body('recipeId') recipeId: number,
  ) {
    return this.userService.unfavouriteRecipe(req.user.id, recipeId);
  }
}
