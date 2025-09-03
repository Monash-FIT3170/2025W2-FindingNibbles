/**
 * Conservative scraper that tries to avoid detection
 * by using very slow, human-like behavior
 */

import { loadAndSortRestaurants } from './google-restaurant-scraper';
import puppeteer from 'puppeteer';

interface BusinessInfo {
  rating?: number;
  reviews?: number;
  cuisine?: string;
}

interface ScrapingResult {
  restaurant: string;
  rating?: number;
  reviews?: number;
  cuisine?: string;
}

async function conservativeScraping() {
  console.log('🐌 Conservative Scraping Mode - Very Slow but Careful...\n');

  // Only test with closest 10 restaurants
  const allRestaurants = loadAndSortRestaurants();
  const testRestaurants = allRestaurants.slice(0, 10);

  console.log(`Testing with ${testRestaurants.length} closest restaurants:\n`);

  const browser = await puppeteer.launch({
    headless: false, // Keep browser visible
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Set realistic user agent
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  );

  const results: ScrapingResult[] = [];

  for (let i = 0; i < testRestaurants.length; i++) {
    const restaurant = testRestaurants[i];

    console.log(
      `\n[${i + 1}/${testRestaurants.length}] Processing: ${restaurant.trading_name}`,
    );

    try {
      const searchQuery = `${restaurant.trading_name} Melbourne restaurant`;
      const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

      console.log(`   Searching: ${searchQuery}`);

      // Navigate to Google
      await page.goto(googleUrl, { waitUntil: 'networkidle2', timeout: 30000 });

      // Wait 5-10 seconds like a human would
      const humanDelay = 5000 + Math.random() * 5000;
      console.log(`   Waiting ${Math.round(humanDelay / 1000)}s...`);
      await new Promise((resolve) => setTimeout(resolve, humanDelay));

      // Check for CAPTCHA
      const captcha = await page.$(
        '#captcha-form, .g-recaptcha, [src*="recaptcha"]',
      );
      if (captcha) {
        console.log('   ⚠️ CAPTCHA detected - stopping');
        break;
      }

      // Try to extract any business info
      const businessInfo: BusinessInfo = await page.evaluate(() => {
        const result: {
          rating?: number;
          reviews?: number;
          cuisine?: string;
        } = {};

        // Look for any rating patterns
        const elements = Array.from(document.querySelectorAll('*'));

        for (const el of elements) {
          const text = el.textContent?.trim() || '';

          // Look for ratings (1.0 to 5.0)
          if (/^\d\.\d$/.test(text)) {
            const rating = parseFloat(text);
            if (rating >= 1.0 && rating <= 5.0 && !result.rating) {
              result.rating = rating;
            }
          }

          // Look for review counts
          if (text.includes('review') && /\d+/.test(text)) {
            const match = text.match(/(\d+(?:,\d+)*)/);
            if (match && !result.reviews) {
              result.reviews = parseInt(match[1].replace(/,/g, ''));
            }
          }

          // Look for restaurant types
          if (
            (text.includes('restaurant') ||
              text.includes('bar') ||
              text.includes('cafe')) &&
            text.length < 50 &&
            !result.cuisine
          ) {
            result.cuisine = text;
          }
        }

        return result;
      });

      console.log(
        `   Found: Rating=${businessInfo.rating || 'N/A'}, Reviews=${businessInfo.reviews || 'N/A'}, Type=${businessInfo.cuisine || 'N/A'}`,
      );

      results.push({
        restaurant: restaurant.trading_name,
        ...businessInfo,
      });

      // Long delay between requests (30-60 seconds)
      if (i < testRestaurants.length - 1) {
        const longDelay = 30000 + Math.random() * 30000;
        console.log(
          `   Long delay: ${Math.round(longDelay / 1000)}s before next restaurant...`,
        );
        await new Promise((resolve) => setTimeout(resolve, longDelay));
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error}`);
    }
  }

  console.log('\n📊 Conservative Scraping Results:');
  console.log('=====================================');

  results.forEach((result, index) => {
    console.log(`${index + 1}. ${result.restaurant}`);
    console.log(`   Rating: ${result.rating || 'Not found'}`);
    console.log(`   Reviews: ${result.reviews || 'Not found'}`);
    console.log(`   Type: ${result.cuisine || 'Not found'}`);
    console.log('');
  });

  await browser.close();
}

if (require.main === module) {
  void conservativeScraping();
}
