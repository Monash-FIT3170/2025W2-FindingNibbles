import { Body, Controller, Post, Req, Get, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RequestUser } from 'src/types';
import { CreateDietaryRequirementDto } from 'src/dietary-requirement/dto/create-dietary-requirement.dto';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@Req() req: RequestUser) {
    return this.userService.getProfile(req.user.id);
  }

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

  @Post('dietary-requirement')
  addDietaryRequirement(
    @Req() req: RequestUser,
    @Body('dietaryId') dietaryId: number,
  ) {
    console.log(`Adding dietary requirement ${dietaryId}`);
    return this.userService.addDietaryRequirement(req.user.sub, dietaryId);
  }

  @Delete('dietary-requirement')
  removeDietaryRequirement(
    @Req() req: RequestUser,
    @Body('dietaryId') dietaryId: number,
  ) {
    return this.userService.deleteDietaryRequirement(req.user.sub, dietaryId);
  }

  @Get('dietary-requirement')
  getUserDietaryRequirements(@Req() req: RequestUser) {
    return this.userService.getDietaryRequirements(req.user.sub);
  }

  @Post('create-dietary-requirement')
  createDietaryRequirement(
    @Req() req: RequestUser,
    @Body() data: CreateDietaryRequirementDto,
  ) {
    return this.userService.createUserSpecificDietaryRequirement(
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
