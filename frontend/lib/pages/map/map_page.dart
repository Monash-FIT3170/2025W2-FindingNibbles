import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:geolocator/geolocator.dart';
import 'dart:async';
import 'dart:math' as math;
import 'package:nibbles/service/map/map_service.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/service/cuisine/cuisine_service.dart';
import 'package:nibbles/service/directions/directions_service.dart';
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
  const MapPage({super.key});

  @override
  State<MapPage> createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  late final MapController _mapController = MapController();
  LatLng? _currentPosition;
  StreamSubscription<Position>? _positionStreamSubscription;
  List<RestaurantDto> _restaurants = [];
  bool _isLoading = false;
  final bool useCurrentLocation = false; // Use current location if available

  // Filter variables
  int _minimumRating = 1;
  List<CuisineDto> _availableCuisines = [];
  CuisineDto? _selectedCuisine;

  // Directions variables
  List<LatLng> _routePoints = [];
  bool _isLoadingDirections = false;
  final DirectionsService _directionsService = DirectionsService();

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
        setState(() {
          _currentPosition = const LatLng(-37.907803, 145.133957);
        });
        _forceFetchRestaurants();
        return;
      }
    }

    if (permission == LocationPermission.deniedForever) {
      // Set default location if permissions are permanently denied
      setState(() {
        _currentPosition = const LatLng(-37.907803, 145.133957);
      });
      _forceFetchRestaurants();
      return;
    }

    try {
      // Get current position
      final position = await Geolocator.getCurrentPosition();
      if (mounted) {
        setState(() {
          _currentPosition = LatLng(position.latitude, position.longitude);
        });
      }
    } catch (e) {
      // Set default location if getting position fails
      setState(() {
        _currentPosition = const LatLng(-37.907803, 145.133957);
      });
      _forceFetchRestaurants();
      return;
    }

    // Listen for position updates (but don't fetch restaurants on each update)
    _positionStreamSubscription = Geolocator.getPositionStream().listen((
      Position pos,
    ) {
      final newPos = LatLng(pos.latitude, pos.longitude);
      if (mounted) {
        setState(() {
          _currentPosition = newPos;
        });
        _mapController.move(newPos, _mapController.camera.zoom);
      }
    });
  }

  // Initial fetch during startup (doesn't show loading indicator)
  Future<void> _fetchRestaurantsInitial() async {
    if (!mounted) return;

    try {
      final bounds =
          _currentPosition != null
              ? _getBoundsAroundPosition(
                _currentPosition!,
                0.01,
              ) // Create bounds around current position
              : LatLngBounds(
                LatLng(37.9011, 145.1267), // Melbourne area fallback
                LatLng(37.9211, 145.1467),
              );

      final allRestaurants = await MapService().getRestaurants(
        swLat: bounds.southWest.latitude,
        swLng: bounds.southWest.longitude,
        neLat: bounds.northEast.latitude,
        neLng: bounds.northEast.longitude,
        cuisineId: _selectedCuisine?.id,
      );

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

  // Force fetch restaurants (shows loading indicator)
  Future<void> _forceFetchRestaurants() async {
    if (!mounted) return;

    setState(() {
      _isLoading = true;
    });

    try {
      final bounds = _mapController.camera.visibleBounds;

      final allRestaurants = await MapService().getRestaurants(
        swLat: bounds.southWest.latitude,
        swLng: bounds.southWest.longitude,
        neLat: bounds.northEast.latitude,
        neLng: bounds.northEast.longitude,
        cuisineId: _selectedCuisine?.id,
      );

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
      final allRestaurants = await MapService().getRestaurants(
        swLat: bounds.southWest.latitude,
        swLng: bounds.southWest.longitude,
        neLat: bounds.northEast.latitude,
        neLng: bounds.northEast.longitude,
        cuisineId: _selectedCuisine?.id,
      );

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
    if (!mounted || _isLoading) return;

    final bounds = _mapController.camera.visibleBounds;
    await _fetchWithBounds(bounds);
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
      debugPrint('Getting directions from ${_currentPosition!.latitude}, ${_currentPosition!.longitude} to ${restaurant.latitude}, ${restaurant.longitude}');
      
      final directionsData = await _directionsService.getDirections(
        startLat: _currentPosition!.latitude,
        startLon: _currentPosition!.longitude,
        endLat: restaurant.latitude,
        endLon: restaurant.longitude,
      );

      debugPrint('Received directions data: $directionsData');

      if (directionsData != null) {
        // Check if we have routes
        if (directionsData['routes'] != null && directionsData['routes'] is List) {
          final routes = directionsData['routes'] as List;
          if (routes.isNotEmpty) {
            final route = routes[0] as Map<String, dynamic>;
            final geometry = route['geometry'];
            
            if (geometry != null && geometry is String) {
              debugPrint('Decoding polyline geometry: ${geometry.substring(0, math.min(50, geometry.length))}...');
              
              final points = _decodePolyline(geometry);
              debugPrint('Decoded ${points.length} points');
              
              if (points.isNotEmpty) {
                setState(() {
                  _routePoints = points;
                });
                
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text('Directions to ${restaurant.name} loaded!')),
                );
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
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Error getting directions: ${e.toString().replaceFirst('Exception: ', '')}'),
          duration: const Duration(seconds: 5),
        ),
      );
    } catch (e) {
      debugPrint('Unexpected error getting directions: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Unexpected error: ${e.toString()}'),
          duration: const Duration(seconds: 5),
        ),
      );
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
    });
  }

  // Show filter dialog
  void _showFilterDialog() {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (context, setState) {
            return AlertDialog(
              title: const Text('Filter Restaurants'),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  ListTile(
                    leading: const Icon(Icons.star),
                    title: const Text('Min Rating'),
                    subtitle: DropdownButton<int>(
                      value: _minimumRating,
                      isExpanded: true,
                      items:
                          List.generate(5, (index) => index + 1)
                              .map(
                                (rating) => DropdownMenuItem(
                                  value: rating,
                                  child: Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Text('$rating'),
                                      const SizedBox(width: 4),
                                      Icon(
                                        Icons.star,
                                        size: 16,
                                        color: colorScheme.onSurface,
                                      ),
                                    ],
                                  ),
                                ),
                              )
                              .toList(),
                      onChanged: (value) {
                        setState(() {
                          _minimumRating = value!;
                        });
                      },
                    ),
                  ),
                  ListTile(
                    leading: const Icon(Icons.restaurant_menu),
                    title: const Text('Cuisine'),
                    subtitle: DropdownButton<CuisineDto?>(
                      value: _selectedCuisine,
                      isExpanded: true,
                      items: [
                        const DropdownMenuItem<CuisineDto?>(
                          value: null,
                          child: Text('All'),
                        ),
                        ..._availableCuisines.map(
                          (cuisine) => DropdownMenuItem(
                            value: cuisine,
                            child: Text(cuisine.name),
                          ),
                        ),
                      ],
                      onChanged: (value) {
                        setState(() {
                          _selectedCuisine = value;
                        });
                      },
                    ),
                  ),
                ],
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('Cancel'),
                ),
                TextButton(
                  onPressed: () {
                    Navigator.pop(context);
                    // Re-apply filters to currently loaded restaurants
                    if (_restaurants.isNotEmpty) {
                      _refreshFilters();
                    } else {
                      // If no restaurants loaded, fetch fresh data
                      _forceFetchRestaurants();
                    }
                  },
                  child: const Text('Apply'),
                ),
              ],
            );
          },
        );
      },
    );
  }

  // Refresh filters and re-fetch restaurants
  void _refreshFilters() {
    // Re-fetch from API (for cuisine filter) and apply rating filter
    _forceFetchRestaurants();
  }

  // Build the active filters chip
  Widget _buildActiveFiltersChip() {
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
          setState(() {
            _selectedCuisine = null;
            _minimumRating = 1;
          });
          _forceFetchRestaurants();
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Map'),
        automaticallyImplyLeading: false, // Hide back button
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
                      onMapReady: () {
                        // Map is ready - no action needed since we handle loading in initState
                      },
                      onPositionChanged: (MapCamera camera, bool hasGesture) {
                        if (hasGesture && !_isLoading) {
                          _fetchRestaurantsInBounds();
                        }
                      },
                    ),
                    children: [
                      TileLayer(
                        urlTemplate:
                            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                        userAgentPackageName: 'com.nibbles.findingnibbles',
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
                        markers:
                            _restaurants.map((restaurant) {
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
                                                SizedBox(height: 8),
                                                Text.rich(
                                                  TextSpan(
                                                    children: [
                                                      TextSpan(
                                                        text: 'PH: ',
                                                        style: TextStyle(
                                                          fontWeight:
                                                              FontWeight.bold,
                                                        ),
                                                      ),
                                                      TextSpan(
                                                        text:
                                                            restaurant
                                                                .formattedPhoneNum ??
                                                            'Not available',
                                                      ),
                                                    ],
                                                  ),
                                                ),
                                                SizedBox(height: 8),
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
                                              if (_routePoints.isNotEmpty)
                                                TextButton(
                                                  onPressed: () {
                                                    Navigator.pop(context);
                                                    _clearDirections();
                                                  },
                                                  child: const Text('Clear Route'),
                                                ),
                                              TextButton(
                                                onPressed: _isLoadingDirections
                                                    ? null
                                                    : () {
                                                        Navigator.pop(context);
                                                        _getDirectionsToRestaurant(restaurant);
                                                      },
                                                child: _isLoadingDirections
                                                    ? const SizedBox(
                                                        width: 16,
                                                        height: 16,
                                                        child: CircularProgressIndicator(strokeWidth: 2),
                                                      )
                                                    : const Text('Get Directions'),
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
                            }).toList(),
                      ),
                    ],
                  ),
                  Positioned(
                    top: 16,
                    right: 16,
                    child: Column(
                      children: [
                        FloatingActionButton(
                          heroTag: 'filterButton',
                          onPressed: _showFilterDialog,
                          child: const Icon(Icons.filter_alt_rounded),
                        ),
                        if (_routePoints.isNotEmpty) ...[
                          const SizedBox(height: 8),
                          FloatingActionButton(
                            heroTag: 'clearDirectionsButton',
                            onPressed: _clearDirections,
                            backgroundColor: Colors.red,
                            child: const Icon(Icons.clear, color: Colors.white),
                          ),
                        ],
                      ],
                    ),
                  ),
                  _buildActiveFiltersChip(),
                ],
              ),
    );
  }

  @override
  void dispose() {
    _positionStreamSubscription?.cancel();
    _mapController.dispose();
    super.dispose();
  }
}
