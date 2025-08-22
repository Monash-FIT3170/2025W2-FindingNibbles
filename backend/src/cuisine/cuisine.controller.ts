import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Post,
  Delete,
  Body,
} from '@nestjs/common';
import { CuisineService } from './cuisine.service';

@Controller('cuisine')
export class CuisineController {
  constructor(private readonly cuisineService: CuisineService) {}

  @Get()
  findAll(@Query('popular') popular?: string, @Query('limit') limit?: string) {
    // Check if popular query parameter is set to true
    if (popular === 'true') {
      return this.cuisineService.findPopularCuisines(
        limit ? Number(limit) : 10,
      );
    }

    // Otherwise, return all cuisines sorted alphabetically
    return this.cuisineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cuisineService.findOneById(id);
  }

  @Get(':id/restaurants')
  findRestaurants(@Param('id', ParseIntPipe) id: number) {
    return this.cuisineService.findRestaurantsByCuisine(id);
  }
  // GET /cuisine/favourites?userId=1
  @Get('favourites')
  async getFavourites(@Query('userId', ParseIntPipe) userId: string) {
    return this.cuisineService.getFavouriteCuisines(userId);
  }

  // POST /cuisine/favourites
  @Post('favourites')
  async addFavourite(
    @Body('userId', ParseIntPipe) userId: string,
    @Body('cuisineId', ParseIntPipe) cuisineId: string,
  ) {
    await this.cuisineService.addFavouriteCuisine(userId, cuisineId);
    return { success: true };
  }

  // DELETE /cuisine/favourites
  @Delete('favourites')
  async removeFavourite(
    @Body('userId', ParseIntPipe) userId: string,
    @Body('cuisineId', ParseIntPipe) cuisineId: string,
  ) {
    await this.cuisineService.removeFavouriteCuisine(userId, cuisineId);
    return { success: true };
  }
}
