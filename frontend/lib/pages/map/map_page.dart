import 'dart:async';
import 'dart:math' as math;

import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:geolocator/geolocator.dart';
import 'package:latlong2/latlong.dart';
import 'package:nibbles/pages/shared/widgets/cuisine_selection_dialog.dart';
import 'package:nibbles/pages/shared/widgets/restaurant_filter_dialog.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/service/cuisine/cuisine_service.dart';
import 'package:nibbles/service/directions/directions_service.dart';
import 'package:nibbles/service/map/map_service.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'package:nibbles/theme/app_theme.dart';
import 'package:nibbles/widgets/search_decoration.dart';

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
  const MapPage({super.key});

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
  bool _isLoadingDirections = false;
  final DirectionsService _directionsService = DirectionsService();
  double? _routeDuration; // in seconds
  double? _routeDistance; // in meters
  // Search variables
  final TextEditingController _searchController = TextEditingController();
  String _searchQuery = '';
  bool _isSearchMode = false;

  @override
  void initState() {
    super.initState();
    _isLoading = true; // Start with loading screen
    _initializeMapAndData();
    _fetchCuisines();
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
    return LatLngBounds(
      LatLng(center.latitude - offset, center.longitude - offset),
      LatLng(center.latitude + offset, center.longitude + offset),
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
    if (query.trim() == _searchQuery) return;

    setState(() {
      _searchQuery = query.trim();
      _isSearchMode = _searchQuery.isNotEmpty;
    });

    // Clear cache when starting a new search
    _restaurantCache.clear();
    _lastFetchedBounds = null;

    if (_searchQuery.isEmpty) {
      _fetchRestaurantsInitial();
      return;
    }

    // Trigger search immediately on Enter key press
    _fetchRestaurantsInitial();
  }

  void _clearSearch() {
    _searchController.clear();
    setState(() {
      _searchQuery = '';
      _isSearchMode = false;
    });

    // Clear cache when switching back to map mode
    _restaurantCache.clear();
    _lastFetchedBounds = null;
    _lastFetchedZoom = null;

    _fetchRestaurantsInitial();
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

  // Simple polyline decoder (basic implementation)
  List<LatLng> _decodePolyline(String polyline) {
    List<LatLng> points = [];
    int index = 0;
    int len = polyline.length;
    int lat = 0;
    int lng = 0;

    while (index < len) {
      int b;
      int shift = 0;
      int result = 0;
      do {
        b = polyline.codeUnitAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      int dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = polyline.codeUnitAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      int dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.add(LatLng(lat / 1E5, lng / 1E5));
    }

    return points;
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
      _isLoadingDirections = true;
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

      debugPrint('Received directions data: $directionsData');

      if (directionsData != null) {
        // Check if we have routes
        if (directionsData['routes'] != null &&
            directionsData['routes'] is List) {
          final routes = directionsData['routes'] as List;
          if (routes.isNotEmpty) {
            final route = routes[0] as Map<String, dynamic>;
            final geometry = route['geometry'];

            if (geometry != null && geometry is String) {
              debugPrint(
                'Decoding polyline geometry: ${geometry.substring(0, math.min(50, geometry.length))}...',
              );

              final points = _decodePolyline(geometry);
              debugPrint('Decoded ${points.length} points');

              // Extract duration and distance from route
              final durationValue = route['duration'];
              final distanceValue = route['distance'];

              // Convert to double, handling both int and double types
              final duration =
                  durationValue is num ? durationValue.toDouble() : null;
              final distance =
                  distanceValue is num ? distanceValue.toDouble() : null;

              if (points.isNotEmpty) {
                setState(() {
                  _routePoints = points;
                  _routeDuration = duration;
                  _routeDistance = distance;
                });

                if (mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text('Directions to ${restaurant.name} loaded!'),
                    ),
                  );
                }
                return;
              } else {
                throw Exception('No route points could be decoded');
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
    } finally {
      setState(() {
        _isLoadingDirections = false;
      });
    }
  }

  // Clear directions
  void _clearDirections() {
    setState(() {
      _routePoints = [];
      _routeDuration = null;
      _routeDistance = null;
    });
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
    List<Widget> filterWidgets = [];

    if (_isSearchMode && _searchQuery.isNotEmpty) {
      filterWidgets.add(Text('Search: "$_searchQuery"'));
    }

    if (!_isSearchMode && _selectedCuisine != null) {
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
      top: 16,
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Map'),
        automaticallyImplyLeading: false, // Hide back button
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
                          // Restaurant markers (red) - show in search mode or when zoom is sufficient
                          if (_isSearchMode ||
                              !_isMapControllerReady() ||
                              _mapController.camera.zoom >=
                                  _minimumZoomForRestaurants)
                            ..._restaurants.map((restaurant) {
                              return Marker(
                                point: LatLng(
                                  restaurant.latitude,
                                  restaurant.longitude,
                                ),
                                width: 40,
                                height: 40,
                                child: GestureDetector(
                                  onTap: () {
                                    showDialog(
                                      context: context,
                                      builder:
                                          (context) => AlertDialog(
                                            title: Text(
                                              restaurant.name,
                                              style:
                                                  Theme.of(
                                                    context,
                                                  ).textTheme.titleLarge,
                                            ),
                                            content: Column(
                                              mainAxisSize: MainAxisSize.min,
                                              crossAxisAlignment:
                                                  CrossAxisAlignment.start,
                                              children: [
                                                RichText(
                                                  text: TextSpan(
                                                    style:
                                                        DefaultTextStyle.of(
                                                          context,
                                                        ).style,
                                                    children: [
                                                      TextSpan(
                                                        text: 'Rating: ',
                                                        style: TextStyle(
                                                          fontWeight:
                                                              FontWeight.bold,
                                                        ),
                                                      ),
                                                      TextSpan(
                                                        text:
                                                            '${restaurant.rating}',
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                                SizedBox(height: 8),
                                                Text.rich(
                                                  TextSpan(
                                                    children: [
                                                      TextSpan(
                                                        text: 'Total reviews: ',
                                                        style: TextStyle(
                                                          fontWeight:
                                                              FontWeight.bold,
                                                        ),
                                                      ),
                                                      TextSpan(
                                                        text:
                                                            '${restaurant.userRatingsTotal}',
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                                // Removed phone number row and empty widget
                                                SizedBox(height: 8),
                                                // Add cuisines
                                                if (restaurant
                                                    .getFormattedCuisineNames()
                                                    .isNotEmpty) ...[
                                                  Text.rich(
                                                    TextSpan(
                                                      children: [
                                                        TextSpan(
                                                          text: 'Cuisines: ',
                                                          style: TextStyle(
                                                            fontWeight:
                                                                FontWeight.bold,
                                                          ),
                                                        ),
                                                        TextSpan(
                                                          text: restaurant
                                                              .getFormattedCuisineNames(
                                                                priorityCuisineId:
                                                                    _selectedCuisine
                                                                        ?.id,
                                                                maxLength: 50,
                                                              ),
                                                        ),
                                                      ],
                                                    ),
                                                  ),
                                                  SizedBox(height: 8),
                                                ],
                                                Text.rich(
                                                  TextSpan(
                                                    children: [
                                                      TextSpan(
                                                        text: 'Address: ',
                                                        style: TextStyle(
                                                          fontWeight:
                                                              FontWeight.bold,
                                                        ),
                                                      ),
                                                      TextSpan(
                                                        text:
                                                            '${restaurant.address}',
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                              ],
                                            ),
                                            actions: [
                                              TextButton(
                                                onPressed:
                                                    _isLoadingDirections
                                                        ? null
                                                        : () {
                                                          Navigator.pop(
                                                            context,
                                                          );
                                                          _getDirectionsToRestaurant(
                                                            restaurant,
                                                          );
                                                        },
                                                child:
                                                    _isLoadingDirections
                                                        ? const SizedBox(
                                                          width: 16,
                                                          height: 16,
                                                          child:
                                                              CircularProgressIndicator(
                                                                strokeWidth: 2,
                                                              ),
                                                        )
                                                        : const Text(
                                                          'Get Directions',
                                                        ),
                                              ),
                                              TextButton(
                                                onPressed:
                                                    () =>
                                                        Navigator.pop(context),
                                                child: const Text('Close'),
                                              ),
                                            ],
                                          ),
                                    );
                                  },
                                  child: const Icon(
                                    Icons.location_pin,
                                    color: Colors.red,
                                    size: 40,
                                  ),
                                ),
                              );
                            }),
                        ],
                      ),
                    ],
                  ),
                  // Floating Search Bubble (now full width)
                  Positioned(
                    top: 16,
                    left: 16,
                    right: 16,
                    child: Material(
                      elevation: 8,
                      borderRadius: BorderRadius.circular(25),
                      child: Container(
                        decoration: BoxDecoration(
                          color: Theme.of(context).colorScheme.surface,
                          borderRadius: BorderRadius.circular(25),
                        ),
                        child: TextField(
                          controller: _searchController,
                          onSubmitted: _onSearchSubmitted,
                          decoration: buildSearchDecoration(
                            colorScheme: Theme.of(context).colorScheme,
                            hintText:
                                'Search restaurants by name... (Press Enter)',
                            suffixIcon:
                                _searchQuery.isNotEmpty
                                    ? IconButton(
                                      icon: const Icon(Icons.clear),
                                      onPressed: _clearSearch,
                                    )
                                    : null,
                          ),
                        ),
                      ),
                    ),
                  ),
                  // Clear Directions Button (if route is active)
                  if (_routePoints.isNotEmpty)
                    Positioned(
                      top: 80, // below the AppBar
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
                                color: Colors.black.withOpacity(0.2),
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
                                color: Colors.black.withOpacity(0.2),
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
    _restaurantCache.clear();
    _mapController.dispose();
    _searchController.dispose();
    super.dispose();
  }
}
