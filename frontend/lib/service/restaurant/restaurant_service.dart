import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:nibbles/core/dio_client.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';

class RestaurantService {
  final Dio _dio = DioClient().client;

  /// get restaurants with optional bounding box and cuisine filter
  Future<List<RestaurantDto>> getRestaurants({
    double? swLat,
    double? swLng,
    double? neLat,
    double? neLng,
    int? cuisineId,
  }) async {
    try {
      Map<String, dynamic> queryParams = {};

      if (swLat != null) queryParams['swLat'] = swLat;
      if (swLng != null) queryParams['swLng'] = swLng;
      if (neLat != null) queryParams['neLat'] = neLat;
      if (neLng != null) queryParams['neLng'] = neLng;
      if (cuisineId != null) queryParams['cuisineId'] = cuisineId;

      final response = await _dio.get(
        'restaurant',
        queryParameters: queryParams,
      );

      if (response.statusCode == 200) {
        List<dynamic> data = response.data;
        return data.map((json) => RestaurantDto.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load restaurants');
      }
    } catch (e) {
      debugPrint('Error fetching restaurants: $e');
      return [];
    }
  }
}
