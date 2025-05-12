import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:geolocator/geolocator.dart';
import 'dart:async';

import 'package:nibbles/service/map/map_service.dart'; // Add this import
import 'package:nibbles/service/profile/restaurant_dto.dart'; // Add this import

class MapPage extends StatefulWidget {
  const MapPage({super.key});

  @override
  State<MapPage> createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  late final MapController _mapController = MapController();
  LatLng? _currentPosition;
  StreamSubscription<Position>? _positionStreamSubscription; // Add this line
  List<RestaurantDto> _restaurants = [];
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    _getCurrentLocation();
    WidgetsBinding.instance.addPostFrameCallback((_) {
    _fetchRestaurantsInBounds();
    });
    
  }

  Future<void> _getCurrentLocation() async {
    bool serviceEnabled;
    LocationPermission permission;

    // Check location services
    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      return Future.error('Location services are disabled.');
    }

    // Permissions
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
      // Add this check
      setState(() {
        _currentPosition = LatLng(position.latitude, position.longitude);
      });
    }

    // Listen for updates with proper subscription management
    _positionStreamSubscription = Geolocator.getPositionStream().listen((
      Position pos,
    ) {
      final newPos = LatLng(pos.latitude, pos.longitude);
      if (mounted) {
        // Add this check
        setState(() {
          _currentPosition = newPos;
        });
        _mapController.move(newPos, _mapController.zoom);
      }
    });
  }

  // Fetch restaurants within current map bounds
  Future<void> _fetchRestaurantsInBounds() async {
    print('Fetching restaurants...');
    if (!mounted) return;

    setState(() {
      _isLoading = true;
    });
    // Get current map bounds
    final bounds = _mapController.bounds;
    final swLat = bounds?.south ?? 0.0;
    final swLng = bounds?.west ?? 0.0;
    final neLat = bounds?.north ?? 0.0;
    final neLng = bounds?.east ?? 0.0;
    print('Map bounds: $swLat, $swLng, $neLat, $neLng');

    // Fetch restaurants from the backend using MapService
    final restaurants = await MapService().getRestaurants(
      swLat: swLat,
      swLng: swLng,
      neLat: neLat,
      neLng: neLng,
    );
    print('Fetched ${restaurants.length} restaurants');

    setState(() {
      _restaurants =
          restaurants; // Make sure _restaurants is defined in your state
      _isLoading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Map')),
      body: FlutterMap(
        mapController: _mapController,
        options: MapOptions(
          center: LatLng(37.9111, 145.1367), // Monash coordinates
          zoom: 13,
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
                builder: (ctx) => const Icon(Icons.location_pin, color: Colors.red, size: 40),
              );
            }).toList(),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _positionStreamSubscription?.cancel(); // Add this line
    _mapController.dispose();
    super.dispose();
  }
}
