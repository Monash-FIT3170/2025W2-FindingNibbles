import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.db.user.create({ data: createUserDto });
  }

  async findAll() {
    return this.db.user.findMany();
  }

  async findOneById(id: number) {
    return this.db.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return this.db.user.findUnique({ where: { email } });
  }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.db.user.update({ where: { id }, data: updateUserDto });
  }
  /**
   * Create a new user favourite restaurant
   * @param userId 
   * @param restaurantId 
   * @returns 
   */
  async favouriteRestaurant(userId: number, restaurantId: number) {
    return this.db.userFavouritedRestaurant.create({
      data: {
        userId,
        restaurantId,
      },
    })
  }
  /**
   * Unfavourite a restaurant
   * @param userId 
   * @param restaurantId 
   * @returns 
   */

  async unfavouriteRestaurant(userId: number, restaurantId: number) {
    return this.db.userFavouritedRestaurant.delete({
      where: {
        userId_restaurantId: {
          userId,
          restaurantId,
        },
      },
    });
  }
  /**
   * Return all the restaurants favourited by a user
   * @param userId 
   * @returns 
   */
  async getFavouritedRestaurants(userId: number) {
    return this.db.userFavouritedRestaurant.findMany({
      where: {
        userId,
      },
      include: {
        restaurant: true,
      },
    });
  }

  async remove(id: number) {
    return this.db.user.delete({ where: { id } });
  }
}
