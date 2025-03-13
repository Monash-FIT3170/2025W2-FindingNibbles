import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

class MapComponent extends StatelessWidget {
  const MapComponent({super.key});

  @override
  Widget build(BuildContext context) {
    return FlutterMap(
      mapController: MapController(),
      options: MapOptions(
        initialCenter: LatLng(-37.907803, 145.133957),
        initialZoom: 13.0,
      ),
      children: [
        TileLayer(
          urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
          userAgentPackageName: 'dev.fleaflet.flutter_map.example',
        ),
        MarkerLayer(
          markers: [
            Marker(
              width: 80.0,
              height: 80.0,
              point: LatLng(-37.907803, 145.133957),
              child: Icon(Icons.location_on, color: Colors.red, size: 40),
            ),
            Marker(
              width: 80.0,
              height: 80.0,
              point: LatLng(-37.917803, 145.143957),
              child: Icon(Icons.location_on, color: Colors.blue, size: 40),
            ),
          ],
        ),
      ],
    );
  }
}
