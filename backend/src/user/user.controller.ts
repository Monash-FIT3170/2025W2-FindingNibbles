import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  Delete,
  Patch,
} from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UserService } from './user.service';
import { RequestUser } from 'src/types';
import { CreateDietaryRequirementDto } from 'src/dietary-requirement/dto/create-dietary-requirement.dto';
import { UpdateUserDto } from './dto/update-user_dto';

@Controller('user')
export class UserController {
  constructor(readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@Req() req: RequestUser) {
    return this.userService.getProfile(req.user.sub);
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

  @Post('appliance')
  addAppliance(@Req() req: RequestUser, @Body() body: { applianceId: number }) {
    const { applianceId } = body;
    return this.userService.addAppliance(req.user.sub, applianceId);
  }

  @Delete('appliance')
  removeAppliance(
    @Req() req: RequestUser,
    @Body() body: { applianceId: number },
  ) {
    const { applianceId } = body;
    return this.userService.removeAppliance(req.user.sub, applianceId);
  }

  @Get('appliance')
  getUserAppliances(@Req() req: RequestUser) {
    return this.userService.getAppliances(req.user.sub);
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

  @Patch('update')
  async updateUser(
    @Req() req: RequestUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = req.user.sub;

    // Attempt the update
    const updatedUser = await this.userService.update(userId, updateUserDto);

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    console.log('Updated User:', updatedUser);

    // Return the updated user details
    return {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
    };
  }
}
