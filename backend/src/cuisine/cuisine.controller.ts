import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CuisineService } from './cuisine.service';
import { JwtAuthGuard } from '../auth/strategies/jwt/jwt-auth.guard'; // adjust path

@Controller('cuisine')
export class CuisineController {
  constructor(private readonly cuisineService: CuisineService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Query('popular') popular?: string,
    @Query('limit') limit?: string,
  ) {
    if (popular === 'true') {
      return this.cuisineService.findPopularCuisines(
        limit ? Number(limit) : 10,
      );
    }
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
}
