import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:geolocator/geolocator.dart';
import 'dart:async';
import 'package:flutter_map_marker_popup/flutter_map_marker_popup.dart';
import 'package:nibbles/service/map/map_service.dart'; 
import 'package:nibbles/service/profile/restaurant_dto.dart'; 

class RestaurantMarker extends Marker {
  final RestaurantDto restaurant;
 
  RestaurantMarker({required this.restaurant})
    : super(
        point: LatLng(restaurant.latitude, restaurant.longitude),
        width: 40,
        height: 40,
        builder:
            (ctx) =>
                const Icon(Icons.location_pin, color: Colors.red, size: 40),
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
  final PopupController _popupController = PopupController();
  Timer? _loadTimer; // Timer for repeated attempts

  @override
  void initState() {
    super.initState();
    _getCurrentLocation();
    
    // Start aggressive loading attempts right away
    _startAggressiveLoading();
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
        _mapController.move(newPos, _mapController.zoom);
      }
    });
  }

  // Force fetch restaurants even if bounds might not be fully initialized
  Future<void> _forceFetchRestaurants() async {
    if (!mounted) return;
    
    // Try to get current bounds
    final bounds = _mapController.bounds;
    if (bounds == null) {
      // If bounds aren't available, use a default area around Monash
      final defaultLocation = LatLng(37.9111, 145.1367); // Monash coordinates
      final defaultBounds = LatLngBounds(
        LatLng(defaultLocation.latitude - 0.1, defaultLocation.longitude - 0.1),
        LatLng(defaultLocation.latitude + 0.1, defaultLocation.longitude + 0.1),
      );
      
      await _fetchWithBounds(defaultBounds);
    } else {
      // If bounds are available, use them
      await _fetchWithBounds(bounds);
    }
  }
  
  // Helper to fetch with known bounds
  Future<void> _fetchWithBounds(LatLngBounds bounds) async {
    if (_isLoading) return; // Prevent multiple simultaneous requests
    
    setState(() {
      _isLoading = true;
    });
    
    try {
      // Fetch restaurants from the backend using MapService
      final restaurants = await MapService().getRestaurants(
        swLat: bounds.south,
        swLng: bounds.west,
        neLat: bounds.north,
        neLng: bounds.east,
      );

      if (mounted) {
        setState(() {
          _restaurants = restaurants;
          _isLoading = false;
        });
        
        // If we got restaurants, cancel any loading timer
        if (restaurants.isNotEmpty) {
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

  // Fetch restaurants in response to user actions (like dragging the map)
  Future<void> _fetchRestaurantsInBounds() async {
    if (!mounted) return;

    // Get current map bounds
    final bounds = _mapController.bounds;
    if (bounds == null) return;
    
    await _fetchWithBounds(bounds);
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
              center: _currentPosition ?? LatLng(37.9111, 145.1367),
              zoom: 13,
              onMapReady: () {
                // Try to fetch when map is ready
                _forceFetchRestaurants();
              },
              onPositionChanged: (MapPosition position, bool hasGesture) {
                if (hasGesture) {
                  _fetchRestaurantsInBounds();
                }
              },
            ),
            children: [
              TileLayer(
                urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                subdomains: const ['a', 'b', 'c'],
                userAgentPackageName: 'com.example.app',
              ),
              MarkerLayer(
                markers: _restaurants.map((restaurant) {
                  return Marker(
                    point: LatLng(restaurant.latitude, restaurant.longitude),
                    width: 40,
                    height: 40,
                    builder: (ctx) => GestureDetector(
                      onTap: () {
                        showDialog(
                          context: context,
                          builder: (context) => AlertDialog(
                            title: Text(restaurant.name),
                            content: Column(
                              mainAxisSize: MainAxisSize.min,
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text('Rating: ${restaurant.rating}'),
                                Text('Total reviews: : ${restaurant.userRatingsTotal}'),
                                Text('PH: ${restaurant.formattedPhoneNum}'),
                                Text('Address: ${restaurant.formattedAddress}'),
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
          if (_isLoading)
            const Center(
              child: CircularProgressIndicator(),
            ),
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