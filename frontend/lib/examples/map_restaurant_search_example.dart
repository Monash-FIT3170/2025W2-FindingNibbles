import 'package:flutter/material.dart';
import 'package:nibbles/service/restaurant/restaurant_service.dart';
import 'package:nibbles/service/restaurant/google_places_restaurant_dto.dart';

/// Example showing how to use the bounds-based restaurant search for map rendering
class MapRestaurantSearchExample {
  final RestaurantService _restaurantService = RestaurantService();

  /// Example: Load restaurants for current map view
  Future<List<GooglePlacesRestaurantDto>> loadRestaurantsForMapBounds({
    required double swLat,
    required double swLng,
    required double neLat,
    required double neLng,
    String? searchKeyword,
    bool showOnlyOpen = false,
    int? maxPriceLevel,
  }) async {
    
    // Get restaurants within the map bounds
    final restaurants = await _restaurantService.getRestaurants(
      swLat: swLat,
      swLng: swLng,
      neLat: neLat,
      neLng: neLng,
      keyword: searchKeyword,
      openNow: showOnlyOpen,
      maxPrice: maxPriceLevel,
    );

    debugPrint('Found ${restaurants.length} restaurants in map bounds');
    return restaurants;
  }

  /// Example: Search for specific food type in current map view
  Future<List<GooglePlacesRestaurantDto>> searchInMapBounds({
    required double swLat,
    required double swLng,
    required double neLat,
    required double neLng,
    required String searchTerm,
  }) async {
    
    return await _restaurantService.getRestaurants(
      swLat: swLat,
      swLng: swLng,
      neLat: neLat,
      neLng: neLng,
      keyword: searchTerm, // e.g., "pizza", "sushi", "italian"
    );
  }

  /// Example: Find cheap restaurants open now in map view
  Future<List<GooglePlacesRestaurantDto>> findCheapOpenRestaurants({
    required double swLat,
    required double swLng,
    required double neLat,
    required double neLng,
  }) async {
    
    return await _restaurantService.getRestaurants(
      swLat: swLat,
      swLng: swLng,
      neLat: neLat,
      neLng: neLng,
      maxPrice: 2, // Price level 0-2 ($ to $$)
      openNow: true,
    );
  }

  /// Example: Convert to map markers for display (Google Maps - commented out)
  /// This is just an example - you'd use flutter_map markers in actual implementation
  /*
  Set<Marker> convertToMapMarkers(List<GooglePlacesRestaurantDto> restaurants) {
    return restaurants.map((restaurant) => Marker(
      markerId: MarkerId(restaurant.placeId),
      position: LatLng(restaurant.latitude, restaurant.longitude),
      infoWindow: InfoWindow(
        title: restaurant.name,
        snippet: _buildMarkerSnippet(restaurant),
      ),
      onTap: () => _onRestaurantMarkerTapped(restaurant),
    )).toSet();
  }
  */

  /*
  String _buildMarkerSnippet(GooglePlacesRestaurantDto restaurant) {
    final parts = <String>[];
    
    if (restaurant.rating != null) {
      parts.add('${restaurant.rating!.toStringAsFixed(1)} ⭐');
    }
    
    if (restaurant.priceLevel != null) {
      parts.add('\$' * restaurant.priceLevel!);
    }
    
    if (restaurant.openingHours?.openNow == true) {
      parts.add('Open now');
    }
    
    return parts.join(' • ');
  }

  void _onRestaurantMarkerTapped(GooglePlacesRestaurantDto restaurant) {
    debugPrint('Tapped restaurant: ${restaurant.name}');
    // Handle restaurant selection - navigate to details, etc.
  }
  */
}

/* Example Google Maps widget - commented out since project uses flutter_map
/// Example usage in a map widget
class ExampleMapWidget extends StatefulWidget {
  @override
  _ExampleMapWidgetState createState() => _ExampleMapWidgetState();
}

class _ExampleMapWidgetState extends State<ExampleMapWidget> {
  final MapRestaurantSearchExample _searchExample = MapRestaurantSearchExample();
  // Set<Marker> _markers = {};
  bool _isLoading = false;

  /// Call this when map view changes (pan, zoom, etc.)
  Future<void> _onMapViewChanged() async {
    setState(() => _isLoading = true);

    try {
      // Get current map bounds (replace with your actual map bounds)
      // Example bounds for Melbourne CBD
      const swLat = -37.8236;
      const swLng = 144.9500;
      const neLat = -37.8036;
      const neLng = 144.9800;

      final restaurants = await _searchExample.loadRestaurantsForMapBounds(
        swLat: swLat,
        swLng: swLng,
        neLat: neLat,
        neLng: neLng,
        searchKeyword: null, // No specific search
        showOnlyOpen: false,
        maxPriceLevel: null, // No price filter
      );

      // final markers = _searchExample.convertToMapMarkers(restaurants);
      
      setState(() {
        // _markers = markers;
        // Just update loading state for this example
      });
    } catch (e) {
      debugPrint('Error loading restaurants: $e');
    } finally {
      setState(() => _isLoading = false);
    }
  }

  /// Search for specific food type in current map view
  Future<void> _searchInCurrentView(String searchTerm) async {
    setState(() => _isLoading = true);

    try {
      // Get current map bounds
      const swLat = -37.8236;
      const swLng = 144.9500;
      const neLat = -37.8036;
      const neLng = 144.9800;

      final restaurants = await _searchExample.searchInMapBounds(
        swLat: swLat,
        swLng: swLng,
        neLat: neLat,
        neLng: neLng,
        searchTerm: searchTerm,
      );

      // final markers = _searchExample.convertToMapMarkers(restaurants);
      
      setState(() {
        // _markers = markers;
        // Just update loading state for this example
      });
    } catch (e) {
      debugPrint('Error searching restaurants: $e');
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Map Restaurants'),
        actions: [
          if (_isLoading)
            Center(child: CircularProgressIndicator()),
        ],
      ),
      body: Column(
        children: [
          // Search controls
          Padding(
            padding: EdgeInsets.all(16),
            child: Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: () => _searchInCurrentView('pizza'),
                    child: Text('Find Pizza'),
                  ),
                ),
                SizedBox(width: 8),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () => _searchInCurrentView('sushi'),
                    child: Text('Find Sushi'),
                  ),
                ),
                SizedBox(width: 8),
                Expanded(
                  child: ElevatedButton(
                    onPressed: _onMapViewChanged,
                    child: Text('All Restaurants'),
                  ),
                ),
              ],
            ),
          ),
          
          // Map view - commented out since project uses flutter_map
          Expanded(
            child: Container(
              color: Colors.grey[200],
              child: Center(
                child: Text(
                  'Map would go here\n(Project uses flutter_map, not Google Maps)',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.grey[600]),
                ),
              ),
            ),
          ),
          /*
          Expanded(
            child: GoogleMap(
              // Your map configuration
              markers: _markers,
              onCameraIdle: _onMapViewChanged, // Reload when user stops panning/zooming
              // ... other map properties
            ),
          ),
          */
        ],
      ),
    );
  }
}
*/
