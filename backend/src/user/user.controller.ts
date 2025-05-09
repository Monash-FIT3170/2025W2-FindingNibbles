import { Body, Controller, Post, Req, Get, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RequestUser } from 'src/types';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Post('favourite-restaurant')
  favouriteRestaurant(@Req() req: RequestUser, @Body() restaurantId: number) {
    return this.userService.favouriteRestaurant(req.user.id, restaurantId);
  }

  @Delete('favourite-restaurant')
  unfavouriteRestaurant(@Req() req: RequestUser, @Body() restaurantId: number) {
    return this.userService.unfavouriteRestaurant(req.user.id, restaurantId);
  }

  @Get('favourite-restaurant')
  getFavouritedRestaurants(@Req() req: RequestUser) {
    return this.userService.getFavouritedRestaurants(req.user.id);
  }

  @Post('dietary-restriction')
  addDietaryRestriction(@Req() req: RequestUser, @Body() dietaryId: number) {
    return this.userService.addDietaryRestriction(req.user.id, dietaryId);
  }

  @Delete('dietary-restriction')
  removeDietaryRestriction(@Req() req: RequestUser, @Body() dietaryId: number) {
    return this.userService.removeDietaryRestriction(req.user.id, dietaryId);
  }

  @Get('dietary-restriction')
  getUserDietaryRestrictions(@Req() req: RequestUser) {
    return this.userService.getDietaryRestrictions(req.user.id);
  }
}
