# Gemini Cuisine Assignment

This system uses Google's Gemini AI model to intelligently assign cuisines to restaurants. The process is split into two parts:

1. **One-time generation**: `generate-cuisines.ts` - Uses Gemini API to create cuisine assignments
2. **Regular seeding**: `seed.ts` - Uses pre-generated data without API calls

## Architecture

### Two-Script Approach

**🎯 One-Time Generation (`generate-cuisines.ts`)**

- Runs once to create `restaurants_with_cuisines.json`
- Makes API calls to Gemini for intelligent cuisine assignment
- Should be run by data maintainers when updating restaurant data

**⚡ Fast Seeding (`seed.ts`)**

- Uses pre-generated JSON data (no API calls)
- Fast and reliable for development/testing
- Works offline and doesn't require API keys for regular developers

## Features

- **AI-Powered Assignment**: Uses Gemini 1.5 Flash to analyze restaurant names and addresses
- **Comprehensive Cuisine List**: 50+ cuisine types including regional, dietary, and cooking style categories
- **Smart Validation**: Ensures assigned cuisines are from the predefined list
- **Batch Processing**: Processes restaurants in batches to avoid API rate limits
- **Graceful Fallbacks**: Assigns "International" cuisine if AI fails
- **Pre-generated Data**: Eliminates API dependency for regular seeding

## Quick Start

### For Regular Development (No API Key Needed)

```bash
# Just run the regular seeding - uses pre-generated data
npm run db:seed
```

### For Data Generation (API Key Required)

```bash
# Set up environment variables first
GOOGLE_GEMINI_API_KEY=your_api_key_here
GOOGLE_GEMINI_API_MODEL=gemini-1.5-flash

# Generate cuisine assignments (one-time)
npm run db:generate-cuisines

# Then run regular seeding
npm run db:seed
```

## How It Works

### One-Time Generation Process

1. **Restaurant Processing**: Reads restaurant data from `restaurants_cleaned.json`
2. **Distance Calculation**: Calculates distance from Melbourne CBD (Flinders Street Station: -37.8176, 144.9668)
3. **Proximity Sorting**: Sorts restaurants by distance from CBD, prioritizing closest ones
4. **AI Assignment**: For the 100 closest restaurants to CBD:
   - Sends name and address to Gemini
   - Analyzes restaurant characteristics
   - Returns up to 3 most appropriate cuisines
   - Validates against predefined cuisine list
5. **Data Export**: Saves results to `restaurants_with_cuisines.json`

### Regular Seeding Process

1. **Check for Pre-generated Data**: Looks for `restaurants_with_cuisines.json`
2. **Smart Loading**: Uses pre-generated data if available, falls back to basic data if not
3. **Restaurant Creation**: Creates restaurants in database
4. **Cuisine Creation**: Creates all 50+ cuisine types
5. **Relationship Creation**: Links restaurants to their assigned cuisines (if data available)

## Generated Data Structure

The `restaurants_with_cuisines.json` file contains:

```json
[
  {
    "trading_name": "Taxi Kitchen",
    "building_address": "2 Swanston Street MELBOURNE 3000",
    "longitude": "144.96994164279200",
    "latitude": "-37.817777826050000",
    "distanceFromCBD": 0.15,
    "cuisines": ["Modern Australian", "Contemporary"]
  },
  {
    "trading_name": "Lucky Chans",
    "building_address": "Shop 30, Ground, 8 Whiteman Street SOUTHBANK 3006",
    "longitude": "144.9583356388194",
    "latitude": "-37.823161595550005",
    "distanceFromCBD": 1.2,
    "cuisines": ["Chinese", "Asian Fusion"]
  }
]
```

## File Structure

```
prisma/seeding/
├── seed.ts                          # Main seeding script (uses pre-generated data)
├── generate-cuisines.ts             # One-time cuisine generation script
├── restaurants_cleaned.json         # Original restaurant data
├── restaurants_with_cuisines.json   # Generated data with AI-assigned cuisines
├── constants.ts                     # Cuisine list and other constants
└── types.ts                        # TypeScript interfaces
```

## Cuisine Categories

The system includes:

- **Regional**: Italian, Chinese, Japanese, Indian, Mexican, etc.
- **Dietary**: Vegetarian, Vegan, Halal, Kosher
- **Style**: Fusion, Contemporary, Modern Australian
- **Specific**: Sushi, Ramen, Pizza, BBQ, Steakhouse
- **Establishment Type**: Cafe, Bakery, Fast Food

## Usage

Run the seeding script as usual:

```bash
npm run db:seed
```

The script will:

1. Create restaurants from JSON data
2. Set up all cuisine types
3. Use Gemini to assign appropriate cuisines
4. Display progress with detailed logging

## Example Output

```
Processing 100 restaurants closest to Melbourne CBD...
Closest restaurant: Taxi Kitchen (0.15km from CBD)
Furthest restaurant in selection: Collins Quarter (2.85km from CBD)
✓ Assigned cuisines to Taxi Kitchen (0.15km): Modern Australian, Contemporary
✓ Assigned cuisines to Transit Rooftop Bar (0.15km): Modern Australian, International
✓ Assigned cuisines to Lucky Chans (1.20km): Chinese, Asian Fusion
Completed batch 1/10
...
```

## Error Handling

- **API Failures**: Restaurant gets "International" cuisine as fallback
- **Rate Limiting**: Automatic delays and batch processing
- **Invalid Responses**: Validates AI responses against cuisine list
- **Network Issues**: Continues processing other restaurants

## Customization

To modify the cuisine assignment logic:

1. **Update Cuisine List**: Edit `cuisines` array in `constants.ts`
2. **Change Melbourne CBD Center**: Modify `MELBOURNE_CBD_LAT` and `MELBOURNE_CBD_LNG` constants
3. **Adjust Distance Radius**: Change the `.slice(0, 100)` parameter to process more/fewer restaurants
4. **Change Prompt**: Modify the prompt in `GeminiCuisineService.assignCuisines()`
5. **Adjust Batch Size**: Change `batchSize` variable in main function
6. **Distance Algorithm**: The `calculateDistance` function uses Haversine formula - can be replaced with other distance calculations

## Performance Notes

### One-Time Generation

- Processing 100 restaurants takes approximately 2-3 minutes
- Each API call costs ~0.000125 cents (Gemini 1.5 Flash pricing)
- Total cost for 100 restaurants: ~$0.0125
- Generates `restaurants_with_cuisines.json` (~15KB file)

### Regular Seeding

- ⚡ **Fast**: No API calls, uses pre-generated JSON
- 🔒 **Reliable**: Works offline, no API dependencies
- 💰 **Free**: No API costs for regular development
- 🚀 **Scalable**: Can handle thousands of restaurants instantly

## Team Workflow

### Data Maintainer (Once)

1. Set up Gemini API key
2. Run `npm run db:generate-cuisines`
3. Commit `restaurants_with_cuisines.json` to repository

### Regular Developers (Always)

1. Pull latest code (includes pre-generated data)
2. Run `npm run db:seed`
3. Get restaurants with AI-assigned cuisines instantly

## Benefits

✅ **Fast Development**: No API setup needed for most developers  
✅ **Offline Work**: Seeding works without internet  
✅ **Cost Effective**: One-time API usage instead of repeated calls  
✅ **Reliable**: No API rate limits or failures during development  
✅ **Version Controlled**: Cuisine assignments are tracked in git  
✅ **Consistent**: Everyone gets the same cuisine assignments
