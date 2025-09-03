import puppeteer, { Browser, Page } from 'puppeteer';
import { JsonRestaurantData } from '../types';

// Updated selectors based on actual Google search results
const SELECTORS = {
  rating: 'span.Aq14fc', // Rating number (e.g., "4.2")
  reviewCount: 'span[jscontroller="qjk5yc"] a span', // Review count text (e.g., "7,852 Google reviews")
  cuisine: 'span.E5BaQ', // Cuisine type (e.g., "Fast food restaurant")
  priceLevel: 'span.fontBodyMedium[aria-label*="Price"]', // Price level (e.g., "$", "$$", etc.)

  // Alternative selectors in case the main ones don't work
  alternativeRating: '[aria-label*="stars"]',
  alternativeReviews: '[aria-label*="reviews"]',
  alternativeCuisine: '[data-attrid="kc:/dining/cuisine"]',
};

export class GoogleScraper {
  private browser: Browser | null = null;
  private page: Page | null = null;

  async initialize(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: true, // Set to false for debugging
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
      ],
    });

    this.page = await this.browser.newPage();

    // Set a realistic user agent
    await this.page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    );

    // Set viewport
    await this.page.setViewport({ width: 1366, height: 768 });
  }

  async scrapeRestaurant(restaurant: JsonRestaurantData): Promise<{
    cuisine?: string;
    rating?: number;
    reviewCount?: number;
    priceLevel?: string;
  }> {
    if (!this.page) {
      throw new Error('Scraper not initialized. Call initialize() first.');
    }

    const searchQuery = `${restaurant.trading_name} ${restaurant.building_address}`;
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

    console.log(`Searching: ${searchQuery}`);

    try {
      // Navigate to Google search
      await this.page.goto(googleUrl, {
        waitUntil: 'networkidle2',
        timeout: 30000,
      });

      // Wait a bit for the page to fully load
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Extract data using the selectors
      const scrapedData = await this.page.evaluate((selectors) => {
        const result: {
          cuisine?: string;
          rating?: number;
          reviewCount?: number;
          priceLevel?: string;
        } = {};

        // Extract rating
        const ratingElement = document.querySelector(selectors.rating);
        if (ratingElement) {
          const ratingText = ratingElement.textContent?.trim();
          const ratingMatch = ratingText?.match(/(\d+\.?\d*)/);
          if (ratingMatch) {
            result.rating = parseFloat(ratingMatch[1]);
          }
        } else {
          // Try alternative rating selector
          const altRatingElement = document.querySelector(
            selectors.alternativeRating,
          );
          if (altRatingElement) {
            const ariaLabel = altRatingElement.getAttribute('aria-label');
            const ratingMatch = ariaLabel?.match(/(\d+\.?\d*)\s*stars?/i);
            if (ratingMatch) {
              result.rating = parseFloat(ratingMatch[1]);
            }
          }
        }

        // Extract review count
        const reviewElement = document.querySelector(selectors.reviewCount);
        if (reviewElement) {
          const reviewText = reviewElement.textContent?.trim();
          const reviewMatch = reviewText?.match(
            /(\d+(?:,\d+)*)\s*(?:Google\s+)?reviews?/i,
          );
          if (reviewMatch) {
            result.reviewCount = parseInt(reviewMatch[1].replace(/,/g, ''));
          }
        } else {
          // Try alternative review selector
          const altReviewElement = document.querySelector(
            selectors.alternativeReviews,
          );
          if (altReviewElement) {
            const ariaLabel = altReviewElement.getAttribute('aria-label');
            const reviewMatch = ariaLabel?.match(/(\d+(?:,\d+)*)\s*reviews?/i);
            if (reviewMatch) {
              result.reviewCount = parseInt(reviewMatch[1].replace(/,/g, ''));
            }
          }
        }

        // Extract cuisine
        const cuisineElement = document.querySelector(selectors.cuisine);
        if (cuisineElement) {
          result.cuisine = cuisineElement.textContent?.trim();
        } else {
          // Try alternative cuisine selector
          const altCuisineElement = document.querySelector(
            selectors.alternativeCuisine,
          );
          if (altCuisineElement) {
            result.cuisine = altCuisineElement.textContent?.trim();
          }
        }

        // Extract price level
        const priceLevelElement = document.querySelector(selectors.priceLevel);
        if (priceLevelElement) {
          const priceText = priceLevelElement.textContent?.trim();
          const priceMatch = priceText?.match(/(\$+)/);
          if (priceMatch) {
            result.priceLevel = priceMatch[1];
          }
        } else {
          // Try to find price symbols anywhere in the business info
          const priceElements = document.querySelectorAll('span');
          for (const element of priceElements) {
            const text = element.textContent?.trim();
            if (text && /^\$+$/.test(text) && text.length <= 4) {
              result.priceLevel = text;
              break;
            }
          }
        }

        return result;
      }, SELECTORS);

      return scrapedData;
    } catch (error) {
      console.error(`Error scraping ${restaurant.trading_name}:`, error);
      throw error;
    }
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }
}

// Alternative XPath-based extraction (removed - using CSS selectors instead)
// This function has been replaced with the improved CSS selector approach above
