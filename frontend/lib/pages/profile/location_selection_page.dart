import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:geocoding/geocoding.dart';
import 'package:location/location.dart' as loc;
import 'package:nibbles/core/logger.dart';

class LocationSelectionPage extends StatefulWidget {
  final LatLng? initialLocation;
  final String? initialLocationName;

  const LocationSelectionPage({
    super.key,
    this.initialLocation,
    this.initialLocationName,
  });

  @override
  State<LocationSelectionPage> createState() => _LocationSelectionPageState();
}

class _LocationSelectionPageState extends State<LocationSelectionPage> {
  MapController mapController = MapController();
  LatLng? selectedLocation;
  String? selectedAddressName;
  String? locationName;
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _searchController = TextEditingController();

  final loc.Location _location = loc.Location();
  bool _serviceEnabled = false;
  loc.PermissionStatus _permissionGranted = loc.PermissionStatus.denied;

  final LatLng _defaultInitialCenter = const LatLng(-37.8136, 144.9631);  // Melbourne coordinates
  final _logger = getLogger();

  @override
  void initState() {
    super.initState();
    if (widget.initialLocation != null) {
      selectedLocation = widget.initialLocation;
      _reverseGeocodeAndSetName(widget.initialLocation!);
    }
    if (widget.initialLocationName != null) {
      _nameController.text = widget.initialLocationName!;
      locationName = widget.initialLocationName!;
    }
    _checkLocationPermissionsAndSetInitialMapPosition();
  }

