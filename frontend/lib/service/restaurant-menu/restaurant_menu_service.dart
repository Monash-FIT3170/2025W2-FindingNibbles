import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:nibbles/core/dio_client.dart';

class RestaurantMenuService {
  final Dio _dio = DioClient().client;

  /// Upload a menu image and get analysis results
  Future<List<dynamic>> uploadMenuImage(File imageFile) async {
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
        'restaurant-menu',
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
        return response.data as List<dynamic>;
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
}
