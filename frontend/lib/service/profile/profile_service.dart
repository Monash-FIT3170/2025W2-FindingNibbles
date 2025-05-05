import 'package:dio/dio.dart';
import 'package:nibbles/core/dio_client.dart';
import 'package:nibbles/service/profile/dietary_dto.dart';
import 'package:nibbles/service/profile/resteraunt_dto.dart';

class ProfileService {
  final Dio _dio = DioClient().client;

  /**
   * Dietary Requirements
   */

  Future<List<DietaryRequirementDto>> getDietaryRestrictions() async {
    try {
      final response = await _dio.get('user/dietary-restrictions');
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

  Future<void> addDietaryRequirement(int dietaryId) async {
    try {
      // Pass the dietaryId in the request body
      final response = await _dio.post(
        '/user/add-dietary-restriction',
        data: {'dietaryId': dietaryId}, // Send dietaryId as JSON
      );
      if (response.statusCode != 201) {
        throw Exception('Failed to add dietary requirement');
      }
    } catch (e) {
      throw Exception('Failed to add dietary requirement: $e');
    }
  }

  Future<void> removeDietaryRequirement(int dietaryId) async {
    try {
      final response = await _dio.post(
        '/user/remove-dietary-restriction',
        data: {'dietaryId': dietaryId}, // Send dietaryId as JSON
      );
      if (response.statusCode != 200) {
        throw Exception('Failed to remove dietary requirement');
      }
    } catch (e) {
      throw Exception('Failed to remove dietary requirement: $e');
    }
  }

  Future<List<DietaryRequirementDto>> getDefaultDietaryRequirements() async {
    try {
      final response = await _dio.get('dietary-requirements');
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

  /**
   * Resteraunts 
   */

  Future<List<RestaurantDto>> getRestaurants() async {
    try {
      final response = await _dio.get('user/favourited-restaurants');
      if (response.statusCode == 200) {
        List<dynamic> data = response.data;
        return data.map((item) => RestaurantDto.fromJson(item)).toList();
      } else {
        throw Exception('Failed to load restaurants');
      }
    } catch (e) {
      throw Exception('Failed to load restaurants: $e');
    }
  }

  Future<void> addRestaurant(int restaurantId) async {
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

  Future<void> removeRestaurant(int restaurantId) async {
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
