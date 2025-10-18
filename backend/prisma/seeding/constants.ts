import { CuisineData, RestaurantData } from './types';

export const cuisines: CuisineData[] = [
  {
    name: 'Italian',
    description:
      'Traditional cuisine from Italy featuring pasta, pizza, and Mediterranean flavors',
  },
  {
    name: 'Chinese',
    description:
      'Diverse regional cuisines from China with rice, noodles, and distinctive cooking techniques',
  },
  {
    name: 'Japanese',
    description:
      'Traditional Japanese cuisine emphasizing fresh ingredients, rice, and seafood',
  },
  {
    name: 'Mexican',
    description:
      'Vibrant cuisine featuring corn, beans, chilies, and bold spices',
  },
  {
    name: 'Indian',
    description:
      'Rich and diverse cuisine known for aromatic spices, curries, and vegetarian options',
  },
  {
    name: 'Thai',
    description:
      'Southeast Asian cuisine balancing sweet, sour, salty, and spicy flavors',
  },
  {
    name: 'French',
    description:
      'Classic European cuisine known for refined techniques and rich sauces',
  },
  {
    name: 'Greek',
    description:
      'Mediterranean cuisine featuring olive oil, fresh herbs, and grilled meats',
  },
  {
    name: 'Korean',
    description:
      'East Asian cuisine known for fermented foods, barbecue, and spicy dishes',
  },
  {
    name: 'Vietnamese',
    description:
      'Southeast Asian cuisine featuring fresh herbs, rice noodles, and light broths',
  },
  {
    name: 'Spanish',
    description:
      'Iberian cuisine known for tapas, paella, and Mediterranean influences',
  },
  {
    name: 'Lebanese',
    description:
      'Middle Eastern cuisine featuring mezze, grilled meats, and fresh vegetables',
  },
  {
    name: 'Turkish',
    description:
      'Cuisine blending European and Asian influences with grilled meats and spices',
  },
  {
    name: 'American',
    description:
      'Diverse cuisine including BBQ, burgers, and regional specialties',
  },
  {
    name: 'Brazilian',
    description:
      'South American cuisine featuring grilled meats, tropical fruits, and rice dishes',
  },
  {
    name: 'Moroccan',
    description:
      'North African cuisine known for tagines, couscous, and aromatic spices',
  },
  {
    name: 'Ethiopian',
    description: 'East African cuisine featuring injera bread and spicy stews',
  },
  {
    name: 'Persian',
    description:
      'Middle Eastern cuisine known for rice dishes, kebabs, and fragrant herbs',
  },
  {
    name: 'Russian',
    description:
      'Eastern European cuisine featuring hearty soups, dumplings, and preserved foods',
  },
  {
    name: 'German',
    description:
      'Central European cuisine known for sausages, bread, and beer pairings',
  },
  {
    name: 'British',
    description:
      'Traditional cuisine from the British Isles featuring roasts and comfort foods',
  },
  {
    name: 'Argentinian',
    description:
      'South American cuisine famous for grilled meats and empanadas',
  },
  {
    name: 'Peruvian',
    description:
      'Andean cuisine blending indigenous, Spanish, and Asian influences',
  },
  {
    name: 'Malaysian',
    description:
      'Southeast Asian cuisine combining Malay, Chinese, and Indian flavors',
  },
  {
    name: 'Indonesian',
    description:
      'Archipelago cuisine known for spicy curries, rice dishes, and tropical flavors',
  },
  {
    name: 'African',
    description:
      'Diverse continental cuisine featuring grains, stews, and unique spice blends',
  },
  {
    name: 'Caribbean',
    description:
      'Island cuisine featuring tropical fruits, seafood, and jerk spices',
  },
  {
    name: 'Nepalese',
    description:
      'Himalayan cuisine featuring dal, rice, and mountain vegetables',
  },
  {
    name: 'Pakistani',
    description:
      'South Asian cuisine known for rich curries, tandoor cooking, and flatbreads',
  },
  {
    name: 'Sri Lankan',
    description:
      'Island cuisine featuring coconut, curry leaves, and aromatic spices',
  },
  {
    name: 'Burmese',
    description:
      'Southeast Asian cuisine known for noodle soups and fermented fish sauce',
  },
  {
    name: 'Cambodian',
    description:
      'Southeast Asian cuisine featuring rice, fish, and fresh herbs',
  },
  {
    name: 'Laotian',
    description:
      'Southeast Asian cuisine known for sticky rice, papaya salad, and grilled meats',
  },
  {
    name: 'Filipino',
    description:
      'Island cuisine blending Spanish, Chinese, and indigenous influences',
  },
  {
    name: 'Polish',
    description:
      'Eastern European cuisine featuring hearty dishes, dumplings, and preserved meats',
  },
  {
    name: 'Hungarian',
    description:
      'Central European cuisine known for paprika, goulash, and rich stews',
  },
  {
    name: 'Czech',
    description:
      'Central European cuisine featuring beer, bread, and hearty meat dishes',
  },
  {
    name: 'Scandinavian',
    description:
      'Nordic cuisine emphasizing fresh seafood, preserved foods, and simple preparations',
  },
  {
    name: 'Ukrainian',
    description:
      'Eastern European cuisine known for borscht, dumplings, and grain dishes',
  },
  {
    name: 'Irish',
    description: 'Celtic cuisine featuring potatoes, lamb, and hearty stews',
  },
  {
    name: 'Scottish',
    description: 'Highland cuisine known for haggis, whisky, and fresh seafood',
  },
  {
    name: 'Portuguese',
    description:
      'Iberian cuisine featuring seafood, rice dishes, and custard tarts',
  },
  {
    name: 'Belgian',
    description: 'European cuisine known for waffles, chocolate, and beer',
  },
  {
    name: 'Dutch',
    description:
      'Northern European cuisine featuring cheese, seafood, and hearty winter dishes',
  },
  {
    name: 'Swiss',
    description:
      'Alpine cuisine known for cheese dishes, chocolate, and mountain specialties',
  },
  {
    name: 'Austrian',
    description:
      'Central European cuisine featuring schnitzel, pastries, and coffee culture',
  },
  {
    name: 'Nordic',
    description:
      'Scandinavian cuisine emphasizing local ingredients and preservation techniques',
  },
  {
    name: 'Fusion',
    description:
      'Modern cuisine blending techniques and ingredients from multiple culinary traditions',
  },
  {
    name: 'Mediterranean',
    description:
      'Coastal cuisine featuring olive oil, fresh vegetables, and grilled seafood',
  },
  {
    name: 'Middle Eastern',
    description:
      'Regional cuisine known for spices, grilled meats, and ancient grains',
  },
  {
    name: 'Latin American',
    description:
      'Continental cuisine featuring corn, beans, chilies, and tropical ingredients',
  },
  {
    name: 'Asian',
    description:
      'Continental cuisine encompassing diverse cooking styles from across Asia',
  },
  {
    name: 'European',
    description:
      'Continental cuisine representing diverse traditions from across Europe',
  },
  {
    name: 'Vegetarian',
    description:
      'Plant-based cuisine focusing on vegetables, grains, and meat alternatives',
  },
  {
    name: 'Vegan',
    description: 'Strictly plant-based cuisine excluding all animal products',
  },
  {
    name: 'Gluten-Free',
    description:
      'Cuisine prepared without gluten-containing grains for dietary restrictions',
  },
  {
    name: 'Healthy',
    description:
      'Cuisine emphasizing nutritious ingredients and balanced meal preparations',
  },
  {
    name: 'Organic',
    description:
      'Cuisine featuring organically grown and sustainably sourced ingredients',
  },
  {
    name: 'Raw Food',
    description: 'Cuisine featuring uncooked foods and living ingredients',
  },
  {
    name: 'Paleo',
    description:
      'Cuisine based on presumed ancient human diet excluding processed foods',
  },
  {
    name: 'Keto',
    description:
      'Low-carbohydrate, high-fat cuisine for ketogenic diet followers',
  },
  {
    name: 'Street Food',
    description: 'Casual cuisine typically sold by vendors in public spaces',
  },
  {
    name: 'Fast Food',
    description: 'Quick-service cuisine designed for speed and convenience',
  },
  {
    name: 'Comfort Food',
    description:
      'Nostalgic cuisine providing emotional satisfaction and familiarity',
  },
  {
    name: 'Gourmet',
    description:
      'High-quality cuisine featuring premium ingredients and refined techniques',
  },
  {
    name: 'Fine Dining',
    description:
      'Upscale cuisine with elaborate presentation and exceptional service',
  },
  {
    name: 'Barbecue',
    description:
      'Cooking method and cuisine style featuring slow-cooked, smoked meats',
  },
  {
    name: 'Seafood',
    description:
      'Cuisine specializing in fish, shellfish, and other marine life',
  },
  {
    name: 'Steakhouse',
    description: 'Cuisine specializing in grilled and prepared beef cuts',
  },
  {
    name: 'Sandwich',
    description:
      'Cuisine featuring various ingredients served between bread slices',
  },
  {
    name: 'Pizza',
    description: 'Italian-originated flatbread cuisine with various toppings',
  },
  {
    name: 'Burger',
    description: 'American cuisine featuring ground meat patties in buns',
  },
  {
    name: 'Taco',
    description:
      'Mexican cuisine featuring folded tortillas with various fillings',
  },
  {
    name: 'Sushi',
    description:
      'Japanese cuisine featuring vinegared rice with various accompaniments',
  },
  {
    name: 'Ramen',
    description: 'Japanese noodle soup cuisine with rich broths and toppings',
  },
  {
    name: 'Pasta',
    description:
      'Italian cuisine featuring wheat-based noodles with various sauces',
  },
  {
    name: 'Salad',
    description:
      'Fresh cuisine featuring mixed greens and vegetables with dressings',
  },
  {
    name: 'Soup',
    description: 'Liquid-based cuisine combining various ingredients in broth',
  },
  {
    name: 'Dessert',
    description: 'Sweet cuisine typically served at the end of meals',
  },
  {
    name: 'Ice Cream',
    description:
      'Frozen dessert cuisine made from dairy products and sweeteners',
  },
  {
    name: 'Bakery',
    description:
      'Baked goods cuisine including bread, pastries, and confections',
  },
  {
    name: 'Cafe',
    description:
      'Light cuisine typically served in coffee shops and casual establishments',
  },
  {
    name: 'Coffee',
    description: 'Beverage-focused cuisine centered around coffee preparations',
  },
  {
    name: 'Tea',
    description:
      'Beverage-focused cuisine centered around tea ceremonies and preparations',
  },
  {
    name: 'Juice Bar',
    description:
      'Health-focused cuisine featuring fresh fruit and vegetable juices',
  },
  {
    name: 'Smoothie',
    description:
      'Blended beverage cuisine combining fruits, vegetables, and other ingredients',
  },
  {
    name: 'Bubble Tea',
    description:
      'Taiwanese beverage cuisine featuring tea with chewy tapioca pearls',
  },
  {
    name: 'Wine Bar',
    description:
      'Cuisine focused on wine pairings with light foods and appetizers',
  },
  {
    name: 'Cocktail',
    description:
      'Mixed drink cuisine featuring creative alcoholic beverage preparations',
  },
  {
    name: 'Brewery',
    description: 'Beer-focused cuisine often featuring pub-style foods',
  },
  {
    name: 'Buffet',
    description:
      'Self-service cuisine style offering multiple dishes simultaneously',
  },
  {
    name: 'Brunch',
    description: 'Late morning cuisine combining breakfast and lunch elements',
  },
  {
    name: 'Breakfast',
    description:
      'Morning cuisine featuring traditional first meal preparations',
  },
  {
    name: 'Diner',
    description:
      'American casual cuisine served in informal restaurant settings',
  },
  {
    name: 'Food Truck',
    description: 'Mobile cuisine served from converted vehicles',
  },
  {
    name: 'Catering',
    description:
      'Event-focused cuisine prepared for large groups and special occasions',
  },
  {
    name: 'Tapas',
    description: 'Spanish small plate cuisine designed for sharing',
  },
  {
    name: 'Dim Sum',
    description: 'Chinese small plate cuisine traditionally served with tea',
  },
  {
    name: 'Mezze',
    description:
      'Middle Eastern small plate cuisine featuring various appetizers',
  },
  {
    name: 'Antipasti',
    description: 'Italian appetizer cuisine served before main courses',
  },
  {
    name: 'Australian',
    description:
      'Modern Australian cuisine blending international influences with local ingredients',
  },
  {
    name: 'Modern Australian',
    description:
      'A cuisine style that blends traditional Australian ingredients with global culinary techniques, often featuring fresh seafood, native herbs, and multicultural influences.',
  },
  {
    name: 'International',
    description:
      'A broad category that encompasses dishes and flavors from multiple global cuisines, offering a diverse mix of tastes and cooking styles.',
  },
  {
    name: 'Asian Fusion',
    description:
      'A creative combination of flavors and techniques from various Asian cuisines, such as Chinese, Japanese, Thai, and Korean, often merged into innovative dishes.',
  },
  {
    name: 'Contemporary',
    description:
      'Modern, innovative cuisine that emphasizes current culinary trends, fresh presentation, and often combines traditional techniques with new ideas.',
  },
  {
    name: 'Dumplings',
    description:
      'A category of cuisine centered around small parcels of dough filled with meat, seafood, or vegetables, common in many Asian culinary traditions.',
  },
  {
    name: 'Halal',
    description:
      'Cuisine prepared according to Islamic dietary laws, ensuring ingredients and cooking methods are permissible, often featuring Middle Eastern and South Asian influences.',
  },
];

