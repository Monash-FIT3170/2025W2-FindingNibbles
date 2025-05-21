import 'package:dio/dio.dart';
import 'package:nibbles/core/dio_client.dart';
import 'cuisine_dto.dart';

class CuisineService {
  final Dio _dio = DioClient().client;

  Future<List<CuisineDto>> getAllCuisines() async {
    try {
      final response = await _dio.get('cuisine');
      return (response.data as List)
          .map((json) => CuisineDto.fromJson(json))
          .toList();
    } catch (e) {
      rethrow;
    }
  }
}