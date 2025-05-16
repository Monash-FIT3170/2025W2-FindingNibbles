import 'package:dio/dio.dart';
import 'package:nibbles/core/dio_client.dart';
import 'package:nibbles/core/logger.dart';
import 'package:nibbles/service/profile/dietary_dto.dart';
import 'package:nibbles/service/profile/recipe_dto.dart';
import 'package:nibbles/service/profile/resteraunt_dto.dart';
import 'package:nibbles/service/profile/user_dto.dart';
import 'package:nibbles/service/profile/appliance_dto.dart';

class ProfileService {
  final Dio _dio = DioClient().client;
  final _logger = getLogger();

  /**
   * Dietary Requirements
   */

  Future<List<DietaryRequirementDto>> getDietaryRequirements() async {
    try {
      final response = await _dio.get('user/dietary-requirement');
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
      _logger.d(
        'Adding dietary requirement with ID: $dietaryId',
      ); // Log the dietaryId

      final response = await _dio.post(
        'user/dietary-requirement',
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
      final response = await _dio.delete(
        '/user/dietary-requirement',
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
      final response = await _dio.get('dietary-requirement');
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

  Future<DietaryRequirementDto> createDietaryRequirement(
    String name,
    String description,
  ) async {
    try {
      _logger.d(
        'Creating dietary requirement with Name: $name, Description: $description',
      ); // Log the name and description

      final response = await _dio.post(
        'user/create-dietary-requirement',
        data: {'name': name, 'description': description},
      );
      if (response.statusCode == 201) {
        return DietaryRequirementDto.fromJson(response.data);
      } else {
        throw Exception('Failed to create dietary requirement');
      }
    } catch (e) {
      throw Exception('Failed to create dietary requirement: $e');
    }
  }

  /**
   * Resteraunts 
   */

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
      final response = await _dio.delete(
        '/user/favourite-restaurant',
        data: {'restaurantId': restaurantId}, // Send restaurantId as JSON
      );
      if (response.statusCode != 200) {
        throw Exception('Failed to remove restaurant');
      }
    } catch (e) {
      throw Exception('Failed to remove restaurant: $e');
    }
  }

  Future<List<RecipeDto>> getFavouriteRecipes() async {
    try {
      final response = await _dio.get('user/favourite-recipe');
      if (response.statusCode == 200) {
        List<dynamic> data = response.data;
        return data.map((item) => RecipeDto.fromJson(item)).toList();
      } else {
        throw Exception('Failed to load recipes');
      }
    } catch (e) {
      throw Exception('Failed to load recipes: $e');
    }
  }

  Future<void> addFavouriteRecipe(int recipeId) async {
    try {
      final response = await _dio.post(
        '/user/favourite-recipe',
        data: {'recipeId': recipeId}, // Send recipeId as JSON
      );
      if (response.statusCode != 201) {
        throw Exception('Failed to add recipe');
      }
    } catch (e) {
      throw Exception('Failed to add recipe: $e');
    }
  }

  Future<void> removeFavouriteRecipe(int recipeId) async {
    try {
      final response = await _dio.delete(
        '/user/favourite-recipe',
        data: {'recipeId': recipeId}, // Send recipeId as JSON
      );
      if (response.statusCode != 200) {
        throw Exception('Failed to remove recipe');
      }
    } catch (e) {
      throw Exception('Failed to remove recipe: $e');
    }
  }

  Future<UserDto> updateUserProfile(updateUserDto updateUserDto) async {
    try {
      final response = await _dio.patch(
        '/user/update',
        data: updateUserDto.toJson(), // Convert UpdateUserDto to JSON
      );

      if (response.statusCode == 200) {
        // Parse the response into a UserDto
        return UserDto.fromJson(response.data);
      } else {
        throw Exception('Failed to update user profile');
      }
    } catch (e) {
      throw Exception('Failed to update user profile: $e');
    }
  }

    /**
   * Updating Appliance for User
   */

    Future<List<ApplianceRequirementDto>> getApplicance() async {
    try {
      final response = await _dio.get('user/appliance');
      if (response.statusCode == 200) {
        List<dynamic> data = response.data;
        return data
            .map((item) => ApplianceRequirementDto.fromJson(item))
            .toList();
      } else {
        throw Exception('Failed to load appliances');
      }
    } catch (e) {
      throw Exception('Failed to load appliances: $e');
    }
  }

  Future<void> addAppliance(int applianceId) async {
    try {
      // Pass the dietaryId in the request body
      final response = await _dio.post(
        '/user/appliance',
        data: {'applianceId': applianceId}, // Send dietaryId as JSON
      );
      if (response.statusCode != 201) {
        throw Exception('Failed to add appliance');
      }
    } catch (e) {
      throw Exception('Failed to add appliance: $e');
    }
  }

  Future<void> removeAppliance(int applianceId) async {
    try {
      final response = await _dio.delete(
        '/user/appliance',
        data: {'applianceId': applianceId}, // Send dietaryId as JSON
      );
      if (response.statusCode != 200) {
        throw Exception('Failed to remove appliance');
      }
    } catch (e) {
      throw Exception('Failed to remove appliance: $e');
    }
  }

  Future<List<ApplianceRequirementDto>> getDefaultAppliances() async {
    try {
      final response = await _dio.get('appliance');
      if (response.statusCode == 200) {
        List<dynamic> data = response.data;
        return data
            .map((item) => ApplianceRequirementDto.fromJson(item))
            .toList();
      } else {
        throw Exception('Failed to load default appliances');
      }
    } catch (e) {
      throw Exception('Failed to load default appliances: $e');
    }
  }
}