import 'package:dio/dio.dart';
import 'package:nibbles/core/dio_client.dart';
import 'package:nibbles/core/logger.dart';
import 'package:nibbles/pages/recipes/recipe_model.dart'; // Add this import

enum RecipeDifficulty { any, easy, medium, hard }

class RecipeService {
  final Dio _dio = DioClient().client;
  final _logger = getLogger();

  /// Generate recipes based on provided criteria
  Future<List<RecipeModel>> generateRecipes({
    required List<String> ingredients,
    required List<int> dietaryRequirements,
    required List<int> kitchenAppliances,
    required RecipeDifficulty difficultyLevel,
    int? calorieCount,
  }) async {
    try {
      final response = await _dio.post(
        'recipe',
        data: {
          'ingredients': ingredients,
          'dietaryRequirements': dietaryRequirements,
          'kitchenAppliances': kitchenAppliances,
          'difficultyLevel': difficultyLevel.name,
          'calorieCount': calorieCount,
        },
      );

      if (response.statusCode == 201) {
        final List<dynamic> recipesJson = response.data as List<dynamic>;
        return recipesJson.map((json) => RecipeModel.fromJson(json)).toList();
      } else {
        throw Exception('Failed to generate recipes: ${response.data}');
      }
    } catch (e) {
      _logger.e('Failed to generate recipes: ${e.toString()}');
      throw Exception('Failed to generate recipes: ${e.toString()}');
    }
  }

  Future<void> logCalories(int calories, DateTime date) async {
    try {
      final response = await _dio.post(
        'user/calorie-log',
        data: {'calories': calories, 'date': date.toIso8601String()},
      );
      if (response.statusCode != 201) {
        throw Exception('Failed to log calories');
      }
    } catch (e) {
      throw Exception('Failed to log calories: $e');
    }
  }

  /// Fetch a specific recipe by ID
  Future<dynamic> getRecipe(int recipeId) async {
    try {
      final response = await _dio.get('recipe/$recipeId');
      if (response.statusCode == 200) {
        return response.data;
      } else {
        throw Exception('Failed to fetch recipe details');
      }
    } catch (e) {
      _logger.e('Failed to fetch recipe: ${e.toString()}');
      throw Exception('Failed to fetch recipe: ${e.toString()}');
    }
  }

  /// Fetch all recipes
  Future<List<dynamic>> getAllRecipes() async {
    try {
      final response = await _dio.get('recipe');
      if (response.statusCode == 200) {
        return response.data as List<dynamic>;
      } else {
        throw Exception('Failed to fetch recipes');
      }
    } catch (e) {
      _logger.e('Failed to fetch recipes: ${e.toString()}');
      throw Exception('Failed to fetch recipes: ${e.toString()}');
    }
  }

  Future<int> createRecipe(RecipeModel recipe) async {
    try {
      _logger.d('Creating recipe: ${recipe.title}');
      final response = await _dio.post('recipe/save', data: recipe.toJson());

      if (response.statusCode == 201 || response.statusCode == 200) {
        // Extract the recipe ID from the response
        var recipeId = -1;
        try {
          // Handle different response formats
          if (response.data is int) {
            recipeId = response.data;
          } else if (response.data is String &&
              (response.data as String).isNotEmpty) {
            recipeId = int.tryParse(response.data as String) ?? -1;
          } else if (response.data is Map &&
              (response.data as Map).containsKey('id')) {
            recipeId =
                int.tryParse((response.data as Map)['id'].toString()) ?? -1;
          }
          return recipeId;
        } catch (e) {
          return -1; // Return placeholder ID
        }
      } else {
        return -1;
      }
    } catch (e) {
      return -1; // Return placeholder ID instead of throwing
    }
  }
}
