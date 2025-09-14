import 'package:dio/dio.dart';
import 'package:nibbles/core/dio_client.dart';
import 'package:nibbles/core/logger.dart';
import 'package:nibbles/pages/recipes/recipe_model.dart';
import 'package:nibbles/service/profile/calorie_log_dto.dart';
import 'package:nibbles/service/profile/dietary_dto.dart';
import 'package:nibbles/service/profile/recipe_dto.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'package:nibbles/service/profile/user_dto.dart';
import 'package:nibbles/service/profile/appliance_dto.dart';
import 'package:nibbles/service/profile/user_location_dto.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/service/recipe/recipe_service.dart';

class ProfileService {
  final Dio _dio = DioClient().client;
  final RecipeService _recipeService = RecipeService();
  final _logger = getLogger();

  Future<int> getDailyCalories(DateTime date) async {
    final dateStr = date.toIso8601String().split('T').first; // "2025-08-19"
    final ts = date.millisecondsSinceEpoch.toString();

    try {
      final response = await _dio.get(
        'user/calorie-log',
        queryParameters: {'date': dateStr, 'ts': ts},
      );

      if (response.statusCode == 200) {
        return int.parse(response.data.toString());
      } else {
        throw Exception(
          'Failed to load daily calories (status ${response.statusCode})',
        );
      }
    } on DioException catch (e) {
      throw Exception(
        'Failed to load daily calories: ${e.response?.statusCode} ${e.response?.data ?? e.message}',
      );
    } catch (e) {
      throw Exception('Failed to load daily calories; $e');
    }
  }

  Future<List<CalorieLogDto>> getLoggedRecipes(DateTime date) async {
    final dateStr = date.toIso8601String().split('T').first;
    try {
      final response = await _dio.get(
        'user/calorie-log-recipes',
        queryParameters: {'date': dateStr},
      );
      if (response.statusCode == 200) {
        final List<dynamic> data = response.data as List<dynamic>;
        return data
            .map((item) => CalorieLogDto.fromJson(item as Map<String, dynamic>))
            .toList();
      } else {
        throw Exception('Failed to load calorie log recipes');
      }
    } catch (e) {
      throw Exception('Failed to load calorie log recipes: $e');
    }
  }

  Future<void> removeCalorieLog(int logId) async {
    try {
      final response = await _dio.delete(
        'user/calorie-log',
        data: {'logId': logId},
      );
      if (response.statusCode != 200) {
        throw Exception(
          'Failed to delete calorie log (status ${response.statusCode})',
        );
      }
    } catch (e) {
      throw Exception('Failed to delete calorie log: $e');
    }
  }

  Future<void> logCustomCalorie(
    String mealName,
    int calories,
    DateTime date,
  ) async {
    try {
      final response = await _dio.post(
        'user/calorie-log',
        data: {
          'mealName': mealName,
          'calories': calories,
          'date': date.toIso8601String(),
        },
      );
      if (response.statusCode != 201) {
        throw Exception('Failed to log custom calories');
      }
    } catch (e) {
      throw Exception('Failed to log custom calories: $e');
    }
  }

  /// Dietary Requirements

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

  Future<void> addFavouriteRecipe(RecipeModel recipe) async {
    try {
      _logger.d('Adding recipe with ID: $recipe'); // Log the recipe ID
      final recipeId = await _recipeService.createRecipe(recipe);

      _logger.d(
        'Recipe created with ID: $recipeId',
      ); // Log the created recipe ID
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
      // First, remove the recipe from favorites in the backend
      final response = await _dio.delete(
        '/user/favourite-recipe',
        data: {'recipeId': recipeId},
      );

      if (response.statusCode != 200) {
        throw Exception('Failed to remove recipe from favorites');
      }
      try {} catch (deleteError) {
        // Log the error but don't rethrow - we've already unfavorited successfully
        _logger.w(
          'Could not delete recipe from database but unfavorited successfully: $deleteError',
        );
      }
    } catch (e) {
      throw Exception('Failed to remove recipe from favorites: $e');
    }
  }

