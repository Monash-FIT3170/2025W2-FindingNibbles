import 'package:dio/dio.dart';
import 'package:nibbles/core/dio_client.dart';
import 'package:nibbles/core/logger.dart';

enum RecipeDifficulty { easy, medium, hard, any }

class RecipeService {
  final Dio _dio = DioClient().client;
  final _logger = getLogger();

  /// Generate recipes based on provided criteria
  Future<dynamic> generateRecipes({
    required List<String> ingredients,
    required List<int> dietaries,
    required List<int> appliances,
    required RecipeDifficulty difficultyLevel,
  }) async {
    try {
      final response = await _dio.post(
        'recipe',
        data: {
          'ingredients': ingredients,
          'dietaryRequirements': dietaries,
          'kitchenAppliances': appliances,
          'difficultyLevel': difficultyLevel.name,
        },
      );

      if (response.statusCode == 200) {
        _logger.d('Recipe generation successful');
        return response.data;
      } else {
        _logger.e('Failed to generate recipes: ${response.statusCode}');
        throw Exception('Failed to generate recipes: ${response.statusCode}');
      }
    } catch (e) {
      _logger.e('Error generating recipes: ${e.toString()}');
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
