import { PrismaClient } from 'prisma/generated';
import { restaurants, dietaryRequirements, appliances } from './seedConstants';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.log('Start seeding...');

  try {
    // Create default user
    console.log('Creating default user...');
    const defaultUserEmail = 'findingnibbles@gmail.com';
    const defaultUserPassword = '#FindingNibbles123'; // Replace with a secure password
    const hashedPassword = await argon2.hash(defaultUserPassword); // Hash the password

    const defaultUser = await prisma.user.upsert({
      where: { email: defaultUserEmail },
      update: {}, // No updates needed if the user already exists
      create: {
        email: defaultUserEmail,
        passwordHash: hashedPassword,
        firstName: 'Team',
        lastName: 'FindingNibbles',
        isVerified: true, // Mark the user as verified
        provider: 'local', // Add the required provider field
      },
    });

    console.log(`Default user created: ${defaultUser.email}`);
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

    console.log('Adding random favorite restaurants for the default user...');
    const allRestaurants = await prisma.restaurant.findMany();
    if (allRestaurants.length >= 5) {
      const randomRestaurants = allRestaurants
        .sort(() => 0.5 - Math.random()) // Shuffle the array
        .slice(0, 5); // Take the first 5

      for (const restaurant of randomRestaurants) {
        await prisma.userFavouritedRestaurant.upsert({
          where: {
            userId_restaurantId: {
              userId: defaultUser.id,
              restaurantId: restaurant.id,
            },
          },
          update: {}, // No update needed if it exists
          create: {
            userId: defaultUser.id,
            restaurantId: restaurant.id,
          },
        });
        console.log(`Added favorite restaurant: ${restaurant.name}`);
      }
    } else {
      console.warn('Not enough restaurants to add 5 favorites.');
    }

    // create dietary Requirements
    console.log('Creating dietary Requirements...');
    for (const dietary of dietaryRequirements) {
      await prisma.dietaryRequirement.upsert({
        where: { name: dietary.name },
        update: {}, // No updates needed if it exists
        create: {
          name: dietary.name,
          description: dietary.description,
        },
      });
      console.log(`Created dietary Requirement: ${dietary.name}`);
    }

    // Create appliances
    console.log('Creating appliances...');
    for (const appliance of appliances) {
      await prisma.appliance.upsert({
        where: {
          id:
            (
              await prisma.appliance.findFirst({
                where: { name: appliance.name },
              })
            )?.id || 0,
        },
        update: {}, // No updates needed if it exists
        create: {
          name: appliance.name,
        },
      });
      console.log(`Created appliance: ${appliance.name}`);
    }

    // Add random appliances to default user
    console.log('Adding random appliances for the default user...');
    const allAppliances = await prisma.appliance.findMany();
    if (allAppliances.length >= 3) {
      const randomAppliances = allAppliances
        .sort(() => 0.5 - Math.random()) // Shuffle the array
        .slice(0, 3); // Take 3 random appliances

      for (const appliance of randomAppliances) {
        await prisma.userAppliance.upsert({
          where: {
            userId_applianceId: {
              userId: defaultUser.id,
              applianceId: appliance.id,
            },
          },
          update: {}, // No update needed if it exists
          create: {
            userId: defaultUser.id,
            applianceId: appliance.id,
          },
        });
        console.log(`Added appliance to user: ${appliance.name}`);
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
  });
