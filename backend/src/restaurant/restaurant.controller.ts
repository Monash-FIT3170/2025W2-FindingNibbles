import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Prisma } from '../../generated/prisma';
import { Restaurant } from 'generated/prisma';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  async findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('orderBy') orderBy?: string,
    @Query('swLat') swLat?: string,
    @Query('swLng') swLng?: string,
    @Query('neLat') neLat?: string,
    @Query('neLng') neLng?: string,
  ): Promise<Restaurant[]> {
    // Check if bounds parameters are provided
    if (swLat && swLng && neLat && neLng) {
      const swLatNum = parseFloat(swLat);
      const swLngNum = parseFloat(swLng);
      const neLatNum = parseFloat(neLat);
      const neLngNum = parseFloat(neLng);

      // Validate the coordinates
      if (
        isNaN(swLatNum) ||
        isNaN(swLngNum) ||
        isNaN(neLatNum) ||
        isNaN(neLngNum)
      ) {
        throw new BadRequestException('Invalid latitude or longitude values.');
      }
      return this.restaurantService.findInBounds(
        swLatNum,
        swLngNum,
        neLatNum,
        neLngNum,
      );
    }

    // If no bounds are provided, return paginated and sorted restaurants
    let orderByObject: Prisma.RestaurantOrderByWithRelationInput | undefined =
      undefined;
    if (orderBy === 'rating') {
      orderByObject = { rating: 'desc' };
    } else if (orderBy === 'popular') {
      orderByObject = { viewCount: 'desc' };
    }

    return this.restaurantService.findAll({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      orderBy: orderByObject,
    });
  }

  // Specific routes must come BEFORE parameter routes
  @Get('search/:name')
  findByName(@Param('name') name: string) {
    return this.restaurantService.findByName(name);
  }

  @Get('cuisine/:id')
  findByCuisine(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantService.findByCuisine(id);
  }

  // Generic parameter route should come LAST
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const restaurant = await this.restaurantService.findOneById(id);

    if (!restaurant) {
      throw new NotFoundException(`Restaurant with ID ${id} not found`);
    }

    await this.restaurantService.incrementViewCount(id);
    return restaurant;
  }
}
