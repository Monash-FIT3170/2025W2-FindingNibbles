import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:nibbles/core/dio_client.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';

class MapService {
  final Dio _dio = DioClient().client;

  // Method to get restaurants within a bounding box
  Future<List<RestaurantDto>> getRestaurants({
    required double swLat, 
    required double swLng, 
    required double neLat, 
    required double neLng,
    int? cuisineId, // Optional cuisine filter
  }) async {
    try {
      // Build query parameters
      Map<String, dynamic> queryParams = {
        'swLat': swLat,
        'swLng': swLng,
        'neLat': neLat,
        'neLng': neLng,
      };
      
      // Add cuisine filter if provided
      if (cuisineId != null) {
        queryParams['cuisineId'] = cuisineId;
      }

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

  // Additional method for getting restaurants by cuisine only (no bounds)
  Future<List<RestaurantDto>> getRestaurantsByCuisine({
    required int cuisineId,
    int? skip,
    int? take,
    String? orderBy, // 'rating' or 'popular'
  }) async {
    try {
      Map<String, dynamic> queryParams = {
        'cuisineId': cuisineId,
      };
      
      if (skip != null) queryParams['skip'] = skip;
      if (take != null) queryParams['take'] = take;
      if (orderBy != null) queryParams['orderBy'] = orderBy;

      final response = await _dio.get(
        'restaurant',
        queryParameters: queryParams,
      );

      if (response.statusCode == 200) {
        List<dynamic> data = response.data;
        return data.map((json) => RestaurantDto.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load restaurants by cuisine');
      }
    } catch (e) {
      print('Error fetching restaurants by cuisine: $e');
      return [];
    }
  }

  // Method for getting all restaurants with pagination and sorting
  Future<List<RestaurantDto>> getAllRestaurants({
    int? skip,
    int? take,
    String? orderBy, // 'rating' or 'popular'
  }) async {
    try {
      Map<String, dynamic> queryParams = {};
      
      if (skip != null) queryParams['skip'] = skip;
      if (take != null) queryParams['take'] = take;
      if (orderBy != null) queryParams['orderBy'] = orderBy;

      final response = await _dio.get(
        'restaurant',
        queryParameters: queryParams,
      );

      if (response.statusCode == 200) {
        List<dynamic> data = response.data;
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