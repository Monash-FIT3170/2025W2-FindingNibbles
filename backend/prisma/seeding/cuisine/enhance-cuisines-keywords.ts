import * as fs from 'node:fs';
import { guessRestaurantCuisine } from './generate-cuisines-resumable';
import { cuisines } from '../constants';

// Extract cuisine names from the CuisineData array for validation
const validCuisineNames = cuisines.map((cuisine) => cuisine.name);

interface RestaurantWithCuisines {
  trading_name: string;
  building_address: string;
  longitude: string;
  latitude: string;
  distanceFromCBD: number;
  cuisines: string[];
}

function enhanceCuisinesWithKeywords() {
  console.log(
    '🔍 Starting cuisine enhancement with keyword-based detection...',
  );

  const inputFile = './prisma/seeding/cuisine/restaurants_with_cuisines.json';
  const outputFile =
    './prisma/seeding/cuisine/restaurants_with_cuisines_enhanced.json';
  const backupFile =
    './prisma/seeding/cuisine/restaurants_with_cuisines_backup.json';

  // Check if input file exists
  if (!fs.existsSync(inputFile)) {
    console.error('❌ Error: restaurants_with_cuisines.json not found!');
    console.log('Please run the main cuisine generation script first.');
    return;
  }

  // Read existing data
  console.log('📖 Reading existing restaurants with cuisines...');
  const existingData = JSON.parse(
    fs.readFileSync(inputFile, 'utf-8'),
  ) as RestaurantWithCuisines[];

  console.log(`📊 Found ${existingData.length} restaurants to enhance`);

  // Create backup
  console.log('💾 Creating backup of existing data...');
  fs.writeFileSync(backupFile, JSON.stringify(existingData, null, 2));

  let enhancedCount = 0;
  let totalNewCuisines = 0;

  // Process each restaurant
  console.log('🔄 Processing restaurants...');
  const enhancedData = existingData.map((restaurant, index) => {
    if (index % 500 === 0) {
      console.log(
        `Processing restaurant ${index + 1}/${existingData.length}...`,
      );
    }

    // Get keyword-based cuisine suggestions
    const keywordCuisines = guessRestaurantCuisine(restaurant.trading_name);

    // Filter to only include valid cuisines that aren't already assigned
    const existingCuisines = restaurant.cuisines || [];
    const newCuisines = keywordCuisines.filter(
      (cuisine) =>
        validCuisineNames.includes(cuisine) &&
        !existingCuisines.includes(cuisine),
    );

    if (newCuisines.length > 0) {
      enhancedCount++;
      totalNewCuisines += newCuisines.length;

      // Log interesting enhancements for debugging
      if (newCuisines.length > 1 || index < 10) {
        console.log(`  📍 ${restaurant.trading_name}:`);
        console.log(`     Existing: [${existingCuisines.join(', ')}]`);
        console.log(`     Adding: [${newCuisines.join(', ')}]`);
      }
    }

    // Combine existing and new cuisines (existing first to preserve Gemini's priority)
    const combinedCuisines = [...existingCuisines, ...newCuisines];

    return {
      ...restaurant,
      cuisines: combinedCuisines,
    };
  });

  // Write enhanced data
  console.log('💾 Writing enhanced data...');
  fs.writeFileSync(outputFile, JSON.stringify(enhancedData, null, 2));

  // Statistics
  console.log('\n📈 Enhancement Statistics:');
  console.log(`✅ Total restaurants processed: ${existingData.length}`);
  console.log(`🔧 Restaurants enhanced: ${enhancedCount}`);
  console.log(`➕ Total new cuisines added: ${totalNewCuisines}`);
  console.log(
    `📊 Average new cuisines per enhanced restaurant: ${(totalNewCuisines / enhancedCount || 0).toFixed(2)}`,
  );

  // Show some examples of the most enhanced restaurants
  const mostEnhanced = enhancedData
    .map((restaurant, index) => ({
      ...restaurant,
      originalIndex: index,
      newCuisinesCount:
        restaurant.cuisines.length -
        (existingData[index]?.cuisines?.length || 0),
    }))
    .filter((r) => r.newCuisinesCount > 0)
    .sort((a, b) => b.newCuisinesCount - a.newCuisinesCount)
    .slice(0, 5);

  if (mostEnhanced.length > 0) {
    console.log('\n🏆 Top Enhanced Restaurants:');
    mostEnhanced.forEach((restaurant, i) => {
      console.log(
        `${i + 1}. ${restaurant.trading_name} (+${restaurant.newCuisinesCount} cuisines)`,
      );
      console.log(`   Final cuisines: [${restaurant.cuisines.join(', ')}]`);
    });
  }

  console.log(`\n✅ Enhancement complete!`);
  console.log(`📁 Enhanced data saved to: ${outputFile}`);
  console.log(`📁 Backup saved to: ${backupFile}`);
  console.log('\n💡 To use the enhanced data:');
  console.log('   1. Review the enhanced data file');
  console.log(
    '   2. If satisfied, replace restaurants_with_cuisines.json with the enhanced version',
  );
  console.log('   3. Run your normal seeding: npm run db:seed');
}

// Validation function to check cuisine assignments
function validateEnhancements() {
  console.log('🔍 Validating enhanced cuisines...');

  const enhancedFile =
    './prisma/seeding/cuisine/restaurants_with_cuisines_enhanced.json';

  if (!fs.existsSync(enhancedFile)) {
    console.error('❌ Enhanced file not found. Run enhancement first.');
    return;
  }

  const data = JSON.parse(
    fs.readFileSync(enhancedFile, 'utf-8'),
  ) as RestaurantWithCuisines[];

  const cuisineStats: { [key: string]: number } = {};
  let invalidCuisines = 0;

  data.forEach((restaurant) => {
    restaurant.cuisines.forEach((cuisine) => {
      if (validCuisineNames.includes(cuisine)) {
        cuisineStats[cuisine] = (cuisineStats[cuisine] || 0) + 1;
      } else {
        invalidCuisines++;
        console.log(
          `⚠️  Invalid cuisine "${cuisine}" found in ${restaurant.trading_name}`,
        );
      }
    });
  });

  console.log('\n📊 Cuisine Distribution (Top 10):');
  const sortedCuisines = Object.entries(cuisineStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  sortedCuisines.forEach(([cuisine, count], index) => {
    console.log(`${index + 1}. ${cuisine}: ${count} restaurants`);
  });

  console.log(`\n✅ Validation complete`);
  console.log(`📊 Total unique cuisines: ${Object.keys(cuisineStats).length}`);
  console.log(`❌ Invalid cuisines found: ${invalidCuisines}`);
}

// Main execution
function main() {
  const args = process.argv.slice(2);

  if (args.includes('--validate')) {
    validateEnhancements();
  } else {
    enhanceCuisinesWithKeywords();

    // Optionally run validation after enhancement
    if (args.includes('--with-validation')) {
      console.log('\n' + '='.repeat(50));
      validateEnhancements();
    }
  }
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

export { enhanceCuisinesWithKeywords, validateEnhancements };
