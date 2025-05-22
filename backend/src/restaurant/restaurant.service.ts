import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class RestaurantService {
  constructor(private readonly db: DatabaseService) {}

  // Fetch all restaurants with optional pagination and sorting
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

  // Fetch a single restaurant by ID
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

  // Fetch restaurants by name
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

  // Fetch restaurants by cuisine ID
  findByCuisine(
    cuisineId: number,
    params?: {
      skip?: number;
      take?: number;
      orderBy?: Prisma.RestaurantOrderByWithRelationInput;
    },
  ) {
    const { skip, take, orderBy } = params || {};
    return this.db.restaurant.findMany({
      where: {
        restaurantCuisines: {
          some: {
            cuisineId,
          },
        },
      },
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
          gte: swLat,
          lte: neLat,
        },
        longitude: {
          gte: swLng,
          lte: neLng,
        },
      },
      include: {
        restaurantCuisines: {
          include: {
            cuisine: true,
          },
        },
      },
    });
  }

  // Fetch restaurants within bounds and filtered by cuisine
  async findInBoundsWithCuisine(
    swLat: number,
    swLng: number,
    neLat: number,
    neLng: number,
    cuisineId: number,
  ) {
    return this.db.restaurant.findMany({
      where: {
        latitude: {
          gte: swLat,
          lte: neLat,
        },
        longitude: {
          gte: swLng,
          lte: neLng,
        },
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
      },
    });
  }
}
