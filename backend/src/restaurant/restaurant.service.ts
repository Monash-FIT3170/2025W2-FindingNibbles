import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
    // Calculate the center point to divide into quadrants
    const centerLat = (swLat + neLat) / 2;
    const centerLng = (swLng + neLng) / 2;

    // Define the 4 quadrants
    const quadrants = [
      // Southwest quadrant
      { swLat, swLng, neLat: centerLat, neLng: centerLng },
      // Southeast quadrant
      { swLat, swLng: centerLng, neLat: centerLat, neLng },
      // Northwest quadrant
      { swLat: centerLat, swLng, neLat, neLng: centerLng },
      // Northeast quadrant
      { swLat: centerLat, swLng: centerLng, neLat, neLng },
    ];

    // Fetch 10 restaurants from each quadrant
    const restaurantPromises = quadrants.map((quadrant) =>
      this.db.restaurant.findMany({
        where: {
          latitude: {
            gte: quadrant.swLat,
            lte: quadrant.neLat,
          },
          longitude: {
            gte: quadrant.swLng,
            lte: quadrant.neLng,
          },
        },
        take: 10, // Limit to 10 restaurants per quadrant
        orderBy: {
          rating: 'desc', // Order by rating descending to get best restaurants first
        },
        include: {
          restaurantCuisines: {
            include: {
              cuisine: true,
            },
          },
        },
      }),
    );

    // Wait for all quadrant queries to complete
    const quadrantResults = await Promise.all(restaurantPromises);

    // Flatten the results and remove duplicates (if any)
    const allRestaurants = quadrantResults.flat();
    const uniqueRestaurants = allRestaurants.filter(
      (restaurant, index, self) =>
        index === self.findIndex((r) => r.id === restaurant.id),
    );

    return uniqueRestaurants;
  }

  // Fetch restaurants within bounds and filtered by cuisine
  async findInBoundsWithCuisine(
    swLat: number,
    swLng: number,
    neLat: number,
    neLng: number,
    cuisineId: number,
  ) {
    // Calculate the center point to divide into quadrants
    const centerLat = (swLat + neLat) / 2;
    const centerLng = (swLng + neLng) / 2;

    // Define the 4 quadrants
    const quadrants = [
      // Southwest quadrant
      { swLat, swLng, neLat: centerLat, neLng: centerLng },
      // Southeast quadrant
      { swLat, swLng: centerLng, neLat: centerLat, neLng },
      // Northwest quadrant
      { swLat: centerLat, swLng, neLat, neLng: centerLng },
      // Northeast quadrant
      { swLat: centerLat, swLng: centerLng, neLat, neLng },
    ];

    // Fetch 10 restaurants from each quadrant with cuisine filter
    const restaurantPromises = quadrants.map((quadrant) =>
      this.db.restaurant.findMany({
        where: {
          latitude: {
            gte: quadrant.swLat,
            lte: quadrant.neLat,
          },
          longitude: {
            gte: quadrant.swLng,
            lte: quadrant.neLng,
          },
          restaurantCuisines: {
            some: {
              cuisineId,
            },
          },
        },
        take: 10, // Limit to 10 restaurants per quadrant
        orderBy: {
          rating: 'desc', // Order by rating descending to get best restaurants first
        },
        include: {
          restaurantCuisines: {
            include: {
              cuisine: true,
            },
          },
        },
      }),
    );

    // Wait for all quadrant queries to complete
    const quadrantResults = await Promise.all(restaurantPromises);

    // Flatten the results and remove duplicates (if any)
    const allRestaurants = quadrantResults.flat();
    const uniqueRestaurants = allRestaurants.filter(
      (restaurant, index, self) =>
        index === self.findIndex((r) => r.id === restaurant.id),
    );

    return uniqueRestaurants;
  }
}