// Define the list of appliances
export const appliances = [
  { id: 1, name: 'Oven' },
  { id: 2, name: 'Microwave' },
  { id: 3, name: 'Blender' },
  { id: 4, name: 'Food Processor' },
  { id: 5, name: 'Air Fryer' },
  { id: 6, name: 'Slow Cooker' },
  { id: 7, name: 'Mixer' },
  { id: 8, name: 'Toaster' },
  { id: 9, name: 'Pressure Cooker' },
  { id: 10, name: 'Rice Cooker' },
  { id: 11, name: 'Stovetop' },
  { id: 12, name: 'Grill' },
  { id: 13, name: 'Toaster Oven' },
  { id: 14, name: 'Instant Pot' },
  { id: 15, name: 'Deep Fryer' },
  { id: 16, name: 'Electric Kettle' },
  { id: 17, name: 'Coffee Maker' },
  { id: 18, name: 'Juicer' },
  { id: 19, name: 'Sous Vide' },
  { id: 20, name: 'Waffle Maker' },
  { id: 21, name: 'Sandwich Press' },
  { id: 22, name: 'Electric Steamer' },
  { id: 23, name: 'Bread Maker' },
  { id: 24, name: 'Ice Cream Maker' },
  { id: 25, name: 'Dehydrator' },
  { id: 26, name: 'Smoker' },
  { id: 27, name: 'Griddle' },
  { id: 28, name: 'Panini Press' },
  { id: 29, name: 'Fondue Pot' },
  { id: 30, name: 'Pasta Maker' },
];

