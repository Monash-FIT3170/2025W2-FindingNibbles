import 'package:dio/dio.dart';
import 'package:nibbles/core/dio_client.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';

class MapService {
  final Dio _dio = DioClient().client;

  Future<List<RestaurantDto>> getRestaurants({required double swLat, required double swLng, required double neLat, required double neLng}) async {
    try {
      final response = await _dio.get(
        'restaurant',
        queryParameters: {
          'swLat': swLat,
          'swLng': swLng,
          'neLat': neLat,
          'neLng': neLng,
        },
      );

      if (response.statusCode == 200) {
        List<dynamic> data = response.data;
        return data.map((json) => RestaurantDto.fromJson(json)).toList();
      } else {
        throw Exception('Failed to load restaurants');
      }
    } catch (e) {
      print('Error fetching restaurants: $e');
      return [];
    }
  }
}
