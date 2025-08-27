import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CuisineDto } from './dto/favorite_cusine_dto';

@Injectable()
export class CuisineService {
  constructor(private readonly db: DatabaseService) {}

  // existing method
  findAll() {
    return this.db.cuisine.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  // NEW: find all cuisines and flag favourites for a given user
  async findAllForUser(userId: number): Promise<CuisineDto[]> {
    const cuisines = await this.db.cuisine.findMany({
      orderBy: { name: 'asc' },
    });

    const favourites = await this.db.userCuisine.findMany({
      where: { userId },
      select: { cuisineId: true },
    });

    const favIds = favourites.map((f) => f.cuisineId);

    return cuisines.map((cuisine) => ({
      ...cuisine,
      isFavourite: favIds.includes(cuisine.id),
    }));
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
