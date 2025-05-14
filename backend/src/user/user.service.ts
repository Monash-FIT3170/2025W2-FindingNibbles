import { Injectable } from '@nestjs/common';
import { Prisma, Restaurant } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import { DietaryRestrictionService } from 'src/dietary-restriction/dietary-restriction.service';
import { CreateDietaryRestrictionDto } from 'src/dietary-restriction/dto/create-dietary-restriction.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly db: DatabaseService,
    private readonly dietaryRestrictionService: DietaryRestrictionService,
  ) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.db.user.create({ data: createUserDto });
  }

  // async findAll() {
  //   return this.db.user.findMany();
  // }

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
   * @param userId d
   * @param restaurantId d
   * @returns d
   */
  async favouriteRestaurant(userId: number, restaurantId: number) {
    return this.db.userFavouritedRestaurant.create({
      data: {
        userId,
        restaurantId,
      },
    });
  }
  /**
   * Unfavourite a restaurant
   * @param userId d
   * @param restaurantId d
   * @returns d
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
   * @param userId d
   * @returns d
   */
  async getFavouritedRestaurants(userId: number): Promise<Restaurant[]> {
    const favouritedRestaurants =
      await this.db.userFavouritedRestaurant.findMany({
        where: {
          userId,
        },
        include: {
          restaurant: true,
        },
      });

    return favouritedRestaurants.map((fav) => fav.restaurant);
  }

  /**
   * Add a dietary restriction to a user
   * @param userId d
   * @param dietaryId d
   * @returns d
   */
  async addDietaryRestriction(userId: number, dietaryId: number) {
    return this.db.userDietary.create({
      data: {
        userId,
        dietaryId,
      },
    });
  }

  /**
   * Remove a dietary restriction from a user
   * @param userId d
   * @param dietaryId d
   * @returns d
   */
  async removeDietaryRestriction(userId: number, dietaryId: number) {
    return this.db.userDietary.delete({
      where: {
        userId_dietaryId: {
          userId,
          dietaryId,
        },
      },
    });
  }

  async getDietaryRestrictions(userId: number) {
    return this.db.userDietary.findMany({
      where: {
        userId,
      },
      include: {
        dietary: true,
      },
    });
  }

  /**
   * Get all dietary restrictions
   * @returns d
   */

  async createUserSpecificDietaryRestriction(
    userId: number,
    dietaryInformation: CreateDietaryRestrictionDto,
  ) {
    const dietaryRestriction =
      await this.dietaryRestrictionService.create(dietaryInformation);
    return this.db.userDietary.create({
      data: {
        userId: userId,
        dietaryId: dietaryRestriction.id,
      },
    });
  }

  async remove(id: number) {
    return this.db.user.delete({ where: { id } });
  }
}
