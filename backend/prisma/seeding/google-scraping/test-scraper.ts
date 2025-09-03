/**
 * Test script for Google Restaurant Scraper
 *
 * This script tests the scraper with a small subset of restaurants
 * to verify the selectors and implementation work correctly before
 * running on the full dataset.
 */

import {
  loadAndSortRestaurants,
  GoogleRestaurantScraper,
} from './google-restaurant-scraper';

async function testScraper() {
  console.log('🧪 Testing Google Restaurant Scraper...\n');

  let scraper: GoogleRestaurantScraper | null = null;

  try {
    // Load restaurants
    console.log('Loading restaurants...');
    const allRestaurants = loadAndSortRestaurants();

    // Test with just the first restaurant
    const testRestaurants = allRestaurants.slice(4, 5);
    console.log(`Testing with ${testRestaurants.length} restaurant:\n`);

    testRestaurants.forEach((restaurant, index) => {
      console.log(`${index + 1}. ${restaurant.trading_name}`);
      console.log(`   Address: ${restaurant.building_address}`);
      console.log(
        `   Distance: ${restaurant.distance_from_cbd.toFixed(2)}km from CBD\n`,
      );
    });

    // Initialize scraper
    console.log('Initializing browser...');
    scraper = new GoogleRestaurantScraper(3000, 2); // 3 second delay for testing
    await scraper.initialize();
    console.log('✓ Browser initialized\n');

    // Test scraping
    console.log('Starting test scraping...\n');
    const results = await scraper.scrapeRestaurants(testRestaurants, 0);

    // Display results
    console.log('\n📊 Test Results:');
    console.log('==================');

    results.forEach((restaurant, index) => {
      console.log(`\n${index + 1}. ${restaurant.trading_name}`);
      console.log(`   Status: ${restaurant.scraping_status}`);

      if (restaurant.scraping_status === 'success') {
        console.log(`   Cuisine: ${restaurant.google_cuisine || 'Not found'}`);
        console.log(`   Rating: ${restaurant.google_rating || 'Not found'}`);
        console.log(
          `   Reviews: ${restaurant.google_review_count || 'Not found'}`,
        );
        console.log(
          `   Price Level: ${restaurant.google_price_level || 'Not found'}`,
        );
      } else if (restaurant.scraping_status === 'failed') {
        console.log(`   Error: ${restaurant.scraping_error}`);
      }
    });

    // Show unique cuisines found
    const uniqueCuisines = scraper.getUniqueCuisines();
    if (uniqueCuisines.length > 0) {
      console.log(`\n🍽️ Unique Cuisines Found (${uniqueCuisines.length}):`);
      uniqueCuisines.forEach((cuisine, index) => {
        console.log(`   ${index + 1}. ${cuisine}`);
      });
    }

    // Summary
    console.log('\n📈 Summary:');
    console.log(`Total tested: ${results.length}`);
    console.log(
      `Successful: ${results.filter((r) => r.scraping_status === 'success').length}`,
    );
    console.log(
      `Failed: ${results.filter((r) => r.scraping_status === 'failed').length}`,
    );
    console.log(
      `Not found: ${results.filter((r) => r.scraping_status === 'not_found').length}`,
    );
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    if (scraper) {
      console.log('\nCleaning up...');
      await scraper.cleanup();
    }
    console.log('✅ Test completed');
  }
}

// Run the test
if (require.main === module) {
  void testScraper();
}
