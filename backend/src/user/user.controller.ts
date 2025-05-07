import { Body, Controller, Post, Req, Get, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt/jwt-auth.guard';
import { RequestUser } from 'src/types';
import { CreateDietaryRestrictionDto } from 'src/dietary-restriction/dto/create-dietary-restriction.dto';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: RequestUser) {
    const user = await this.userService.findOneById(req.user.id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('favourite-restaurant')
  favouriteRestaurant(@Req() req: RequestUser, @Body() restaurantId: number) {
    return this.userService.favouriteRestaurant(req.user.id, restaurantId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('unfavourite-restaurant')
  unfavouriteRestaurant(@Req() req: RequestUser, @Body() restaurantId: number) {
    return this.userService.unfavouriteRestaurant(req.user.id, restaurantId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('favourite-restaurant')
  getFavouritedRestaurants(@Req() req: RequestUser) {
    return this.userService.getFavouritedRestaurants(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('dietary-restriction')
  addDietaryRestriction(@Req() req: RequestUser, @Body() dietaryId: number) {
    return this.userService.addDietaryRestriction(req.user.id, dietaryId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('dietary-restriction')
  removeDietaryRestriction(@Req() req: RequestUser, @Body() dietaryId: number) {
    return this.userService.removeDietaryRestriction(req.user.id, dietaryId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('dietary-restriction')
  getUserDietaryRestrictions(@Req() req: RequestUser) {
    return this.userService.getDietaryRestrictions(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-dietary-restriction')
  createDietaryRestriction(
    @Req() req: RequestUser,
    @Body() dietaryRestriction: CreateDietaryRestrictionDto,
  ) {
    return this.userService.createUserSpecificDietaryRestriction(
      req.user.id,
      dietaryRestriction,
    );
  }
}
