import * as fs from 'node:fs';
import * as path from 'node:path';
import { JsonRestaurantData } from '../types';
import { GoogleScraper } from './scraping-implementation';

// Melbourne CBD coordinates (approximately Flinders Street Station)
const MELBOURNE_CBD_LAT = -37.8176;
const MELBOURNE_CBD_LNG = 144.9668;

// Interface for scraped restaurant data
export interface ScrapedRestaurantData extends JsonRestaurantData {
  distance_from_cbd: number;
  google_cuisine?: string;
  google_rating?: number;
  google_review_count?: number;
  google_price_level?: string;
  scraping_status: 'pending' | 'success' | 'failed' | 'not_found';
  scraping_error?: string;
  scraped_at?: string;
}

// Function to calculate distance between two points using Haversine formula
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLng = (lng2 - lng1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

// Function to load and sort restaurants by distance from Melbourne CBD
export function loadAndSortRestaurants(): ScrapedRestaurantData[] {
  console.log('Loading restaurants from restaurants_cleaned.json...');

  const restaurantsPath = path.join(
    __dirname,
    '..',
    'cuisine',
    'restaurants_cleaned.json',
  );
  const rawData = fs.readFileSync(restaurantsPath, 'utf-8');
  const restaurants: JsonRestaurantData[] = JSON.parse(
    rawData,
  ) as JsonRestaurantData[];

  console.log(`Loaded ${restaurants.length} restaurants`);

  // Calculate distance and sort
  const restaurantsWithDistance: ScrapedRestaurantData[] = restaurants.map(
    (restaurant) => {
      const distance = calculateDistance(
        MELBOURNE_CBD_LAT,
        MELBOURNE_CBD_LNG,
        parseFloat(restaurant.latitude),
        parseFloat(restaurant.longitude),
      );

      return {
        ...restaurant,
        distance_from_cbd: distance,
        scraping_status: 'pending' as const,
      };
    },
  );

  // Sort by distance (closest first)
  restaurantsWithDistance.sort(
    (a, b) => a.distance_from_cbd - b.distance_from_cbd,
  );

  console.log(
    `Restaurants sorted by distance. Closest: ${restaurantsWithDistance[0].trading_name} (${restaurantsWithDistance[0].distance_from_cbd.toFixed(2)}km)`,
  );
  console.log(
    `Furthest: ${restaurantsWithDistance[restaurantsWithDistance.length - 1].trading_name} (${restaurantsWithDistance[restaurantsWithDistance.length - 1].distance_from_cbd.toFixed(2)}km)`,
  );

  return restaurantsWithDistance;
}

// Class to handle Google search scraping
export class GoogleRestaurantScraper {
  private delayBetweenRequests: number;
  private maxRetries: number;
  private consecutiveNotFound: number = 0;
  private readonly MAX_CONSECUTIVE_NOT_FOUND = 10;
  private googleScraper: GoogleScraper;
  private uniqueCuisines: Set<string> = new Set();

  constructor(delayMs: number = 2000, maxRetries: number = 3) {
    this.delayBetweenRequests = delayMs;
    this.maxRetries = maxRetries;
    this.googleScraper = new GoogleScraper();
  }

  async initialize(): Promise<void> {
    await this.googleScraper.initialize();
  }

  async cleanup(): Promise<void> {
    await this.googleScraper.close();
  }

  // Get the list of unique cuisines found during scraping
  getUniqueCuisines(): string[] {
    return Array.from(this.uniqueCuisines).sort();
  }

  // Construct search query: restaurant name + address
  private constructSearchQuery(restaurant: JsonRestaurantData): string {
    // Format: "Restaurant Name Address"
    // Example: "Chin Chin 125 Flinders Ln, Melbourne VIC 3000"
    return `${restaurant.trading_name} ${restaurant.building_address}`;
  }

  // Scraping method using the GoogleScraper implementation
  private async scrapeRestaurantData(restaurant: JsonRestaurantData): Promise<{
    cuisine?: string;
    rating?: number;
    reviewCount?: number;
    priceLevel?: string;
  }> {
    console.log(`Scraping: ${restaurant.trading_name}`);

    return await this.googleScraper.scrapeRestaurant(restaurant);
  }

  // Main scraping method
  async scrapeRestaurants(
    restaurants: ScrapedRestaurantData[],
    startIndex: number = 0,
  ): Promise<ScrapedRestaurantData[]> {
    console.log(
      `Starting scraping from index ${startIndex} of ${restaurants.length} restaurants`,
    );

    for (let i = startIndex; i < restaurants.length; i++) {
      const restaurant = restaurants[i];

      if (restaurant.scraping_status !== 'pending') {
        console.log(`Skipping ${restaurant.trading_name} - already processed`);
        continue;
      }

      console.log(
        `[${i + 1}/${restaurants.length}] Processing: ${restaurant.trading_name}`,
      );

      try {
        const scrapedData = await this.scrapeRestaurantData(restaurant);

        if (
          scrapedData.cuisine === undefined &&
          scrapedData.rating === undefined &&
          scrapedData.reviewCount === undefined
        ) {
          // Restaurant not found on Google
          restaurant.scraping_status = 'not_found';
          restaurant.scraped_at = new Date().toISOString();
          this.consecutiveNotFound++;

          console.log(
            `⚠ Not found: ${restaurant.trading_name} (${this.consecutiveNotFound} consecutive not found)`,
          );

          // Stop if 10 consecutive restaurants not found
          if (this.consecutiveNotFound >= this.MAX_CONSECUTIVE_NOT_FOUND) {
            console.log(
              `\n🛑 STOPPING: ${this.MAX_CONSECUTIVE_NOT_FOUND} consecutive restaurants not found on Google.`,
            );
            console.log(
              'This might indicate an issue with the search strategy or Google blocking requests.',
            );
            break;
          }
        } else {
          // Found data - reset consecutive counter
          this.consecutiveNotFound = 0;

          restaurant.google_cuisine = scrapedData.cuisine || undefined;
          restaurant.google_rating = scrapedData.rating || undefined;
          restaurant.google_review_count = scrapedData.reviewCount || undefined;
          restaurant.google_price_level = scrapedData.priceLevel || undefined;
          restaurant.scraping_status = 'success';
          restaurant.scraped_at = new Date().toISOString();

          // Add cuisine to unique cuisines set if found
          if (scrapedData.cuisine) {
            this.uniqueCuisines.add(scrapedData.cuisine);
          }

          console.log(`✓ Success: ${restaurant.trading_name}`);
          console.log(
            `   Rating: ${scrapedData.rating || 'N/A'}, Reviews: ${scrapedData.reviewCount || 'N/A'}`,
          );
          console.log(
            `   Cuisine: ${scrapedData.cuisine || 'N/A'}, Price: ${scrapedData.priceLevel || 'N/A'}`,
          );
        }
      } catch (error) {
        // Reset consecutive counter on errors (different from not found)
        this.consecutiveNotFound = 0;

        restaurant.scraping_status = 'failed';
        restaurant.scraping_error =
          error instanceof Error ? error.message : 'Unknown error';
        restaurant.scraped_at = new Date().toISOString();

        console.log(
          `✗ Failed: ${restaurant.trading_name} - ${restaurant.scraping_error}`,
        );
      }

      // Save progress periodically (every 10 restaurants)
      if ((i + 1) % 10 === 0) {
        this.saveProgress(restaurants, i + 1);
      }

      // Delay between requests to avoid rate limiting
      if (i < restaurants.length - 1) {
        await this.delay(this.delayBetweenRequests);
      }
    }

    // Save final results
    this.saveProgress(restaurants, restaurants.length);

    return restaurants;
  }

  // Save progress to file
  private saveProgress(
    restaurants: ScrapedRestaurantData[],
    processedCount: number,
  ): void {
    const outputPath = path.join(
      __dirname,
      'scraped_restaurants_progress.json',
    );
    const progressData = {
      last_updated: new Date().toISOString(),
      processed_count: processedCount,
      total_count: restaurants.length,
      restaurants: restaurants,
    };

    fs.writeFileSync(outputPath, JSON.stringify(progressData, null, 2));
    console.log(
      `Progress saved: ${processedCount}/${restaurants.length} restaurants processed`,
    );
  }

  // Utility method for delays
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

// Main execution function
export async function main() {
  let scraper: GoogleRestaurantScraper | null = null;

  try {
    console.log('Starting Google restaurant scraping process...');

    // Load and sort restaurants
    const restaurants = loadAndSortRestaurants();

    // Initialize scraper
    scraper = new GoogleRestaurantScraper(2000, 3); // 2 second delay, 3 retries
    await scraper.initialize();
    console.log('Browser initialized successfully');

    // Check if we have existing progress
    const progressPath = path.join(
      __dirname,
      'scraped_restaurants_progress.json',
    );
    const startIndex = 0;

    if (fs.existsSync(progressPath)) {
      console.log(
        'Found existing progress file. Do you want to resume? (This will be implemented)',
      );
      // TODO: Implement resume logic
    }

    // Start scraping
    const results = await scraper.scrapeRestaurants(restaurants, startIndex);

    console.log('Scraping completed!');
    console.log(`Total restaurants: ${results.length}`);
    console.log(
      `Successful: ${results.filter((r) => r.scraping_status === 'success').length}`,
    );
    console.log(
      `Failed: ${results.filter((r) => r.scraping_status === 'failed').length}`,
    );
    console.log(
      `Not found: ${results.filter((r) => r.scraping_status === 'not_found').length}`,
    );

    // Print unique cuisines found
    const uniqueCuisines = scraper.getUniqueCuisines();
    console.log(`\nUnique cuisines found (${uniqueCuisines.length}):`);
    uniqueCuisines.forEach((cuisine, index) => {
      console.log(`${index + 1}. ${cuisine}`);
    });

    // Save unique cuisines to a separate file
    const cuisinesOutputPath = path.join(
      __dirname,
      'unique_cuisines_found.json',
    );
    const cuisinesData = {
      scraped_at: new Date().toISOString(),
      total_count: uniqueCuisines.length,
      cuisines: uniqueCuisines,
    };
    fs.writeFileSync(cuisinesOutputPath, JSON.stringify(cuisinesData, null, 2));
    console.log(`\nUnique cuisines saved to: ${cuisinesOutputPath}`);
  } catch (error) {
    console.error('Error in main execution:', error);
  } finally {
    // Always cleanup the browser
    if (scraper) {
      console.log('Cleaning up browser...');
      await scraper.cleanup();
    }
    console.log('Process completed');
  }
}

// Execute if run directly
if (require.main === module) {
  void main();
}
