import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class RestaurantService {
  constructor(private readonly db: DatabaseService) {}

  findAll(params?: {
    skip?: number;
    take?: number;
    orderBy?: Prisma.RestaurantOrderByWithRelationInput;
  }) {
    const { skip, take, orderBy } = params || {};
    return this.db.restaurant.findMany({
      skip,
      take,
      orderBy,
      include: {
        restaurantCuisines: {
          include: {
            cuisine: true,
          },
        },
        photos: true,
      },
    });
  }

  findOneById(id: number) {
    return this.db.restaurant.findUnique({
      where: { id },
      include: {
        restaurantCuisines: {
          include: {
            cuisine: true,
          },
        },
        photos: true,
      },
    });
  }

  findByName(name: string) {
    return this.db.restaurant.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      include: {
        restaurantCuisines: {
          include: {
            cuisine: true,
          },
        },
        photos: true,
      },
    });
  }

  findByCuisine(cuisineId: number) {
    return this.db.restaurant.findMany({
      where: {
        restaurantCuisines: {
          some: {
            cuisineId,
          },
        },
      },
      include: {
        restaurantCuisines: {
          include: {
            cuisine: true,
          },
        },
        photos: true,
      },
    });
  }

  incrementViewCount(id: number) {
    return this.db.restaurant.update({
      where: { id },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });
  }

  // Fetch restaurants within the specified bounding box
  async findInBounds(
    swLat: number,
    swLng: number,
    neLat: number,
    neLng: number,
  ) {
    return this.db.restaurant.findMany({
      where: {
        latitude: {
          gte: swLat, // Greater than or equal to swLat
          lte: neLat, // Less than or equal to neLat
        },
        longitude: {
          gte: swLng, // Greater than or equal to swLng
          lte: neLng, // Less than or equal to neLng
        },
      },
    });
  }
}
