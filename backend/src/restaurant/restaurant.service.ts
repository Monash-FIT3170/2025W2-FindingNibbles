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

  // Fetch restaurants by name within bounds using quadrant system
  async findByNameInBounds(
    name: string,
    swLat: number,
    swLng: number,
    neLat: number,
    neLng: number,
  ) {
    // Calculate the center point to divide into quadrants
    const centerLat = (swLat + neLat) / 2;
    const centerLng = (swLng + neLng) / 2;

    // Define the 4 quadrants with clear boundaries
    const quadrants = [
      // Southwest quadrant (bottom-left)
      { swLat: swLat, swLng: swLng, neLat: centerLat, neLng: centerLng },
      // Southeast quadrant (bottom-right)
      { swLat: swLat, swLng: centerLng, neLat: centerLat, neLng: neLng },
      // Northwest quadrant (top-left)
      { swLat: centerLat, swLng: swLng, neLat: neLat, neLng: centerLng },
      // Northeast quadrant (top-right)
      { swLat: centerLat, swLng: centerLng, neLat: neLat, neLng: neLng },
    ];

    // Fetch exactly 10 restaurants from each quadrant that match the name exactly
    const restaurantPromises = quadrants.map(async (quadrant) => {
      const restaurants = await this.db.restaurant.findMany({
        where: {
          latitude: {
            gte: quadrant.swLat,
            lte: quadrant.neLat,
          },
          longitude: {
            gte: quadrant.swLng,
            lte: quadrant.neLng,
          },
          name: {
            startsWith: name, // Restaurant name starts with the search term
            mode: 'insensitive', // Case insensitive
          },
        },
        take: 10, // Strict limit of 10 per quadrant
        orderBy: {
          rating: 'desc',
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
      return restaurants;
    });

    // Wait for all quadrant queries to complete
    const quadrantResults = await Promise.all(restaurantPromises);

    // Flatten the results and remove any duplicates
    const allRestaurants = quadrantResults.flat();
    const uniqueRestaurants = allRestaurants.filter(
      (restaurant, index, self) =>
        index === self.findIndex((r) => r.id === restaurant.id),
    );

    // Return maximum of 40 restaurants (10 per quadrant)
    return uniqueRestaurants.slice(0, 40);
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

    // Define the 4 quadrants with clear boundaries
    const quadrants = [
      // Southwest quadrant (bottom-left)
      { swLat: swLat, swLng: swLng, neLat: centerLat, neLng: centerLng },
      // Southeast quadrant (bottom-right)
      { swLat: swLat, swLng: centerLng, neLat: centerLat, neLng: neLng },
      // Northwest quadrant (top-left)
      { swLat: centerLat, swLng: swLng, neLat: neLat, neLng: centerLng },
      // Northeast quadrant (top-right)
      { swLat: centerLat, swLng: centerLng, neLat: neLat, neLng: neLng },
    ];

    // Fetch exactly 10 restaurants from each quadrant
    const restaurantPromises = quadrants.map(async (quadrant) => {
      const restaurants = await this.db.restaurant.findMany({
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
        take: 10, // Strict limit of 10 per quadrant
        orderBy: {
          rating: 'desc',
        },
        include: {
          restaurantCuisines: {
            include: {
              cuisine: true,
            },
          },
        },
      });
      return restaurants;
    });

    // Wait for all quadrant queries to complete
    const quadrantResults = await Promise.all(restaurantPromises);

    // Flatten the results and remove any duplicates
    const allRestaurants = quadrantResults.flat();
    const uniqueRestaurants = allRestaurants.filter(
      (restaurant, index, self) =>
        index === self.findIndex((r) => r.id === restaurant.id),
    );

    // Return maximum of 40 restaurants (10 per quadrant)
    return uniqueRestaurants.slice(0, 40);
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

    // Define the 4 quadrants with clear boundaries
    const quadrants = [
      // Southwest quadrant (bottom-left)
      { 
        swLat: swLat, 
        swLng: swLng, 
        neLat: centerLat, 
        neLng: centerLng 
      },
      // Southeast quadrant (bottom-right)
      { 
        swLat: swLat, 
        swLng: centerLng, 
        neLat: centerLat, 
        neLng: neLng 
      },
      // Northwest quadrant (top-left)
      { 
        swLat: centerLat, 
        swLng: swLng, 
        neLat: neLat, 
        neLng: centerLng 
      },
      // Northeast quadrant (top-right)
      { 
        swLat: centerLat, 
        swLng: centerLng, 
        neLat: neLat, 
        neLng: neLng 
      },
    ];

    // Fetch exactly 10 restaurants from each quadrant with cuisine filter
    const restaurantPromises = quadrants.map(async (quadrant) => {
      const restaurants = await this.db.restaurant.findMany({
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
              cuisineId: cuisineId,
            },
          },
        },
        take: 10, // Strict limit of 10 per quadrant
        orderBy: {
          rating: 'desc',
        },
        include: {
          restaurantCuisines: {
            include: {
              cuisine: true,
            },
          },
        },
      });
      return restaurants;
    });

    // Wait for all quadrant queries to complete
    const quadrantResults = await Promise.all(restaurantPromises);

    // Flatten the results and remove any duplicates
    const allRestaurants = quadrantResults.flat();
    const uniqueRestaurants = allRestaurants.filter(
      (restaurant, index, self) =>
        index === self.findIndex((r) => r.id === restaurant.id),
    );

    // Return maximum of 40 restaurants (10 per quadrant)
    return uniqueRestaurants.slice(0, 40);
  }
}
