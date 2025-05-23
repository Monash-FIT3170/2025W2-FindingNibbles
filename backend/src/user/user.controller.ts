import { Body, Controller, Post, Req, Get, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RequestUser } from 'src/types';
import { CreateDietaryRestrictionDto } from 'src/dietary-restriction/dto/create-dietary-restriction.dto';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Post('favourite-restaurant')
  favouriteRestaurant(
    @Req() req: RequestUser,
    @Body('restaurantId') restaurantId: number,
  ) {
    return this.userService.favouriteRestaurant(req.user.sub, restaurantId);
  }

  @Delete('favourite-restaurant')
  unfavouriteRestaurant(
    @Req() req: RequestUser,
    @Body('restaurantId') restaurantId: number,
  ) {
    console.log(`Unfavouriting restaurant ${restaurantId}`);
    return this.userService.unfavouriteRestaurant(req.user.sub, restaurantId);
  }

  @Get('favourite-restaurant')
  getFavouritedRestaurants(@Req() req: RequestUser) {
    return this.userService.getFavouritedRestaurants(req.user.sub);
  }

  @Post('dietary-restriction')
  addDietaryRestriction(
    @Req() req: RequestUser,
    @Body('dietaryId') dietaryId: number,
  ) {
    console.log(`Adding dietary restriction ${dietaryId}`);
    return this.userService.addDietaryRestriction(req.user.sub, dietaryId);
  }

  @Delete('dietary-restriction')
  removeDietaryRestriction(
    @Req() req: RequestUser,
    @Body('dietaryId') dietaryId: number,
  ) {
    return this.userService.removeDietaryRestriction(req.user.sub, dietaryId);
  }

  @Get('dietary-restriction')
  getUserDietaryRestrictions(@Req() req: RequestUser) {
    return this.userService.getDietaryRestrictions(req.user.sub);
  }

  @Post('create-dietary-restriction')
  createDietaryRestriction(
    @Req() req: RequestUser,
    @Body() data: CreateDietaryRestrictionDto,
  ) {
    return this.userService.createUserSpecificDietaryRestriction(
      req.user.sub,
      data,
    );
  }

  @Get('favourite-recipe')
  getFavouritedRecipes(@Req() req: RequestUser) {
    return this.userService.getFavouritedRecipe(req.user.sub);
  }

  @Post('favourite-recipe')
  favouriteRecipe(@Req() req: RequestUser, @Body('recipeId') recipeId: number) {
    return this.userService.favouriteRecipe(req.user.sub, recipeId);
  }

  @Delete('favourite-recipe')
  unfavouriteRecipe(
    @Req() req: RequestUser,
    @Body('recipeId') recipeId: number,
  ) {
    return this.userService.unfavouriteRecipe(req.user.sub, recipeId);
  }
}
