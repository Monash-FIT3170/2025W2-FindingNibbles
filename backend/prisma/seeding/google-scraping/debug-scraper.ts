/**
 * Debug version of the scraper to help diagnose selector issues
 */

import { loadAndSortRestaurants } from './google-restaurant-scraper';
import puppeteer from 'puppeteer';

async function debugSingleRestaurant() {
  console.log('🔍 Debug Mode: Testing Google selectors...\n');

  // Load one restaurant for testing
  const allRestaurants = loadAndSortRestaurants();
  const testRestaurant = allRestaurants[0]; // First restaurant

  console.log(`Testing with: ${testRestaurant.trading_name}`);
  console.log(`Address: ${testRestaurant.building_address}\n`);

  const browser = await puppeteer.launch({
    headless: false, // Show browser for debugging
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Set realistic user agent
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  );

  try {
    const searchQuery = `${testRestaurant.trading_name} ${testRestaurant.building_address}`;
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

    console.log(`🔍 Searching: ${searchQuery}`);
    console.log(`📍 URL: ${googleUrl}\n`);

    // Navigate to Google
    await page.goto(googleUrl, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for page to load
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log('🌐 Page loaded. Checking for elements...\n');

    // Test all our selectors
    const selectors = {
      rating: 'span.Aq14fc',
      reviewCount: 'span[jscontroller="qjk5yc"] a span',
      cuisine: 'span.E5BaQ',
      priceLevel: 'span.fontBodyMedium[aria-label*="Price"]',
    };

    for (const [name, selector] of Object.entries(selectors)) {
      try {
        const element = await page.$(selector);
        if (element) {
          const text = await page.evaluate(
            (el) => el?.textContent || '',
            element,
          );
          console.log(`✅ ${name}: "${text}" (selector: ${selector})`);
        } else {
          console.log(`❌ ${name}: Not found (selector: ${selector})`);
        }
      } catch (error) {
        console.log(`❌ ${name}: Error - ${error}`);
      }
    }

    console.log('\n🔍 Looking for alternative rating patterns...');

    // Look for any span with numbers that could be ratings
    const allSpans = await page.$$eval('span', (spans) => {
      return spans
        .map((span, index) => ({
          index,
          text: span.textContent?.trim() || '',
          className: span.className,
          ariaLabel: span.getAttribute('aria-label') || '',
        }))
        .filter((span) => {
          const text = span.text;
          // Look for rating patterns like "4.2", "3.5", etc.
          return (
            /^\d+\.\d+$/.test(text) &&
            parseFloat(text) >= 1 &&
            parseFloat(text) <= 5
          );
        });
    });

    console.log('Potential ratings found:');
    allSpans.forEach((span) => {
      console.log(
        `  - "${span.text}" (class: "${span.className}", aria: "${span.ariaLabel}")`,
      );
    });

    console.log('\n🔍 Looking for review count patterns...');

    // Look for review patterns
    const reviewElements = await page.$$eval('span, a', (elements) => {
      return elements
        .map((el) => ({
          text: el.textContent?.trim() || '',
          tagName: el.tagName,
          className: el.className,
        }))
        .filter((el) => {
          const text = el.text.toLowerCase();
          return text.includes('review') && /\d+/.test(text);
        });
    });

    console.log('Potential review counts found:');
    reviewElements.forEach((el) => {
      console.log(`  - "${el.text}" (${el.tagName}, class: "${el.className}")`);
    });

    console.log('\n🔍 Looking for cuisine/restaurant type patterns...');

    // Look for cuisine patterns
    const cuisineElements = await page.$$eval('span, div', (elements) => {
      return elements
        .map((el) => ({
          text: el.textContent?.trim() || '',
          className: el.className,
        }))
        .filter((el) => {
          const text = el.text.toLowerCase();
          return (
            text.includes('restaurant') ||
            text.includes('cafe') ||
            text.includes('bar') ||
            text.includes('food') ||
            text.includes('cuisine')
          );
        });
    });

    console.log('Potential cuisine types found:');
    cuisineElements.slice(0, 10).forEach((el) => {
      // Show first 10 to avoid spam
      console.log(`  - "${el.text}" (class: "${el.className}")`);
    });

    console.log('\n💡 Manual inspection needed:');
    console.log('1. Look at the browser window that opened');
    console.log('2. Right-click on the rating, review count, and cuisine');
    console.log('3. Select "Inspect Element"');
    console.log('4. Copy the exact selectors and share them');
    console.log('\nPress Ctrl+C to close when done inspecting...');

    // Keep browser open for manual inspection
    await new Promise(() => {}); // Wait indefinitely
  } catch (error) {
    console.error('❌ Error during debug:', error);
  } finally {
    await browser.close();
  }
}

// Run the debug
if (require.main === module) {
  void debugSingleRestaurant();
}