// Defined the list of dietary restrictions
export const dietaryRequirements = [
  {
    id: 1,
    name: 'Vegetarian',
    description: 'No meat, fish, or poultry',
  },
  {
    id: 2,
    name: 'Vegan',
    description: 'No animal products',
  },
  {
    id: 3,
    name: 'Gluten Free',
    description: 'No gluten-containing foods',
  },
  {
    id: 4,
    name: 'Halal',
    description: 'Meat from animals slaughtered according to Islamic law',
  },
  {
    id: 5,
    name: 'Kosher',
    description: 'Food prepared according to Jewish dietary laws',
  },
  {
    id: 6,
    name: 'Dairy Free',
    description: 'No milk or dairy products',
  },
  {
    id: 7,
    name: 'Lactose Intolerant',
    description: 'No lactose-containing dairy products',
  },
  {
    id: 8,
    name: 'Nut Allergy',
    description: 'No tree nuts or peanuts',
  },
  {
    id: 9,
    name: 'Shellfish Allergy',
    description: 'No shellfish or crustaceans',
  },
  {
    id: 10,
    name: 'Egg Allergy',
    description: 'No eggs or egg products',
  },
  {
    id: 11,
    name: 'Soy Allergy',
    description: 'No soy or soy-based products',
  },
  {
    id: 12,
    name: 'Pescatarian',
    description: 'No meat or poultry, but fish is allowed',
  },
  {
    id: 13,
    name: 'Paleo',
    description: 'No grains, legumes, dairy, or processed foods',
  },
  {
    id: 14,
    name: 'Keto',
    description: 'Low carb, high fat diet',
  },
  {
    id: 15,
    name: 'Low FODMAP',
    description: 'Low in fermentable carbohydrates',
  },
  {
    id: 16,
    name: 'Diabetic Friendly',
    description: 'Low sugar and controlled carbohydrates',
  },
  {
    id: 17,
    name: 'Low Sodium',
    description: 'Reduced salt content',
  },
  {
    id: 18,
    name: 'Low Fat',
    description: 'Reduced fat content',
  },
  {
    id: 19,
    name: 'Low Calorie',
    description: 'Reduced calorie content',
  },
  {
    id: 20,
    name: 'Raw Food',
    description: 'Uncooked or minimally heated foods',
  },
  {
    id: 21,
    name: 'Mediterranean',
    description: 'Plant-based with moderate fish and poultry',
  },
  {
    id: 22,
    name: 'Whole30',
    description: 'No sugar, grains, dairy, or legumes for 30 days',
  },
  {
    id: 23,
    name: 'Sugar Free',
    description: 'No added sugars or sweeteners',
  },
  {
    id: 24,
    name: 'Sesame Allergy',
    description: 'No sesame seeds or sesame oil',
  },
  {
    id: 25,
    name: 'Fish Allergy',
    description: 'No fish or fish products',
  },
];

