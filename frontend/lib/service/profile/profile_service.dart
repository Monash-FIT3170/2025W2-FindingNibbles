import 'package:dio/dio.dart';
import 'package:nibbles/core/dio_client.dart';
import 'package:nibbles/core/logger.dart';
import 'package:nibbles/service/profile/dietary_dto.dart';
import 'package:nibbles/service/profile/resteraunt_dto.dart';

class ProfileService {
  final Dio _dio = DioClient().client;
  final _logger = getLogger();

  /// Dietary Requirements

  Future<List<DietaryRequirementDto>> getDietaryRestrictions() async {
    try {
      final response = await _dio.get('user/dietary-restriction');
      if (response.statusCode == 200) {
        List<dynamic> data = response.data;
        return data
            .map((item) => DietaryRequirementDto.fromJson(item))
            .toList();
      } else {
        throw Exception('Failed to load dietary requirements');
      }
    } catch (e) {
      throw Exception('Failed to load dietary requirements: $e');
    }
  }

  Future<void> addDietaryRestriction(int dietaryId) async {
    try {
      // Pass the dietaryId in the request body
      final response = await _dio.post(
        '/user/dietary-restriction',
        data: {'dietaryId': dietaryId}, // Send dietaryId as JSON
      );
      if (response.statusCode != 201) {
        throw Exception('Failed to add dietary requirement');
      }
    } catch (e) {
      throw Exception('Failed to add dietary requirement: $e');
    }
  }

  Future<void> removeDietaryRestriction(int dietaryId) async {
    try {
      final response = await _dio.delete(
        '/user/dietary-restriction',
        data: {'dietaryId': dietaryId}, // Send dietaryId as JSON
      );
      if (response.statusCode != 200) {
        throw Exception('Failed to remove dietary requirement');
      }
    } catch (e) {
      throw Exception('Failed to remove dietary requirement: $e');
    }
  }

  Future<List<DietaryRequirementDto>> getDefaultDietaryRestrictions() async {
    try {
      final response = await _dio.get('dietary-requirement');
      if (response.statusCode == 200) {
        List<dynamic> data = response.data;
        return data
            .map((item) => DietaryRequirementDto.fromJson(item))
            .toList();
      } else {
        throw Exception('Failed to load default dietary requirements');
      }
    } catch (e) {
      throw Exception('Failed to load default dietary requirements: $e');
    }
  }

  Future<DietaryRequirementDto> createDietaryRestriction(
    String name,
    String description,
  ) async {
    try {
      final response = await _dio.post(
        'create-dietary-restriction',
        data: {'name': name, 'description': description},
      );
      if (response.statusCode == 201) {
        return DietaryRequirementDto.fromJson(response.data);
      } else {
        throw Exception('Failed to create dietary restriction');
      }
    } catch (e) {
      throw Exception('Failed to create dietary restriction: $e');
    }
  }

  /// Restaurants

  Future<List<RestaurantDto>> getFavouriteRestaurants() async {
    try {
      final response = await _dio.get('user/favourite-restaurant');
      if (response.statusCode == 200) {
        _logger.d(response.data); // Log the response to inspect the data
        List<dynamic> data = response.data;
        return data.map((item) => RestaurantDto.fromJson(item)).toList();
      } else {
        throw Exception('Failed to load restaurants');
      }
    } catch (e) {
      throw Exception('Failed to load restaurants: $e');
    }
  }

  Future<void> addFavouriteRestaurant(int restaurantId) async {
    try {
      final response = await _dio.post(
        '/user/favourite-restaurant',
        data: {'restaurantId': restaurantId}, // Send restaurantId as JSON
      );
      if (response.statusCode != 201) {
        throw Exception('Failed to add restaurant');
      }
    } catch (e) {
      throw Exception('Failed to add restaurant: $e');
    }
  }

  Future<void> removeFavouriteRestaurant(int restaurantId) async {
    try {
      final response = await _dio.post(
        '/user/unfavourite-restaurant',
        data: {'restaurantId': restaurantId}, // Send restaurantId as JSON
      );
      if (response.statusCode != 200) {
        throw Exception('Failed to remove restaurant');
      }
    } catch (e) {
      throw Exception('Failed to remove restaurant: $e');
    }
  }
}
