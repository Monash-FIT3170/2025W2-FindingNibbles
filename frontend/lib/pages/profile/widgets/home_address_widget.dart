import 'package:flutter/material.dart';
import 'package:geocoding/geocoding.dart';
import 'package:nibbles/service/profile/user_location_dto.dart';

class HomeAddressWidget extends StatefulWidget {
  final UserLocationDto? location;
  final VoidCallback onEditLocation;

  const HomeAddressWidget({
    super.key,
    this.location,
    required this.onEditLocation,
  });

  @override
  State<HomeAddressWidget> createState() =>
      _HomeAddressWidgetState();
}

class _HomeAddressWidgetState extends State<HomeAddressWidget> {
  String _readableAddress = 'Fetching address...';

  @override
  void initState() {
    super.initState();
    _updateAddress();
  }

  @override
  void didUpdateWidget(covariant HomeAddressWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.location != oldWidget.location) {
      _updateAddress();
    }
  }

  Future<void> _updateAddress() async {
    if (widget.location != null) {
      try {
        List<Placemark> placemarks = await placemarkFromCoordinates(
          widget.location!.latitude,
          widget.location!.longitude,
        );
        if (placemarks.isNotEmpty) {
          Placemark place = placemarks.first;
          setState(() {
            _readableAddress =
                '${place.street}, ${place.locality}, ${place.postalCode}, ${place.country}';
          });
        } else {
          setState(() {
            _readableAddress = 'Address not found';
          });
        }
      } catch (e) {
        setState(() {
          _readableAddress = 'Error getting address';
        });
      }
    } else {
      setState(() {
        _readableAddress = 'No location set';
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Home Address',
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                IconButton(
                  icon: const Icon(Icons.edit, color: Color(0xFFAD2C50)),
                  onPressed: widget.onEditLocation,
                ),
              ],
            ),
            const SizedBox(height: 10),
            if (widget.location != null)
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    _readableAddress,
                    style: const TextStyle(fontSize: 14),
                  ),
                ],
              )
            else
              const Text(
                'No home location set. Tap edit to add one.',
                style: TextStyle(fontSize: 16, fontStyle: FontStyle.italic),
              ),
          ],
        ),
      ),
    );
  }
}
