import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CuisineService } from './cuisine.service';

@Controller('cuisine')
export class CuisineController {
  constructor(private readonly cuisineService: CuisineService) {}

  @Get()
  findAll() {
    return this.cuisineService.findAll();
  }

  @Get('popular')
  findPopular(@Query('limit') limit?: string) {
    return this.cuisineService.findPopularCuisines(limit ? Number(limit) : 10);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cuisineService.findOneById(id);
  }

  @Get(':id/restaurants')
  findRestaurants(@Param('id', ParseIntPipe) id: number) {
    return this.cuisineService.findRestaurantsByCuisine(id);
  }
}
