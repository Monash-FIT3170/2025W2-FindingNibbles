import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:nibbles/core/dio_client.dart';
import 'best_dish_dto.dart';
import 'dish_dto.dart';

class RestaurantMenuService {
  final Dio _dio = DioClient().client;

  /// Upload a menu image and get analysis results
  Future<List<dynamic>> uploadMenuImage(
    File imageFile,
    int restaurantId,
  ) async {
    try {
      // Validate file size (max 20MB for Gemini API)
      final fileSize = await imageFile.length();
      if (fileSize > 20 * 1024 * 1024) {
        throw Exception('Image file is too large. Maximum size is 20MB.');
      }

      // Create form data with the image file
      FormData formData = FormData.fromMap({
        'file': await MultipartFile.fromFile(
          imageFile.path,
          filename: 'menu_image.jpg',
        ),
      });

      final response = await _dio.post(
        'restaurant-menu/$restaurantId',
        data: formData,
        options: Options(
          headers: {'Content-Type': 'multipart/form-data'},
          sendTimeout: const Duration(
            minutes: 2,
          ), // Increased timeout for AI processing
          receiveTimeout: const Duration(minutes: 2),
        ),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        final responseData = response.data;

        // Handle new structured response format
        if (responseData is Map<String, dynamic>) {
          if (responseData['success'] == true) {
            // Return the dishes array from the structured response
            return (responseData['dishes'] as List<dynamic>?) ?? [];
          } else {
            // Handle error response
            final errorMessage =
                responseData['message'] ?? 'Unknown error occurred';
            throw Exception(errorMessage);
          }
        }

        // Fallback for old response format (direct array)
        return responseData as List<dynamic>;
      } else {
        throw Exception('Failed to upload menu image: ${response.statusCode}');
      }
    } on DioException catch (e) {
      debugPrint('DioException: ${e.message}');
      debugPrint('Response data: ${e.response?.data}');

      if (e.response?.statusCode == 500) {
        final errorMessage =
            e.response?.data['message'] ?? 'Internal server error';
        throw Exception('Server error while analyzing menu: $errorMessage');
      } else if (e.response?.statusCode == 400) {
        final errorMessage = e.response?.data['message'] ?? 'Bad request';
        throw Exception('Invalid request: $errorMessage');
      } else {
        throw Exception('Network error: ${e.message}');
      }
    } catch (e) {
      debugPrint('Error uploading menu image: $e');
      rethrow;
    }
  }

  /// Get the best dish recommendation for a restaurant based on dietary requirements
  Future<GetBestDishResponseDto> getBestDish(
    int restaurantId,
    List<String> dietaryRequirements,
  ) async {
    try {
      final requestDto = GetBestDishRequestDto(
        dietaryRequirements: dietaryRequirements,
      );

      final response = await _dio.post(
        'restaurant-menu/$restaurantId/best-dish',
        data: requestDto.toJson(),
        options: Options(
          headers: {'Content-Type': 'application/json'},
          sendTimeout: const Duration(seconds: 30),
          receiveTimeout: const Duration(seconds: 30),
        ),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        return GetBestDishResponseDto.fromJson(
          response.data as Map<String, dynamic>,
        );
      } else {
        throw Exception(
          'Failed to get best dish recommendation: ${response.statusCode}',
        );
      }
    } on DioException catch (e) {
      debugPrint('DioException: ${e.message}');
      debugPrint('Response data: ${e.response?.data}');

      if (e.response?.statusCode == 400) {
        // Handle bad request (likely validation errors)
        final errorData = e.response?.data as Map<String, dynamic>?;
        if (errorData != null) {
          return GetBestDishResponseDto.fromJson(errorData);
        }
      } else if (e.response?.statusCode == 500) {
        final errorMessage =
            e.response?.data['message'] ?? 'Internal server error';
        throw Exception('Server error while getting best dish: $errorMessage');
      }

      throw Exception('Network error: ${e.message}');
    } catch (e) {
      debugPrint('Error getting best dish: $e');
      rethrow;
    }
  }

  /// Get all dishes for a restaurant
  Future<List<DishDto>> getDishes(int restaurantId) async {
    try {
      final response = await _dio.get(
        'restaurant-menu/$restaurantId/dishes',
        options: Options(
          sendTimeout: const Duration(seconds: 30),
          receiveTimeout: const Duration(seconds: 30),
        ),
      );

      if (response.statusCode == 200) {
        final List<dynamic> dishesJson = response.data as List<dynamic>;
        return dishesJson.map((json) => DishDto.fromJson(json)).toList();
      } else {
        throw Exception('Failed to fetch dishes: ${response.statusCode}');
      }
    } on DioException catch (e) {
      debugPrint('DioException: ${e.message}');
      debugPrint('Response data: ${e.response?.data}');

      if (e.response?.statusCode == 500) {
        final errorMessage =
            e.response?.data['message'] ?? 'Internal server error';
        throw Exception('Server error while fetching dishes: $errorMessage');
      } else if (e.response?.statusCode == 400) {
        final errorMessage = e.response?.data['message'] ?? 'Bad request';
        throw Exception('Invalid request: $errorMessage');
      } else {
        throw Exception('Network error: ${e.message}');
      }
    } catch (e) {
      debugPrint('Error fetching dishes: $e');
      rethrow;
    }
  }
}
