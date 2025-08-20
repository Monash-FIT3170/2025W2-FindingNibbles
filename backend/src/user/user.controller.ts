import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  Delete,
  Patch,
  Put,
  Logger,
  Query,
} from '@nestjs/common';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';
import { UserService } from './user.service';
import { RequestUser } from 'src/types';
import { CreateDietaryRequirementDto } from 'src/dietary-requirement/dto/create-dietary-requirement.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserLocationDto } from './dto/create-user-location.dto';
import { UpdateUserLocationDto } from './dto/update-user-location.dto';

@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);
  constructor(readonly userService: UserService) { }

  @Get('profile')
  async getProfile(@Req() req: RequestUser) {
    return this.userService.getProfile(req.user.sub);
  }

  @Post('calorie-log')
  logCalorie(
    @Req() req: RequestUser,
    @Body('calories') calories: number,
    @Body('date') dateStr?: string,
  ) {
    let date: Date;
    if (dateStr) {
      const parsedDate = new Date(dateStr);
      if (isNaN(parsedDate.getTime())) {
        throw new BadRequestException('Invalid date');
      }
      date = parsedDate;
    } else {
      date = new Date();
    }
    return this.userService.logCalorie(req.user.sub, calories, date);
  }

  @Get('calorie-log')
  getDailyCalories(
    @Req() req: RequestUser,
    @Query('date') dateStr: string,
  ): Promise<number> {
    const date = new Date(dateStr);
    this.logger.log(date);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date');
    }
    return this.userService.getDailyCalories(req.user.sub, date);
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
    this.logger.log(
      `Unfavouriting restaurant with ID: ${restaurantId} for user: ${req.user.sub}`,
    );
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
    this.logger.log(
      `User ${req.user.sub} is adding dietary requirement with ID: ${dietaryId}`,
    );
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
  async unfavouriteRecipe(
    @Req() req: RequestUser,
    @Body('recipeId') recipeId: number,
  ) {
    this.logger.log(
      `User ${req.user.sub} is unfavoriting and deleting recipe ${recipeId}`,
    );
    await this.userService.unfavouriteRecipe(req.user.sub, recipeId);
    return {
      success: true,
      message: 'Recipe unfavorited and deleted successfully',
    };
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
    this.logger.log(
      `User with ID ${userId} successfully updated. New details: ${JSON.stringify(updatedUser)}`,
    );

    // Return the updated user details
    return {
      id: updatedUser.id,
      email: updatedUser.email,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
    };
  }

  @Get('location/default')
  async getDefaultLocation(@Req() req: RequestUser) {
    return await this.userService.getUserDefaultLocation(req.user.sub);
  }

  @Post('location')
  createLocation(
    @Req() req: RequestUser,
    @Body() createUserLocationDto: CreateUserLocationDto,
  ) {
    return this.userService.createUserLocation(
      req.user.sub,
      createUserLocationDto,
    );
  }

  @Put('location')
  async updateLocation(
    @Req() req: RequestUser,
    @Body() updateUserLocationDto: UpdateUserLocationDto,
  ) {
    const updatedLocation = await this.userService.updateUserLocation(
      req.user.sub,
      updateUserLocationDto,
    );
    this.logger.log(
      `User with ID ${req.user.sub} updated location with ID ${updatedLocation.id}`,
    );
    return updatedLocation;
  }
  @Delete('location')
  async removeLocation(
    @Req() req: RequestUser,
    @Body('locationId') locationId: number,
  ) {
    await this.userService.removeUserLocation(req.user.sub, locationId);
    return { message: 'Location removed successfully' };
  }
}
