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

  //   async findCuisinePreferences(userId: number, minRating: number) {
  //   // Fetch the user with their restaurant reviews and related cuisines
  //   const userWithReviews = await this.db.user.findUnique({
  //     where: { id: userId },
  //     include: {
  //       restaurantReviews: {
  //         include: {
  //           restaurant: {
  //             include: {
  //               restaurantCuisines: {
  //                 include: {
  //                   cuisine: true, // Include the cuisine details
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //       cuisinePreferences: true, // Include the existing cuisinePreferences
  //     },
  //   });

  //   if (!userWithReviews) {
  //     throw new Error(`User with ID ${userId} not found`);
  //   }

  //   // Filter reviews with a rating higher than the specified minimum
  //   const highRatedReviews = userWithReviews.restaurantReviews.filter(
  //     (review) => review.rating > minRating,
  //   );

  //   // Extract cuisines from the high-rated reviews
  //   const cuisinesFromReviews = highRatedReviews.flatMap((review) =>
  //     review.restaurant.restaurantCuisines.map((rc) => rc.cuisine),
  //   );

  //   // Combine with existing cuisinePreferences
  //   const existingCuisines = userWithReviews.cuisinePreferences || [];
  //   const combinedCuisines = [
  //     ...existingCuisines,
  //     ...cuisinesFromReviews.filter(
  //       (newCuisine) => !existingCuisines.some((existing) => existing.id === newCuisine.id),
  //     ),
  //   ];

  //   return combinedCuisines.map((cuisine) => cuisine.name); // Return the names of the cuisines
  // }

  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.db.user.update({ where: { id }, data: updateUserDto });
  }

  async remove(id: number) {
    return this.db.user.delete({ where: { id } });
  }
}
