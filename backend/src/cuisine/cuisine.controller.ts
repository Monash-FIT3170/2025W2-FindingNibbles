import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Req,
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
    @Req() req?: any,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId = (req.user as { id: number })?.id;

    if (popular === 'true') {
      return this.cuisineService.findPopularCuisines(
        limit ? Number(limit) : 10,
      );
    }

    if (userId) {
      return this.cuisineService.findAllForUser(userId);
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