  Future<UserDto> updateUserProfile(UpdateUserDto updateUserDto) async {
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

  /// Updating Appliance for User

  Future<List<ApplianceRequirementDto>> getUserAppliances() async {
    try {
      final response = await _dio.get('/user/appliance');
      if (response.statusCode == 200) {
        List<dynamic> data = response.data;
        return data
            .map((item) => ApplianceRequirementDto.fromJson(item['appliance']))
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

  Future<ApplianceRequirementDto> createAppliance(
    String name,
    String? description,
  ) async {
    try {
      final response = await _dio.post(
        'appliance',
        data: {'name': name, 'description': description ?? ''},
      );

      if (response.statusCode == 201 || response.statusCode == 200) {
        return ApplianceRequirementDto.fromJson(response.data);
      } else {
        throw Exception('Failed to create appliance');
      }
    } catch (e) {
      throw Exception('Failed to create appliance: $e');
    }
  }

  /// Cuisine Methods
  Future<void> addCuisinePreference(int cuisineId) async {
    try {
      _logger.d('Attempting to add cuisine preference with ID: $cuisineId');
      _logger.d('Making POST request to: user/cuisine/$cuisineId');

      final response = await _dio.post('user/cuisine/$cuisineId');

      _logger.d('Response status code: ${response.statusCode}');
      _logger.d('Response data: ${response.data}');

      if (response.statusCode != 201 && response.statusCode != 200) {
        throw Exception(
          'Failed to add cuisine preference - Status: ${response.statusCode}',
        );
      }

      _logger.i('Successfully added cuisine preference with ID: $cuisineId');
    } on DioException catch (e) {
      _logger.e('DioException when adding cuisine preference:');
      _logger.e('Status code: ${e.response?.statusCode}');
      _logger.e('Response data: ${e.response?.data}');
      _logger.e('Request path: ${e.requestOptions.path}');
      _logger.e('Request method: ${e.requestOptions.method}');
      _logger.e('Base URL: ${e.requestOptions.baseUrl}');
      _logger.e('Full URL: ${e.requestOptions.uri}');
      throw Exception('Failed to add cuisine preference: $e');
    } catch (e) {
      _logger.e('General exception when adding cuisine preference: $e');
      throw Exception('Failed to add cuisine preference: $e');
    }
  }

  Future<void> removeCuisinePreference(int cuisineId) async {
    try {
      _logger.d('Attempting to remove cuisine preference with ID: $cuisineId');
      _logger.d('Making DELETE request to: user/cuisine/$cuisineId');

      final response = await _dio.delete('user/cuisine/$cuisineId');

      _logger.d('Response status code: ${response.statusCode}');
      _logger.d('Response data: ${response.data}');

      if (response.statusCode != 200 && response.statusCode != 204) {
        throw Exception(
          'Failed to remove cuisine preference - Status: ${response.statusCode}',
        );
      }

      _logger.i('Successfully removed cuisine preference with ID: $cuisineId');
    } on DioException catch (e) {
      _logger.e('DioException when removing cuisine preference:');
      _logger.e('Status code: ${e.response?.statusCode}');
      _logger.e('Response data: ${e.response?.data}');
      _logger.e('Request path: ${e.requestOptions.path}');
      _logger.e('Request method: ${e.requestOptions.method}');
      _logger.e('Base URL: ${e.requestOptions.baseUrl}');
      _logger.e('Full URL: ${e.requestOptions.uri}');
      throw Exception('Failed to remove cuisine preference: $e');
    } catch (e) {
      _logger.e('General exception when removing cuisine preference: $e');
      throw Exception('Failed to remove cuisine preference: $e');
    }
  }

  Future<List<CuisineDto>> getDefaultCuisines() async {
    try {
      _logger.d('Fetching default cuisines from: cuisine');

      final response = await _dio.get('cuisine');

      _logger.d('Response status code: ${response.statusCode}');
      _logger.d('Response data type: ${response.data.runtimeType}');
      _logger.d('Response data length: ${response.data?.length ?? 'null'}');

      if (response.statusCode == 200) {
        List<dynamic> data = response.data;
        final cuisines = data.map((item) => CuisineDto.fromJson(item)).toList();
        _logger.i('Successfully fetched ${cuisines.length} default cuisines');
        return cuisines;
      } else {
        throw Exception(
          'Failed to load default cuisines - Status: ${response.statusCode}',
        );
      }
    } on DioException catch (e) {
      _logger.e('DioException when fetching default cuisines:');
      _logger.e('Status code: ${e.response?.statusCode}');
      _logger.e('Response data: ${e.response?.data}');
      _logger.e('Request path: ${e.requestOptions.path}');
      throw Exception('Failed to load default cuisines: $e');
    } catch (e) {
      _logger.e('General exception when fetching default cuisines: $e');
      throw Exception('Failed to load default cuisines: $e');
    }
  }

  Future<List<CuisineDto>> getUserCuisines() async {
    try {
      _logger.d('Fetching user cuisines from: user/cuisine');

      final response = await _dio.get('user/cuisine');

      _logger.d('Response status code: ${response.statusCode}');
      _logger.d('Response data type: ${response.data.runtimeType}');
      _logger.d('Response data length: ${response.data?.length ?? 'null'}');

      if (response.statusCode == 200) {
        List<dynamic> data = response.data;
        final cuisines = data.map((item) => CuisineDto.fromJson(item)).toList();
        _logger.i('Successfully fetched ${cuisines.length} user cuisines');
        return cuisines;
      } else {
        throw Exception(
          'Failed to load user cuisines - Status: ${response.statusCode}',
        );
      }
    } on DioException catch (e) {
      _logger.e('DioException when fetching user cuisines:');
      _logger.e('Status code: ${e.response?.statusCode}');
      _logger.e('Response data: ${e.response?.data}');
      _logger.e('Request path: ${e.requestOptions.path}');
      throw Exception('Failed to load user cuisines: $e');
    } catch (e) {
      _logger.e('General exception when fetching user cuisines: $e');
      throw Exception('Failed to load user cuisines: $e');
    }
  }

  Future<CuisineDto> createCuisine(String name, String? description) async {
    try {
      final response = await _dio.post(
        'cuisine',
        data: {'name': name, 'description': description ?? ''},
      );

      if (response.statusCode == 201 || response.statusCode == 200) {
        return CuisineDto.fromJson(response.data);
      } else {
        throw Exception('Failed to create cuisine');
      }
    } catch (e) {
      throw Exception('Failed to create cuisine: $e');
    }
  }

  /// User Location

  Future<UserLocationDto?> getDefaultLocation() async {
    try {
      final response = await _dio.get('user/location/default');
      if (response.statusCode == 200) {
        if (response.data == null ||
            response.data is String && (response.data as String).isEmpty) {
          return null;
        }
        if (response.data is Map<String, dynamic>) {
          return UserLocationDto.fromJson(response.data);
        } else {
          throw Exception(
            'Received unexpected data format for default location.',
          );
        }
      } else {
        throw Exception(
          'Failed to load default location with status: ${response.statusCode}',
        );
      }
    } on DioException catch (e) {
      throw Exception(
        'Network or server error while fetching default location: ${e.message}',
      );
    } catch (e) {
      throw Exception('An unexpected error occurred: $e');
    }
  }

  Future<UserLocationDto> createLocation(
    CreateUserLocationDto locationData,
  ) async {
    try {
      final response = await _dio.post(
        'user/location',
        data: locationData.toJson(),
      );
      if (response.statusCode == 201) {
        return UserLocationDto.fromJson(response.data);
      } else {
        _logger.d(
          'Failed to create location: ${response.statusCode} ${response.data}',
        );
        throw Exception('Failed to create location');
      }
    } on DioException catch (e) {
      throw Exception('Failed to create location: ${e.message}');
    } catch (e) {
      throw Exception('An unexpected error occurred: $e');
    }
  }

  Future<UserLocationDto> updateLocation(
    int locationId,
    UpdateUserLocationDto locationData,
  ) async {
    try {
      final response = await _dio.put(
        'user/location',
        data: locationData.toJson(),
      );
      if (response.statusCode == 200) {
        return UserLocationDto.fromJson(response.data);
      } else {
        _logger.d(
          'Failed to update location: ${response.statusCode} ${response.data}',
        );
        throw Exception('Failed to update location');
      }
    } on DioException catch (e) {
      throw Exception('Failed to update location: ${e.message}');
    } catch (e) {
      throw Exception('An unexpected error occurred: $e');
    }
  }

  Future<void> removeLocation(int locationId) async {
    try {
      final response = await _dio.delete(
        'user/location',
        data: {'locationId': locationId},
      );
      if (response.statusCode != 200) {
        throw Exception('Failed to delete location');
      }
    } on DioException catch (e) {
      throw Exception('Failed to delete location: ${e.message}');
    } catch (e) {
      throw Exception('An unexpected error occurred: $e');
    }
  }
}
