import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_polyline_algorithm/google_polyline_algorithm.dart';
import 'package:latlong2/latlong.dart';
import 'package:nibbles/pages/home/restaurant_details_page.dart';
import 'package:nibbles/pages/shared/widgets/cuisine_selection_dialog.dart';
import 'package:nibbles/pages/shared/widgets/restaurant_filter_dialog.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/service/cuisine/cuisine_service.dart';
import 'package:nibbles/service/directions/directions_service.dart';
import 'package:nibbles/service/map/map_service.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'package:nibbles/theme/app_theme.dart';

class RestaurantMarker extends Marker {
  final RestaurantDto restaurant;

  RestaurantMarker({required this.restaurant})
    : super(
        point: LatLng(restaurant.latitude, restaurant.longitude),
        width: 40,
        height: 40,
        child: const Icon(Icons.location_pin, color: Colors.red, size: 40),
      );
}

class MapPage extends StatefulWidget {
  final RestaurantDto? targetRestaurant;

  const MapPage({super.key, this.targetRestaurant});

  @override
  State<MapPage> createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> with TickerProviderStateMixin {
  late final MapController _mapController = MapController();
  LatLng? _currentPosition;
  StreamSubscription<Position>? _positionStreamSubscription;
  List<RestaurantDto> _restaurants = [];
  bool _isLoading = false;
  final bool useCurrentLocation = true;
  static const double _minimumZoomForRestaurants = 12.0;

  // Services
  final ProfileService _profileService = ProfileService();
  Set<int> _favoriteRestaurantIds = {};

  // Optimization variables
  Timer? _debounceTimer; // For map movement debouncing
  Timer? _positionUpdateTimer;
  static const Duration _debounceDelay = Duration(milliseconds: 500);
  final Map<String, List<RestaurantDto>> _restaurantCache = {};
  LatLngBounds? _lastFetchedBounds;
  double? _lastFetchedZoom;

  // Filter variables
  int _minimumRating = 1;
  List<CuisineDto> _availableCuisines = [];
  CuisineDto? _selectedCuisine;

  // Directions variables
  List<LatLng> _routePoints = [];
  final DirectionsService _directionsService = DirectionsService();
  double? _routeDuration; // in seconds
  double? _routeDistance; // in meters
  bool _isInDirectionsMode = false; // Track if we're showing directions
  RestaurantDto?
  _directionsTargetRestaurant; // The restaurant we're getting directions to
  // Search variables
  final TextEditingController _searchController = TextEditingController();
  String get _searchQuery => _searchController.text.trim();
  set _searchQuery(String value) => _searchController.text = value;
  bool _isSearchMode = false;
  List<RestaurantDto> _searchResults = [];
  Timer? _searchDebounce;

  @override
  void initState() {
    super.initState();
    _isLoading = true; // Start with loading screen
    _initializeMapAndData();
    _fetchCuisines();
    _loadFavoriteRestaurants();
  }

  // Load user's favorite restaurants
  Future<void> _loadFavoriteRestaurants() async {
    try {
      final favorites = await _profileService.getFavouriteRestaurants();
      if (mounted) {
        setState(() {
          _favoriteRestaurantIds = favorites.map((r) => r.id).toSet();
        });
      }
    } catch (e) {
      debugPrint('Error loading favorite restaurants: $e');
      // Non-critical error, continue without favorites
    }
  }

  // Single initialization method that handles everything
  Future<void> _initializeMapAndData() async {
    try {
      // Get location first
      await _getCurrentLocation();
      // Wait a bit for map to be ready
      await Future.delayed(const Duration(milliseconds: 300));

      // Then fetch restaurants once
      await _fetchRestaurantsInitial();

      // If a target restaurant was provided, load directions to it
      if (widget.targetRestaurant != null) {
        // Add target restaurant to the restaurants list to ensure it shows
        setState(() {
          _restaurants = [widget.targetRestaurant!];
        });

        await _getDirectionsToRestaurant(widget.targetRestaurant!);

        // Center map to show the route with better bounds calculation
        if (_currentPosition != null && _isMapControllerReady()) {
          // Wait a bit for the route to be rendered
          await Future.delayed(const Duration(milliseconds: 200));

          // If we have route points, use them for bounds calculation
          if (_routePoints.isNotEmpty) {
            // Find the actual bounds of the entire route
            double minLat = _routePoints.first.latitude;
            double maxLat = _routePoints.first.latitude;
            double minLng = _routePoints.first.longitude;
            double maxLng = _routePoints.first.longitude;

            for (final point in _routePoints) {
              if (point.latitude < minLat) minLat = point.latitude;
              if (point.latitude > maxLat) maxLat = point.latitude;
              if (point.longitude < minLng) minLng = point.longitude;
              if (point.longitude > maxLng) maxLng = point.longitude;
            }

            // Add generous padding (15% of the range)
            final latRange = maxLat - minLat;
            final lngRange = maxLng - minLng;
            final latPadding = latRange * 0.15;
            final lngPadding = lngRange * 0.15;

            final bounds = LatLngBounds(
              LatLng(minLat - latPadding, minLng - lngPadding),
              LatLng(maxLat + latPadding, maxLng + lngPadding),
            );

            _mapController.fitCamera(
              CameraFit.bounds(
                bounds: bounds,
                padding: const EdgeInsets.all(50), // Additional screen padding
              ),
            );
          } else {
            // Fallback if route wasn't loaded: use start and end points
            final targetLat = widget.targetRestaurant!.latitude;
            final targetLng = widget.targetRestaurant!.longitude;
            final currentLat = _currentPosition!.latitude;
            final currentLng = _currentPosition!.longitude;

            final minLat = math.min(currentLat, targetLat);
            final maxLat = math.max(currentLat, targetLat);
            final minLng = math.min(currentLng, targetLng);
            final maxLng = math.max(currentLng, targetLng);

            // Add generous padding
            final latRange = maxLat - minLat;
            final lngRange = maxLng - minLng;
            final latPadding = math.max(latRange * 0.15, 0.01);
            final lngPadding = math.max(lngRange * 0.15, 0.01);

            final bounds = LatLngBounds(
              LatLng(minLat - latPadding, minLng - lngPadding),
              LatLng(maxLat + latPadding, maxLng + lngPadding),
            );

            _mapController.fitCamera(
              CameraFit.bounds(
                bounds: bounds,
                padding: const EdgeInsets.all(50),
              ),
            );
          }
        }
      }
    } catch (e) {
      debugPrint('Error initializing: $e');
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  // Modified getCurrentLocation without triggering fetch
  Future<void> _getCurrentLocation() async {
    if (!useCurrentLocation) {
      // Use default location when useCurrentLocation is false
      setState(() {
        _currentPosition = const LatLng(-37.907803, 145.133957);
      });
      // Force fetch after setting default location
      _forceFetchRestaurants();
      return;
    }

    bool serviceEnabled;
    LocationPermission permission;

    // Check if location services are enabled
    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      // Set default location if location services are disabled
      debugPrint('Location services are disabled');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text(
              'Location services are disabled. Using default location (Melbourne).',
            ),
            duration: Duration(seconds: 3),
          ),
        );
      }
      setState(() {
        _currentPosition = const LatLng(-37.907803, 145.133957);
      });
      _forceFetchRestaurants();
      return;
    }

