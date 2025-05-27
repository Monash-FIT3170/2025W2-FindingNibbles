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
  }) async {
    try {
      final response = await _dio.post(
        'recipe',
        data: {
          'ingredients': ingredients,
          'dietaryRequirements': dietaryRequirements,
          'kitchenAppliances': kitchenAppliances,
          'difficultyLevel': difficultyLevel.name,
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
}
