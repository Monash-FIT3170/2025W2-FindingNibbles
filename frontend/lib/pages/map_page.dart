import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:geolocator/geolocator.dart';
import 'dart:async'; // Add this import
import 'dart:convert'; // Import for jsonDecode
import 'package:http/http.dart' as http; 

class Restaurant {
  final int id;
  final String placeId;
  final String name;
  final double latitude;
  final double longitude;
  final String? businessStatus;
  final String? icon;
  final double? rating;
  final int? userRatingsTotal;
  final int? priceLevel;
  final String? formattedAddress;
  final String? formattedPhoneNum;
  final String? website;

  Restaurant({
    required this.id,
    required this.placeId,
    required this.name,
    required this.latitude,
    required this.longitude,
    this.businessStatus,
    this.icon,
    this.rating,
    this.userRatingsTotal,
    this.priceLevel,
    this.formattedAddress,
    this.formattedPhoneNum,
    this.website,
  });

  factory Restaurant.fromJson(Map<String, dynamic> json) {
    return Restaurant(
      id: json['id'],
      placeId: json['place_id'],
      name: json['name'],
      latitude: json['latitude'],
      longitude: json['longitude'],
      businessStatus: json['businessStatus'],
      icon: json['icon'],
      rating: json['rating']?.toDouble(),
      userRatingsTotal: json['userRatingsTotal'],
      priceLevel: json['priceLevel'],
      formattedAddress: json['formattedAddress'],
      formattedPhoneNum: json['formattedPhoneNum'],
      website: json['website'],
    );
  }
}

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
  final String baseUrl = 'http://10.0.2.2:3000';
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
    
    try {
      // Get current map bounds
      final bounds = _mapController.bounds;
      final swLat = bounds?.south ?? 0.0;
      final swLng = bounds?.west ?? 0.0;
      final neLat = bounds?.north ?? 0.0;
      final neLng = bounds?.east ?? 0.0;
      
      // Call API with bounds parameters
      final url = Uri.parse(
        '$baseUrl/restaurants?swLat=$swLat&swLng=$swLng&neLat=$neLat&neLng=$neLng'
      );
      
      final response = await http.get(url);
      
      if (response.statusCode == 200) {
        final List<dynamic> data = jsonDecode(response.body);
        final restaurants = data.map((json) => Restaurant.fromJson(json)).toList();
        
        if (mounted) {
          setState(() {
            _restaurants = restaurants;
            _isLoading = false;
          });
        }
      } else {
        throw Exception('Failed to load restaurants: ${response.statusCode}');
      }
    } catch (e) {
      if (mounted) {
        setState(() {
          _isLoading = false;
        });
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e'))
        );
      }
    }
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