// Define the list of restaurants
export const restaurants: RestaurantData[] = [
  {
    place_id: 'ChIJKzi5KMxq1moRMFJ7DrJPztA',
    name: 'Noodle Plus',
    latitude: -37.9140707,
    longitude: 145.1328123,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    rating: 3.9,
    userRatingsTotal: 59,
    priceLevel: undefined,
    formattedAddress:
      'Monash University Clayton Campus, Learning and Teaching Building, Ground Floor, Clayton VIC 3168, Australia',
    formattedPhoneNum: undefined,
    website: undefined,
    photos: [
      {
        height: 4896,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/100551349147024653082"\u003eMike Chan\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcJ9_0j2BXjQzTwLN-aWInD-vRrMp2PRc0r9jZCxzUFsjwLrc8pbcHpY6XcWu_Jxmjis2TS_EzaxO3-wWrvR06IFhjRsPq0GCdelQAcmE8lNlSKuuNV3vNhsh6Ah7vOxWcBHDhsTTC-bllei9sRBALIOBaLWlf2g8aNYeKVJG26sB7NQrcmfteuHO5vFqPo5C1dTPyFdIkoy-chhCaC_ltQeb_17xv45BP90MN0a8u9KrvQDljzicXkwBoFFLUikos0T1S2UrFAT2Ry0bSbYQpLskEob1W535L0EW6iRJqeBu1mdJLQ',
        width: 6528,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Chinese')!,
      cuisines.find((c) => c.name === 'Asian')!,
    ],
  },
  {
    place_id: 'ChIJY1PwH5Zr1moR1cqFk01EbFA',
    name: 'Nesso Cafe',
    latitude: -37.9138088,
    longitude: 145.1328663,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
    rating: 3.7,
    userRatingsTotal: 87,
    priceLevel: undefined,
    formattedAddress:
      'Learning and Teaching Building, Ground Floor/19 Ancora Imparo Wy, Clayton VIC 3168, Australia',
    formattedPhoneNum: '(03) 9558 8457',
    website: 'http://cafenessoltb.com.au/',
    photos: [
      {
        height: 3840,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/116526084588028225935"\u003eA Google User\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcK5vYN-WvnLd7qazZSypIyqu6T1OO3c023jHyMaf3JBn5NXHNfaZ_X87cbFDRzixfqoIzZM7C3HDihTdVSnl4wQV6DxTkLQasesl_rr-UdAOVnpAsgHEq81WE8e3ybIsfoG-8ADjX_jow43avgvg3fKW_6YeFr1xNsQwGVnUvpqEYHx16j-g8UPwnaT9KA_LcnH_bDacy9fsM_z8n3H213N0cKhUylCTiYRh5hTTSqSlqMm9ziqEhG9Jd3PL5XcSyz75huhXZLPmuJMvvcxQjnMWAipN0aduhoseMmBTTzTVMGBnRs',
        width: 5120,
      },
    ],
    cuisines: [cuisines.find((c) => c.name === 'Cafe')!],
  },
  {
    place_id: 'ChIJzXgfRZ1r1moR-yH1U6WtTJI',
    name: 'Poked',
    latitude: -37.911985,
    longitude: 145.1329755,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    rating: 3.5,
    userRatingsTotal: 31,
    priceLevel: undefined,
    formattedAddress: 'G57/21 Chancellors Walk, Clayton VIC 3800, Australia',
    formattedPhoneNum: '(03) 8652 9122',
    website: 'http://www.poked.com.au/',
    photos: [
      {
        height: 4320,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/110987042987366159069"\u003eA Google User\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcL6XclHhCRfIZRpag-WL28oVUtWEipUgs10q60r0Gpcuy08ealhznDVzrqVYl0b0FzvAZMmEkeC64fEeKsl6ye0xDNLz7Z420-bwOHqy_kRLhUZxllZ4Q_h1IwdxP03uEhfjAMmR96MpnpRym6xqmuwXmT5d0CnF64XoTNB4Ew1eDeKLVvzj3Nnn_Bqd_TAU3vM-thGCm558ejZuYM3JGDo1mA1snFGF74Kz_hZyfK3t0ASH0Apx8z0v6HIi8BB6EICrgliOQeESqRBenuv0h5B8rnOLGm4E7n487WrhicHHdacTF0',
        width: 2880,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Japanese')!,
      cuisines.find((c) => c.name === 'Asian')!,
    ],
  },
  {
    place_id: 'ChIJx1u48Mtq1moRxSnCra2rVsQ',
    name: 'Artichoke & Whitebait',
    latitude: -37.9118464,
    longitude: 145.1329481,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
    rating: 3.7,
    userRatingsTotal: 43,
    priceLevel: 2,
    formattedAddress:
      "Monash University Clayton Campus, Ground floor, Campus Centre, 21 Chancellor's Walk, Clayton VIC 3168, Australia",
    formattedPhoneNum: '(03) 9543 2523',
    website: 'http://artichokeandwhitebait.com.au/',
    photos: [
      {
        height: 2304,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/105087574845721738211"\u003epratiwi larosa\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcIbs_7N1WH-a5fbVOMViKavSYraeSahoovR_yJvswKZxxEDA3_fAFTm_Euc12BuXHbf4PFE7x0Dz7KLT6OGuu6GWtInX1DLau3uxjOYboeEtVPRBVR1_te5Yym2ToK6AUDtBtN3qRw3CiSC92yMNEHmkGIDXdd4LhLHQZXZuLlAR2ulOvHgG6aWRh9sU2nrTPwkcF-8H4fQ5j8vsaDYp6LZvAvBa-ggu9oTeTbZD202GA53lIGvK_NmGgVOSS1E7x0_vgE46kzDnH1lIsj7e9d010ZtgnJQdY1vzWvS2x2bfPsUTtvkD4D-BuHYtpD-AGkl0b4JA3OtLa--DgQvAmi1qTjjIvDHa_aNiOHTtscHOkntsHP1dO1kWdRtI-cR9R2feTsIvrwxjiI9bFVX5lUK9y_jK3Z0H4RPA1cHYVGu_ZyxWE-7EpKq2U88rwgh0xihgyghh5uhxE2w0xSiFb9R6jnn1OESQnZUvMZWQLv9rxPV5Zu6sESSqVpAHRCd1uIek7iANeFrh-RwLrCRBuiZJDj-olawrJG36_tJbe3cRj6lAeP2U8ZjgSVqZP-dRsrTVg',
        width: 4096,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Cafe')!,
      cuisines.find((c) => c.name === 'Australian')!,
    ],
  },
  {
    place_id: 'ChIJO0nHoctq1moR610E36XekXM',
    name: 'PappaRich Monash',
    latitude: -37.9117059,
    longitude: 145.1335523,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    rating: 3.8,
    userRatingsTotal: 319,
    priceLevel: 2,
    formattedAddress:
      'Monash University Clayton Campus, Campus Centre, Shop G15/21 Chancellors Walk, Clayton VIC 3168, Australia',
    formattedPhoneNum: undefined,
    website:
      'https://www.papparich.net.au/store/monash-express?utm_content=PappaRich%20Monash%20University%20-%20Clayton&utm_campaign=Google%20My%20Business&utm_medium=organic&utm_source=google&utm_term=plcid_9438989265666385837',
    photos: [
      {
        height: 1756,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/103238796680193220308"\u003eGreg Maunder\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcJ_wtYl-5K-6c2ZmTulhSjRCGNA5dQ3MWsn6pDTf8gL4JMvsqIHAR4r4qyZilkgfz5oJjwX9KmuM-s683Z2ZzAfPrfAo2G3rH07TsEvL83PxeyUzKMAV-9Xorruan2FSm-kfCD-UDtslVErWhnXNQplTVY7g28qlvYTUZcF9htlDi4eYhiYbfBsqezrw8T45sJ3baB-6lfrU_N4wLMpM6sI0bZqReYYO7Fn8-d14JKenxcKpB869UwZ0aytZte8h5iDfYbmNn2_t6kuKVTU7GNZFKlP6HHTgBuqIae10uIJ0yXz9ks',
        width: 2685,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Malaysian')!,
      cuisines.find((c) => c.name === 'Asian')!,
    ],
  },
  {
    place_id: 'ChIJJ6kO8stq1moRjjwy5VjHx6w',
    name: 'Noodle Noodle',
    latitude: -37.9119934,
    longitude: 145.1332335,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    rating: 3.8,
    userRatingsTotal: 57,
    priceLevel: undefined,
    formattedAddress: 'G30/21 Chancellors Walk, Clayton VIC 3168, Australia',
    formattedPhoneNum: undefined,
    website: 'https://www.monash.edu/food-and-retail/vendors/noodle-noodle',
    photos: [
      {
        height: 3024,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/102699390853301713051"\u003eNguyen Tuan Khoi\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcL_7DfcWWPOZhsZs4Mq7rs84RcQiWa92-8MtfuUsSMba8o-7E6bJ_tOrV6k9hDWUBzfMMw1hiuGS9q_y-ksJeRXKs5zYtttABeXuO9VRlRjzcPp8FcgKAex-xHYQomAFTTCa2YxpOoE16t-nPEDjnWaovBtjreGDWgYiY9TmJ5-npmqF3FfLB54Q_UmZZhRsbpvbxKj1mNBaDMfftuvZt-YtT9TkX_g_tTcSBEcbU4t_POC3dSpF10r6ED0a5_ugZa9-bIpyFbB5MdlqH_FKCuP_G-L0gC6UGB3WV0J8Qz7phJA8JtkC6xWMgl74NnznuE4phi9Lh6RMOkL3fltxdyQnIc30ZgSqwx8ktn4g0HadyxxRCm13vAahzkfRr5cvvq-xP_X9gcN4iPmoR8w3qCIbk1tP_CJ-fGOO1Q1k2Kwr7N4iBUgC5DhGSfMEk95Q9nk-mzi0qE2muM1hwys0YT_cjcom1heFgziO503YDgNYddlCBBD_KnIAJGfDNZKbnVW3Alp4wZDEiVaNOF-LA72qimNsngJFCHuEXat8y2i9PSVckmsFETvJJqeJ_1AukXu6Bx1',
        width: 4032,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Asian')!,
      cuisines.find((c) => c.name === 'Chinese')!,
    ],
  },
  {
    place_id: 'ChIJqUyf_stq1moRW19lZEfbNHo',
    name: "Neptune's Seafood Catch",
    latitude: -37.9119934,
    longitude: 145.1332335,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    rating: 3.7,
    userRatingsTotal: 62,
    priceLevel: 1,
    formattedAddress:
      'Monash University Clayton Campus, 21 Chancellors Walk, Clayton VIC 3168, Australia',
    formattedPhoneNum: '0424 511 687',
    website:
      'https://www.monash.edu/eat-drink-shop/vendors/neptunes-seafood-catch',
    photos: [
      {
        height: 3024,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/100551349147024653082"\u003eMike Chan\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcK_H7oUm8cNK8A803D-_NOsLE5AjYlaXDOF9OsiOImqucEfuEiCNHxmyRFPNM4QlBewMVtWUGhqMAjzhTyaHVPM-8S7PkJwI6ryzNyvI6GZKhBSvMSIG6qw28uC2cczgghTZ0APpDGrIVSGTyJT0NilwcUgnk7fAfwOGsXlkN0cYOfb78Ml08PsdTZ-wqH_VHRq3caRYuQvyQM6zIh-vc2FyOefNMn0l-GVvxb8oCGkv_7jUXu07rI_ZuqYLkDiwDpUQXFMOmyrYb_RUu8_z8Ohsz6liCN4o2xHpDET6kgZWNexsac',
        width: 4032,
      },
    ],
    cuisines: [cuisines.find((c) => c.name === 'Seafood')!],
  },
  {
    place_id: 'ChIJu7wOkstq1moRytNqs-_MGzk',
    name: 'Guzman y Gomez - Monash University',
    latitude: -37.9118159,
    longitude: 145.1337583,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    rating: 4,
    userRatingsTotal: 946,
    priceLevel: 2,
    formattedAddress:
      'Monash University Clayton Campus, 21 Chancellors Walk, Clayton VIC 3800, Australia',
    formattedPhoneNum: '(03) 9988 1409',
    website: 'https://www.guzmanygomez.com.au/locations/monash-university/',
    photos: [
      {
        height: 2268,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/113003095112172130244"\u003eDavid Parker\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcLuQNvPYOixy0gfUAG0IlFYHVFlchUn9y7FGax4iudtXF9Rq_cp17t8Qcgt1k4Dh-LCoIC1E-OX7S8uuezmfXKwZwVjgNCDlUs88sd1dVVMVTi5dMnCaeCQ6hNUGoyIVNJ4I-gpMGhU1HWXRnPV_Wq2BTw3y7O5W1wQNxFn4GWMZPHAsXXdhvKw2hPEOixNB2KZwHGI1nixbPlz7V4j5DbwmRAEZeOTV00Kou1eiHWubp9kwInBncWQRvS9-e94OmkMN2mPf6qxyqIKUbz6_7iqkpGWUYkFcFoV3CKm39Dp5O_tHJY',
        width: 4032,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Mexican')!,
      cuisines.find((c) => c.name === 'Fast Food')!,
    ],
  },
  {
    place_id: 'ChIJLXTx8stq1moRwAdi9_ZYQPs',
    name: "Roll'd Monash University Clayton",
    latitude: -37.911784,
    longitude: 145.133304,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    rating: 3.3,
    userRatingsTotal: 59,
    priceLevel: undefined,
    formattedAddress:
      'Tenancy G16, Northern Plaza Monash University, Clayton VIC 3168, Australia',
    formattedPhoneNum: '(03) 9558 9291',
    website: 'https://rolld.com.au/',
    photos: [
      {
        height: 2176,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/100781170704439726852"\u003eJenkai 125\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcIMlUZq2kHR3v-u2vtk3CU30wRIxZW_K6_yiiLNmTVETkZjelePfZmdBq3faaoMq0KqwkZFOQLUXk09WtBj5mBDNAypIdhNt9TZMtXu3CebkYwdOOBAAqfRD6o9IBo-ftVSvXcbMZj69zClZm9BLbdSMEGOpXLC86VrSICGF4Il_eKgfqF2n0901RQLQzdyu7zyPvbIzq2rdl3poqwIrArDLZcb78S4cE-Pp5A0JMKm9JaXR4xsE6l3AqL-xe-PN7WHPludkyaS6jCbXBzN8cBDUTU5xbBIEfq_nu7Jtcag1fli65E',
        width: 4608,
      },
    ],
    cuisines: [cuisines.find((c) => c.name === 'Vietnamese')!],
  },
  {
    place_id: 'ChIJ64DH7ctq1moRE7Y1AAaT33s',
    name: 'Boost Juice Monash University Clayton',
    latitude: -37.9115399,
    longitude: 145.1332319,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    rating: 3.4,
    userRatingsTotal: 63,
    priceLevel: 2,
    formattedAddress:
      'Monash College G55, Ground Floor, Northern Ext, Building 10, Wellington Rd Monash University (Clayton Campus, Clayton VIC 3166, Australia',
    formattedPhoneNum: undefined,
    website: 'https://www.boostjuice.com.au/',
    photos: [
      {
        height: 5712,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/100764247107908414493"\u003eA Google User\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcJypQEnLLnttLyYLqGH4eVyDAju9iOfxqVXdjC7RYriSXvSudycYUtqwx5iyU1tAl7LHnWyXVTlo1EJLYilROz8bZXOiVioeUUFhuGHmVfhPjLiMEvg9dDKvSWecTHZLVVUzLRdrCnNH1dghCxC6imsFaS_4aY3R2SJnDFLOF-fnsXXNlWhKwur5sjGkqff0Zu3RZV52zVOxWPEmNoFrvBHmZ7_XsA-EUNe7EOQwmyX9sl0MZOCCl_7QkgFyknurY7Q18epbwGXJ5BBr-AYKimleSV6lcz2gqT5Rp0A2fVWboxqXVQ',
        width: 4284,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Juice Bar')!,
      cuisines.find((c) => c.name === 'Healthy')!,
    ],
  },
  {
    place_id: 'ChIJPRbpjMtq1moRPcCxJz2EpDo',
    name: 'Sushi Sushi Monash University',
    latitude: -37.9117211,
    longitude: 145.133144,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    rating: 2.7,
    userRatingsTotal: 40,
    priceLevel: 1,
    formattedAddress:
      'Monash University Clayton Campus, G29/21 Chancellors Walk, Clayton VIC 3800, Australia',
    formattedPhoneNum: '(03) 9126 3456',
    website:
      'https://www.sushisushi.com.au/our-stores/monash-university-clayton-132',
    photos: [
      {
        height: 4000,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/106366474048648534541"\u003eSushi Sushi Monash University (Clayton Campus)\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcJWCNbrKMXQeCabpaiO2Ciuqy1VHvjVgNK45f0u9EXOU_0NWgV1n3Als6SHH-oJ_mLIIzUdWRtuZ5hI2RHqiyr4so1uVLORFgylNjB7VwTC1-kAPy7joEm9SSbQBxoGsT66rzcx_OnSubRP5uHIxY8G_XExQpcFCjP0iO4k-zOavzjDvSuNrkM2trCKibeafmzkBx6giatO2Xy6hXsBSX6A6ainATfuM6L0vs_-XUccyEgyFe4Leabrt9PUG2mSUoGIxyD1S9LrGfmVEh3-lLfOntO40ZMJZLX3upb3WLhQ2wWHf1s',
        width: 2669,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Japanese')!,
      cuisines.find((c) => c.name === 'Asian')!,
    ],
  },
  {
    place_id: 'ChIJATDW88tq1moRBX8HgPq1l5s',
    name: "Grafali's Coffee Roasters",
    latitude: -37.911985,
    longitude: 145.1329755,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
    rating: 4.2,
    userRatingsTotal: 130,
    priceLevel: undefined,
    formattedAddress:
      'Australia, Victoria, Clayton, Chancellors Walk, 邮政编码: 3168',
    formattedPhoneNum: undefined,
    website: 'https://www.monash.edu/food-and-retail/vendors/grafali',
    photos: [
      {
        height: 3024,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/117561696415342203295"\u003eJerry chen\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcKkpbNIokbiCl9gpBAUrD-MQH_ghYYniU2uc6Ybv9XY_qgPcz7ze33EVlgaNUHd4AXYbIIegtOv73-cA5i0Zp5-hkfeiZOva3JGV_GAnc-LEjFZUMJLjcrVhunlyN2VjCz0J00p_TJv6UpQ7tVLMX8PsvzjhJbiwUoRQ6nC-DaoCv4hVseUlOhUS5txUydf6jyDRHgjOmrOQv9ro4iYLMvtCfA6e8ow7miMILawKeMP1LKYFK-1XRwBTO1r2eY5HwQ6eykLMvYWj304N7Rs0BcFE2bOZw_WOMuQRNqX90aEk3ohBV7eje-fWqIHZZPpnIGC7g3aV7xIwan_PfaVEqv9y3YMoWvFLArXVe7IrwSVOvaL4xXEpzfbrSZycqSncnJHFFmh-LdRJLNXIh-uzHG50CLaKctoycN6rSn5mNfiteSWQWRwo2H4ZFq3w3kM88bmIp-h_hrv91BL47kLSBXa_iIKeCI9JW6WE2pdsQCt_SAFAcyO1_mtmeIMccA78tRm1wOYS7S7Km6AyiBmIx3MLX_z0qDldchdsWpAH30Xax1AbSSa8IIvGuO-bL2VTiDSZExSxdjQ4Q',
        width: 4032,
      },
    ],
    cuisines: [cuisines.find((c) => c.name === 'Cafe')!],
  },
  {
    place_id: 'ChIJFXnO8Mtq1moRexjO3wfOOW4',
    name: 'Subway',
    latitude: -37.9119934,
    longitude: 145.1332335,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    rating: 2.9,
    userRatingsTotal: 103,
    priceLevel: 1,
    formattedAddress:
      '21 Chancellors Walk Part Monash University, Clayton Campus Ground Floor G25, Clayton VIC 3168, Australia',
    formattedPhoneNum: undefined,
    website: 'https://www.subway.com/en-au',
    photos: [
      {
        height: 3456,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/108941841443900971929"\u003eUlric\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcIjTpnDXHuUnZcmTzY-ijif1Uy5-xdZmRyMVQ-shth4WCJvCmLjBhh2Wydwq7dRv0OwWHxaRalh6n7gJI_WUeO-eC_PVrCbPHsAeWcSZ1ThtueWoI_2TBBZBmUrLBL5c9h6KnCSQyWWgQBcA68w8OJNirH_m8ljpfyP11lKPT6ySG4KetvuINck9Hd1CUAWXvciVotMlQzM-ZZ7hD0QQy060T26Qs_Y8ted33Z9e0n9G_bTfIUOkhGmIi20ZpyKLeQYeEDPETHYZHdW7pJDPZigr_cvspd-bfnm2eNidpvbRnsq',
        width: 5184,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Sandwich')!,
      cuisines.find((c) => c.name === 'Fast Food')!,
    ],
  },
  {
    place_id: 'ChIJHxa1pFlr1moRHFdLlvSoa_k',
    name: "Sir John's",
    latitude: -37.9119934,
    longitude: 145.1332335,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    rating: 3.8,
    userRatingsTotal: 40,
    priceLevel: undefined,
    formattedAddress: '21 Chancellors Walk, Clayton VIC 3168, Australia',
    formattedPhoneNum: '(03) 9905 2883',
    website: 'https://sirjohnsbar.com/',
    photos: [
      {
        height: 1960,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/104682042760959365450"\u003eA Google User\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcKsCFTrCmMci-I1AOZm0gGBxt5LdawG4kVdJx4XHOdjo7_F6_X5iSzkXRwRsKsCuJMGW7HfFpgBWKNrvsjvjI9ook8tDZRdjcUoK_6pMz0sOX1tNl0Ut_XeraXEU3-Yo2e3GfimiTBLSGt_3wVMmfmfA4ksKw57lt7kvsZh4N36DSj8mpjZ7G6XRfV6WHCYx_SktTNHf-aSpUbOpOOoA2s9pSKs4QyA2_CgKqH3c16URmWE98LzmADHB1OOkEfvhqG6eBYtl1leGu6HoiYR1w8y9C-WwZvYSEC0V3Eot0bWyhUP_bQ',
        width: 4032,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Cafe')!,
      cuisines.find((c) => c.name === 'Australian')!,
    ],
  },
  {
    place_id: 'ChIJuwcSCstq1moRG_TzklUYsOQ',
    name: 'Wholefoods',
    latitude: -37.9118892,
    longitude: 145.1329277,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    rating: 4.6,
    userRatingsTotal: 83,
    priceLevel: 1,
    formattedAddress:
      'Level 1/21 Chancellors Walk, Clayton VIC 3168, Australia',
    formattedPhoneNum: undefined,
    website: 'https://linktr.ee/Monash_Wholefoods',
    photos: [
      {
        height: 1080,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/107894446970721086219"\u003eHomayoun Hamedmoghadam-Rafati\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcLLx6M_wJUDGZkHekzbll0xeW6lYYXZtZ4qLTNxfaNl7RUDJM-pblLIr-DzPCg0KXs1cboe5SAvDi5kgw4rH7ejHsE-WMjlHOGNuhyIPLeO-2cgB-tiMMXMLwIxQqRAggubZpSYSQDFhW4LLAMNLZhg7A_bLWQtaeZ0tSXLg3fD4s1oW5uSxS0XtSBhUXoO_dc_ovrnfrK9mThlLhyhLjWin0k7S3bVboQj57cTEMzHTeYwaLyakpK9wBgaNKvvkdGBTc61toyE8KzbzZjJI31spzhAq8JPSuAZ8jTaCxT2_o2c3fQ',
        width: 1920,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Cafe')!,
      cuisines.find((c) => c.name === 'Healthy')!,
    ],
  },
  {
    place_id: 'ChIJj1WC1Mtq1moRJeKoET0Alw4',
    name: 'Ma Long Kitchen and Dumplings',
    latitude: -37.9098104,
    longitude: 145.1321036,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    rating: 4.1,
    userRatingsTotal: 102,
    priceLevel: undefined,
    formattedAddress:
      'Monash University Clayton Campus, Hargrave Andrew Library, 13 College Walk, Clayton VIC 3168, Australia',
    formattedPhoneNum: '(03) 9548 7173',
    website: 'http://malongkitchen.com.au/',
    photos: [
      {
        height: 3024,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/113703783703185493246"\u003eEng Hwa Lim\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcIW0E7-7fD_OY7sTqymYXALiJpL81nPjGfugVcgMmKkC5osMgs9Tkmd-7G3-1K_r-Y-c_4fW2o7OZBvcXuFU0qJ0yWXV9TYM5LR8mIHkycPrldhmZZAfek4IcsvVeelFgEcpNC_6jfj_KFdsjS98EBhoKzqjV8bMvlIpjzl6TzWhaCcskyIKZUuUJnST59_hWz-Ww0f9y55FUJFFhQSqqhTnEu0vTijmBhEtXKAB7JlSoWc7sjyR2R43RNYYrtZcdmZFaTVqT9K_RfpMNkeHckhewKseGzOC7ICQ0ABvtWcP94vykE',
        width: 4032,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Chinese')!,
      cuisines.find((c) => c.name === 'Asian')!,
    ],
  },
  {
    place_id: 'ChIJk1F41Mtq1moREgIhKa2Mad0',
    name: 'Secret Garden Eatery',
    latitude: -37.9098756,
    longitude: 145.1323205,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
    rating: 4.2,
    userRatingsTotal: 169,
    priceLevel: 2,
    formattedAddress:
      'Monash University Clayton Campus, 13 College Walk, Clayton VIC 3168, Australia',
    formattedPhoneNum: '0401 786 280',
    website: 'http://secretgardeneatery.com.au/',
    photos: [
      {
        height: 3000,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/102032314973615924622"\u003eXiang Li\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcJz5kJHRgl9BN8szlnu6RhJH7BHMNmFJ5DKa3NT1b_349nHth7rcSzuH3SL37_j6jax6fUnZ7S_VRADBLQIkt-yY3YfkyhU_aiNYzscRx2o7XCs3HvBNPE964RMuXnNjZKBgtAjbYB54wCNH-JapbbCv58kyYRcYY57TDHOiLIGyMK8eCDw_yDbGXPPCVVWjTa4I6dBJmYZ695KbqcRON1jVijZqTdWyS2PTvPRiuGWI9wdH4Ful1_ZdL4saQm1DtD8tnUt9G53rJ1jS1tpsoFrU8CijFoScd4DBuuLwwhITHDpm5PwQ2EaMyXwjnfN5GbkLSIVKd6B0KImsn8vnQKCavAAtxVHrwTt_xIgObOG9d7vWkUIsjb5_y9OqP03U6e_RCa2qWeouQdVQQjRZsBk5-4L9imCdcpWnIViBcGxQlMkCkHZu6yP-ZHKI4Eibqo-I8ys8MfHqcZdLsQRCUyERGo0mlCcvJDvGqe2faqkVinNgh7UHPYcDr205MwwbWJPxfJGoBakPgINwOs8heA9o7XnXqmKgpjVHGB13zmEIQGArSCNtJ2PPWD83kVLhcvw4LZN',
        width: 4000,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Cafe')!,
      cuisines.find((c) => c.name === 'Australian')!,
    ],
  },
  {
    place_id: 'ChIJxweMcMxq1moRE2mtr4nhNVY',
    name: "Swift's",
    latitude: -37.9129131,
    longitude: 145.1340126,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
    rating: 3.5,
    userRatingsTotal: 35,
    priceLevel: undefined,
    formattedAddress:
      'Monash University Clayton Campus, Louis Matheson Library, Ground Floor Foyer/40 Exhibition Walk, Clayton VIC 3168, Australia',
    formattedPhoneNum: '(03) 9905 2886',
    website: undefined,
    photos: [
      {
        height: 2304,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/105087574845721738211"\u003epratiwi larosa\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcKMsLnlIk6h93ss8YLZp242JweSf0R58mgSjl5Ah3yK-htiqtuGIj77x0PKzoS0qCzGgtkt_ZF3cQX1h8sJPl93HsadD8Zt0Ti7agOHMrgJRa4NIKm65q6Tl7arh95gdMkfNDCXWpQK0BI5b0qrs8gV0ijW-xgCxEIyBcdLvGkOD4vjLHsvdZGBhYi_ijwbBBgAyHUKbTkvjf_yvU0JKz_IFGh9f5opx66Mz2wOb-fJoNGTzKTKEwBrz2Z5AyAggm2vB1Fv4DQjTJWvN1sHh33VUe8i3ucP0-0A5XDvofzukYLHkeQ',
        width: 4096,
      },
    ],
    cuisines: [cuisines.find((c) => c.name === 'Cafe')!],
  },
  {
    place_id: 'ChIJB3XChUVr1moRURgtzcD-1TM',
    name: "Sammy's",
    latitude: -37.9128243,
    longitude: 145.1365006,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
    rating: 4.3,
    userRatingsTotal: 32,
    priceLevel: undefined,
    formattedAddress: '42 Scenic Blvd, Clayton VIC 3168, Australia',
    formattedPhoneNum: undefined,
    website: undefined,
    photos: [
      {
        height: 3024,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/108311528551142898808"\u003e許佩雯\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcJkkaOQ9HwRElD4rPrvdP-G4K3fFpD5zv0kg7TrEQP9k0yzQI71NXuri95xtRykm5flH6a7A-QnZTUj2Bp95ejGlsT_2CUXjzZZ4Pl_d7PiUQBYeuDvZax_M7uRyZzHXeVwrkn1yhqqckGwPn0_8InpPk1RCTHkVplnQvKCOB949JoSGOPFW9BZMVz7d_znBSUOgkv_ruaRKLRtEjr_DjH11XeMXe4sOyZM9xV1nfF80W9wzDET_LjQAmEK1W5vY6e8c5E0YADQAuCdfFbmBvEq5xBFKeYGT7l6hXWjlwzgkTBQvag',
        width: 4032,
      },
    ],
    cuisines: [cuisines.find((c) => c.name === 'Cafe')!],
  },
  {
    place_id: 'ChIJ605lD75r1moR9XUl0U8mEJc',
    name: "The Count's",
    latitude: -37.91314810000001,
    longitude: 145.1337317,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    rating: 4.5,
    userRatingsTotal: 52,
    priceLevel: undefined,
    formattedAddress:
      'Monash University Clayton Campus, 48 Exhibition Walk The Ian Potter Centre for Performing Arts, Clayton VIC 3168, Australia',
    formattedPhoneNum: '(03) 9068 6150',
    website:
      'https://www.monash.edu/performing-arts-centres/eat-drink-clayton-campus/',
    photos: [
      {
        height: 3744,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/102130747075042794467"\u003eA Google User\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcL0B_Qr78d0mIoAMhgFf2ju6mGAab_0jbCyawyn8sqGUMnE1TmnfLKiI_ZctHFUFSqjzHRQxdcQbMC23RonMG9x-NWlF4ENaPIndG-zCgYEVYChO48PwYxzUMYh8cdhIr5MWEC5eoEdOjs2wSpieo2iVh3DNKEl0KI099Sa_GH5mqTprLEIRmwwM-0bEgzaJYfrwt5nE72Aewh62a1Lgs66pRJhmv-ERA11h1PmdMnJiKmV4LUVfmMc77pStVj5VvcefBoP7lTEGwRvi4gyMCfPmwTC7BEFYOs_03ncqArn-t75Tkf25BaoeuoN3zvhwPdVIFj1do-n9aF1SEheBOYqPw83w-6Fo0YrDK63AQ9tqpfGJdPQA-UcDy4ttZ4OqZhoCDS6MK23ylwJ_tS6qknd52e_R5fnnhKuUE2IE-9XsYhjyT6--Vkeg9wUZPJrlC121TkJIajOLGEQR7KCunH704ibXRCc5TW-tRDgkMsFSa0rzi7S4OPg_MarboRiVtf9oGDDYPG609qK5gzS_bJlXNgI_F7QoP3H-rI4xcXUpvHNYQUbj36LmC-WYsV7zK5A1Q',
        width: 5616,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Cafe')!,
      cuisines.find((c) => c.name === 'Australian')!,
    ],
  },
  {
    place_id: 'ChIJv9hPsEsV1moRXpFmIptz_V4',
    name: 'Halls Cafe',
    latitude: -37.9075912,
    longitude: 145.1411061,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
    rating: 4.3,
    userRatingsTotal: 44,
    priceLevel: 1,
    formattedAddress:
      'Monash University Clayton Campus, 58 College Wy, Clayton VIC 3800, Australia',
    formattedPhoneNum: '(03) 9905 6498',
    website: 'https://www.monash.edu/accommodation/residential-life/halls-cafe',
    photos: [
      {
        height: 1366,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/102783476753263137342"\u003eA Google User\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcLarfz_zOJ4PR0r_JkYR_5K0SEjI0Pkeg0bh7sP3uQ2p7HKw-EJcmR76ispBkY_v6bvuYysQgAAq_ykcd69HsoZz7dEwIbp8u_rpc_s6EU2HEVChvBX8Z1rV1jzRVmLiOYSTIqGVaoP6F7nerJBLVLg_NwUJqheRPS5onJmv7H8DtRSrhO3AkuNYs1mZnsFrRW-MScddTBOMQ3UHdvH3B3gM3Iydy7bvdQfx-BTyTjNcC16QX2c-OLbtCuo4J2wLqOh_IZB4QgAqe-5W50FvjHLNnBC7ov2dkN-B8TFZJDZtkReNQI',
        width: 2048,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Cafe')!,
      cuisines.find((c) => c.name === 'Australian')!,
    ],
  },
  {
    place_id: 'ChIJg6MP-stq1moR3EFZxw-yz5E',
    name: 'Monash Club',
    latitude: -37.9115443,
    longitude: 145.1344524,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    rating: 4.3,
    userRatingsTotal: 48,
    priceLevel: undefined,
    formattedAddress: '32 Exhibition Walk, Clayton VIC 3168, Australia',
    formattedPhoneNum: '(03) 9905 0888',
    website: 'https://www.monash.edu/club/contact',
    photos: [
      {
        height: 679,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/117116671379617965259"\u003eA Google User\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcLq-Cm_WFRRrkWVR_bKG4_CMYYa3J2x7Is3M52QocB0d_vaFye6uXnFkf8atY05pOrXgo1wAzwfc17x0uEwYUaeH1snPm5S4SFegzJMzgw7o8wV9bg_Evb_YVs2e1aPazsctw8WAPai4Ia9cwloIhBsbNBr_y2p8o_DuCqcI8ouT7Os-_-f67ReUtXhyc_9Nplq3zJ8sE25hpmXMh_R3kmrUF_y2B2uvZUavhyUdAkm0ohmPnfxXKkV5yQDis1sm9GljYiT11W56IOQCh9uKK3VvNivFCXD9kJy-9SHNLdnpoINDaQ',
        width: 1036,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Cafe')!,
      cuisines.find((c) => c.name === 'Australian')!,
    ],
  },
  {
    place_id: 'ChIJxzv1mMtq1moRbPu3FCfCf-U',
    name: 'Church of Secular Coffee',
    latitude: -37.9115443,
    longitude: 145.1344524,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
    rating: 4.4,
    userRatingsTotal: 214,
    priceLevel: 2,
    formattedAddress: '32 Exhibition Walk, Clayton VIC 3168, Australia',
    formattedPhoneNum: '(03) 9905 0886',
    website: undefined,
    photos: [
      {
        height: 897,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/105424823373171091854"\u003eA Google User\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcKiBEMgmLJgW5Bu8OtOBBfH4_9OfPLbyLT0DcPY4Vn9NKLan0iGIUmngf4FUzI7N-CeVKKLytVq7pqHePKRhaNIA11LHWhTIS8UiJ6RJO4X4Lx_YdOp2J0brm2iWLpetlnm2_0Tqnt-b0PbJguadsDBtDfAljXqW6FpDXgcF8nlmrbuANaGtxDxcA8RtV5Bf3sE7jOf-D2YOUrZiF0v5jVet3HrMCA6nytGZJJ0QP9t_ii1dw13mFydkwFZfmVEaaLXHjHg3MKoDD_Oj_0n5fVzgRkRaKKjKpzys40kG_qk2jrwJJI',
        width: 1125,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Cafe')!,
      cuisines.find((c) => c.name === 'Australian')!,
    ],
  },
  {
    place_id: 'ChIJcbPf1f5r1moRDBVcz8X_Cpg',
    name: 'Sharetea Monash University',
    latitude: -37.911538,
    longitude: 145.1345368,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
    rating: 3.9,
    userRatingsTotal: 117,
    priceLevel: undefined,
    formattedAddress: 'Unit 50/32 Exhibition Walk, Clayton VIC 3168, Australia',
    formattedPhoneNum: '(03) 8512 3061',
    website: 'https://sharetea.com.au/',
    photos: [
      {
        height: 2400,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/113463525830720461832"\u003eGediminas G\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcKbAu6yBW4aqI11_toQxPrreDoeLFSQDhJG_LkACJIYsO8b-lcoMpmo7haohjylFkCHFiMam20XDKB9WO_STIXiKioV_L2GLj1h5OH0ZzpovDBu957u_nOyZ_gs6ocReAvEoMUlHFC4MJJyFCooBlYH4up3QwuBbOQtkri1spHJORUaFECUXwa3K5PsemTEfii9E4P7bda2GBuAu5bWYeDpJi0DvCZtkuYodEh7PzWz6WWn4iRHFYTlbF1NvORPi0xLfGFnuME2D3NnHLScTd-Po6DQcVCDIyIPuHDP1EhHDPMP-Vl2k-mgo-m4gUigOzm2VGQjYQXL43hcgOlRjky3USsYyakf9ZncSMVgf4tW_06Aom9vcPJ2ADbov7NqoawGVK-y2hDfq8E33jVsMy42sWObQCrlMPY8eQuLZB9L5rEpBnSUkvPI1M3rMfRmv4eRkBgzevE5g8GQJhuwgFp_90VOPL0h_Ob_5tdTMqafrwRu6rvnZuQBH9nvV_LFyw9f7YGm-33pcNp4w6XVfFt5kAgr-K9K6r_pHFkBkqhikrhppDZ0JZj8YJYq9cNqklSi6Jbo',
        width: 3200,
      },
    ],
    cuisines: [cuisines.find((c) => c.name === 'Bubble Tea')!],
  },
  {
    place_id: 'ChIJheE-1shq1moRCK-RBW6jFbI',
    name: 'Cafe Cinque Lire',
    latitude: -37.910374,
    longitude: 145.1294341,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
    rating: 4.3,
    userRatingsTotal: 305,
    priceLevel: 2,
    formattedAddress: '15 Innovation Walk, Clayton VIC 3168, Australia',
    formattedPhoneNum: '0411 634 948',
    website: undefined,
    photos: [
      {
        height: 3144,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/112840972355852504675"\u003eA Google User\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcKL-t_0fPUMSH1VzxTv6txzaTPdnGCCmVmwWAwjSmRaT0FUT67fJyZRqsizkdhEswZB1XTnWxyfj-8Jbe67826id3SFQWWsq9i4LNqYgKwFF1ceu9mxo97RzBLrlb3VrN-7lLdbhy6ZX-OFB4CcbyVCX6S6M8NhyfsWRNT-1qfLn2_DTqcGVNdJDhH0iJiFgwMVEWfGiiZr5hj-iofxYCBQs_dR_CKY4wFqI6LJeAKnXpSMXQSD4lgGDgO6oXIhWe15X3YhXV_MUHtoSPwlVitL153RPcrmvp3NUQ7yiDcDi6t_IW8',
        width: 4192,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Cafe')!,
      cuisines.find((c) => c.name === 'Australian')!,
    ],
  },
  {
    place_id: 'ChIJn-CZQa5r1moRUvTGwkJAWZw',
    name: "Joe's Pizzeria & Cafe",
    latitude: -37.9116343,
    longitude: 145.1357125,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    rating: 4,
    userRatingsTotal: 215,
    priceLevel: undefined,
    formattedAddress:
      'Logan, Hall 2/28 Sports Walk, Clayton VIC 3168, Australia',
    formattedPhoneNum: '(03) 9558 6546',
    website: 'https://www.joespizzeria.com.au/',
    photos: [
      {
        height: 2184,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/104252061954582713268"\u003eViraj Senevirathne\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcLNHGiJIg4gtoAOJGdOt4BWCJ5vAJPFY0zf_q7bi8_D0FdMz7DdDYdHDLdEO0hpfAw1-StUvxpiC74RMLAXmg2kAvGxl4UOOuRU_eFDDk4Za-9blKC4dbD2Y42eQSDSNZzmLBDg7f2NSYreOOXBlpzhSDasL_06Ztp07JvVJb7au4TQra9ny_vWO7dboQgQzuX3sChjBfa0A0Nm9dp3I60Laft8-ZarbvBl9pYEgTerwg73S1Qn0POi-QX0wYXs0brHaKtVQrXmTRVo2YyjxuQC_2Mf7rUIN2ZJ8X8d8sX3kg-RLhkhUEklntCIxSKfIdHuAlaBmp4dk1JRgbNAObqot3VjrviU97_iBCPxvvathN8r-ZZsiQfE8lZ9shKEYfhtPC6GHbWVfjY3NN3zGlG3aPihwEbOYtpToDY9iTwZbvrNkJmE_StfSgs_9vALdHRY5xfTvY_Qfbxov9fv7i4xbUUn8uZY1sVpJEZBwJp_mZumoMmUlkxpukmvnIz3rX7GKYGh5yqlAmTZPyj2i3viospbsfaMLP711eo8IuDZ1P2ehwhsUYd5GtVv2hzKKbjKRAvW',
        width: 4608,
      },
    ],
    cuisines: [cuisines.find((c) => c.name === 'Italian')!],
  },
  {
    place_id: 'ChIJR4YcDstq1moR07xYME4nlz8',
    name: 'Schnitz Monash University',
    latitude: -37.9114887,
    longitude: 145.1354825,
    businessStatus: 'OPERATIONAL',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    rating: 4,
    userRatingsTotal: 435,
    priceLevel: 2,
    formattedAddress: '28 Sports Walk, Clayton VIC 3800, Australia',
    formattedPhoneNum: '(03) 8522 2866',
    website: 'https://schnitz.com.au/location/monash-uni-clayton/',
    photos: [
      {
        height: 3024,
        htmlAttributions: [
          '\u003ca href="https://maps.google.com/maps/contrib/104415915167182495928"\u003eMidhun Cherian\u003c/a\u003e',
        ],
        photoReference:
          'AeeoHcJAFBRQNIqRVrkXQRSFcNcwQOpRMKuzLZfiDJRzIFeyL4CI6jKkDrxN1tKlX5djpmgvyiJdmFvefb_I6KAjNOF55xMsFS-BLQi31CPzHOPj765pBoMaeJT8Fz8FOhdqU9dOqon-KzahLY0A3gGRImaUuy9XVlkCFDGaV24c2k6qvI7AVeBUjeOllqRB7a3AA4OZhWTLZDJo8P-OPDtyS68qsP12SnxZ55AnkktUjIYYHf2XAZyLptJKjqCKJM9Oc1wjzPjxo2s-LmSzOBdNB31sDbAP7qo3KNtgGx1EhCT-931qVbJvk7dR9sP7BlavqJnKJ28qm4XxoLNrjU1PX6Hys8A7VeaB-kJ0ENp6NA6BDyZ9B_F31tGLry0wB6AyCBXeI9ASDLRowXyEQcUmiqjZN1P7x9C1NWQFQ_TLoRIZd6SUhFMw9qDglTxyLeKYQOjFrupAr8yu4g7gmbuAyyRHEImMaM9l5yggIyfhh11H3GJk6xO9x07x-K9PSnApY5d3Xeji2nFk-8p3BLWGGuLrl9QLMiQF8xseJWn1h4wGzaYN1ZwJaee027EFaOqSVAL-D0sg',
        width: 4032,
      },
    ],
    cuisines: [
      cuisines.find((c) => c.name === 'Australian')!,
      cuisines.find((c) => c.name === 'Fast Food')!,
    ],
  },
];
