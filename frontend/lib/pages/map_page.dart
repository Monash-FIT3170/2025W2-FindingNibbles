import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:geolocator/geolocator.dart';
import 'dart:async';
import 'package:nibbles/service/map/map_service.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/service/cuisine/cuisine_service.dart';

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
  Timer? _loadTimer; // Timer for repeated attempts

  // Add these variables near the top of the class
  int _minimumRating = 1; // 1 = $, 2 = $$, 3 = $$$
  List<CuisineDto> _availableCuisines = [];
  CuisineDto? _selectedCuisine;

  @override
  void initState() {
    super.initState();
    _getCurrentLocation();

    // Start aggressive loading attempts right away
    _startAggressiveLoading();

    _fetchCuisines(); // Add this line
  }

  // Start aggressive attempts to load restaurants
  void _startAggressiveLoading() {
    // Cancel any existing timer
    _loadTimer?.cancel();

    // Immediate attempt
    _forceFetchRestaurants();

    // Set up a timer for repeated attempts
    _loadTimer = Timer.periodic(const Duration(milliseconds: 500), (timer) {
      _forceFetchRestaurants();

      // Stop after 10 seconds to prevent infinite attempts
      if (timer.tick > 20) {
        timer.cancel();
      }

      // Stop if we successfully loaded restaurants
      if (_restaurants.isNotEmpty) {
        timer.cancel();
      }
    });
  }

  Future<void> _getCurrentLocation() async {
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

      // Force fetch after getting location
      _forceFetchRestaurants();
    }

    // Listen for position updates
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

  // Force fetch restaurants even if bounds might not be fully initialized
  Future<void> _forceFetchRestaurants() async {
    if (!mounted) return;

    // Try to get current bounds
    final bounds = _mapController.camera.visibleBounds;

    await _fetchWithBounds(bounds);
  }

  // Helper to fetch with known bounds
  Future<void> _fetchWithBounds(LatLngBounds bounds) async {
    if (_isLoading) return;

    setState(() {
      _isLoading = true;
    });

    try {
      // Fetch restaurants from the backend using MapService with cuisine filter
      final allRestaurants = await MapService().getRestaurants(
        swLat: bounds.southWest.latitude,
        swLng: bounds.southWest.longitude,
        neLat: bounds.northEast.latitude,
        neLng: bounds.northEast.longitude,
        cuisineId: _selectedCuisine?.id, // Backend cuisine filter
      );

      // Apply frontend rating filter
      final filteredRestaurants = _applyRatingFilter(allRestaurants);

      if (mounted) {
        setState(() {
          _restaurants = filteredRestaurants; // Use filtered list
          _isLoading = false;
        });

        if (filteredRestaurants.isNotEmpty) {
          _loadTimer?.cancel();
        }
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
      }
    }
  }

  // Apply rating filter to the list of restaurants
  List<RestaurantDto> _applyRatingFilter(List<RestaurantDto> restaurants) {
    return restaurants.where((restaurant) {
      // Filter by minimum rating
      return restaurant.rating! >= _minimumRating;
    }).toList();
  }

  // Fetch restaurants in response to user actions (like dragging the map)
  Future<void> _fetchRestaurantsInBounds() async {
    if (!mounted) return;

    // Get current map bounds
    final bounds = _mapController.camera.visibleBounds;
    // if (bounds == null) return;

    await _fetchWithBounds(bounds);
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

  // Show filter dialog
  void _showFilterDialog() {
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
                                  child: Text('$rating ⭐'),
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
    List<String> activeFilters = [];

    if (_selectedCuisine != null) {
      activeFilters.add(_selectedCuisine!.name);
    }

    if (_minimumRating > 1) {
      activeFilters.add('$_minimumRating+ ⭐');
    }

    if (activeFilters.isEmpty) return const SizedBox.shrink();

    return Positioned(
      top: 80,
      right: 16,
      child: Chip(
        label: Text(activeFilters.join(' • ')),
        deleteIcon: const Icon(Icons.close, size: 18),
        onDeleted: () {
          setState(() {
            _selectedCuisine = null;
            _minimumRating = 1;
          });
          _forceFetchRestaurants();
        },
        backgroundColor: Colors.blue.shade100,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Map')),
      body: Stack(
        children: [
          FlutterMap(
            mapController: _mapController,
            options: MapOptions(
              initialCenter: _currentPosition ?? LatLng(37.9111, 145.1367),
              initialZoom: 13,
              onMapReady: () {
                // Try to fetch when map is ready
                _forceFetchRestaurants();
              },
              onPositionChanged: (MapCamera camera, bool hasGesture) {
                if (hasGesture) {
                  _fetchRestaurantsInBounds();
                }
              },
            ),
            children: [
              TileLayer(
                urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                userAgentPackageName: 'com.example.app',
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
                                    title: Text(restaurant.name),
                                    content: Column(
                                      mainAxisSize: MainAxisSize.min,
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text('Rating: ${restaurant.rating}'),
                                        Text(
                                          'Total reviews: : ${restaurant.userRatingsTotal}',
                                        ),
                                        Text(
                                          'PH: ${restaurant.formattedPhoneNum}',
                                        ),
                                        Text(
                                          'Address: ${restaurant.formattedAddress}',
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
              onPressed: _showFilterDialog,
              child: const Icon(Icons.filter_alt_rounded),
            ),
          ),
          _buildActiveFiltersChip(),
          if (_isLoading) const Center(child: CircularProgressIndicator()),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _loadTimer?.cancel();
    _positionStreamSubscription?.cancel();
    _mapController.dispose();
    super.dispose();
  }
}
