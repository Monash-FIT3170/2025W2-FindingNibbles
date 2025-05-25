import { Injectable, Logger } from '@nestjs/common';
import { Prisma, Restaurant, Recipe } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';
import { DietaryRequirementService } from 'src/dietary-requirement/dietary-requirement.service';
import {
  CreateDietaryRequirementDto,
  DietaryRequirementDto,
} from 'src/dietary-requirement/dto/create-dietary-requirement.dto';
import { CreateUserLocationDto } from './dto/create-user-location.dto';
import { UpdateUserLocationDto } from './dto/update-user-location.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);
  constructor(
    private readonly db: DatabaseService,
    private readonly dietaryRequirementService: DietaryRequirementService,
  ) {}

  async create(createUserDto: Prisma.UserCreateInput) {
    return this.db.user.create({ data: createUserDto });
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
    await this.db.userFavouritedRestaurant.delete({
      where: { userId_restaurantId: { userId, restaurantId } },
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

  async addAppliance(userId: number, applianceId: number) {
    return this.db.userAppliance.create({
      data: {
        userId,
        applianceId,
      },
    });
  }

  async removeAppliance(userId: number, applianceId: number) {
    return this.db.userAppliance.delete({
      where: {
        userId_applianceId: {
          userId,
          applianceId,
        },
      },
    });
  }

  async getAppliances(userId: number) {
    return this.db.userAppliance.findMany({
      where: {
        userId,
      },
      include: {
        appliance: true,
      },
    });
  }

  /**
   * Add a dietary Requirement to a user
   * @param userId d
   * @param dietaryId d
   * @returns d
   */
  async addDietaryRequirement(userId: number, dietaryId: number) {
    return this.db.userDietary.create({
      data: {
        userId,
        dietaryId,
      },
    });
  }

  /**
   * Remove a dietary Requirement from a user
   * @param userId d
   * @param dietaryId d
   * @returns d
   */
  async deleteDietaryRequirement(userId: number, dietaryId: number) {
    await this.db.userDietary.deleteMany({
      where: { userId, dietaryId },
    });
  }

  async getDietaryRequirements(
    userId: number,
  ): Promise<DietaryRequirementDto[]> {
    const userDietaries = await this.db.userDietary.findMany({
      where: {
        userId,
      },
      include: {
        dietary: true,
      },
    });

    return userDietaries.map((userDietary) => ({
      id: userDietary.dietary.id,
      name: userDietary.dietary.name,
      description: userDietary.dietary.description ?? undefined,
    }));
  }

  /**
   * Get all dietary Requirements
   * @returns d
   */

  async createUserSpecificDietaryRequirement(
    userId: number,
    dietaryInformation: CreateDietaryRequirementDto,
  ) {
    const dietaryRequirement = await this.dietaryRequirementService.create({
      name: dietaryInformation.name,
      description: dietaryInformation.description,
    });
    const userDietary = await this.db.userDietary.create({
      data: {
        userId: userId,
        dietaryId: dietaryRequirement.id,
      },
    });
    return {
      id: userDietary.id,
      userId: userDietary.userId,
      dietaryId: userDietary.dietaryId,
      name: dietaryRequirement.name,
      description: dietaryRequirement.description,
    };
  }

  /**
   * Recipe specific user
   */

  async getFavouritedRecipe(userId: number): Promise<Recipe[]> {
    const favouritedRecipes = await this.db.userFavouritedRecipe.findMany({
      where: {
        userId,
      },
      include: {
        recipe: true,
      },
    });

    return favouritedRecipes.map((fav) => fav.recipe);
  }

  async favouriteRecipe(userId: number, recipeId: number) {
    return this.db.userFavouritedRecipe.create({
      data: {
        userId,
        recipeId,
      },
    });
  }

  async unfavouriteRecipe(userId: number, recipeId: number) {
    await this.db.userFavouritedRecipe.deleteMany({
      where: { userId, recipeId },
    });
  }

  async getProfile(userId: number) {
    return this.db.user.findUnique({
      where: { id: userId },
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    });
  }

  async remove(id: number) {
    return this.db.user.delete({ where: { id } });
  }

  /**
   * Get the default user location, for now it is always the home address
   */
  async getUserDefaultLocation(userId: number) {
    const location = await this.db.userLocation.findFirst({
      where: {
        userId: userId,
        isDefault: true,
      },
    });
    return location;
  }

  async createUserLocation(
    userId: number,
    createUserLocationDto: CreateUserLocationDto,
  ) {
    this.logger.log(
      `Creating user location for user with ID ${userId}. Data: ${JSON.stringify(createUserLocationDto)}`,
    );
    // If the new location is intended to be default, unset others first
    if (createUserLocationDto.isDefault === true) {
      await this.db.userLocation.updateMany({
        where: { userId: userId },
        data: { isDefault: false },
      });
    }

    const dataToCreate = {
      name: createUserLocationDto.name,
      latitude: createUserLocationDto.latitude,
      longitude: createUserLocationDto.longitude,
      isDefault: createUserLocationDto.isDefault ?? false,
      user: {
        connect: {
          id: userId,
        },
      },
    };

    return this.db.userLocation.create({
      data: dataToCreate,
    });
  }

  /**
   * Update a user location
   */
  async updateUserLocation(
    userId: number,
    updateUserLocationDto: UpdateUserLocationDto,
  ) {
    const locationId = updateUserLocationDto.id;

    const existingLocation = await this.db.userLocation.findUnique({
      where: { id: locationId },
    });

    if (!existingLocation || existingLocation.userId !== userId) {
      throw new NotFoundException(
        'User location with ID ${locationId} not found or unauthorized.',
      );
    }

    // If 'isDefault' is explicitly being set to true, unset others
    if (updateUserLocationDto.isDefault === true) {
      await this.db.userLocation.updateMany({
        where: { userId: userId, NOT: { id: locationId } },
        data: { isDefault: false },
      });
    }

    try {
      return await this.db.userLocation.update({
        where: {
          id: locationId,
        },
        data: updateUserLocationDto,
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // Prisma unique constraint error
          throw new BadRequestException(
            'A location with this name already exists.',
          );
        }
      }
      throw error;
    }
  }

  async removeUserLocation(userId: number, locationId: number) {
    const locationToDelete = await this.db.userLocation.findUnique({
      where: { id: locationId },
    });

    if (!locationToDelete || locationToDelete.userId !== userId) {
      throw new NotFoundException('User location not found or unauthorized.');
    }

    return this.db.userLocation.delete({
      where: { id: locationId },
    });
  }
}
