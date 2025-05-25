import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:geocoding/geocoding.dart';
import 'package:location/location.dart' as loc;
import 'package:nibbles/core/logger.dart';
import 'package:nibbles/core/constants.dart';

class LocationSelectionPage extends StatefulWidget {
  final LatLng? initialLocation;
  final int? initialLocationId;

  const LocationSelectionPage({
    super.key,
    this.initialLocation,
    this.initialLocationId,
  });

  @override
  State<LocationSelectionPage> createState() => _LocationSelectionPageState();
}

class _LocationSelectionPageState extends State<LocationSelectionPage> {
  MapController mapController = MapController();
  LatLng? selectedLocation;
  String? selectedAddressName;
  final TextEditingController _searchController = TextEditingController();

  final loc.Location _location = loc.Location();
  bool _serviceEnabled = false;
  loc.PermissionStatus _permissionGranted = loc.PermissionStatus.denied;

  final _logger = getLogger();

  @override
  void initState() {
    super.initState();
    if (widget.initialLocation != null) {
      selectedLocation = widget.initialLocation;
      _reverseGeocodeAndSetName(widget.initialLocation!);
      _setInitialCameraPosition(widget.initialLocation!, defaultZoom: false);
    } else {
      _checkLocationPermissionsAndSetInitialMapPosition();
    }
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _checkLocationPermissionsAndSetInitialMapPosition() async {
    _serviceEnabled = await _location.serviceEnabled();
    if (!_serviceEnabled) {
      _serviceEnabled = await _location.requestService();
      if (!_serviceEnabled) {
        _setInitialCameraPosition(
          selectedLocation ?? AppConstants.defaultMapInitialCenter,
          defaultZoom: true,
        );
        return;
      }
    }

    _permissionGranted = await _location.hasPermission();
    if (_permissionGranted == loc.PermissionStatus.denied) {
      _permissionGranted = await _location.requestPermission();
      if (_permissionGranted != loc.PermissionStatus.granted) {
        _setInitialCameraPosition(
          selectedLocation ?? AppConstants.defaultMapInitialCenter,
          defaultZoom: true,
        );
        return;
      }
    }

    if (_permissionGranted == loc.PermissionStatus.granted) {
      try {
        final currentLocation = await _location.getLocation();
        final userLatLng = LatLng(
          currentLocation.latitude!,
          currentLocation.longitude!,
        );
        if (selectedLocation == null) {
          setState(() {
            selectedLocation = userLatLng;
          });
          _reverseGeocodeAndSetName(userLatLng);
        }
        _setInitialCameraPosition(userLatLng);
      } catch (e) {
        _logger.d("Error getting current location: $e");
        _setInitialCameraPosition(
          selectedLocation ?? AppConstants.defaultMapInitialCenter,
          defaultZoom: true,
        );
      }
    } else {
      _setInitialCameraPosition(
        selectedLocation ?? AppConstants.defaultMapInitialCenter,
        defaultZoom: true,
      );
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
      _logger.d("Error reverse geocoding: $e");
    }
  }

  void _onTapMap(TapPosition tapPosition, LatLng latLng) {
    setState(() {
      selectedLocation = latLng;
    });
    _reverseGeocodeAndSetName(latLng);
  }

  void _saveLocation() {
    if (selectedLocation != null) {
      final Map<String, dynamic> result = {
        'name': 'Home',
        'latitude': selectedLocation!.latitude,
        'longitude': selectedLocation!.longitude,
        'isDefault': true,
      };

      if (widget.initialLocationId != null) {
        result['id'] = widget.initialLocationId;
      }
      Navigator.pop(context, result);
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please select a location on the map.')),
      );
    }
  }

  void _zoomIn() {
    mapController.move(
      mapController.camera.center,
      mapController.camera.zoom + 1,
    );
  }

  void _zoomOut() {
    mapController.move(
      mapController.camera.center,
      mapController.camera.zoom - 1,
    );
  }

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
        final foundLatLng = LatLng(
          locations.first.latitude,
          locations.first.longitude,
        );
        setState(() {
          selectedLocation = foundLatLng;
        });
        mapController.move(foundLatLng, 15);
        _reverseGeocodeAndSetName(foundLatLng);
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
      _logger.d("Error searching address: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    // Access the color scheme from the current theme
    final ColorScheme colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Select Home Location'),
        backgroundColor: colorScheme.primary,
        foregroundColor: colorScheme.onPrimary,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              controller: _searchController,
              decoration: InputDecoration(
                labelText: 'Search Address',
                hintText: 'e.g., 123 Main St, Anytown',
                suffixIcon: IconButton(
                  icon: const Icon(Icons.search),
                  onPressed: _searchAddress,
                ),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                enabledBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                  borderSide: const BorderSide(color: Colors.grey),
                ),
                focusedBorder: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(10),
                  borderSide: BorderSide(
                    color: colorScheme.primary, 
                    width: 2,
                  ),
                ),
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: 16.0,
                  vertical: 14.0,
                ),
              ),
              onSubmitted: (_) => _searchAddress(),
            ),
          ),
          Expanded(
            child: Stack(
              children: [
                FlutterMap(
                  mapController: mapController,
                  options: MapOptions(
                    initialCenter: selectedLocation ?? AppConstants.defaultMapInitialCenter,
                    initialZoom: selectedLocation == null ? 2 : 15,
                    onTap: _onTapMap,
                  ),
                  children: [
                    TileLayer(
                      urlTemplate:
                          'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                      userAgentPackageName: 'com.example.app',
                    ),
                    if (selectedLocation != null)
                      MarkerLayer(
                        markers: [
                          Marker(
                            point: selectedLocation!,
                            width: 80.0,
                            height: 80.0,
                            child: Icon(
                              Icons.location_pin,
                              color: colorScheme.error,
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
                        backgroundColor: colorScheme.primary,
                        foregroundColor: colorScheme.onPrimary,
                        onPressed: _zoomIn,
                        child: const Icon(Icons.add),
                      ),
                      const SizedBox(height: 8),
                      FloatingActionButton(
                        mini: true,
                        heroTag: 'zoomOutBtn',
                        backgroundColor: colorScheme.primary,
                        foregroundColor: colorScheme.onPrimary,
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
                Text(
                  selectedAddressName ??
                      'Tap on the map or search for a location to set as Home.',
                  style: Theme.of(context).textTheme.bodySmall, 
                ),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: _saveLocation,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: colorScheme.primary, 
                    foregroundColor: colorScheme.onPrimary,
                    minimumSize: const Size(double.infinity, 50),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  child: const Text(
                    'Set Home Location',
                    style: TextStyle(fontSize: 18),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}