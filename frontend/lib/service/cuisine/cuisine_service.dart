import 'package:dio/dio.dart';
import 'package:nibbles/core/dio_client.dart';
import 'cuisine_dto.dart';
import '../profile/profile_service.dart';

class CuisineService {
  final ProfileService _profileService = ProfileService();
  final Dio _dio = DioClient().client;
  //List<CuisineDto> _favoriteCuisines = [];

  Future<List<CuisineDto>> getAllCuisines({
    bool popular = false,
    int? limit,
  }) async {
    try {
      final queryParams = <String, dynamic>{};
      if (popular) queryParams['popular'] = 'true';
      if (limit != null) queryParams['limit'] = limit.toString();

      // Fetch all cuisines
      final response = await _dio.get('cuisine', queryParameters: queryParams);
      final allCuisines =
          (response.data as List)
              .map((json) => CuisineDto.fromJson(json))
              .toList();

      // Fetch user's favourite cuisines
      final favCuisines = await _profileService.getUserCuisines();

      // Remove any cuisines from allCuisines that are in favCuisines
      final favIds = favCuisines.map((c) => c.id).toSet();

      final nonFavCuisines =
          allCuisines.where((c) => !favIds.contains(c.id)).toList();
      // Combine favourites first, then the rest
      final mergedList = [...favCuisines, ...nonFavCuisines];

      return mergedList;
    } catch (e) {
      rethrow;
    }
  }
}
