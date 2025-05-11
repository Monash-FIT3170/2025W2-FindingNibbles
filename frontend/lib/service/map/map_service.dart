import 'package:dio/dio.dart';
import 'package:nibbles/core/dio_client.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';

class MapService {
  final Dio _dio = DioClient().client;

  Future<List<RestaurantDto>> getRestaurants({required double swLatNum, required double swLngNum, required double neLatNum, required double neLngNum}) async {
    try {
      final response = await _dio.get(
        'restaurant/getRestaurants',
        queryParameters: {
          'swLatNum': swLatNum,
          'swLngNum': swLngNum,
          'neLatNum': neLatNum,
          'neLngNum': neLngNum,
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
