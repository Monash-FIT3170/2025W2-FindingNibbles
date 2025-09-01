import * as fs from 'node:fs';
import { PrismaClient } from '@prisma/client';
import { cuisines } from '../constants';
import { JsonRestaurantData } from '../types';

const prisma = new PrismaClient();

// Extract cuisine names from the CuisineData array
const cuisineNames = cuisines.map((cuisine) => cuisine.name);

// Melbourne CBD coordinates (approximately Flinders Street Station)
const MELBOURNE_CBD_LAT = -37.8176;
const MELBOURNE_CBD_LNG = 144.9668;

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

// Function to intelligently guess cuisine based on restaurant name
export function guessRestaurantCuisine(restaurantName: string): string[] {
  const name = restaurantName.toLowerCase();

  // Define patterns for different cuisines with comprehensive keywords
  const patterns = [
    // Regional/National Cuisines
    {
      keywords: [
        'italian',
        'pizza',
        'pizzeria',
        'pasta',
        'trattoria',
        'osteria',
        'ristorante',
        'il',
        'la',
        'andiamo',
        'romano',
        'milano',
        'napoli',
        'gnocchi',
        'risotto',
        'gelato',
        'antipasti',
        'bruschetta',
        'carbonara',
        'bolognese',
      ],
      cuisine: 'Italian',
    },
    {
      keywords: [
        'chinese',
        'dim sum',
        'wok',
        'noodle',
        'dumpling',
        'kim sing',
        'beijing',
        'shanghai',
        'canton',
        'szechuan',
        'sichuan',
        'chow mein',
        'fried rice',
        'spring roll',
        'peking',
        'mandarin',
        'golden dragon',
        'phoenix',
        'jade',
        'orient',
      ],
      cuisine: 'Chinese',
    },
    {
      keywords: [
        'japanese',
        'sushi',
        'ramen',
        'yakitori',
        'izakaya',
        'teppanyaki',
        'tempura',
        'edo',
        'tokyo',
        'osaka',
        'sake',
        'miso',
        'teriyaki',
        'katsu',
        'udon',
        'soba',
        'bento',
        'wasabi',
        'ninja',
        'samurai',
      ],
      cuisine: 'Japanese',
    },
    {
      keywords: [
        'mexican',
        'taco',
        'burrito',
        'cantina',
        'salsa',
        'nacho',
        'quesadilla',
        'enchilada',
        'fajita',
        'churro',
        'mariachi',
        'amigo',
        'fiesta',
        'aztec',
        'maya',
        'guadalajara',
        'el',
        'la casa',
      ],
      cuisine: 'Mexican',
    },
    {
      keywords: [
        'indian',
        'curry',
        'tandoor',
        'biryani',
        'masala',
        'tikka',
        'naan',
        'samosa',
        'vindaloo',
        'dal',
        'chutney',
        'bombay',
        'delhi',
        'mumbai',
        'bengal',
        'punjabi',
        'spice',
        'raja',
        'maharaja',
        'gandhi',
      ],
      cuisine: 'Indian',
    },
    {
      keywords: [
        'thai',
        'pad',
        'tom yum',
        'green curry',
        'red curry',
        'bangkok',
        'phuket',
        'satay',
        'som tam',
        'larb',
        'mango sticky',
        'thai basil',
        'lemongrass',
        'galangal',
        'coconut',
        'siam',
        'royal thai',
      ],
      cuisine: 'Thai',
    },
    {
      keywords: [
        'french',
        'bistro',
        'brasserie',
        'galette',
        'cassolette',
        'liaison',
        'petit',
        'le',
        'chez',
        'paris',
        'lyon',
        'marseille',
        'provence',
        'croissant',
        'baguette',
        'escargot',
        'foie gras',
        'bordeaux',
        'champagne',
      ],
      cuisine: 'French',
    },
    {
      keywords: [
        'greek',
        'gyros',
        'souvlaki',
        'taverna',
        'moussaka',
        'tzatziki',
        'feta',
        'olive',
        'ouzo',
        'santorini',
        'athens',
        'sparta',
        'zeus',
        'apollo',
        'mediterranean',
        'baklava',
        'dolmades',
      ],
      cuisine: 'Greek',
    },
    {
      keywords: [
        'korean',
        'kimchi',
        'bulgogi',
        'bibimbap',
        'galbi',
        'banchan',
        'seoul',
        'gangnam',
        'gochujang',
        'ssam',
        'korean bbq',
        'k-town',
        'han',
        'jung',
        'kim',
        'park',
      ],
      cuisine: 'Korean',
    },
    {
      keywords: [
        'vietnamese',
        'pho',
        'banh',
        'bun',
        'spring roll',
        'saigon',
        'hanoi',
        'vietnam',
        'nuoc mam',
        'lemongrass',
        'fresh herbs',
        'rice paper',
        'vermicelli',
        'mekong',
      ],
      cuisine: 'Vietnamese',
    },
    {
      keywords: [
        'spanish',
        'tapas',
        'paella',
        'churro',
        'gazpacho',
        'sangria',
        'jamon',
        'barcelona',
        'madrid',
        'sevilla',
        'andalucia',
        'flamenco',
        'iberico',
        'rioja',
        'valencia',
      ],
      cuisine: 'Spanish',
    },
    {
      keywords: [
        'lebanese',
        'hummus',
        'falafel',
        'tabbouleh',
        'kebab',
        'shawarma',
        'mezze',
        'baklava',
        'beirut',
        'cedar',
        'fattoush',
        'kibbeh',
        'manakish',
        'tahini',
      ],
      cuisine: 'Lebanese',
    },
    {
      keywords: [
        'turkish',
        'kebab',
        'doner',
        'baklava',
        'turkish delight',
        'istanbul',
        'ankara',
        'ottoman',
        'bosphorus',
        'meze',
        'pide',
        'lahmacun',
        'kofte',
        'ayran',
      ],
      cuisine: 'Turkish',
    },
    {
      keywords: [
        'american',
        'burger',
        'barbecue',
        'bbq',
        'ranch',
        'texas',
        'california',
        'new york',
        'chicago',
        'southern',
        'cajun',
        'creole',
        'soul food',
        'diner',
        'grill',
        'smokehouse',
      ],
      cuisine: 'American',
    },
    {
      keywords: [
        'brazilian',
        'churrasco',
        'feijoada',
        'caipirinha',
        'acai',
        'rio',
        'sao paulo',
        'copacabana',
        'carnival',
        'pao de acucar',
        'guarana',
        'brigadeiro',
      ],
      cuisine: 'Brazilian',
    },
    {
      keywords: [
        'moroccan',
        'tagine',
        'couscous',
        'marrakech',
        'casablanca',
        'morocco',
        'harissa',
        'mint tea',
        'preserved lemon',
        'ras el hanout',
        'medina',
        'kasbah',
      ],
      cuisine: 'Moroccan',
    },
    {
      keywords: [
        'ethiopian',
        'injera',
        'berbere',
        'doro wat',
        'addis ababa',
        'ethiopia',
        'coffee ceremony',
        'tej',
        'awaze',
      ],
      cuisine: 'Ethiopian',
    },
    {
      keywords: [
        'persian',
        'kebab',
        'saffron',
        'basmati',
        'tahdig',
        'iran',
        'tehran',
        'isfahan',
        'rosewater',
        'pomegranate',
        'fesenjan',
        'ghormeh sabzi',
      ],
      cuisine: 'Persian',
    },
    {
      keywords: [
        'russian',
        'borscht',
        'vodka',
        'caviar',
        'blini',
        'moscow',
        'st petersburg',
        'siberian',
        'stroganoff',
        'pelmeni',
        'pierogi',
      ],
      cuisine: 'Russian',
    },
    {
      keywords: [
        'german',
        'bratwurst',
        'sauerkraut',
        'beer',
        'pretzel',
        'schnitzel',
        'berlin',
        'munich',
        'bavaria',
        'oktoberfest',
        'weisswurst',
        'currywurst',
      ],
      cuisine: 'German',
    },
    {
      keywords: [
        'british',
        'fish and chips',
        'bangers and mash',
        'shepherd pie',
        'cornish pasty',
        'london',
        'manchester',
        'english',
        'pub',
        'ale',
        'yorkshire',
        'haggis',
      ],
      cuisine: 'British',
    },
    {
      keywords: [
        'argentinian',
        'empanada',
        'asado',
        'malbec',
        'buenos aires',
        'tango',
        'gaucho',
        'parrilla',
        'chimichurri',
        'dulce de leche',
      ],
      cuisine: 'Argentinian',
    },
    {
      keywords: [
        'peruvian',
        'ceviche',
        'pisco',
        'lima',
        'quinoa',
        'aji',
        'anticucho',
        'causa',
        'inca',
        'machu picchu',
        'alpaca',
      ],
      cuisine: 'Peruvian',
    },
    {
      keywords: [
        'malaysian',
        'rendang',
        'satay',
        'laksa',
        'kuala lumpur',
        'penang',
        'malaysia',
        'coconut milk',
        'lemongrass',
        'pandan',
        'char kway teow',
      ],
      cuisine: 'Malaysian',
    },
    {
      keywords: [
        'indonesian',
        'nasi goreng',
        'gado gado',
        'jakarta',
        'bali',
        'indonesia',
        'sambal',
        'tempeh',
        'gudeg',
        'martabak',
      ],
      cuisine: 'Indonesian',
    },
    {
      keywords: [
        'african',
        'jollof',
        'injera',
        'tagine',
        'africa',
        'safari',
        'ubuntu',
        'ghana',
        'nigeria',
        'senegal',
        'fufu',
        'plantain',
      ],
      cuisine: 'African',
    },
    {
      keywords: [
        'caribbean',
        'jerk',
        'reggae',
        'jamaica',
        'cuba',
        'haiti',
        'dominican',
        'rum',
        'plantain',
        'mango',
        'coconut',
        'callaloo',
        'roti',
      ],
      cuisine: 'Caribbean',
    },
    {
      keywords: [
        'nepalese',
        'momo',
        'dal bhat',
        'nepal',
        'kathmandu',
        'everest',
        'himalayan',
        'sherpa',
        'yak',
        'gundruk',
      ],
      cuisine: 'Nepalese',
    },
    {
      keywords: [
        'pakistani',
        'karahi',
        'lahore',
        'karachi',
        'islamabad',
        'pakistan',
        'chapati',
        'haleem',
        'seekh kebab',
        'lassi',
      ],
      cuisine: 'Pakistani',
    },
    {
      keywords: [
        'sri lankan',
        'kottu',
        'hoppers',
        'colombo',
        'sri lanka',
        'ceylon',
        'curry leaves',
        'coconut sambol',
        'pol roti',
      ],
      cuisine: 'Sri Lankan',
    },
    {
      keywords: [
        'burmese',
        'mohinga',
        'tea leaf salad',
        'myanmar',
        'burma',
        'yangon',
        'mandalay',
        'shan noodles',
      ],
      cuisine: 'Burmese',
    },
    {
      keywords: [
        'cambodian',
        'amok',
        'khmer',
        'cambodia',
        'phnom penh',
        'angkor',
        'fish sauce',
        'lemongrass',
      ],
      cuisine: 'Cambodian',
    },
    {
      keywords: [
        'laotian',
        'larb',
        'sticky rice',
        'laos',
        'vientiane',
        'papaya salad',
        'jeow',
        'mekong',
      ],
      cuisine: 'Laotian',
    },
    {
      keywords: [
        'filipino',
        'adobo',
        'lumpia',
        'philippines',
        'manila',
        'cebu',
        'lechon',
        'pancit',
        'halo halo',
        'balut',
      ],
      cuisine: 'Filipino',
    },
    {
      keywords: [
        'polish',
        'pierogi',
        'kielbasa',
        'poland',
        'warsaw',
        'krakow',
        'golumpki',
        'bigos',
        'zurek',
      ],
      cuisine: 'Polish',
    },
    {
      keywords: [
        'hungarian',
        'goulash',
        'paprika',
        'hungary',
        'budapest',
        'langos',
        'schnitzel',
        'tokaj',
      ],
      cuisine: 'Hungarian',
    },
    {
      keywords: [
        'czech',
        'goulash',
        'knedliky',
        'prague',
        'pilsner',
        'bohemia',
        'svickova',
        'trdelnik',
      ],
      cuisine: 'Czech',
    },
    {
      keywords: [
        'scandinavian',
        'nordic',
        'meatball',
        'lutefisk',
        'gravlax',
        'pickled herring',
        'smorgasbord',
        'aquavit',
        'hygge',
      ],
      cuisine: 'Scandinavian',
    },
    {
      keywords: [
        'ukrainian',
        'borscht',
        'varenyky',
        'ukraine',
        'kiev',
        'odessa',
        'salo',
        'holodets',
      ],
      cuisine: 'Ukrainian',
    },
    {
      keywords: [
        'irish',
        'shepherd pie',
        'corned beef',
        'dublin',
        'guinness',
        'potato',
        'colcannon',
        'soda bread',
      ],
      cuisine: 'Irish',
    },
    {
      keywords: [
        'scottish',
        'haggis',
        'whisky',
        'shortbread',
        'scotland',
        'glasgow',
        'edinburgh',
        'highland',
      ],
      cuisine: 'Scottish',
    },
    {
      keywords: [
        'portuguese',
        'bacalhau',
        'pasteis de nata',
        'portugal',
        'lisbon',
        'porto',
        'francesinha',
        'vinho verde',
      ],
      cuisine: 'Portuguese',
    },
    {
      keywords: [
        'belgian',
        'waffle',
        'chocolate',
        'belgium',
        'brussels',
        'bruges',
        'frites',
        'beer',
        'moules',
      ],
      cuisine: 'Belgian',
    },
    {
      keywords: [
        'dutch',
        'stroopwafel',
        'cheese',
        'netherlands',
        'amsterdam',
        'gouda',
        'herring',
        'bitterballen',
      ],
      cuisine: 'Dutch',
    },
    {
      keywords: [
        'swiss',
        'fondue',
        'raclette',
        'switzerland',
        'zurich',
        'geneva',
        'matterhorn',
        'chocolate',
        'rosti',
      ],
      cuisine: 'Swiss',
    },
    {
      keywords: [
        'austrian',
        'schnitzel',
        'strudel',
        'austria',
        'vienna',
        'salzburg',
        'sachertorte',
        'alpine',
      ],
      cuisine: 'Austrian',
    },
    {
      keywords: [
        'nordic',
        'scandinavian',
        'foraging',
        'fermented',
        'pickled',
        'dill',
        'juniper',
        'birch',
        'reindeer',
      ],
      cuisine: 'Nordic',
    },
    // Style-based Cuisines
    {
      keywords: [
        'fusion',
        'contemporary',
        'modern',
        'innovative',
        'creative',
        'experimental',
        'crossover',
        'eclectic',
        'global',
        'international',
      ],
      cuisine: 'Fusion',
    },
    {
      keywords: [
        'mediterranean',
        'olive oil',
        'fresh herbs',
        'grilled',
        'aegean',
        'adriatic',
        'coastal',
        'seaside',
      ],
      cuisine: 'Mediterranean',
    },
    {
      keywords: [
        'middle eastern',
        'mezze',
        'shawarma',
        'falafel',
        'hummus',
        'pita',
        'olive',
        'tahini',
        'harissa',
      ],
      cuisine: 'Middle Eastern',
    },
    {
      keywords: [
        'latin american',
        'latino',
        'latina',
        'ceviche',
        'empanada',
        'arepa',
        'plantain',
        'yuca',
        'sofrito',
      ],
      cuisine: 'Latin American',
    },
    {
      keywords: [
        'asian',
        'orient',
        'oriental',
        'far east',
        'east asian',
        'southeast asian',
        'rice',
        'noodles',
        'wok',
      ],
      cuisine: 'Asian',
    },
    {
      keywords: [
        'european',
        'continental',
        'euro',
        'old world',
        'classic',
        'traditional',
      ],
      cuisine: 'European',
    },
    // Dietary Cuisines
    {
      keywords: [
        'vegetarian',
        'veggie',
        'plant based',
        'meat free',
        'green',
        'garden',
        'herbivore',
      ],
      cuisine: 'Vegetarian',
    },
    {
      keywords: [
        'vegan',
        'plant based',
        'dairy free',
        'no meat',
        'compassionate',
        'cruelty free',
      ],
      cuisine: 'Vegan',
    },
    {
      keywords: ['gluten free', 'celiac', 'wheat free', 'gf', 'allergen free'],
      cuisine: 'Gluten-Free',
    },
    {
      keywords: [
        'healthy',
        'nutrition',
        'wellness',
        'fit',
        'light',
        'clean eating',
        'superfood',
        'wholesome',
      ],
      cuisine: 'Healthy',
    },
    {
      keywords: [
        'organic',
        'sustainable',
        'farm to table',
        'local',
        'natural',
        'pesticide free',
      ],
      cuisine: 'Organic',
    },
    {
      keywords: [
        'raw food',
        'raw',
        'living food',
        'uncooked',
        'enzyme',
        'sprouted',
      ],
      cuisine: 'Raw Food',
    },
    {
      keywords: [
        'paleo',
        'paleolithic',
        'primal',
        'caveman',
        'ancestral',
        'grain free',
      ],
      cuisine: 'Paleo',
    },
    {
      keywords: ['keto', 'ketogenic', 'low carb', 'high fat', 'lchf', 'atkins'],
      cuisine: 'Keto',
    },
    // Service Style Cuisines
    {
      keywords: [
        'street food',
        'food truck',
        'hawker',
        'vendor',
        'mobile',
        'cart',
        'stall',
        'pop up',
      ],
      cuisine: 'Street Food',
    },
    {
      keywords: [
        'fast food',
        'quick service',
        'drive thru',
        'takeaway',
        'chain',
        'franchise',
        'instant',
        'rapid',
        'mcdonald',
        'kfc',
        'burger king',
        'subway',
        'domino',
        'pizza hut',
        'taco bell',
      ],
      cuisine: 'Fast Food',
    },
    {
      keywords: [
        'comfort food',
        'home style',
        'hearty',
        'soul food',
        'nostalgic',
        'classic',
        'traditional',
        'mom',
        'grandma',
      ],
      cuisine: 'Comfort Food',
    },
    {
      keywords: [
        'gourmet',
        'artisan',
        'premium',
        'specialty',
        'craft',
        'boutique',
        'curated',
        'refined',
      ],
      cuisine: 'Gourmet',
    },
    {
      keywords: [
        'fine dining',
        'upscale',
        'elegant',
        'sophisticated',
        'luxury',
        'haute cuisine',
        'michelin',
        'chef',
        'tasting menu',
      ],
      cuisine: 'Fine Dining',
    },
    {
      keywords: [
        'barbecue',
        'bbq',
        'smokehouse',
        'pit',
        'ribs',
        'brisket',
        'pulled pork',
        'smoked',
        'grilled',
      ],
      cuisine: 'Barbecue',
    },
    // Specific Food Types
    {
      keywords: [
        'seafood',
        'fish',
        'shellfish',
        'oyster',
        'crab',
        'lobster',
        'shrimp',
        'salmon',
        'tuna',
        'sea',
        'ocean',
        'marine',
        'catch',
        'wharf',
        'pier',
      ],
      cuisine: 'Seafood',
    },
    {
      keywords: [
        'steakhouse',
        'steak',
        'beef',
        'ribeye',
        'filet',
        'sirloin',
        'wagyu',
        'angus',
        'prime',
        'cut',
        'grill',
        'char',
      ],
      cuisine: 'Steakhouse',
    },
    {
      keywords: [
        'sandwich',
        'sub',
        'hoagie',
        'hero',
        'panini',
        'club',
        'wrap',
        'deli',
        'between bread',
      ],
      cuisine: 'Sandwich',
    },
    {
      keywords: [
        'pizza',
        'pizzeria',
        'pie',
        'slice',
        'margherita',
        'pepperoni',
        'wood fired',
        'brick oven',
        'neapolitan',
        'chicago deep dish',
      ],
      cuisine: 'Pizza',
    },
    {
      keywords: [
        'burger',
        'hamburger',
        'cheeseburger',
        'patty',
        'bun',
        'whopper',
        'big mac',
        'quarter pounder',
        'sliders',
      ],
      cuisine: 'Burger',
    },
    {
      keywords: [
        'taco',
        'tacos',
        'taqueria',
        'tortilla',
        'carnitas',
        'al pastor',
        'fish taco',
        'soft shell',
        'hard shell',
      ],
      cuisine: 'Taco',
    },
    {
      keywords: [
        'sushi',
        'sashimi',
        'nigiri',
        'maki',
        'roll',
        'california roll',
        'salmon roll',
        'tuna roll',
        'wasabi',
        'ginger',
      ],
      cuisine: 'Sushi',
    },
    {
      keywords: [
        'ramen',
        'tonkotsu',
        'miso',
        'shoyu',
        'shio',
        'noodle soup',
        'broth',
        'chashu',
        'naruto',
      ],
      cuisine: 'Ramen',
    },
    {
      keywords: [
        'pasta',
        'spaghetti',
        'linguine',
        'fettuccine',
        'penne',
        'ravioli',
        'lasagna',
        'carbonara',
        'alfredo',
        'marinara',
      ],
      cuisine: 'Pasta',
    },
    {
      keywords: [
        'salad',
        'greens',
        'lettuce',
        'caesar',
        'garden',
        'fresh',
        'mixed greens',
        'vinaigrette',
        'dressing',
      ],
      cuisine: 'Salad',
    },
    {
      keywords: [
        'soup',
        'broth',
        'bisque',
        'chowder',
        'minestrone',
        'gazpacho',
        'tomato soup',
        'chicken soup',
        'hot soup',
      ],
      cuisine: 'Soup',
    },
    {
      keywords: [
        'dessert',
        'sweet',
        'cake',
        'pastry',
        'pie',
        'tart',
        'pudding',
        'mousse',
        'tiramisu',
        'cheesecake',
      ],
      cuisine: 'Dessert',
    },
    {
      keywords: [
        'ice cream',
        'gelato',
        'sorbet',
        'frozen yogurt',
        'sundae',
        'cone',
        'scoop',
        'flavor',
        'cold',
      ],
      cuisine: 'Ice Cream',
    },
    {
      keywords: [
        'bakery',
        'bread',
        'pastry',
        'croissant',
        'muffin',
        'bagel',
        'baguette',
        'sourdough',
        'artisan bread',
        'fresh baked',
      ],
      cuisine: 'Bakery',
    },
    // Beverages and Establishments
    {
      keywords: [
        'cafe',
        'coffee',
        'espresso',
        'cappuccino',
        'latte',
        'macchiato',
        'americano',
        'roasters',
        'beans',
        'grind',
      ],
      cuisine: 'Cafe',
    },
    {
      keywords: [
        'coffee',
        'espresso',
        'cappuccino',
        'latte',
        'americano',
        'roasters',
        'beans',
        'brew',
        'barista',
        'caffeine',
      ],
      cuisine: 'Coffee',
    },
    {
      keywords: [
        'tea',
        'chai',
        'matcha',
        'oolong',
        'green tea',
        'black tea',
        'herbal tea',
        'tea house',
        'ceremony',
        'steep',
      ],
      cuisine: 'Tea',
    },
    {
      keywords: [
        'juice bar',
        'fresh juice',
        'smoothie',
        'pressed',
        'cold pressed',
        'detox',
        'cleanse',
        'fruit',
        'vegetable juice',
      ],
      cuisine: 'Juice Bar',
    },
    {
      keywords: [
        'smoothie',
        'blend',
        'protein shake',
        'acai bowl',
        'fruit smoothie',
        'green smoothie',
        'thick shake',
      ],
      cuisine: 'Smoothie',
    },
    {
      keywords: [
        'bubble tea',
        'boba',
        'pearl tea',
        'milk tea',
        'tapioca',
        'taiwanese',
        'tea with pearls',
      ],
      cuisine: 'Bubble Tea',
    },
    {
      keywords: [
        'wine bar',
        'vino',
        'cellar',
        'vintage',
        'sommelier',
        'tasting',
        'vineyard',
        'grape',
        'bottle',
      ],
      cuisine: 'Wine Bar',
    },
    {
      keywords: [
        'cocktail',
        'mixology',
        'martini',
        'manhattan',
        'mojito',
        'margarita',
        'whiskey',
        'gin',
        'vodka',
        'rum',
      ],
      cuisine: 'Cocktail',
    },
    {
      keywords: [
        'brewery',
        'beer',
        'ale',
        'lager',
        'ipa',
        'stout',
        'porter',
        'craft beer',
        'tap',
        'hops',
      ],
      cuisine: 'Brewery',
    },
    // Dining Styles
    {
      keywords: [
        'buffet',
        'all you can eat',
        'smorgasbord',
        'self service',
        'unlimited',
        'variety',
        'selection',
      ],
      cuisine: 'Buffet',
    },
    {
      keywords: [
        'brunch',
        'breakfast and lunch',
        'eggs benedict',
        'pancakes',
        'waffles',
        'mimosa',
        'bloody mary',
        'weekend',
      ],
      cuisine: 'Brunch',
    },
    {
      keywords: [
        'breakfast',
        'morning',
        'eggs',
        'bacon',
        'pancakes',
        'cereal',
        'toast',
        'omelette',
        'early bird',
      ],
      cuisine: 'Breakfast',
    },
    {
      keywords: [
        'diner',
        'american diner',
        'classic diner',
        'retro',
        'vintage',
        'chrome',
        'booth',
        'counter',
      ],
      cuisine: 'Diner',
    },
    {
      keywords: [
        'food truck',
        'mobile',
        'truck',
        'van',
        'cart',
        'street vendor',
        'wheels',
        'on the go',
      ],
      cuisine: 'Food Truck',
    },
    {
      keywords: [
        'catering',
        'event catering',
        'party food',
        'wedding',
        'corporate',
        'large group',
        'delivery',
      ],
      cuisine: 'Catering',
    },
    // Small Plates
    {
      keywords: [
        'tapas',
        'small plates',
        'sharing',
        'spanish tapas',
        'pintxos',
        'appetizers',
        'bar food',
      ],
      cuisine: 'Tapas',
    },
    {
      keywords: [
        'dim sum',
        'yum cha',
        'dumplings',
        'har gow',
        'siu mai',
        'char siu bao',
        'tea service',
      ],
      cuisine: 'Dim Sum',
    },
    {
      keywords: [
        'mezze',
        'meze',
        'small dishes',
        'sharing plates',
        'appetizers',
        'middle eastern',
        'greek mezze',
      ],
      cuisine: 'Mezze',
    },
    {
      keywords: [
        'antipasti',
        'antipasto',
        'italian appetizers',
        'charcuterie',
        'olives',
        'cheese board',
        'starter',
      ],
      cuisine: 'Antipasti',
    },
    // Regional Australian
    {
      keywords: [
        'australian',
        'aussie',
        'modern australian',
        'contemporary australian',
        'bush tucker',
        'kangaroo',
        'barramundi',
        'lamington',
        'pavlova',
        'meat pie',
        'vegemite',
        'tim tam',
        'anzac',
        'damper',
        'melbourne',
        'sydney',
        'brisbane',
        'perth',
        'adelaide',
        'darwin',
        'tasmania',
        'outback',
      ],
      cuisine: 'Australian',
    },
  ];

  // Check for multiple matches to return diverse cuisines
  const matchedCuisines: string[] = [];

  for (const pattern of patterns) {
    if (pattern.keywords.some((keyword) => name.includes(keyword))) {
      matchedCuisines.push(pattern.cuisine);
    }
  }

  // If we found matches, return them (up to 3)
  if (matchedCuisines.length > 0) {
    return matchedCuisines.slice(0, 3);
  }

  // Enhanced fallback logic - try to avoid "International" when possible
  if (name.includes('restaurant') || name.includes('dining')) {
    return ['Gourmet'];
  }
  if (name.includes('bar') && !name.includes('coffee')) {
    return ['Australian'];
  }
  if (name.includes('food') || name.includes('kitchen')) {
    return ['Australian'];
  }
  if (name.includes('juice') || name.includes('fresh')) {
    return ['Healthy'];
  }

  // Last resort - but use cuisines from our approved list
  return ['Cafe'];
}