  @override
  void dispose() {
    _nameController.dispose();
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _checkLocationPermissionsAndSetInitialMapPosition() async {
    _serviceEnabled = await _location.serviceEnabled();
    if (!_serviceEnabled) {
      _serviceEnabled = await _location.requestService();
      if (!_serviceEnabled) {
        _setInitialCameraPosition(selectedLocation ?? _defaultInitialCenter, defaultZoom: true);
        return;
      }
    }

    _permissionGranted = await _location.hasPermission();
    if (_permissionGranted == loc.PermissionStatus.denied) {
      _permissionGranted = await _location.requestPermission();
      if (_permissionGranted != loc.PermissionStatus.granted) {
        _setInitialCameraPosition(selectedLocation ?? _defaultInitialCenter, defaultZoom: true);
        return;
      }
    }

    if (_permissionGranted == loc.PermissionStatus.granted) {
      try {
        final currentLocation = await _location.getLocation();
        final userLatLng = LatLng(currentLocation.latitude!, currentLocation.longitude!);
        if (selectedLocation == null) {
          setState(() {
            selectedLocation = userLatLng;
          });
          _reverseGeocodeAndSetName(userLatLng);
        }
        _setInitialCameraPosition(userLatLng);
      } catch (e) {
        _logger.d('Error getting current location: $e');
        _setInitialCameraPosition(selectedLocation ?? _defaultInitialCenter, defaultZoom: true);
      }
    } else {
      _setInitialCameraPosition(selectedLocation ?? _defaultInitialCenter, defaultZoom: true);
    }
  }

  void _setInitialCameraPosition(LatLng center, {bool defaultZoom = false}) {
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) {
        mapController.move(center, defaultZoom ? 2 : 15);
      }
    });
  }

  Future<void> _reverseGeocodeAndSetName(LatLng position) async {
    try {
      List<Placemark> placemarks = await placemarkFromCoordinates(
        position.latitude,
        position.longitude,
      );
      if (placemarks.isNotEmpty) {
        Placemark place = placemarks.first;
        setState(() {
          selectedAddressName =
              '${place.street}, ${place.locality}, ${place.postalCode}, ${place.country}';
        });
      } else {
        setState(() {
          selectedAddressName = 'Address not found';
        });
      }
    } catch (e) {
      setState(() {
        selectedAddressName = 'Error getting address';
      });
      _logger.d('Error reverse geocoding: $e');
    }
  }

  void _onTapMap(TapPosition tapPosition, LatLng latLng) {
    setState(() {
      selectedLocation = latLng;
    });
    _reverseGeocodeAndSetName(latLng);
  }

  void _saveLocation() {
    if (selectedLocation != null && _nameController.text.isNotEmpty) {
      Navigator.pop(
        context,
        {
          'name': _nameController.text,
          'latitude': selectedLocation!.latitude,
          'longitude': selectedLocation!.longitude,
          'isDefault': true,
        },
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please select a location and enter a name.')),
      );
    }
  }

  void _zoomIn() {
    mapController.move(mapController.camera.center, mapController.camera.zoom + 1);
  }

  void _zoomOut() {
    mapController.move(mapController.camera.center, mapController.camera.zoom - 1);
  }

  // New: Search Address Function
  Future<void> _searchAddress() async {
    final address = _searchController.text.trim();
    if (address.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter an address to search.')),
      );
      return;
    }

    try {
      List<Location> locations = await locationFromAddress(address);
      if (locations.isNotEmpty) {
        final foundLatLng = LatLng(locations.first.latitude, locations.first.longitude);
        setState(() {
          selectedLocation = foundLatLng;
        });
        mapController.move(foundLatLng, 15); // Move map to found location with a reasonable zoom
        _reverseGeocodeAndSetName(foundLatLng); // Update the displayed address below
      } else {
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Address not found. Please try again.')),
        );
      }
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error searching address: ${e.toString()}')),
      );
      _logger.d('Error searching address: $e');
    }
  }


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Select Location'),
        backgroundColor: const Color(0xFFAD2C50),
        foregroundColor: Colors.white,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                labelText: 'Search Address',
                hintText: 'e.g., 123 Main St, Anytown',
                suffixIcon: IconButton(
                  icon: const Icon(Icons.search),
                  onPressed: _searchAddress, // Call search function on button press
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                contentPadding: const EdgeInsets.symmetric(horizontal: 16.0),
              ),
              onSubmitted: (_) => _searchAddress(), // Also search on keyboard enter
            ),
          ),
          Expanded(
            child: Stack(
              children: [
                FlutterMap(
                  mapController: mapController,
                  options: MapOptions(
                    initialCenter: selectedLocation ?? _defaultInitialCenter,
                    initialZoom: selectedLocation == null ? 2 : 15,
                    onTap: _onTapMap,
                  ),
                  children: [
                    TileLayer(
                      urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                      userAgentPackageName: 'com.example.app',
                    ),
                    if (selectedLocation != null)
                      MarkerLayer(
                        markers: [
                          Marker(
                            point: selectedLocation!,
                            width: 80.0,
                            height: 80.0,
                            child: const Icon(
                              Icons.location_pin,
                              color: Colors.red,
                              size: 40.0,
                            ),
                          ),
                        ],
                      ),
                  ],
                ),
                Positioned(
                  top: 10,
                  right: 10,
                  child: Column(
                    children: [
                      FloatingActionButton(
                        mini: true,
                        heroTag: 'zoomInBtn',
                        backgroundColor: const Color(0xFFAD2C50),
                        foregroundColor: Colors.white,
                        onPressed: _zoomIn,
                        child: const Icon(Icons.add),
                      ),
                      const SizedBox(height: 8),
                      FloatingActionButton(
                        mini: true,
                        heroTag: 'zoomOutBtn',
                        backgroundColor: const Color(0xFFAD2C50),
                        foregroundColor: Colors.white,
                        onPressed: _zoomOut,
                        child: const Icon(Icons.remove),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                TextField(
                  controller: _nameController,
                  decoration: InputDecoration(
                    labelText: 'Location Name (e.g., Home, Work)',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  onChanged: (value) {
                    setState(() {
                      locationName = value;
                    });
                  },
                ),
                const SizedBox(height: 10),
                Text(
                  selectedAddressName ?? 'Tap on the map or search for a location', // Updated hint
                  style: const TextStyle(fontSize: 14, color: Colors.grey),
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: _saveLocation,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFFAD2C50),
                    foregroundColor: Colors.white,
                    minimumSize: const Size(double.infinity, 50),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  child: const Text('Save Location', style: TextStyle(fontSize: 18)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}