# Google Restaurant Scraping

This module scrapes Google search results to get accurate restaurant data including:

- Cuisine type/category
- Rating (star rating)
- Number of reviews

## ✅ Implemented Features

1. **Distance Sorting**: Restaurants sorted by distance from Melbourne CBD (closest first)
2. **Search Strategy**: "Restaurant Name Address" format (e.g., "Chin Chin 125 Flinders Ln, Melbourne VIC 3000")
3. **Not Found Handling**: Prints warning and assigns null/undefined values for missing data
4. **Auto-Stop**: Stops processing if 10 consecutive restaurants aren't found on Google
5. **Progress Tracking**: Saves progress every 10 restaurants for resumable operation
6. **Error Handling**: Distinguishes between "not found" and "failed" attempts

## 🔧 Setup Required

### 1. Install Dependencies

```bash
cd backend
npm install puppeteer @types/puppeteer user-agents delay
```

### 2. Provide CSS Selectors or XPath

Update the `SELECTORS` object in `scraping-implementation.ts` with the correct selectors:

**Current placeholders (NEED TO BE UPDATED):**

```typescript
const SELECTORS = {
  rating: 'span.MW4etd', // Replace with correct selector
  reviewCount: 'span.UY7F9', // Replace with correct selector
  cuisine: 'span.YhemCb', // Replace with correct selector
};
```

**What I need from you:**

1. Go to Google and search for: "Chin Chin 125 Flinders Ln, Melbourne VIC 3000"
2. Right-click on the rating number → Inspect Element
3. Copy the CSS selector (e.g., `span.abc123`) or XPath
4. Do the same for review count and cuisine type
5. Give me these 3 selectors

## 📁 Files Structure

- `google-restaurant-scraper.ts` - Main orchestrator
- `scraping-implementation.ts` - Puppeteer scraping logic
- `test-scraper.ts` - Test with 3 restaurants before full run
- `scraped_restaurants_progress.json` - Auto-generated progress file

## 🚀 Usage

### Test First (Recommended)

```bash
# Test with 3 restaurants to verify selectors work
ts-node test-scraper.ts
```

### Full Run

```bash
# Process all restaurants
ts-node google-restaurant-scraper.ts
```

## 📊 Output

Each restaurant gets these additional fields:

- `distance_from_cbd`: Distance in km from Melbourne CBD
- `google_cuisine`: Cuisine from Google (or undefined)
- `google_rating`: Star rating (or undefined)
- `google_review_count`: Review count (or undefined)
- `scraping_status`: 'pending' | 'success' | 'failed' | 'not_found'
- `scraping_error`: Error message if failed
- `scraped_at`: Timestamp

## 🛑 Auto-Stop Behavior

- Prints "⚠ Not found" when restaurant not found on Google
- Stops after 10 consecutive "not found" restaurants
- Indicates potential issues with search strategy or IP blocking
