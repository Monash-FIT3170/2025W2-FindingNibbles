# Dependencies for Google Restaurant Scraping

The following packages need to be installed for web scraping functionality:

## Core Scraping Dependencies

```bash
# Puppeteer for browser automation
npm install puppeteer

# Type definitions
npm install @types/puppeteer --save-dev

# Alternative: Playwright (if preferred over Puppeteer)
# npm install playwright

# XPath utilities (if needed for complex XPath operations)
npm install xpath

# User agent rotation (to avoid detection)
npm install user-agents

# Request delay utilities (built into puppeteer, but useful for fine control)
npm install delay
```

## Alternative Approaches

### Option 1: Puppeteer (Recommended)

- Good balance of features and performance
- Handles JavaScript-heavy pages well
- Good documentation and community support

### Option 2: Playwright

- More modern, supports multiple browsers
- Better performance for some use cases
- Microsoft-backed

### Option 3: Cheerio + Axios (Lighter weight)

- Much faster, but won't work if Google requires JavaScript
- Good for simple HTML parsing
- Less likely to work with Google's dynamic content

## Installation Command

```bash
# Navigate to backend directory
cd backend

# Install the recommended dependencies
npm install puppeteer @types/puppeteer user-agents delay

# If you prefer Playwright instead
# npm install playwright
```

## Notes

- Puppeteer will automatically download Chromium (~170-200MB)
- Consider using `puppeteer-core` if you want to use your own Chrome installation
- For production deployment, you may need additional system dependencies for the browser
