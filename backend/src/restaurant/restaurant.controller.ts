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

  // Fetch all restaurants with optional pagination, sorting, and filtering
  @Get()
  async findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('orderBy') orderBy?: string,
    @Query('cuisineId') cuisineId?: string,
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

      // Handle cuisine filtering with bounds
      if (cuisineId) {
        const cuisineIdNum = parseInt(cuisineId);
        if (isNaN(cuisineIdNum)) {
          throw new BadRequestException('Invalid cuisine ID value.');
        }
        const result = await this.restaurantService.findInBoundsWithCuisine(
          swLatNum,
          swLngNum,
          neLatNum,
          neLngNum,
          cuisineIdNum,
        );
        return result;
      }

      const result = await this.restaurantService.findInBounds(
        swLatNum,
        swLngNum,
        neLatNum,
        neLngNum,
      );
      return result;
    }

    // Handle cuisine filtering without bounds
    if (cuisineId) {
      const cuisineIdNum = parseInt(cuisineId);
      if (isNaN(cuisineIdNum)) {
        throw new BadRequestException('Invalid cuisine ID value.');
      }

      let orderByObject: Prisma.RestaurantOrderByWithRelationInput | undefined =
        undefined;
      if (orderBy === 'rating') {
        orderByObject = { rating: 'desc' };
      } else if (orderBy === 'popular') {
        orderByObject = { viewCount: 'desc' };
      }

      return this.restaurantService.findByCuisine(cuisineIdNum, {
        skip: skip ? Number(skip) : undefined,
        take: take ? Number(take) : undefined,
        orderBy: orderByObject,
      });
    }

    // If no bounds or cuisine are provided, return paginated and sorted restaurants
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

  // Fetch restaurants by name
  @Get('search/:name')
  findByName(@Param('name') name: string) {
    return this.restaurantService.findByName(name);
  }

  // Fetch restaurants by cuisine ID
  @Get('cuisine/:id')
  findByCuisine(@Param('id', ParseIntPipe) id: number) {
    return this.restaurantService.findByCuisine(id);
  }

  // Fetch restaurants by cuisine ID with bounds
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
