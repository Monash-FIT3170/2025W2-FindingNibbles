import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:nibbles/core/dio_client.dart';

class DirectionsService {
  final Dio _dio = DioClient().client;

  Future<Map<String, dynamic>?> getDirections({
    required double startLat,
    required double startLon,
    required double endLat,
    required double endLon,
  }) async {
    try {
      debugPrint('Requesting directions from backend...');
      debugPrint('Start: $startLat, $startLon');
      debugPrint('End: $endLat, $endLon');

      final response = await _dio.get(
        'directions',
        queryParameters: {
          'startLat': startLat.toString(),
          'startLon': startLon.toString(),
          'endLat': endLat.toString(),
          'endLon': endLon.toString(),
        },
      );

      debugPrint('Backend response status: ${response.statusCode}');

      if (response.statusCode == 200) {
        debugPrint('Successfully received directions data');
        return response.data;
      } else {
        throw Exception(
          'Failed to get directions: HTTP ${response.statusCode}',
        );
      }
    } on DioException catch (e) {
      debugPrint('DioException: ${e.type}');
      debugPrint('Error message: ${e.message}');
      debugPrint('Response data: ${e.response?.data}');

      // Return more specific error messages
      if (e.response?.data != null && e.response!.data is Map) {
        final errorData = e.response!.data as Map<String, dynamic>;
        if (errorData.containsKey('message')) {
          throw Exception('Directions error: ${errorData['message']}');
        }
      }

      throw Exception('Network error getting directions: ${e.message}');
    } catch (e) {
      debugPrint('General error getting directions: $e');
      throw Exception('Error getting directions: $e');
    }
  }
}