// Gemini service for cuisine assignment
class GeminiCuisineService {
  private apiKey: string;

  constructor() {
    this.apiKey = process.env.GOOGLE_GEMINI_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('GOOGLE_GEMINI_API_KEY environment variable is required');
    }
  }

  async assignCuisines(
    restaurantName: string,
    address: string,
  ): Promise<string[]> {
    try {
      const prompt = `You are a food expert. Based on the restaurant name "${restaurantName}" and address "${address}", assign up to 3 most appropriate cuisine types from this list: ${cuisineNames.join(', ')}.

Return ONLY a JSON array of cuisine names, nothing else. Example: ["Italian", "Pizza", "Mediterranean"]

Restaurant: ${restaurantName}
Address: ${address}`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.3,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 200,
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      interface GeminiResponse {
        candidates?: Array<{
          content?: {
            parts: Array<{
              text?: string;
            }>;
          };
        }>;
      }

      const responseData = (await response.json()) as GeminiResponse;
      const textContent = responseData.candidates?.[0]?.content?.parts[0]?.text;

      if (!textContent) {
        throw new Error('No text content found in response');
      }

      // Clean the response - remove markdown code blocks if present
      let cleanText = textContent.trim();

      // Remove various markdown formats
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      // Remove any remaining backticks at start/end
      cleanText = cleanText.replace(/^`+/, '').replace(/`+$/, '');

      // Find JSON array in the text (in case there's extra text)
      const jsonMatch = cleanText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        cleanText = jsonMatch[0];
      }

      // Parse the JSON response
      const cuisineList = JSON.parse(cleanText) as string[];

      // Validate that returned cuisines are in our list
      const validCuisines = cuisineList.filter((cuisine) =>
        cuisineNames.includes(cuisine),
      );

      return validCuisines.slice(0, 3); // Ensure max 3 cuisines
    } catch (error) {
      console.warn(`Failed to get cuisines for ${restaurantName}:`, error);
      // Use intelligent guess as fallback instead of generic "International"
      return guessRestaurantCuisine(restaurantName);
    }
  }

  async assignCuisinesBatch(
    restaurants: Array<{ name: string; address: string }>,
  ): Promise<string[][]> {
    try {
      // Create a structured prompt for batch processing
      const restaurantList = restaurants
        .map((r, index) => `${index + 1}. "${r.name}" at "${r.address}"`)
        .join('\n');

      const prompt = `You are a food expert. For each restaurant listed below, assign up to 3 most appropriate cuisine types from this list: ${cuisineNames.join(', ')}.

Return ONLY a JSON array where each element is an array of cuisine names for the corresponding restaurant. Example format:
[
  ["Italian", "Pizza", "Mediterranean"],
  ["Chinese", "Asian", "Noodles"],
  ["American", "Fast Food", "Burgers"]
]

Restaurants to classify:
${restaurantList}

Return the results in the exact same order as the restaurants listed above.`;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.3,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 8192, // Increased for batch processing
            },
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      interface GeminiResponse {
        candidates?: Array<{
          content?: {
            parts: Array<{
              text?: string;
            }>;
          };
        }>;
      }

      const responseData = (await response.json()) as GeminiResponse;
      const textContent = responseData.candidates?.[0]?.content?.parts[0]?.text;

      if (!textContent) {
        throw new Error('No text content found in response');
      }

      // Clean the response - remove markdown code blocks if present
      let cleanText = textContent.trim();

      // Remove various markdown formats
      if (cleanText.startsWith('```json')) {
        cleanText = cleanText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (cleanText.startsWith('```')) {
        cleanText = cleanText.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }

      // Remove any remaining backticks at start/end
      cleanText = cleanText.replace(/^`+/, '').replace(/`+$/, '');

      // Find JSON array in the text (in case there's extra text)
      const jsonMatch = cleanText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        cleanText = jsonMatch[0];
      }

      // Parse the JSON response
      const batchResults = JSON.parse(cleanText) as string[][];

      // Validate and clean each restaurant's cuisines
      const validatedResults = batchResults.map((cuisineList) => {
        if (!Array.isArray(cuisineList)) {
          return ['International']; // Fallback for malformed data
        }

        const validCuisines = cuisineList.filter((cuisine) =>
          cuisineNames.includes(cuisine),
        );

        return validCuisines.length > 0
          ? validCuisines.slice(0, 3) // Ensure max 3 cuisines
          : ['International']; // Fallback if no valid cuisines
      });

      // Ensure we have results for all restaurants
      while (validatedResults.length < restaurants.length) {
        validatedResults.push(['International']);
      }

      return validatedResults.slice(0, restaurants.length);
    } catch (error) {
      console.warn(`Failed to get batch cuisines:`, error);
      // Return fallback cuisines for all restaurants in the batch
      return restaurants.map((restaurant) =>
        guessRestaurantCuisine(restaurant.name),
      );
    }
  }
}

