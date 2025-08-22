import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class CuisineService {
  constructor(private readonly db: DatabaseService) {}

  findAll() {
    return this.db.cuisine.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  findOneById(id: number) {
    return this.db.cuisine.findUnique({
      where: { id },
    });
  }

  findRestaurantsByCuisine(cuisineId: number) {
    return this.db.cuisine.findUnique({
      where: { id: cuisineId },
      include: {
        restaurantCuisines: {
          include: {
            restaurant: {
              include: {
                photos: true,
              },
            },
          },
        },
      },
    });
  }

  findPopularCuisines(limit: number = 10) {
    return this.db.cuisine.findMany({
      include: {
        _count: {
          select: {
            restaurantCuisines: true,
          },
        },
      },
      orderBy: {
        restaurantCuisines: {
          _count: 'desc',
        },
      },
      take: limit,
    });
  }
}
