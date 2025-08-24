import 'dart:math' as math;
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:nibbles/core/dio_client.dart';
import 'package:nibbles/service/restaurant/google_places_restaurant_dto.dart';
import 'package:nibbles/service/restaurant/google_places_autocomplete_dto.dart';

class RestaurantService {
  final Dio _dio = DioClient().client;

  /// Get restaurants with optional bounding box and filters using Google Places API
  Future<List<GooglePlacesRestaurantDto>> getRestaurants({
    double? swLat,
    double? swLng,
    double? neLat,
    double? neLng,
    String? keyword,
    int? maxPrice,
    bool? openNow,
  }) async {
    // If bounds are provided, use bounds-based search
    if (swLat != null && swLng != null && neLat != null && neLng != null) {
      try {
        // Calculate center point from bounds
        final centerLat = (swLat + neLat) / 2;
        final centerLng = (swLng + neLng) / 2;
        
        // Calculate radius to cover entire bounds
        final radius = _calculateBoundsRadius(swLat, swLng, neLat, neLng);
        
        final queryParams = <String, dynamic>{
          'lat': centerLat.toString(),
          'lng': centerLng.toString(),
          'radius': radius.toString(),
          if (keyword != null) 'keyword': keyword,
          if (maxPrice != null) 'maxprice': maxPrice.toString(),
          if (openNow != null) 'opennow': openNow.toString(),
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
          throw Exception('Failed to get restaurants in bounds');
        }
      } catch (e) {
        debugPrint('Error getting restaurants in bounds: $e');
        return [];
      }
    }
    
    // If no bounds provided, return empty list (bounds required for Google Places)
    debugPrint('Error: Location bounds required for restaurant search');
    return [];
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

  /// Search restaurants using Google Places text search
  Future<List<GooglePlacesRestaurantDto>> searchWithGooglePlaces({
    required String query,
    double? latitude,
    double? longitude,
    int? radius,
  }) async {
    try {
      final queryParams = <String, dynamic>{
        'query': query,
        if (latitude != null) 'lat': latitude.toString(),
        if (longitude != null) 'lng': longitude.toString(),
        if (radius != null) 'radius': radius.toString(),
      };

      final response = await _dio.get(
        'restaurant/places/search',
        queryParameters: queryParams,
      );

      if (response.statusCode == 200) {
        final data = response.data as List;
        return data
            .map((json) => GooglePlacesRestaurantDto.fromJson(json))
            .toList();
      } else {
        throw Exception('Failed to search restaurants with Google Places');
      }
    } catch (e) {
      debugPrint('Error searching with Google Places: $e');
      return [];
    }
  }

  /// Get nearby restaurants with keyword search using Google Places
  Future<List<GooglePlacesRestaurantDto>> getNearbyWithKeyword({
    required double latitude,
    required double longitude,
    String? keyword,
    int? radius,
    int? minPrice,
    int? maxPrice,
    bool? openNow,
  }) async {
    try {
      final queryParams = <String, dynamic>{
        'lat': latitude.toString(),
        'lng': longitude.toString(),
        if (keyword != null) 'keyword': keyword,
        if (radius != null) 'radius': radius.toString(),
        if (minPrice != null) 'minprice': minPrice.toString(),
        if (maxPrice != null) 'maxprice': maxPrice.toString(),
        if (openNow != null) 'opennow': openNow.toString(),
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
        throw Exception('Failed to get nearby restaurants with keyword');
      }
    } catch (e) {
      debugPrint('Error getting nearby restaurants with keyword: $e');
      return [];
    }
  }

  /// Get autocomplete suggestions for restaurant search
  Future<List<GooglePlacesAutocompleteDto>>
  getRestaurantAutocompleteSuggestions({
    required String input,
    double? latitude,
    double? longitude,
    int? radius,
  }) async {
    try {
      final queryParams = <String, dynamic>{
        'input': input,
        if (latitude != null) 'lat': latitude.toString(),
        if (longitude != null) 'lng': longitude.toString(),
        if (radius != null) 'radius': radius.toString(),
      };

      final response = await _dio.get(
        'restaurant/places/autocomplete',
        queryParameters: queryParams,
      );

      if (response.statusCode == 200) {
        final data = response.data as List;
        return data
            .map((json) => GooglePlacesAutocompleteDto.fromJson(json))
            .toList();
      } else {
        throw Exception('Failed to get autocomplete suggestions');
      }
    } catch (e) {
      debugPrint('Error getting autocomplete suggestions: $e');
      return [];
    }
  }

  /// Search for restaurants by cuisine using Google Places
  Future<List<GooglePlacesRestaurantDto>> searchByCuisineWithGooglePlaces({
    required String cuisine,
    required double latitude,
    required double longitude,
    int? radius,
  }) async {
    try {
      final queryParams = <String, dynamic>{
        'cuisine': cuisine,
        'lat': latitude.toString(),
        'lng': longitude.toString(),
        if (radius != null) 'radius': radius.toString(),
      };

      final response = await _dio.get(
        'restaurant/places/nearby-by-cuisine',
        queryParameters: queryParams,
      );

      if (response.statusCode == 200) {
        final data = response.data as List;
        return data
            .map((json) => GooglePlacesRestaurantDto.fromJson(json))
            .toList();
      } else {
        throw Exception('Failed to search restaurants by cuisine');
      }
    } catch (e) {
      debugPrint('Error searching restaurants by cuisine: $e');
      return [];
    }
  }

  /// Get restaurant details from Google Places
  Future<Map<String, dynamic>?> getGooglePlacesRestaurantDetails(
    String placeId,
  ) async {
    try {
      final response = await _dio.get('restaurant/places/details/$placeId');

      if (response.statusCode == 200) {
        return response.data;
      } else {
        throw Exception('Failed to get restaurant details');
      }
    } catch (e) {
      debugPrint('Error getting restaurant details: $e');
      return null;
    }
  }

  /// Get photo URL from Google Places photo reference
  Future<String?> getGooglePlacesPhotoUrl(
    String photoReference, {
    int maxWidth = 400,
  }) async {
    try {
      final queryParams = <String, dynamic>{'maxWidth': maxWidth.toString()};

      final response = await _dio.get(
        'restaurant/places/photo/$photoReference',
        queryParameters: queryParams,
      );

      if (response.statusCode == 200) {
        return response.data['photoUrl'];
      } else {
        throw Exception('Failed to get photo URL');
      }
    } catch (e) {
      debugPrint('Error getting photo URL: $e');
      return null;
    }
  }
}
