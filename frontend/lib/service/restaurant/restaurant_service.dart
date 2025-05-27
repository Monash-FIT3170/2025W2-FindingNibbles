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

  /// get restaurants by cuisine only (no bounds), with optional pagination/sorting
  Future<List<RestaurantDto>> getRestaurantsByCuisine({
    required int cuisineId,
    int? skip,
    int? take,
    String? orderBy, // 'rating' or 'popular'
  }) async {
    try {
      final queryParams = {
        'cuisineId': cuisineId,
        if (skip != null) 'skip': skip,
        if (take != null) 'take': take,
        if (orderBy != null) 'orderBy': orderBy,
      };

      final response = await _dio.get(
        'restaurant',
        queryParameters: queryParams,
      );

      if (response.statusCode == 200) {
        final data = response.data as List;
        return data.map((json) => RestaurantDto.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load restaurants by cuisine');
      }
    } catch (e) {
      debugPrint('Error fetching restaurants by cuisine: $e');
      return [];
    }
  }

  /// get all restaurants with optional pagination and sorting (no filters)
  Future<List<RestaurantDto>> getAllRestaurants({
    int? skip,
    int? take,
    String? orderBy, // 'rating' or 'popular'
  }) async {
    try {
      final queryParams = <String, dynamic>{
        if (skip != null) 'skip': skip,
        if (take != null) 'take': take,
        if (orderBy != null) 'orderBy': orderBy,
      };

      final response = await _dio.get(
        'restaurant',
        queryParameters: queryParams,
      );

      if (response.statusCode == 200) {
        final data = response.data as List;
        return data.map((json) => RestaurantDto.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load all restaurants');
      }
    } catch (e) {
      debugPrint('Error fetching all restaurants: $e');
      return [];
    }
  }
}