    // Check for permissions
    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        // Set default location if permissions are denied
        debugPrint('Location permissions denied');
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text(
                'Location permission denied. Using default location (Melbourne).',
              ),
              duration: Duration(seconds: 3),
            ),
          );
        }
        setState(() {
          _currentPosition = const LatLng(-37.907803, 145.133957);
        });
        _forceFetchRestaurants();
        return;
      }
    }

    if (permission == LocationPermission.deniedForever) {
      // Set default location if permissions are permanently denied
      debugPrint('Location permissions denied forever');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text(
              'Location permission permanently denied. Please enable in device settings. Using default location (Melbourne).',
            ),
            duration: Duration(seconds: 4),
          ),
        );
      }
      setState(() {
        _currentPosition = const LatLng(-37.907803, 145.133957);
      });
      _forceFetchRestaurants();
      return;
    }

    try {
      // Get current position
      debugPrint('Attempting to get current position...');
      final position = await Geolocator.getCurrentPosition();
      debugPrint(
        'Successfully got position: ${position.latitude}, ${position.longitude}',
      );
      if (mounted) {
        setState(() {
          _currentPosition = LatLng(position.latitude, position.longitude);
        });
      }
    } catch (e) {
      // Set default location if getting position fails
      debugPrint('Error getting current position: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              'Failed to get current location: $e. Using default location (Melbourne).',
            ),
            duration: const Duration(seconds: 3),
          ),
        );
      }
      setState(() {
        _currentPosition = const LatLng(-37.907803, 145.133957);
      });
      _forceFetchRestaurants();
      return;
    }

    // Listen for position updates with reduced frequency
    _positionStreamSubscription = Geolocator.getPositionStream(
      locationSettings: const LocationSettings(
        accuracy: LocationAccuracy.high,
        distanceFilter: 10, // Only update when moved 10 meters
      ),
    ).listen((Position pos) {
      final newPos = LatLng(pos.latitude, pos.longitude);
      if (mounted) {
        setState(() {
          _currentPosition = newPos;
        });
        // Removed automatic map centering to allow manual panning
      }
    });
  }

  // Initial fetch during startup (doesn't show loading indicator)
  Future<void> _fetchRestaurantsInitial() async {
    if (!mounted) return;

    try {
      List<RestaurantDto> allRestaurants;

      // If we're in search mode and have a search query, search by name
      if (_isSearchMode && _searchQuery.isNotEmpty) {
        // Get current map bounds for quadrant-based search
        final bounds =
            _isMapControllerReady()
                ? _mapController.camera.visibleBounds
                : null;

        if (bounds != null) {
          // Use quadrant-based search within current map bounds
          allRestaurants = await MapService().searchRestaurantsByName(
            _searchQuery,
            swLat: bounds.southWest.latitude,
            swLng: bounds.southWest.longitude,
            neLat: bounds.northEast.latitude,
            neLng: bounds.northEast.longitude,
          );
        } else {
          // Fallback to global search if bounds not available
          allRestaurants = await MapService().searchRestaurantsByName(
            _searchQuery,
          );
        }
      } else {
        // Check if zoom level is sufficient for loading restaurants (only if map controller is ready)
        if (_isMapControllerReady() &&
            _mapController.camera.zoom < _minimumZoomForRestaurants) {
          setState(() {
            _restaurants = [];
          });
          return;
        }

        // Otherwise, use the existing bounds filtering logic
        final bounds =
            _currentPosition != null
                ? _getBoundsAroundPosition(
                  _currentPosition!,
                  0.01,
                ) // Create bounds around current position
                : LatLngBounds(
                  LatLng(-37.9211, 145.1267), // Melbourne area fallback
                  LatLng(-37.9011, 145.1467),
                );

        allRestaurants = await MapService().getRestaurants(
          swLat: bounds.southWest.latitude,
          swLng: bounds.southWest.longitude,
          neLat: bounds.northEast.latitude,
          neLng: bounds.northEast.longitude,
          cuisineId: _selectedCuisine?.id,
        );

        // Filter restaurants to only show those within bounds for non-search mode
        allRestaurants = _filterRestaurantsInBounds(allRestaurants, bounds);
      }

      final filteredRestaurants = _applyRatingFilter(allRestaurants);

      if (mounted) {
        setState(() {
          _restaurants = filteredRestaurants;
        });
      }
    } catch (e) {
      debugPrint('Error fetching initial restaurants: $e');
    }
  }

  // Helper to create bounds around a position
  LatLngBounds _getBoundsAroundPosition(LatLng center, double offset) {
    // Clamp latitude and longitude to valid ranges
    final clampedLat = center.latitude.clamp(-90.0, 90.0);
    final clampedLng = center.longitude.clamp(-180.0, 180.0);

    return LatLngBounds(
      LatLng(
        (clampedLat - offset).clamp(-90.0, 90.0),
        (clampedLng - offset).clamp(-180.0, 180.0),
      ),
      LatLng(
        (clampedLat + offset).clamp(-90.0, 90.0),
        (clampedLng + offset).clamp(-180.0, 180.0),
      ),
    );
  }

  // Check if map controller is ready to use
  bool _isMapControllerReady() {
    try {
      // Try to access the camera - this will throw if not ready
      _mapController.camera.zoom;
      return true;
    } catch (e) {
      return false;
    }
  }

  // Filter restaurants to only include those within the visible bounds
  List<RestaurantDto> _filterRestaurantsInBounds(
    List<RestaurantDto> restaurants,
    LatLngBounds bounds,
  ) {
    return restaurants.where((restaurant) {
      final restaurantPoint = LatLng(restaurant.latitude, restaurant.longitude);
      return bounds.contains(restaurantPoint);
    }).toList();
  }

  // Generate cache key for restaurant data
  String _generateCacheKey(
    LatLngBounds bounds,
    CuisineDto? cuisine,
    int minRating,
    String searchQuery,
  ) {
    return '${bounds.southWest.latitude.toStringAsFixed(4)}_${bounds.southWest.longitude.toStringAsFixed(4)}_'
        '${bounds.northEast.latitude.toStringAsFixed(4)}_${bounds.northEast.longitude.toStringAsFixed(4)}_'
        '${cuisine?.id ?? 'all'}_${minRating}_${searchQuery.isEmpty ? 'nosearch' : searchQuery}';
  }

  // Check if we need to fetch new data based on bounds change
  bool _shouldFetchNewData(LatLngBounds currentBounds, double currentZoom) {
    if (_lastFetchedBounds == null || _lastFetchedZoom == null) return true;

    // Check if zoom level changed significantly
    if ((currentZoom - _lastFetchedZoom!).abs() > 1.0) return true;

    // Check if bounds changed significantly (moved more than 20% of current bounds)
    final currentWidth =
        currentBounds.northEast.longitude - currentBounds.southWest.longitude;
    final currentHeight =
        currentBounds.northEast.latitude - currentBounds.southWest.latitude;

    // Check if center moved significantly
    final currentCenter = LatLng(
      (currentBounds.northEast.latitude + currentBounds.southWest.latitude) / 2,
      (currentBounds.northEast.longitude + currentBounds.southWest.longitude) /
          2,
    );
    final lastCenter = LatLng(
      (_lastFetchedBounds!.northEast.latitude +
              _lastFetchedBounds!.southWest.latitude) /
          2,
      (_lastFetchedBounds!.northEast.longitude +
              _lastFetchedBounds!.southWest.longitude) /
          2,
    );

    final distance = _calculateDistance(currentCenter, lastCenter);
    final significantDistance =
        math.max(currentWidth, currentHeight) * 0.2; // 20% threshold

    return distance > significantDistance;
  }

  // Calculate distance between two points in degrees (approximate)
  double _calculateDistance(LatLng point1, LatLng point2) {
    final lat1 = point1.latitude;
    final lon1 = point1.longitude;
    final lat2 = point2.latitude;
    final lon2 = point2.longitude;

    return math.sqrt(math.pow(lat2 - lat1, 2) + math.pow(lon2 - lon1, 2));
  }

  // Force fetch restaurants (shows loading indicator)
  Future<void> _forceFetchRestaurants() async {
    if (!mounted) return;

    setState(() {
      _isLoading = true;
    });

    try {
      List<RestaurantDto> allRestaurants;

      // If we're in search mode and have a search query, search by name
      if (_isSearchMode && _searchQuery.isNotEmpty) {
        // Get current map bounds for quadrant-based search
        final bounds =
            _isMapControllerReady()
                ? _mapController.camera.visibleBounds
                : null;

        if (bounds != null) {
          // Use quadrant-based search within current map bounds
          allRestaurants = await MapService().searchRestaurantsByName(
            _searchQuery,
            swLat: bounds.southWest.latitude,
            swLng: bounds.southWest.longitude,
            neLat: bounds.northEast.latitude,
            neLng: bounds.northEast.longitude,
          );
        } else {
          // Fallback to global search if bounds not available
          allRestaurants = await MapService().searchRestaurantsByName(
            _searchQuery,
          );
        }
      } else {
        // Check if map controller is ready before using it
        if (!_isMapControllerReady()) {
          // If map isn't ready, use default bounds
          final bounds =
              _currentPosition != null
                  ? _getBoundsAroundPosition(_currentPosition!, 0.01)
                  : LatLngBounds(
                    LatLng(-37.9211, 145.1267), // Melbourne area fallback
                    LatLng(-37.9011, 145.1467),
                  );
          await _fetchWithBounds(bounds);
          return;
        }

        // Check if zoom level is sufficient for loading restaurants
        if (_mapController.camera.zoom < _minimumZoomForRestaurants) {
          setState(() {
            _restaurants = [];
          });
          return;
        }

        // Otherwise, use the existing bounds filtering logic
        final bounds = _mapController.camera.visibleBounds;

        // Check cache first (only for non-search mode)
        final cacheKey = _generateCacheKey(
          bounds,
          _selectedCuisine,
          _minimumRating,
          '',
        );
        if (_restaurantCache.containsKey(cacheKey)) {
          final cachedRestaurants = _restaurantCache[cacheKey]!;
          final visibleRestaurants = _filterRestaurantsInBounds(
            cachedRestaurants,
            bounds,
          );

          if (mounted) {
            setState(() {
              _restaurants = _applyRatingFilter(visibleRestaurants);
            });
          }
          return;
        }

        allRestaurants = await MapService().getRestaurants(
          swLat: bounds.southWest.latitude,
          swLng: bounds.southWest.longitude,
          neLat: bounds.northEast.latitude,
          neLng: bounds.northEast.longitude,
          cuisineId: _selectedCuisine?.id,
        );

        // Cache the results (only for non-search mode)
        _restaurantCache[cacheKey] = allRestaurants;

        // Clean up old cache entries if cache gets too large
        if (_restaurantCache.length > 20) {
          final keysToRemove =
              _restaurantCache.keys.take(_restaurantCache.length - 15).toList();
          for (final key in keysToRemove) {
            _restaurantCache.remove(key);
          }
        }

        // Filter restaurants to only show those within bounds
        allRestaurants = _filterRestaurantsInBounds(allRestaurants, bounds);
      }

      final filteredRestaurants = _applyRatingFilter(allRestaurants);

      if (mounted) {
        setState(() {
          _restaurants = filteredRestaurants;
        });
      }
    } catch (e) {
      debugPrint('Error force fetching restaurants: $e');
    } finally {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  // Helper to fetch with known bounds (no loading state management)
  Future<void> _fetchWithBounds(LatLngBounds bounds) async {
    try {
      List<RestaurantDto> allRestaurants;

      // If we're in search mode and have a search query, search by name
      if (_isSearchMode && _searchQuery.isNotEmpty) {
        allRestaurants = await MapService().searchRestaurantsByName(
          _searchQuery,
        );
      } else {
        // Check if zoom level is sufficient for loading restaurants (only if map controller is ready)
        if (_isMapControllerReady() &&
            _mapController.camera.zoom < _minimumZoomForRestaurants) {
          setState(() {
            _restaurants = [];
          });
          return;
        }

        // Check cache first (only for non-search mode)
        final cacheKey = _generateCacheKey(
          bounds,
          _selectedCuisine,
          _minimumRating,
          '',
        );
        if (_restaurantCache.containsKey(cacheKey)) {
          final cachedRestaurants = _restaurantCache[cacheKey]!;
          final visibleRestaurants = _filterRestaurantsInBounds(
            cachedRestaurants,
            bounds,
          );

          if (mounted) {
            setState(() {
              _restaurants = _applyRatingFilter(visibleRestaurants);
            });
          }
          return;
        }

        // Otherwise, use the bounds filtering logic
        allRestaurants = await MapService().getRestaurants(
          swLat: bounds.southWest.latitude,
          swLng: bounds.southWest.longitude,
          neLat: bounds.northEast.latitude,
          neLng: bounds.northEast.longitude,
          cuisineId: _selectedCuisine?.id,
        );

        // Cache the results (only for non-search mode)
        _restaurantCache[cacheKey] = allRestaurants;

        // Clean up old cache entries if cache gets too large
        if (_restaurantCache.length > 20) {
          final keysToRemove =
              _restaurantCache.keys.take(_restaurantCache.length - 15).toList();
          for (final key in keysToRemove) {
            _restaurantCache.remove(key);
          }
        }

        // Filter restaurants to only show those within bounds
        allRestaurants = _filterRestaurantsInBounds(allRestaurants, bounds);
      }

      final filteredRestaurants = _applyRatingFilter(allRestaurants);

      if (mounted) {
        setState(() {
          _restaurants = filteredRestaurants;
        });
      }
    } catch (e) {
      debugPrint('Error fetching restaurants: $e');
    }
  }

  // Fetch restaurants in response to user actions (like dragging the map)
  Future<void> _fetchRestaurantsInBounds() async {
    if (!mounted || _isLoading || !_isMapControllerReady()) return;

    final bounds = _mapController.camera.visibleBounds;
    await _fetchWithBounds(bounds);
  }

  // Debounced restaurant fetching to prevent excessive API calls
  void _debouncedFetchRestaurants() {
    _debounceTimer?.cancel();
    _debounceTimer = Timer(_debounceDelay, () {
      if (mounted && !_isLoading && _isMapControllerReady()) {
        final currentBounds = _mapController.camera.visibleBounds;
        final currentZoom = _mapController.camera.zoom;

        // Check if we really need to fetch new data
        if (_shouldFetchNewData(currentBounds, currentZoom)) {
          _fetchRestaurantsInBounds();
          _lastFetchedBounds = currentBounds;
          _lastFetchedZoom = currentZoom;
        }
      }
    });
  }

  void _onSearchSubmitted(String query) {
    final trimmedQuery = query.trim();
    if (trimmedQuery == _searchQuery) return;

    setState(() {
      _searchQuery = trimmedQuery;
      _isSearchMode = trimmedQuery.isNotEmpty;
    });

    // Clear cache when starting a new search
    _restaurantCache.clear();
    _lastFetchedBounds = null;

    if (trimmedQuery.isEmpty) {
      _fetchRestaurantsInitial();
      return;
    }

    // Trigger search immediately on Enter key press
    _fetchRestaurantsInitial();
  }

  void _onSearchChanged(String query) {
    // Cancel previous search debounce
    if (_searchDebounce?.isActive ?? false) _searchDebounce!.cancel();

    // If query is empty, clear results
    if (query.trim().isEmpty) {
      setState(() {
        _searchResults = [];
        _searchQuery = '';
        _isSearchMode = false;
      });
      return;
    }

    // Debounce search to avoid too many API calls
    _searchDebounce = Timer(const Duration(milliseconds: 400), () async {
      if (!mounted) return;

      try {
        List<RestaurantDto> results;

        // Create a much wider search radius (approximately 200km in each direction)
        // This is roughly 1.8 degrees latitude/longitude at Melbourne's latitude
        if (_currentPosition != null) {
          const double searchRadiusDegrees = 1.8; // ~200km radius

          final swLat = _currentPosition!.latitude - searchRadiusDegrees;
          final swLng = _currentPosition!.longitude - searchRadiusDegrees;
          final neLat = _currentPosition!.latitude + searchRadiusDegrees;
          final neLng = _currentPosition!.longitude + searchRadiusDegrees;

          results = await MapService().searchRestaurantsByName(
            query.trim(),
            swLat: swLat,
            swLng: swLng,
            neLat: neLat,
            neLng: neLng,
          );
        } else {
          // Fallback to global search if position unknown
          results = await MapService().searchRestaurantsByName(query.trim());
        }

        // Limit to 5 results
        if (mounted) {
          setState(() {
            _searchResults = results.take(5).toList();
            _searchQuery = query.trim();
            _isSearchMode = true;
          });
        }
      } catch (e) {
        debugPrint('Error searching restaurants: $e');
        if (mounted) {
          setState(() => _searchResults = []);
        }
      }
    });
  }

  void _onSearchResultSelected(RestaurantDto restaurant) async {
    // Clear search results
    setState(() {
      _searchResults = [];
      _searchController.text = restaurant.name;
    });

    // Navigate to restaurant details page
    Navigator.push(
      context,
      MaterialPageRoute(
        builder:
            (context) => RestaurantDetailsPage(
              restaurant: restaurant,
              isFavorite: _favoriteRestaurantIds.contains(restaurant.id),
              selectedCuisineName: _selectedCuisine?.name,
            ),
      ),
    );
  }

  void _clearSearch() {
    _searchController.clear();
    _searchDebounce?.cancel();

    setState(() {
      _isSearchMode = false;
      _searchResults = [];
      _restaurants = []; // Clear current restaurants to force fresh fetch
    });

    // Clear cache when switching back to map mode
    _restaurantCache.clear();
    _lastFetchedBounds = null;
    _lastFetchedZoom = null;

    // Fetch restaurants at the current visible map area without loading screen
    _fetchRestaurantsQuiet();
  }

  // Fetch restaurants without showing loading indicator (for smooth transitions)
  Future<void> _fetchRestaurantsQuiet() async {
    if (!mounted) return;

    try {
      List<RestaurantDto> allRestaurants;

      // Check if map controller is ready before using it
      if (!_isMapControllerReady()) {
        // If map isn't ready, use default bounds
        final bounds =
            _currentPosition != null
                ? _getBoundsAroundPosition(_currentPosition!, 0.01)
                : LatLngBounds(
                  LatLng(-37.9211, 145.1267), // Melbourne area fallback
                  LatLng(-37.9011, 145.1467),
                );
        await _fetchWithBounds(bounds);
        return;
      }

      // Check if zoom level is sufficient for loading restaurants
      if (_mapController.camera.zoom < _minimumZoomForRestaurants) {
        setState(() {
          _restaurants = [];
        });
        return;
      }

      // Use the visible map bounds
      final bounds = _mapController.camera.visibleBounds;

      allRestaurants = await MapService().getRestaurants(
        swLat: bounds.southWest.latitude,
        swLng: bounds.southWest.longitude,
        neLat: bounds.northEast.latitude,
        neLng: bounds.northEast.longitude,
        cuisineId: _selectedCuisine?.id,
      );

      // Filter restaurants to only show those within bounds
      allRestaurants = _filterRestaurantsInBounds(allRestaurants, bounds);

      final filteredRestaurants = _applyRatingFilter(allRestaurants);

      if (mounted) {
        setState(() {
          _restaurants = filteredRestaurants;
        });
      }
    } catch (e) {
      debugPrint('Error fetching restaurants quietly: $e');
    }
  }

  // Apply rating filter to the list of restaurants
  List<RestaurantDto> _applyRatingFilter(List<RestaurantDto> restaurants) {
    return restaurants.where((restaurant) {
      // Filter by minimum rating
      return restaurant.rating! >= _minimumRating;
    }).toList();
  }

  // Fetch all available cuisines
  Future<void> _fetchCuisines() async {
    try {
      final cuisines = await CuisineService().getAllCuisines();
      if (mounted) {
        setState(() {
          _availableCuisines = cuisines;
        });
      }
    } catch (e) {
      debugPrint('Error fetching cuisines: $e');
    }
  }

  // Get directions to restaurant
  Future<void> _getDirectionsToRestaurant(RestaurantDto restaurant) async {
    if (_currentPosition == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Current location not available')),
      );
      return;
    }

    setState(() {
      _isInDirectionsMode = true;
      _directionsTargetRestaurant = restaurant;
    });

    try {
      debugPrint(
        'Getting directions from ${_currentPosition!.latitude}, ${_currentPosition!.longitude} to ${restaurant.latitude}, ${restaurant.longitude}',
      );

      final directionsData = await _directionsService.getDirections(
        startLat: _currentPosition!.latitude,
        startLon: _currentPosition!.longitude,
        endLat: restaurant.latitude,
        endLon: restaurant.longitude,
      );

      debugPrint('==== FULL DIRECTIONS RESPONSE ====');
      debugPrint('Response type: ${directionsData.runtimeType}');
      debugPrint('Response keys: ${directionsData?.keys}');
      debugPrint('Full response: $directionsData');
      debugPrint('==================================');

      if (directionsData != null) {
        // Check if we have routes
        if (directionsData['routes'] != null &&
            directionsData['routes'] is List) {
          final routes = directionsData['routes'] as List;
          if (routes.isNotEmpty) {
            final route = routes[0] as Map<String, dynamic>;
            final geometry = route['geometry'];

            debugPrint('==== GEOMETRY DEBUG ====');
            debugPrint('Geometry type: ${geometry.runtimeType}');
            debugPrint('Geometry value: $geometry');

            if (geometry is String) {
              debugPrint('Polyline length: ${geometry.length}');
              debugPrint(
                'First 100 chars: ${geometry.substring(0, math.min(100, geometry.length))}',
              );
            } else if (geometry is Map) {
              debugPrint('Geometry is a Map with keys: ${geometry.keys}');
              debugPrint('Full geometry Map: $geometry');
            }
            debugPrint('=======================');

            if (geometry != null && geometry is String) {
              debugPrint('Using google_polyline_algorithm to decode polyline');

              try {
                // Use the proper polyline decoder package
                final List<List<num>> decodedCoords = decodePolyline(geometry);

                debugPrint('Decoded ${decodedCoords.length} coordinate pairs');

                // Convert to LatLng points
                final points =
                    decodedCoords.map((coord) {
                      return LatLng(coord[0].toDouble(), coord[1].toDouble());
                    }).toList();

                if (points.isEmpty) {
                  throw Exception(
                    'No valid points could be decoded from polyline',
                  );
                }

                // Extract duration and distance from route
                final durationValue = route['duration'];
                final distanceValue = route['distance'];

                // Convert to double, handling both int and double types
                final duration =
                    durationValue is num ? durationValue.toDouble() : null;
                final distance =
                    distanceValue is num ? distanceValue.toDouble() : null;

                setState(() {
                  _routePoints = points;
                  _routeDuration = duration;
                  _routeDistance = distance;
                });

                // Zoom map to show both current location and destination
                if (_isMapControllerReady() && _currentPosition != null) {
                  // Calculate bounds that include both points
                  double minLat = math.min(
                    _currentPosition!.latitude,
                    restaurant.latitude,
                  );
                  double maxLat = math.max(
                    _currentPosition!.latitude,
                    restaurant.latitude,
                  );
                  double minLng = math.min(
                    _currentPosition!.longitude,
                    restaurant.longitude,
                  );
                  double maxLng = math.max(
                    _currentPosition!.longitude,
                    restaurant.longitude,
                  );

                  // Add padding (10% on each side)
                  double latPadding = (maxLat - minLat) * 0.1;
                  double lngPadding = (maxLng - minLng) * 0.1;

                  final bounds = LatLngBounds(
                    LatLng(minLat - latPadding, minLng - lngPadding),
                    LatLng(maxLat + latPadding, maxLng + lngPadding),
                  );

                  // Fit map to bounds
                  _mapController.fitCamera(
                    CameraFit.bounds(
                      bounds: bounds,
                      padding: const EdgeInsets.all(50.0),
                    ),
                  );
                }

                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Directions to ${restaurant.name} loaded!'),
                    ),
                  );
                }
                return;
              } catch (e) {
                debugPrint('Error decoding polyline: $e');
                throw Exception('Failed to decode route polyline: $e');
              }
            } else {
              throw Exception('No geometry data in route');
            }
          } else {
            throw Exception('No routes returned from API');
          }
        } else {
          throw Exception('Invalid routes data format');
        }
      } else {
        throw Exception('No directions data received');
      }
    } on Exception catch (e) {
      debugPrint('Exception getting directions: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              'Error getting directions: ${e.toString().replaceFirst('Exception: ', '')}',
            ),
            duration: const Duration(seconds: 5),
          ),
        );
      }
    } catch (e) {
      debugPrint('Unexpected error getting directions: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Unexpected error: ${e.toString()}'),
            duration: const Duration(seconds: 5),
          ),
        );
      }
    }
  }

  // Clear directions
  void _clearDirections() {
    setState(() {
      _routePoints = [];
      _routeDuration = null;
      _routeDistance = null;
      _isInDirectionsMode = false;
      _directionsTargetRestaurant = null;
    });

    // Restore all restaurants by re-fetching them
    _forceFetchRestaurants();
  }

  // Center map on user's current location
  void _centerOnCurrentLocation() {
    if (_currentPosition != null && _isMapControllerReady()) {
      _mapController.move(_currentPosition!, 15.0); // Zoom level 15
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Current location not available'),
          duration: Duration(seconds: 2),
        ),
      );
    }
  }

  // Smooth zoom in
  void _zoomIn() {
    if (_isMapControllerReady()) {
      final currentZoom = _mapController.camera.zoom;
      final newZoom = (currentZoom + 1).clamp(10.0, 18.0);
      _animateToZoom(newZoom);
    }
  }

  // Smooth zoom out
  void _zoomOut() {
    if (_isMapControllerReady()) {
      final currentZoom = _mapController.camera.zoom;
      final newZoom = (currentZoom - 1).clamp(10.0, 18.0);
      _animateToZoom(newZoom);
    }
  }

  // Animate zoom smoothly
  void _animateToZoom(double targetZoom) {
    final animationController = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );

    final startZoom = _mapController.camera.zoom;
    final center = _mapController.camera.center;

    final Animation<double> animation = Tween<double>(
      begin: startZoom,
      end: targetZoom,
    ).animate(
      CurvedAnimation(parent: animationController, curve: Curves.easeInOut),
    );

    animation.addListener(() {
      _mapController.move(center, animation.value);
    });

    animationController.forward().then((_) {
      animationController.dispose();
    });
  }

  // Build the active filters chip
  Widget _buildActiveFiltersChip() {
    // Hide filter tag when directions are active or in search mode
    if (_routePoints.isNotEmpty || _isSearchMode) {
      return const SizedBox.shrink();
    }

    List<Widget> filterWidgets = [];

    if (_selectedCuisine != null) {
      filterWidgets.add(Text(_selectedCuisine!.name));
    }

    if (_minimumRating > 1) {
      if (filterWidgets.isNotEmpty) {
        filterWidgets.add(const Text(' • '));
      }
      filterWidgets.addAll([
        Text('$_minimumRating'),
        Icon(Icons.star, size: 16, color: AppTheme.colorScheme.onPrimary),
      ]);
    }

    if (filterWidgets.isEmpty) return const SizedBox.shrink();

    return Positioned(
      top: 80,
      right: 16,
      child: Chip(
        label: Row(mainAxisSize: MainAxisSize.min, children: filterWidgets),
        deleteIcon: Icon(
          Icons.close,
          size: 18,
          color: AppTheme.colorScheme.onPrimary,
        ),
        onDeleted: () {
          if (_isSearchMode) {
            _clearSearch();
          } else {
            setState(() {
              _selectedCuisine = null;
              _minimumRating = 1;
            });
            // Clear cache when filters change
            _restaurantCache.clear();
            _lastFetchedBounds = null;
            _lastFetchedZoom = null;
            _forceFetchRestaurants();
          }
        },
        backgroundColor: AppTheme.colorScheme.primary,
        side: BorderSide.none,
        labelStyle: TextStyle(
          color: AppTheme.colorScheme.onPrimary,
          fontSize: 14,
        ),
      ),
    );
  }

  // Helper method to format duration and distance
  Widget _buildRouteInfoCard() {
    if (_routeDuration == null || _routeDistance == null) {
      return const SizedBox.shrink();
    }

    final durationInMinutes = (_routeDuration! / 60).round();
    final distanceInKm = (_routeDistance! / 1000);

    return Positioned(
      top: 80, // Move down to below search bar
      left: 16,
      child: Card(
        color: Colors.white.withValues(alpha: 0.9),
        child: Padding(
          padding: const EdgeInsets.all(12.0),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.access_time, size: 16, color: Colors.blue),
                  const SizedBox(width: 4),
                  Text(
                    '$durationInMinutes min',
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 4),
              Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.straighten, size: 16, color: Colors.green),
                  const SizedBox(width: 4),
                  Text(
                    '${distanceInKm.toStringAsFixed(1)} km',
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 14,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSearchInterface() {
    return Positioned(
      top: 16,
      left: 16,
      right: 16,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Search Bar
          Material(
            elevation: 8,
            borderRadius: BorderRadius.circular(25),
            child: Container(
              decoration: BoxDecoration(
                color: Theme.of(context).colorScheme.surface,
                borderRadius: BorderRadius.circular(25),
              ),
              child: TextField(
                controller: _searchController,
                onChanged: _onSearchChanged,
                onSubmitted: _onSearchSubmitted,
                decoration: InputDecoration(
                  hintText: 'Search restaurants...',
                  prefixIcon: const Icon(Icons.search),
                  suffixIcon:
                      (_searchController.text.isNotEmpty ||
                              (_searchResults.isNotEmpty))
                          ? IconButton(
                            icon: const Icon(Icons.clear),
                            onPressed: _clearSearch,
                          )
                          : null,
                  border: InputBorder.none,
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 12,
                  ),
                ),
              ),
            ),
          ),

          // Search Results Dropdown
          if (_searchResults.isNotEmpty)
            Container(
              margin: const EdgeInsets.only(top: 8),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(12),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withAlpha(26),
                    blurRadius: 8,
                    offset: const Offset(0, 2),
                  ),
                ],
              ),
              constraints: const BoxConstraints(maxHeight: 300),
              child: ListView.separated(
                shrinkWrap: true,
                padding: const EdgeInsets.symmetric(vertical: 8),
                itemCount: _searchResults.length,
                separatorBuilder: (context, index) => const Divider(height: 1),
                itemBuilder: (context, index) {
                  final restaurant = _searchResults[index];
                  return ListTile(
                    dense: true,
                    leading: const Icon(
                      Icons.restaurant,
                      color: Colors.red,
                      size: 20,
                    ),
                    title: Text(
                      restaurant.name,
                      style: const TextStyle(
                        fontWeight: FontWeight.w500,
                        fontSize: 14,
                      ),
                    ),
                    subtitle: Text(
                      '${restaurant.rating?.toStringAsFixed(1) ?? 'No rating'} ⭐',
                      style: const TextStyle(fontSize: 12),
                    ),
                    onTap: () => _onSearchResultSelected(restaurant),
                  );
                },
              ),
            ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Map'),
        // Removed automaticallyImplyLeading: false to show back button
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_alt_rounded),
            tooltip: 'Filter',
            onPressed: () async {
              await showDialog(
                context: context,
                builder:
                    (context) => RestaurantFilterDialog(
                      initialMinimumRating: _minimumRating,
                      initialSelectedCuisine: _selectedCuisine,
                      availableCuisines: _availableCuisines,
                      isSearchMode: _isSearchMode,
                      searchQuery: _searchQuery,
                      onApply: (minimumRating, selectedCuisine) {
                        setState(() {
                          _minimumRating = minimumRating;
                          _selectedCuisine = selectedCuisine;
                          _forceFetchRestaurants();
                        });
                      },
                      showCuisineSelectionDialog: ({
                        bool skipApplyLogic = false,
                      }) async {
                        return await showDialog<CuisineDto>(
                          context: context,
                          builder:
                              (context) => CuisineSelectionDialog(
                                availableCuisines: _availableCuisines,
                                skipApplyLogic: skipApplyLogic,
                                onCuisineSelected:
                                    !skipApplyLogic
                                        ? (cuisine) {
                                          setState(() {
                                            _selectedCuisine = cuisine;
                                            _forceFetchRestaurants();
                                          });
                                        }
                                        : null,
                              ),
                        );
                      },
                    ),
              );
            },
          ),
        ],
      ),
      body:
          _isLoading
              ? Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    CircularProgressIndicator(),
                    SizedBox(height: 16),
                    Text('Loading map and restaurants...'),
                  ],
                ),
              )
              : Stack(
                children: [
                  FlutterMap(
                    mapController: _mapController,
                    options: MapOptions(
                      initialCenter:
                          _currentPosition ?? LatLng(37.9111, 145.1367),
                      initialZoom: 13,
                      minZoom: 10,
                      maxZoom: 18,
                      // Add smooth interaction settings
                      interactionOptions: const InteractionOptions(
                        flags: InteractiveFlag.all,
                        enableMultiFingerGestureRace: true,
                        rotationThreshold: 20.0,
                        pinchZoomThreshold: 0.5,
                        pinchMoveThreshold: 40.0,
                        scrollWheelVelocity:
                            0.002, // Reduced from 0.005 for slower scrolling
                      ),
                      keepAlive: true,
                      backgroundColor: Colors.grey[100]!,
                      onMapReady: () {
                        // Map is ready - no action needed since we handle loading in initState
                      },
                      onPositionChanged: (MapCamera camera, bool hasGesture) {
                        if (hasGesture && !_isLoading && !_isSearchMode) {
                          // Check if zoom level is sufficient, if not clear restaurants
                          if (camera.zoom < _minimumZoomForRestaurants) {
                            setState(() {
                              _restaurants = [];
                            });
                          } else {
                            // Use debounced fetching to prevent excessive API calls
                            _debouncedFetchRestaurants();
                          }
                        }
                      },
                    ),
                    children: [
                      TileLayer(
                        urlTemplate:
                            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                        userAgentPackageName: 'com.nibbles.findingnibbles',
                        maxNativeZoom: 19,
                        maxZoom: 22,
                        keepBuffer: 8,
                        panBuffer: 2,
                        tileDisplay: const TileDisplay.fadeIn(
                          duration: Duration(milliseconds: 200),
                        ),
                      ),
                      if (_routePoints.isNotEmpty)
                        PolylineLayer(
                          polylines: [
                            Polyline(
                              points: _routePoints,
                              strokeWidth: 4.0,
                              color: Colors.blue,
                            ),
                          ],
                        ),
                      MarkerLayer(
                        markers: [
                          // Current location marker (grey)
                          if (_currentPosition != null)
                            Marker(
                              point: _currentPosition!,
                              width: 30,
                              height: 30,
                              child: Container(
                                decoration: BoxDecoration(
                                  color: Colors.blue[600],
                                  shape: BoxShape.circle,
                                  border: Border.all(
                                    color: Colors.white,
                                    width: 3,
                                  ),
                                ),
                                child: Icon(
                                  Icons.person,
                                  color: Colors.white,
                                  size: 16,
                                ),
                              ),
                            ),
                          // Restaurant markers (red) - show in search mode, when zoom is sufficient, or if it's the target restaurant
                          if (_isSearchMode ||
                              !_isMapControllerReady() ||
                              _mapController.camera.zoom >=
                                  _minimumZoomForRestaurants)
                            ..._restaurants
                                .where((restaurant) {
                                  // If in directions mode, only show the target restaurant
                                  if (_isInDirectionsMode &&
                                      _directionsTargetRestaurant != null) {
                                    return restaurant.id ==
                                        _directionsTargetRestaurant!.id;
                                  }
                                  // Otherwise show all restaurants
                                  return true;
                                })
                                .map((restaurant) {
                                  return Marker(
                                    point: LatLng(
                                      restaurant.latitude,
                                      restaurant.longitude,
                                    ),
                                    width: 40,
                                    height: 40,
                                    child: GestureDetector(
                                      onTap: () {
                                        // Navigate to restaurant details page
                                        Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                            builder:
                                                (context) =>
                                                    RestaurantDetailsPage(
                                                      restaurant: restaurant,
                                                      isFavorite:
                                                          _favoriteRestaurantIds
                                                              .contains(
                                                                restaurant.id,
                                                              ),
                                                      selectedCuisineName:
                                                          _selectedCuisine
                                                              ?.name,
                                                    ),
                                          ),
                                        ).then((_) {
                                          // Refresh favorite status when returning
                                          _loadFavoriteRestaurants();
                                        });
                                      },
                                      child: const Icon(
                                        Icons.location_pin,
                                        color: Colors.red,
                                        size: 40,
                                      ),
                                    ),
                                  );
                                }),
                          // Always show the target restaurant marker if one was provided from widget or directions
                          if ((widget.targetRestaurant != null &&
                                  !_restaurants.any(
                                    (r) => r.id == widget.targetRestaurant!.id,
                                  )) ||
                              (_isInDirectionsMode &&
                                  _directionsTargetRestaurant != null &&
                                  !_restaurants.any(
                                    (r) =>
                                        r.id == _directionsTargetRestaurant!.id,
                                  )))
                            Marker(
                              point: LatLng(
                                (_directionsTargetRestaurant ??
                                        widget.targetRestaurant)!
                                    .latitude,
                                (_directionsTargetRestaurant ??
                                        widget.targetRestaurant)!
                                    .longitude,
                              ),
                              width: 40,
                              height: 40,
                              child: GestureDetector(
                                onTap: () {
                                  final restaurant =
                                      _directionsTargetRestaurant ??
                                      widget.targetRestaurant!;
                                  // Navigate to restaurant details page
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder:
                                          (context) => RestaurantDetailsPage(
                                            restaurant: restaurant,
                                            isFavorite: _favoriteRestaurantIds
                                                .contains(restaurant.id),
                                            selectedCuisineName:
                                                _selectedCuisine?.name,
                                          ),
                                    ),
                                  ).then((_) {
                                    // Refresh favorite status when returning
                                    _loadFavoriteRestaurants();
                                  });
                                },
                                child: const Icon(
                                  Icons.location_pin,
                                  color: Colors.red,
                                  size: 40,
                                ),
                              ),
                            ),
                        ],
                      ),
                    ],
                  ),
                  // Search Interface with live results
                  _buildSearchInterface(),
                  // Clear Directions Button (if route is active)
                  if (_routePoints.isNotEmpty)
                    Positioned(
                      top: 80,
                      right: 16,
                      child: FloatingActionButton(
                        heroTag: 'clearDirectionsButton',
                        onPressed: _clearDirections,
                        backgroundColor: Colors.red,
                        child: const Icon(Icons.clear, color: Colors.white),
                      ),
                    ),
                  // My Location Button
                  Positioned(
                    bottom: 16, // at the bottom corner
                    right: 16,
                    child: FloatingActionButton(
                      heroTag: 'myLocationButton',
                      onPressed: _centerOnCurrentLocation,
                      backgroundColor: Colors.white,
                      child: Icon(Icons.my_location, color: Colors.blue[700]),
                    ),
                  ),
                  // Zoom Controls (bottom left)
                  Positioned(
                    bottom: 16,
                    left: 16,
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        // Zoom In Button
                        Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(8),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withValues(alpha: 0.2),
                                blurRadius: 4,
                                offset: const Offset(0, 2),
                              ),
                            ],
                          ),
                          child: IconButton(
                            padding: EdgeInsets.zero,
                            icon: const Icon(Icons.add, size: 20),
                            onPressed: _zoomIn,
                            color: Colors.grey[800],
                          ),
                        ),
                        const SizedBox(height: 8),
                        // Zoom Out Button
                        Container(
                          width: 40,
                          height: 40,
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(8),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.black.withValues(alpha: 0.2),
                                blurRadius: 4,
                                offset: const Offset(0, 2),
                              ),
                            ],
                          ),
                          child: IconButton(
                            padding: EdgeInsets.zero,
                            icon: const Icon(Icons.remove, size: 20),
                            onPressed: _zoomOut,
                            color: Colors.grey[800],
                          ),
                        ),
                      ],
                    ),
                  ),
                  _buildActiveFiltersChip(),
                  _buildRouteInfoCard(),
                ],
              ),
    );
  }

  @override
  void dispose() {
    _positionStreamSubscription?.cancel();
    _debounceTimer?.cancel();
    _positionUpdateTimer?.cancel();
    _searchDebounce?.cancel();
    _restaurantCache.clear();
    _mapController.dispose();
    _searchController.dispose();
    super.dispose();
  }
}
