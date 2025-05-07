import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:geolocator/geolocator.dart';
import 'dart:async';

import 'package:nibbles/service/map/map_service.dart'; // Add this import


class MapPage extends StatefulWidget {
  const MapPage({super.key});

  @override
  State<MapPage> createState() => _MapPageState();
}

class _MapPageState extends State<MapPage> {
  late final MapController _mapController = MapController();
  LatLng? _currentPosition;
  StreamSubscription<Position>? _positionStreamSubscription; // Add this line
  List<Restaurant> _restaurants = [];
  bool _isLoading = false;
  
  @override
  void initState() {
    super.initState();
    _getCurrentLocation();
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
    if (mounted) {  // Add this check
      setState(() {
        _currentPosition = LatLng(position.latitude, position.longitude);
      });
    }

    // Listen for updates with proper subscription management
    _positionStreamSubscription = Geolocator.getPositionStream().listen((Position pos) {
      final newPos = LatLng(pos.latitude, pos.longitude);
      if (mounted) {  // Add this check
        setState(() {
          _currentPosition = newPos;
        });
        _mapController.move(newPos, _mapController.zoom);
      }
    });
  }

  // Fetch restaurants within current map bounds
  Future<void> _fetchRestaurantsInBounds() async {
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

    // Fetch restaurants from the backend using MapService
    final restaurants = await MapService().getRestaurants(
      swLatNum: swLat,
      swLngNum: swLng,
      neLatNum: neLat,
      neLngNum: neLng,
    );

    setState(() {
      _restaurants = restaurants; // Make sure _restaurants is defined in your state
      _isLoading = false;
    });
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Map'),
      ),
      body: FlutterMap(
        mapController: _mapController,
        options: MapOptions(
          center: LatLng(49.2827, -123.1207), // Vancouver coordinates
          zoom: 13,
        ),
        children: [
          TileLayer(
            urlTemplate: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            subdomains: const ['a', 'b', 'c'],
            userAgentPackageName: 'com.example.app',
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _positionStreamSubscription?.cancel();  // Add this line
    _mapController.dispose();
    super.dispose();
  }
}
