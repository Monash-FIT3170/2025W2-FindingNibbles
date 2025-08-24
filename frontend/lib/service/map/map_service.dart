import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:nibbles/core/dio_client.dart';
import 'package:nibbles/service/restaurant/google_places_restaurant_dto.dart';
import 'dart:math' as math;

class MapService {
  final Dio _dio = DioClient().client;

  // Method to get restaurants within a bounding box using Google Places API
  Future<List<GooglePlacesRestaurantDto>> getRestaurants({
    required double swLat,
    required double swLng,
    required double neLat,
    required double neLng,
    String? cuisine, // Cuisine name for Google Places
  }) async {
    try {
      // Calculate center point from bounds
      final centerLat = (swLat + neLat) / 2;
      final centerLng = (swLng + neLng) / 2;
      
      // Calculate radius to cover entire bounds
      final radius = _calculateBoundsRadius(swLat, swLng, neLat, neLng);
      
      // Build query parameters for Google Places API
      final queryParams = <String, dynamic>{
        'lat': centerLat.toString(),
        'lng': centerLng.toString(),
        'radius': radius.toString(),
        if (cuisine != null) 'keyword': cuisine,
      };

      final response = await _dio.get(
        'restaurant/places/nearby',
        queryParameters: queryParams,
      );

      if (response.statusCode == 200) {
        final data = response.data as List;
        return data
            .map((json) => GooglePlacesRestaurantDto.fromJson(json))
            .toList();
      } else {
        throw Exception('Failed to load restaurants');
      }
    } catch (e) {
      debugPrint('Error fetching restaurants: $e');
      return [];
    }
  }

  /// Calculate radius from map bounds using Haversine formula
  int _calculateBoundsRadius(double swLat, double swLng, double neLat, double neLng) {
    final centerLat = (swLat + neLat) / 2;
    final centerLng = (swLng + neLng) / 2;
    
    // Calculate distance from center to corner
    const earthRadius = 6371000; // Earth radius in meters
    final dLat = (neLat - centerLat) * (math.pi / 180);
    final dLng = (neLng - centerLng) * (math.pi / 180);
    
    final a = math.pow(math.sin(dLat / 2), 2) +
        math.cos(centerLat * (math.pi / 180)) *
        math.cos(neLat * (math.pi / 180)) *
        math.pow(math.sin(dLng / 2), 2);
    
    final c = 2 * math.asin(math.sqrt(a));
    final distance = earthRadius * c;
    
    // Add 20% padding to ensure coverage and respect Google Places max radius (50km)
    final radiusWithPadding = (distance * 1.2).round();
    return math.min(radiusWithPadding, 50000); // Google Places max radius is 50km
  }


}
