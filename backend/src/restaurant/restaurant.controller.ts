import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Prisma } from '../../generated/prisma';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('orderBy') orderBy?: string,
  ) {
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
