# Restaurant Search Service

This service provides restaurant search functionality using Google Places API as the primary data source, with local database for user-specific features.

## Architecture

**Primary Data Source**: Google Places API (comprehensive, real-time restaurant data)
**Secondary Data Source**: Local Database (user favorites, visit history, personal notes)

## Main Methods

### Google Places API Methods (Primary)
```dart
// Get restaurants within map bounds
Future<List<GooglePlacesRestaurantDto>> getRestaurants({
  double? swLat, swLng, neLat, neLng,  // Map bounds
  String? keyword,                      // Search term
  int? maxPrice,                       // Price filter (0-4)
  bool? openNow,                       // Open now filter
})

// Get all restaurants near a location
Future<List<GooglePlacesRestaurantDto>> getAllRestaurants({
  required double latitude, longitude,
  int? radius,                         // Search radius (meters)
  int? maxPrice, bool? openNow,
})

// Get restaurants by cuisine type
Future<List<GooglePlacesRestaurantDto>> getRestaurantsByCuisine({
  required String cuisine,
  required double latitude, longitude,
  int? radius,
})
```

### Local Database Methods (Secondary)
```dart
// Get user's saved restaurants
Future<List<RestaurantDto>> getLocalRestaurants({...})

// Get user's saved restaurants by cuisine
Future<List<RestaurantDto>> getLocalRestaurantsByCuisine({...})

// Get all user's saved restaurants
Future<List<RestaurantDto>> getAllLocalRestaurants({...})

// Search saved restaurants by name
Future<List<RestaurantDto>> searchRestaurantsByName(String name)
```

## Usage Examples

### Map Rendering (Primary Use Case)
```dart
// Get restaurants for current map view
final restaurants = await restaurantService.getRestaurants(
  swLat: mapBounds.southwest.latitude,
  swLng: mapBounds.southwest.longitude,
  neLat: mapBounds.northeast.latitude,
  neLng: mapBounds.northeast.longitude,
  keyword: 'pizza',
  openNow: true,
);
```

### Location-based Discovery
```dart
// Get all restaurants near user
final nearbyRestaurants = await restaurantService.getAllRestaurants(
  latitude: userLocation.latitude,
  longitude: userLocation.longitude,
  radius: 2000, // 2km
  maxPrice: 3,
);
```

### User's Saved Restaurants (Overlay)
```dart
// Get user's favorites to highlight on map
final savedRestaurants = await restaurantService.getLocalRestaurants(
  swLat: mapBounds.southwest.latitude,
  swLng: mapBounds.southwest.longitude,
  neLat: mapBounds.northeast.latitude,
  neLng: mapBounds.northeast.longitude,
);
```

## Data Integration Strategy

**For Map Display:**
1. **Primary layer**: Google Places restaurants (comprehensive coverage)
2. **Overlay layer**: User's saved restaurants (different marker style)
3. **Combined info**: Show if a Google Places restaurant is also saved by user

**Return Types:**
- `GooglePlacesRestaurantDto`: Rich Google Places data (photos, reviews, real-time info)
- `RestaurantDto`: User-specific data (favorites, visit history, personal notes)

## Backend Integration

This service works seamlessly with your backend's:
- `GooglePlacesApiService.getNearbyRestaurants()` - Main restaurant search
- `RestaurantService.findInBounds()` - User's saved restaurants

**All methods automatically handle:**
- ✅ Bounds to center+radius conversion
- ✅ Google Places API parameter mapping  
- ✅ Error handling with fallbacks
- ✅ Proper DTO conversion
