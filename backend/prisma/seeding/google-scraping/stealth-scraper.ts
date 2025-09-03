import puppeteer from 'puppeteer';
import type { Browser, Page } from 'puppeteer';
import { JsonRestaurantData } from '../types';

// Updated selectors with stealth techniques
const SELECTORS = {
  rating: 'span.Aq14fc',
  reviewCount: 'span[jscontroller="qjk5yc"] a span',
  cuisine: 'span.E5BaQ',
  priceLevel: 'span.fontBodyMedium[aria-label*="Price"]',

  // Alternative selectors to try
  alternativeRating:
    '[data-attrid="kc:/collection/knowledge_panels/local_reviewable:star_score"] span',
  alternativeReviews:
    '[data-attrid="kc:/collection/knowledge_panels/local_reviewable:review_count"]',
  alternativeCuisine: '[data-attrid="kc:/dining/cuisine"]',
};

export class StealthScraper {
  private browser: Browser | null = null;
  private page: Page | null = null;

  async initialize(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: true, // Use standard headless mode
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--window-size=1366,768',
        '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
      ],
    });

    this.page = await this.browser.newPage();

    // Set more realistic viewport and user agent
    await this.page.setViewport({
      width: 1366,
      height: 768,
      deviceScaleFactor: 1,
    });

    // Set headers to look more like a real browser
    await this.page.setExtraHTTPHeaders({
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate',
      Connection: 'keep-alive',
      'Upgrade-Insecure-Requests': '1',
    });

    // Override navigator properties to avoid detection
    await this.page.evaluateOnNewDocument(() => {
      // Override the navigator.webdriver property
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined,
      });

      // Override the navigator.plugins property
      Object.defineProperty(navigator, 'plugins', {
        get: () => [1, 2, 3, 4, 5],
      });

      // Override the navigator.languages property
      Object.defineProperty(navigator, 'languages', {
        get: () => ['en-US', 'en'],
      });
    });
  }

  async scrapeRestaurant(restaurant: JsonRestaurantData): Promise<{
    cuisine?: string;
    rating?: number;
    reviewCount?: number;
    priceLevel?: string;
  }> {
    if (!this.page) {
      throw new Error('Scraper not initialized');
    }

    const searchQuery = `${restaurant.trading_name} ${restaurant.building_address}`;
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`;

    try {
      // Add random delay before navigation
      await this.randomDelay(1000, 3000);

      // Navigate with random timeout
      await this.page.goto(googleUrl, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Random delay after page load
      await this.randomDelay(2000, 4000);

      // Print the page HTML for debugging
      const pageContent = await this.page.content();
      console.log('--- PAGE HTML START ---');
      console.log(pageContent.substring(0, 2000)); // Print first 2000 chars
      console.log('--- PAGE HTML END ---');

      // Check for CAPTCHA
      const captchaExists = await this.page.$(
        '#captcha-form, .g-recaptcha, [src*="recaptcha"]',
      );
      if (captchaExists) {
        console.log('⚠️ CAPTCHA detected - skipping this restaurant');
        return {};
      }

      // Extract data with multiple fallback strategies
      const data = await this.page.evaluate((selectors) => {
        const result: {
          cuisine?: string;
          rating?: number;
          reviewCount?: number;
          priceLevel?: string;
        } = {};

        // Helper function to try multiple selectors
        function trySelectors(selectorList: string[]): string | null {
          for (const selector of selectorList) {
            const element = document.querySelector(selector);
            if (element) {
              console.log(
                'Selector matched:',
                selector,
                'Value:',
                element.textContent?.trim(),
              );
              return element.textContent?.trim() || null;
            }
          }
          return null;
        }

        // Try to find rating
        const ratingSelectors = [
          selectors.rating,
          selectors.alternativeRating,
          'span[aria-label*="star"]',
          'span[aria-label*="rating"]',
          '[data-value]', // Some Google ratings use data-value
        ];

        const ratingText = trySelectors(ratingSelectors);
        if (ratingText) {
          const ratingMatch = ratingText.match(/(\d+\.?\d*)/);
          if (ratingMatch) {
            const rating = parseFloat(ratingMatch[1]);
            if (rating >= 1 && rating <= 5) {
              result.rating = rating;
            }
          }
        }

        // Try to find review count
        const reviewSelectors = [
          selectors.reviewCount,
          selectors.alternativeReviews,
          '[aria-label*="review"]',
          'a[href*="reviews"]',
        ];

        const reviewText = trySelectors(reviewSelectors);
        if (reviewText) {
          const reviewMatch = reviewText.match(
            /(\d+(?:,\d+)*)\s*(?:Google\s+)?reviews?/i,
          );
          if (reviewMatch) {
            result.reviewCount = parseInt(reviewMatch[1].replace(/,/g, ''));
          }
        }

        // Try to find cuisine
        const cuisineSelectors = [
          selectors.cuisine,
          selectors.alternativeCuisine,
          '[data-attrid*="cuisine"]',
          'span:contains("restaurant")',
          'span:contains("bar")',
          'span:contains("cafe")',
        ];

        const cuisineText = trySelectors(cuisineSelectors);
        if (cuisineText) {
          result.cuisine = cuisineText;
        }

        // Try to find price level
        const priceSelectors = [
          selectors.priceLevel,
          '[aria-label*="price"]',
          'span[aria-label*="$"]',
        ];

        const priceText = trySelectors(priceSelectors);
        if (priceText) {
          const priceMatch = priceText.match(/(\$+)/);
          if (priceMatch) {
            result.priceLevel = priceMatch[1];
          }
        }

        return result;
      }, SELECTORS);

      return data;
    } catch (error) {
      if (error instanceof Error && error.message.includes('timeout')) {
        console.log('⏱️ Timeout - Google might be blocking requests');
      }
      throw error;
    }
  }

  private async randomDelay(min: number, max: number): Promise<void> {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }
}

// Example list of user agents for rotation
export const USER_AGENTS = [
  // Chrome (Windows)
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  // Chrome (Mac)
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  // Firefox (Windows)
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:118.0) Gecko/20100101 Firefox/118.0',
  // Firefox (Mac)
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:118.0) Gecko/20100101 Firefox/118.0',
  // Edge (Windows)
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
  // Safari (Mac)
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.1 Safari/605.1.15',
];