interface RestaurantWithCuisines {
  trading_name: string;
  building_address: string;
  longitude: string;
  latitude: string;
  distanceFromCBD: number;
  cuisines: string[] | null; // null if not yet processed
}

async function generateCuisineData(): Promise<void> {
  try {
    console.log('🚀 Starting resumable cuisine generation process...');

    // Load restaurant data
    const processFile = (): JsonRestaurantData[] => {
      const fileContent = fs.readFileSync(
        `${__dirname}/restaurants_cleaned.json`,
        'utf8',
      );
      const records: JsonRestaurantData[] = JSON.parse(
        fileContent,
      ) as JsonRestaurantData[];
      return records;
    };

    const records = processFile();

    // Calculate distances and sort by proximity to Melbourne CBD
    const restaurantsWithDistance = records
      .map((restaurant) => ({
        ...restaurant,
        distanceFromCBD: calculateDistance(
          MELBOURNE_CBD_LAT,
          MELBOURNE_CBD_LNG,
          parseFloat(restaurant.latitude),
          parseFloat(restaurant.longitude),
        ),
      }))
      .filter(
        (r) =>
          !isNaN(parseFloat(r.latitude)) &&
          !isNaN(parseFloat(r.longitude)) &&
          parseFloat(r.latitude) >= -90 &&
          parseFloat(r.latitude) <= 90 &&
          parseFloat(r.longitude) >= -180 &&
          parseFloat(r.longitude) <= 180,
      )
      .sort((a, b) => a.distanceFromCBD - b.distanceFromCBD);

    // Remove duplicates by restaurant name (keeping the closest one)
    const uniqueRestaurants = restaurantsWithDistance.reduce(
      (acc, current) => {
        const existing = acc.find(
          (r) => r.trading_name === current.trading_name,
        );
        if (!existing) {
          acc.push(current);
        }
        return acc;
      },
      [] as typeof restaurantsWithDistance,
    );

    console.log(
      `📊 Total unique restaurants found: ${uniqueRestaurants.length}`,
    );
    console.log(
      `📍 Closest: ${uniqueRestaurants[0]?.trading_name} (${uniqueRestaurants[0]?.distanceFromCBD.toFixed(2)}km)`,
    );
    console.log(
      `📍 Furthest: ${uniqueRestaurants[uniqueRestaurants.length - 1]?.trading_name} (${uniqueRestaurants[uniqueRestaurants.length - 1]?.distanceFromCBD.toFixed(2)}km)`,
    );

    // Check if we have existing progress
    const outputPath = `${__dirname}/restaurants_with_cuisines.json`;
    let existingData: RestaurantWithCuisines[] = [];
    let startIndex = 0;

    if (fs.existsSync(outputPath)) {
      console.log('📄 Found existing cuisine data, checking progress...');
      const existingContent = fs.readFileSync(outputPath, 'utf8');
      const oldData = JSON.parse(existingContent) as RestaurantWithCuisines[];

      // Create a map of existing cuisine data by restaurant name
      const existingCuisineMap = new Map<string, string[]>();
      oldData.forEach((restaurant) => {
        if (restaurant.cuisines !== null) {
          existingCuisineMap.set(restaurant.trading_name, restaurant.cuisines);
        }
      });

      // Rebuild the data array to match current restaurant list, preserving existing cuisines
      existingData = uniqueRestaurants.map((restaurant) => ({
        trading_name: restaurant.trading_name,
        building_address: restaurant.building_address || '',
        longitude: restaurant.longitude,
        latitude: restaurant.latitude,
        distanceFromCBD: restaurant.distanceFromCBD,
        cuisines: existingCuisineMap.get(restaurant.trading_name) || null,
      }));

      // Find the first restaurant with null cuisines
      const firstNull = existingData.findIndex((r) => r.cuisines === null);
      startIndex = firstNull === -1 ? existingData.length : firstNull;

      const preservedCount = existingData.filter(
        (r) => r.cuisines !== null,
      ).length;
      console.log(
        `📄 Preserved ${preservedCount} existing cuisine assignments`,
      );
      console.log(
        `📍 Resuming from restaurant ${startIndex + 1}/${uniqueRestaurants.length}`,
      );
    } else {
      console.log('📄 No existing data found, starting fresh...');
      // Initialize all restaurants with null cuisines
      existingData = uniqueRestaurants.map((restaurant) => ({
        trading_name: restaurant.trading_name,
        building_address: restaurant.building_address || '',
        longitude: restaurant.longitude,
        latitude: restaurant.latitude,
        distanceFromCBD: restaurant.distanceFromCBD,
        cuisines: null,
      }));
    }

    // Initialize Gemini service
    const geminiService = new GeminiCuisineService();
    let consecutiveRateLimitErrors = 0;
    const maxConsecutiveRateLimitErrors = 3;

    // Process restaurants in batches starting from the resume point
    console.log('🤖 Starting AI cuisine assignment with batch processing...');

    const batchSize = 200;
    const totalBatches = Math.ceil(
      (uniqueRestaurants.length - startIndex) / batchSize,
    );

    for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
      const batchStart = startIndex + batchIndex * batchSize;
      const batchEnd = Math.min(
        batchStart + batchSize,
        uniqueRestaurants.length,
      );
      const batch = uniqueRestaurants.slice(batchStart, batchEnd);

      console.log(
        `\n📦 Processing batch ${batchIndex + 1}/${totalBatches} (restaurants ${batchStart + 1}-${batchEnd})`,
      );

      try {
        // Add delay between batches to respect rate limits
        if (batchIndex > 0) {
          console.log(`⏳ Waiting 5 seconds before next batch...`);
          await new Promise((resolve) => setTimeout(resolve, 5000));
        }

        // Prepare batch data for AI processing
        const batchData = batch.map((restaurant) => ({
          name: restaurant.trading_name,
          address: restaurant.building_address || '',
        }));

        // Get cuisines for the entire batch
        const batchCuisines =
          await geminiService.assignCuisinesBatch(batchData);

        // Reset consecutive error counter on success
        consecutiveRateLimitErrors = 0;

        // Update the existing data for each restaurant in the batch
        for (let i = 0; i < batch.length; i++) {
          const restaurant = batch[i];
          const globalIndex = batchStart + i;
          const assignedCuisines =
            batchCuisines[i] || guessRestaurantCuisine(restaurant.trading_name);

          existingData[globalIndex].cuisines = assignedCuisines;

          console.log(
            `  ✅ ${restaurant.trading_name} (${restaurant.distanceFromCBD.toFixed(2)}km): ${assignedCuisines.join(', ')}`,
          );
        }

        // Save progress after each batch
        fs.writeFileSync(outputPath, JSON.stringify(existingData, null, 2));
        console.log(
          `💾 Batch ${batchIndex + 1} completed and saved: ${batchEnd}/${uniqueRestaurants.length} restaurants processed`,
        );
      } catch (error) {
        console.error(`❌ Failed to process batch ${batchIndex + 1}:`, error);

        // Check if this is a rate limit error (429)
        const isRateLimitError =
          error instanceof Error &&
          (error.message.includes('429') ||
            error.message.includes('rate limit'));

        if (isRateLimitError) {
          consecutiveRateLimitErrors++;
          console.log(
            `⚠️  Rate limit error ${consecutiveRateLimitErrors}/${maxConsecutiveRateLimitErrors}`,
          );

          // If we've hit too many consecutive rate limit errors, exit gracefully
          if (consecutiveRateLimitErrors >= maxConsecutiveRateLimitErrors) {
            console.log(
              '⚠️  Too many consecutive rate limit errors, saving progress and exiting...',
            );
            fs.writeFileSync(outputPath, JSON.stringify(existingData, null, 2));
            console.log(
              `💾 Progress saved at restaurant ${batchStart + 1}/${uniqueRestaurants.length}`,
            );
            console.log(
              '🔄 Wait a few minutes and run the script again to resume from this point',
            );
            console.log(
              '💡 Consider reducing batch size or increasing delay between batches',
            );
            return;
          }

          // For single rate limit errors, still exit to avoid wasting quota
          console.log('⚠️  Rate limit hit, saving progress and exiting...');
          fs.writeFileSync(outputPath, JSON.stringify(existingData, null, 2));
          console.log(
            `💾 Progress saved at restaurant ${batchStart + 1}/${uniqueRestaurants.length}`,
          );
          console.log(
            '🔄 Wait a few minutes and run the script again to resume from this point',
          );
          return;
        }

        // Reset consecutive counter for non-rate-limit errors
        consecutiveRateLimitErrors = 0;

        // For other errors, use fallback for the entire batch and continue
        console.log(`🔄 Using fallback cuisines for batch ${batchIndex + 1}`);
        for (let i = 0; i < batch.length; i++) {
          const restaurant = batch[i];
          const globalIndex = batchStart + i;
          const fallbackCuisines = guessRestaurantCuisine(
            restaurant.trading_name,
          );

          existingData[globalIndex].cuisines = fallbackCuisines;
          console.log(
            `  🔄 ${restaurant.trading_name} (${restaurant.distanceFromCBD.toFixed(2)}km): ${fallbackCuisines.join(', ')} (fallback)`,
          );
        }

        // Save progress even after fallback
        fs.writeFileSync(outputPath, JSON.stringify(existingData, null, 2));
        console.log(
          `� Batch ${batchIndex + 1} completed with fallbacks: ${batchEnd}/${uniqueRestaurants.length} restaurants processed`,
        );
      }
    }

    // Final save
    fs.writeFileSync(outputPath, JSON.stringify(existingData, null, 2));
    console.log(
      `💾 Saved ${existingData.length} restaurants with cuisines to: ${outputPath}`,
    );
    console.log('✨ Cuisine generation completed successfully!');

    // Generate cuisine distribution statistics
    const cuisineCount: Record<string, number> = {};
    existingData.forEach((restaurant) => {
      if (restaurant.cuisines) {
        restaurant.cuisines.forEach((cuisine) => {
          cuisineCount[cuisine] = (cuisineCount[cuisine] || 0) + 1;
        });
      }
    });

    console.log('\n📊 Cuisine distribution:');
    Object.entries(cuisineCount)
      .sort(([, a], [, b]) => b - a)
      .forEach(([cuisine, count]) => {
        console.log(`  ${cuisine}: ${count} restaurants`);
      });

    const processedCount = existingData.filter(
      (r) => r.cuisines !== null,
    ).length;
    const totalCount = existingData.length;
    console.log(
      `\n🎉 Processing complete: ${processedCount}/${totalCount} restaurants have cuisines`,
    );
  } catch (error) {
    console.error('❌ Error during cuisine generation:', error);
    throw error;
  }
}

async function main(): Promise<void> {
  await generateCuisineData();
  await prisma.$disconnect();
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
