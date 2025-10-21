import * as argon2 from 'argon2';
import * as fs from 'node:fs';

import { PrismaClient } from '@prisma/client';
import { appliances, cuisines, dietaryRequirements } from './constants';
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
      imageUrl: string;
    }

    // Function to get a random food/restaurant image from Unsplash
    const getRandomFoodImage = (): string => {
      const foodImageIds = [
        '1555939594-58d7cb561ad1', // burger
        '1504674900247-0877df9cc836', // restaurant interior
        '1414235077428-338989a2e8c0', // food spread
        '1517248135467-4c7edcad34c4', // restaurant
        '1565299624946-b28f40a0ae38', // pizza
        '1546069901-ba9599a7e63c', // food
        '1555396273-367ea4eb4db5', // restaurant table
        '1476224203421-9ac39bcb3327', // breakfast
        '1482049016688-2d3e1b311543', // coffee
        '1555507036-ab1f4038808a', // pasta
        '1540189549336-e6e99c3679fe', // salad
        '1565538810643-b5bdb714032a', // bbq
        '1547592180-85f173990554', // noodles
        '1567620905732-2d1ec7ab7445', // pancakes
        '1560624052-449f5ddf0c31', // steak
        '1565299585323-38d6b0865b47', // dessert
        '1559847844-5315695dadae', // drinks
        '1571091718767-18b5b1457add', // seafood
        '1533777324565-a040eb52facd', // ramen
        '1496412705862-e0088f16f791', // cafe
        '1590846406792-0adc7f938f1d', // indian food
        '1574894709920-11b28e7367e3', // steak dinner
        '1578474846511-04ba529f0b88', // mexican food
        '1559329007-40df8a9345d8', // chicken dish
        '1568901346375-23c9450c58cd', // burrito
        '1529042410759-befb1204b468', // curry
        '1555244162-803834f70033', // lobster
        '1506354666786-959d6d497f1a', // poke bowl
        '1499028344343-cd173ffc68a9', // soup
        '1563245372-f21724e3856d', // appetizers
        '1414235077428-338989a2e8c0', // charcuterie
        '1504674900247-0877df9cc836', // bistro
        '1517248135467-4c7edcad34c4', // upscale restaurant
        '1540189549336-e6e99c3679fe', // healthy bowl
        '1547573854-74d2a71d0826', // brunch
        '1565299507177-b0ac66763828', // Italian food
        '1504754524776-8f4f37790ca0', // cafe interior
        '1517433670267-08bbd4be890f', // wine and dine
        '1414235077428-338989a2e8c0', // food platter
      ];
      const randomId =
        foodImageIds[Math.floor(Math.random() * foodImageIds.length)];
      return `https://images.unsplash.com/photo-${randomId}?w=800&h=600&fit=crop`;
    };

    let mappedRecords: RestaurantRecord[];

    if (usePreGeneratedData) {
      // Use pre-generated data with cuisines
      mappedRecords = restaurantsWithCuisines.map((r) => ({
        name: r.trading_name,
        latitude: parseFloat(r.latitude),
        longitude: parseFloat(r.longitude),
        rating: Math.round((Math.random() * 3 + 2) * 10) / 10,
        userRatingsTotal: Math.floor(Math.random() * 500) + 1,
        priceLevel: Math.floor(Math.random() * 4) + 1,
        address: r.building_address,
        imageUrl: getRandomFoodImage(),
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
          rating: Math.round((Math.random() * 3 + 2) * 10) / 10,
          userRatingsTotal: Math.floor(Math.random() * 500) + 1,
          priceLevel: Math.floor(Math.random() * 4) + 1,
          address: r.building_address,
          imageUrl: getRandomFoodImage(),
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
