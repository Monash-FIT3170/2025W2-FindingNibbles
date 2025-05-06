// Add prisma seed script to package.json
// # Generate Prisma client
// npx prisma generate

// # Apply migrations(if needed)
// npx prisma migrate dev --name init

// # Run the seed script
// npx prisma db seed

// # See the data created
// npx prisma studio

import { PrismaClient } from '../../generated/prisma';
import { restaurants } from './seedConstants';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('Start seeding...');

  try {
    // First, collect and create all unique cuisines
    console.log('Creating cuisines...');
    const uniqueCuisines = new Set<string>();

    // Gather all unique cuisine names
    restaurants.forEach((restaurant) => {
      if (restaurant.cuisines && restaurant.cuisines.length > 0) {
        restaurant.cuisines.forEach((cuisine) => uniqueCuisines.add(cuisine));
      }
    });

    console.log(`Found ${uniqueCuisines.size} unique cuisines`);

    // Create cuisines in database and track their IDs
    const cuisineMap = new Map<string, number>();
    for (const cuisineName of uniqueCuisines) {
      const cuisine = await prisma.cuisine.upsert({
        where: { name: cuisineName },
        update: {}, // No updates needed if it exists
        create: { name: cuisineName },
      });
      cuisineMap.set(cuisineName, cuisine.id);
      console.log(`Created cuisine: ${cuisineName}`);
    }

    // Create restaurants
    console.log('Creating restaurants...');
    for (const restaurant of restaurants) {
      try {
        // Create or update the restaurant
        const createdRestaurant = await prisma.restaurant.upsert({
          where: { place_id: restaurant.place_id },
          update: {
            name: restaurant.name,
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
            businessStatus: restaurant.businessStatus,
            icon: restaurant.icon,
            rating: restaurant.rating,
            userRatingsTotal: restaurant.userRatingsTotal,
            priceLevel: restaurant.priceLevel,
            formattedAddress: restaurant.formattedAddress,
            formattedPhoneNum: restaurant.formattedPhoneNum,
            website: restaurant.website,
            hasDetails: true,
            // Clear existing relations
            restaurantCuisines: {
              deleteMany: {},
            },
            photos: {
              deleteMany: {},
            },
          },
          create: {
            place_id: restaurant.place_id,
            name: restaurant.name,
            latitude: restaurant.latitude,
            longitude: restaurant.longitude,
            businessStatus: restaurant.businessStatus,
            icon: restaurant.icon,
            rating: restaurant.rating,
            userRatingsTotal: restaurant.userRatingsTotal,
            priceLevel: restaurant.priceLevel,
            formattedAddress: restaurant.formattedAddress,
            formattedPhoneNum: restaurant.formattedPhoneNum,
            website: restaurant.website,
            hasDetails: true,
          },
          include: {
            restaurantCuisines: true,
            photos: true,
          },
        });

        // Add photos
        if (restaurant.photos && restaurant.photos.length > 0) {
          for (const photo of restaurant.photos) {
            await prisma.photo.create({
              data: {
                restaurantId: createdRestaurant.id,
                photoReference: photo.photoReference,
                height: photo.height,
                width: photo.width,
                htmlAttributions: photo.htmlAttributions,
              },
            });
          }
        }

        // Add cuisine relationships
        if (restaurant.cuisines && restaurant.cuisines.length > 0) {
          for (const cuisineName of restaurant.cuisines) {
            const cuisineId = cuisineMap.get(cuisineName);
            if (cuisineId) {
              await prisma.restaurantCuisine.create({
                data: {
                  restaurantId: createdRestaurant.id,
                  cuisineId: cuisineId,
                },
              });
            }
          }
        }

        console.log(`Created restaurant: ${restaurant.name}`);
      } catch (error) {
        // Properly type the error
        if (error instanceof Error) {
          console.error(
            `Error creating restaurant ${restaurant.name}: ${error.message}`,
          );
        } else {
          console.error(`Unknown error creating restaurant ${restaurant.name}`);
        }
      }
    }

    console.log('Seeding completed');
  } catch (error) {
    // Handle any errors in the main process
    if (error instanceof Error) {
      console.error(`Seeding error: ${error.message}`);
    } else {
      console.error('Unknown seeding error occurred');
    }
    throw error; // Re-throw to be caught by the outer catch
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
    process.exit(1);
  });
