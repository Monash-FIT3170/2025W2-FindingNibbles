import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:geolocator/geolocator.dart';
import 'dart:async';
import 'package:nibbles/service/map/map_service.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'package:nibbles/service/cuisine/cuisine_service.dart';
import 'package:nibbles/pages/home/restaurant_filter_widget.dart';

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

class _MapPageState extends State<MapPage> with RestaurantFilterMixin {
  late final MapController _mapController = MapController();
  LatLng? _currentPosition;
  StreamSubscription<Position>? _positionStreamSubscription;
  List<RestaurantDto> _restaurants = [];
  bool _isLoading = false;
  final bool useCurrentLocation = false; // Use current location if available

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
      return Future.error('Location services are disabled.');
    }

    // Check for permissions
    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return Future.error('Location permissions are denied.');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      return Future.error('Location permissions are permanently denied.');
    }

    // Get current position
    final position = await Geolocator.getCurrentPosition();
    if (mounted) {
      setState(() {
        _currentPosition = LatLng(position.latitude, position.longitude);
      });
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
      final bounds = _currentPosition != null
          ? _getBoundsAroundPosition(_currentPosition!, 0.01)
          : LatLngBounds(
              LatLng(37.9011, 145.1267), // Melbourne area fallback
              LatLng(37.9211, 145.1467),
            );

      final allRestaurants = await MapService().getRestaurants(
        swLat: bounds.southWest.latitude,
        swLng: bounds.southWest.longitude,
        neLat: bounds.northEast.latitude,
        neLng: bounds.northEast.longitude,
        cuisineId: currentFilter.selectedCuisine?.id, // Use filter from mixin
      );

      final filteredRestaurants = applyRatingFilter(allRestaurants); // Use mixin method

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
        cuisineId: currentFilter.selectedCuisine?.id, // Use filter from mixin
      );

      final filteredRestaurants = applyRatingFilter(allRestaurants); // Use mixin method

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
        cuisineId: currentFilter.selectedCuisine?.id, // Use filter from mixin
      );

      final filteredRestaurants = applyRatingFilter(allRestaurants); // Use mixin method

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

  // Fetch all available cuisines
  Future<void> _fetchCuisines() async {
    try {
      final cuisines = await CuisineService().getAllCuisines();
      setAvailableCuisines(cuisines); // Use mixin method
    } catch (e) {
      debugPrint('Error fetching cuisines: $e');
    }
  }

  @override
  void onFilterChanged(RestaurantFilterData filter) {
    // Called when filters are applied
    if (_restaurants.isNotEmpty) {
      _forceFetchRestaurants();
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Map'),
        automaticallyImplyLeading: false, // Hide back button
      ),
      body: _isLoading
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
                      userAgentPackageName: 'com.example.app',
                    ),
                    MarkerLayer(
                      markers: _restaurants.map((restaurant) {
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
                                builder: (context) => AlertDialog(
                                  title: Text(
                                    restaurant.name,
                                    style: Theme.of(context).textTheme.titleLarge,
                                  ),
                                  content: Column(
                                    mainAxisSize: MainAxisSize.min,
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      RichText(
                                        text: TextSpan(
                                          style: DefaultTextStyle.of(context).style,
                                          children: [
                                            TextSpan(
                                              text: 'Rating: ',
                                              style: TextStyle(
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                            TextSpan(
                                              text: '${restaurant.rating}',
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
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                            TextSpan(
                                              text: '${restaurant.userRatingsTotal}',
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
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                            TextSpan(
                                              text: restaurant.formattedPhoneNum ??
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
                                                fontWeight: FontWeight.bold,
                                              ),
                                            ),
                                            TextSpan(
                                              text: '${restaurant.formattedAddress}',
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                  actions: [
                                    TextButton(
                                      onPressed: () => Navigator.pop(context),
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
                  child: FloatingActionButton(
                    heroTag: 'filterButton',
                    onPressed: () => showFilterDialog(context), // Use mixin method
                    child: const Icon(Icons.filter_alt_rounded),
                  ),
                ),
                // Use the new filter chip widget
                Positioned(
                  top: 80,
                  right: 16,
                  child: RestaurantFilterChip(
                    filter: currentFilter,
                    onClear: clearFilters, // Use mixin method
                    showForMap: true, // Map view style
                  ),
                ),
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