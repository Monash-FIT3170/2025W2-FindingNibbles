import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { getErrorMessage } from 'src/utils';

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

  async getFavouriteCuisines(userId: string) {
    try {
      const userCuisines = await this.db.userCuisine.findMany({
        where: { userId: Number(userId) },
        include: { cuisine: true },
      });

      return userCuisines.map((uc) => ({
        id: uc.cuisine.id,
        name: uc.cuisine.name,
      }));
    } catch (error) {
      throw new BadRequestException(
        'Failed to fetch favourite cuisines: ' + getErrorMessage(error),
      );
    }
  }

  async addFavouriteCuisine(userId: string, cuisineId: string) {
    try {
      await this.db.userCuisine.create({
        data: {
          userId: Number(userId),
          cuisineId: Number(cuisineId),
        },
      });
    } catch (error) {
      throw new BadRequestException(
        'Failed to add favourite cuisine: ' + getErrorMessage(error),
      );
    }
  }

  async removeFavouriteCuisine(userId: string, cuisineId: string) {
    try {
      await this.db.userCuisine.delete({
        where: {
          userId_cuisineId: {
            userId: Number(userId),
            cuisineId: Number(cuisineId),
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(
        'Failed to remove favourite cuisine: ' + getErrorMessage(error),
      );
    }
  }
}
