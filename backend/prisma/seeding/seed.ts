import * as fs from 'node:fs';
import * as argon2 from 'argon2';

import { PrismaClient } from '@prisma/client';
import { dietaryRequirements, appliances, cuisines } from './constants';
import { JsonRestaurantData } from './types';

const prisma = new PrismaClient();

interface RestaurantWithCuisines {
  trading_name: string;
  building_address: string;
  longitude: string;
  latitude: string;
  distanceFromCBD: number;
  cuisines: string[];
}

async function main(): Promise<void> {
  // If you need to reset the database first, run `npx prisma db reset`
  try {
    const defaultUserEmail = 'findingnibbles@gmail.com';
    const defaultUserPassword = '#FindingNibbles123';
    const hashedPassword = await argon2.hash(defaultUserPassword);

    const defaultUser = await prisma.user.create({
      data: {
        email: defaultUserEmail,
        passwordHash: hashedPassword,
        firstName: 'Team',
        lastName: 'FindingNibbles',
        isVerified: true,
        provider: 'local',
      },
    });

    // Check if we have pre-generated restaurant-cuisine data
    const preGeneratedDataPath = `${__dirname}/cuisine/restaurants_with_cuisines.json`;
    let usePreGeneratedData = false;
    let restaurantsWithCuisines: RestaurantWithCuisines[] = [];

    try {
      const fileContent = fs.readFileSync(preGeneratedDataPath, 'utf8');
      restaurantsWithCuisines = JSON.parse(
        fileContent,
      ) as RestaurantWithCuisines[];
      usePreGeneratedData = true;
      console.log(
        `✅ Found pre-generated cuisine data for ${restaurantsWithCuisines.length} restaurants`,
      );
    } catch {
      console.log(
        '⚠️  No pre-generated cuisine data found. Using basic restaurant data only.',
      );
      console.log(
        '💡 Run "npm run db:generate-cuisines" to generate cuisine assignments first.',
      );
    }

    interface RestaurantRecord {
      name: string;
      latitude: number;
      longitude: number;
      rating: number;
      userRatingsTotal: number;
      priceLevel: number;
      address: string;
    }

    let mappedRecords: RestaurantRecord[];

    if (usePreGeneratedData) {
      // Use pre-generated data with cuisines
      mappedRecords = restaurantsWithCuisines.map((r) => ({
        name: r.trading_name,
        latitude: parseFloat(r.latitude),
        longitude: parseFloat(r.longitude),
        rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
        userRatingsTotal: Math.floor(Math.random() * 500) + 1,
        priceLevel: Math.floor(Math.random() * 4) + 1,
        address: r.building_address,
      }));
    } else {
      // Fallback to basic restaurant data from JSON
      const processFile = (): JsonRestaurantData[] => {
        const fileContent = fs.readFileSync(
          `${__dirname}/cuisine/restaurants_cleaned.json`,
          'utf8',
        );
        const records: JsonRestaurantData[] = JSON.parse(
          fileContent,
        ) as JsonRestaurantData[];
        return records;
      };

      const records = processFile();
      mappedRecords = records
        .map((r: JsonRestaurantData) => ({
          name: r.trading_name,
          latitude: parseFloat(r.latitude),
          longitude: parseFloat(r.longitude),
          rating: Math.round((Math.random() * 1.5 + 3.5) * 10) / 10,
          userRatingsTotal: Math.floor(Math.random() * 500) + 1,
          priceLevel: Math.floor(Math.random() * 4) + 1,
          address: r.building_address,
        }))
        .filter(
          (r) =>
            !isNaN(r.latitude) &&
            !isNaN(r.longitude) &&
            r.latitude >= -90 &&
            r.latitude <= 90 &&
            r.longitude >= -180 &&
            r.longitude <= 180,
        );
    }

    console.log(`📍 Creating ${mappedRecords.length} restaurants...`);
    await prisma.restaurant.createMany({
      data: mappedRecords,
    });

    // Create all possible cuisines
    const cuisineMap = new Map<string, number>();
    console.log('🍽️  Creating cuisine types...');

    for (const cuisineData of cuisines) {
      const cuisine = await prisma.cuisine.create({
        data: {
          name: cuisineData.name,
          description: cuisineData.description,
        },
      });
      cuisineMap.set(cuisineData.name, cuisine.id);
    }

    // Create restaurant-cuisine relationships if we have pre-generated data
    if (usePreGeneratedData) {
      console.log('🔗 Creating restaurant-cuisine relationships...');

      const createdRestaurants = await prisma.restaurant.findMany({
        select: { id: true, name: true },
      });

      // Create a map for quick restaurant lookup
      const restaurantNameToId = new Map<string, number>();
      createdRestaurants.forEach((restaurant) => {
        restaurantNameToId.set(restaurant.name, restaurant.id);
      });

      let relationshipsCreated = 0;
      for (const restaurantData of restaurantsWithCuisines) {
        const restaurantId = restaurantNameToId.get(
          restaurantData.trading_name,
        );

        if (restaurantId) {
          for (const cuisineName of restaurantData.cuisines) {
            const cuisineId = cuisineMap.get(cuisineName);
            if (cuisineId) {
              await prisma.restaurantCuisine.create({
                data: {
                  restaurantId: restaurantId,
                  cuisineId: cuisineId,
                },
              });
              relationshipsCreated++;
            }
          }
        }
      }

      console.log(
        `✅ Created ${relationshipsCreated} restaurant-cuisine relationships`,
      );

      // Show cuisine distribution
      const cuisineCounts = restaurantsWithCuisines.reduce(
        (acc, restaurant) => {
          restaurant.cuisines.forEach((cuisine) => {
            acc[cuisine] = (acc[cuisine] || 0) + 1;
          });
          return acc;
        },
        {} as Record<string, number>,
      );

      console.log('📊 Top cuisine types:');
      Object.entries(cuisineCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .forEach(([cuisine, count]) => {
          console.log(`  ${cuisine}: ${count} restaurants`);
        });
    }

    await prisma.dietaryRequirement.createMany({
      data: dietaryRequirements.map((dietary) => ({
        name: dietary.name,
        description: dietary.description,
      })),
    });

    await prisma.appliance.createMany({
      data: appliances.map((appliance) => ({
        name: appliance.name,
      })),
    });

    const restaurantsSubset = await prisma.restaurant.findMany({
      select: { id: true },
      distinct: ['name'],
      take: 5,
    });

    await prisma.userFavouritedRestaurant.createMany({
      data: restaurantsSubset.map((restaurant) => ({
        userId: defaultUser.id,
        restaurantId: restaurant.id,
      })),
    });

    const appliancesSubset = await prisma.appliance.findMany({
      take: 3,
    });
    await prisma.userAppliance.createMany({
      data: appliancesSubset.map((appliance) => ({
        userId: defaultUser.id,
        applianceId: appliance.id,
      })),
    });
  } catch (error) {
    console.error('Error in seeding script:', error);
  }
}

main()
  .then(async () => {
    console.log('Seeding completed successfully');
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(
      'Error during seeding:',
      e instanceof Error ? e.message : String(e),
    );
    await prisma.$disconnect();
  });
