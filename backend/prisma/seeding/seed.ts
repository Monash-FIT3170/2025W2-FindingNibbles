import * as fs from 'node:fs';
import * as argon2 from 'argon2';
import { parse } from 'csv-parse';

import { PrismaClient } from '@prisma/client';
import { dietaryRequirements, appliances } from './constants';
import { CsvRestaurantData } from './types';

const prisma = new PrismaClient();

/**
 * Creates cuisine objects in the database from the cuisine data
 * @param cuisineData Array of cuisine objects with name and description
 * @returns Map of cuisine names to their database IDs
 */

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

    const processFile = async (): Promise<CsvRestaurantData[]> => {
      const records: CsvRestaurantData[] = [];
      const parser = fs.createReadStream(`${__dirname}/restaurants.csv`).pipe(
        parse({
          columns: true,
          skip_empty_lines: true,
          skip_records_with_empty_values: true,
        }),
      );
      for await (const record of parser) {
        records.push(record as CsvRestaurantData);
      }
      return records;
    };

    const records = await processFile();
    const mappedRecords = records
      .map((r: CsvRestaurantData) => ({
        name: r.trading_name,
        latitude: parseFloat(r.latitude),
        longitude: parseFloat(r.longitude),
        rating: Math.round((Math.random() * 4 + 1) * 10) / 10,
        userRatingsTotal: Math.floor(Math.random() * 500) + 1,
        priceLevel: Math.floor(Math.random() * 4) + 1,
        address: r.business_address,
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

    await prisma.restaurant.createMany({
      data: mappedRecords,
    });

    // ADD CUISINE CODE HERE. FIND RESTAURANTS WITHIN 10KM OF MELBOURNE CBD
    // AND FETCH CUISINES FOR THEM FROM GEMINI MODEL

    const cuisineMap = new Map<string, number>([
      ['japanese', 0],
      ['italian', 0],
      ['french', 0],
      ['chinese', 0],
      ['australian', 0],
      ['singaporean', 0],
      ['middle-eastern', 0],
    ]);

    for (const cuisineName of cuisineMap.keys()) {
      const cuisine = await prisma.cuisine.create({
        data: { name: cuisineName },
      });
      cuisineMap.set(cuisineName, cuisine.id);
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
