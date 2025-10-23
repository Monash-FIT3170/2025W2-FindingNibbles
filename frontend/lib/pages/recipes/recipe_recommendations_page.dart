import 'dart:math';

import 'package:flutter/material.dart';
import 'package:nibbles/core/logger.dart';
import 'package:nibbles/pages/recipes/widgets/dice_widget.dart';
import 'package:nibbles/pages/recipes/widgets/recipe_recommendation_card.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/recipe/recipe_service.dart' as recipe_service;

import 'recipe_ingredients_page.dart';
import 'recipe_model.dart';

class RecipeRecommendationsPage extends StatefulWidget {
  final List<RecipeModel> recipes;
  final List<int> dietaryRequirements;
  final List<int> kitchenAppliances;

  const RecipeRecommendationsPage({
    super.key,
    required this.recipes,
    this.dietaryRequirements = const [],
    this.kitchenAppliances = const [],
  });

  @override
  State<RecipeRecommendationsPage> createState() =>
      _RecipeRecommendationsPageState();
}

class _RecipeRecommendationsPageState extends State<RecipeRecommendationsPage> {
  final ProfileService _profileService = ProfileService();
  final _logger = getLogger();
  final Random _random = Random();

  void _handleDiceRoll() {
    if (widget.recipes.isEmpty) return;

    // Randomly select a recipe
    final randomRecipe = widget.recipes[_random.nextInt(widget.recipes.length)];

    // Show result modal
    _showDiceResultModal(
      title: 'Random Recipe Selected!',
      subtitle: randomRecipe.title,
      icon: Icons.restaurant_menu,
      recipe: randomRecipe,
    );
  }

  void _showDiceResultModal({
    required String title,
    required String subtitle,
    required IconData icon,
    required RecipeModel recipe,
  }) {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return DiceResultModal(
          title: title,
          subtitle: subtitle,
          icon: icon,
          onClose: () {
            Navigator.of(context).pop();
            // Navigate to the selected recipe after closing the modal
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => RecipeIngredientsPage(recipe: recipe),
              ),
            );
          },
        );
      },
    );
  }

  Future<void> _toggleFavorite(int index) async {
    final recipe = widget.recipes[index];
    final bool newFavoriteStatus = !recipe.isFavorite;

    try {
      // Update UI optimistically
      setState(() {
        recipe.isFavorite = newFavoriteStatus;
      });

      if (newFavoriteStatus) {
        // Add to favorites if it was just favorited
        await _profileService.addFavouriteRecipe(recipe);
        _logger.d('Added recipe ${recipe.title} to favorites');
      } // else {
      //   // Remove from favorites if it was just unfavorited
      //   await _profileService.removeFavouriteRecipe(recipe.id);
      //   _logger.d('Removed recipe ${recipe.title} from favorites');
      // }
    } catch (e) {
      // If there's an error, revert the UI change
      setState(() {
        recipe.isFavorite = !newFavoriteStatus;
      });

      _logger.e('Error toggling favorite status: $e');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to update favorite status: $e')),
        );
      }
    }
  }

  void _reloadRecipes() async {
    try {
      // Create loading indicator
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (BuildContext context) {
          return AlertDialog(
            content: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                const CircularProgressIndicator(),
                const SizedBox(height: 16),
                Text(
                  'Generating new recipes...',
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
                const SizedBox(height: 8),
                Text(
                  'This may take a moment',
                  style: Theme.of(context).textTheme.bodySmall,
                ),
              ],
            ),
          );
        },
      );

      // Get data from first recipe to reuse
      final firstRecipe = widget.recipes.first;
      final recipeResults = await recipe_service.RecipeService()
          .generateRecipes(
            ingredients: firstRecipe.ingredients,
            dietaryRequirements:
                widget.dietaryRequirements, // Use widget values
            kitchenAppliances: widget.kitchenAppliances, // Use widget values
            difficultyLevel: recipe_service.RecipeDifficulty.values.firstWhere(
              (e) => e.name == firstRecipe.difficultyLevel.name,
            ),
          );

      // Remove loading indicator
      if (!mounted) return;
      Navigator.pop(context);

      // Update the page with new recipes
      if (!mounted) return;
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder:
              (context) => RecipeRecommendationsPage(
                recipes: recipeResults,
                dietaryRequirements: widget.dietaryRequirements,
                kitchenAppliances: widget.kitchenAppliances,
              ),
        ),
      );
    } catch (e) {
      // Remove loading indicator if there was an error
      if (mounted) {
        Navigator.pop(context);

        // Show error dialog
        showDialog(
          context: context,
          builder: (BuildContext context) {
            return AlertDialog(
              title: const Text('Error'),
              content: Text('Failed to generate new recipes: ${e.toString()}'),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(context),
                  child: const Text('OK'),
                ),
              ],
            );
          },
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Recipe Recommendations'),
        actions: [
          DiceRollWidget(
            onPressed: _handleDiceRoll,
            isEnabled: widget.recipes.isNotEmpty,
          ),
          IconButton(
            icon: Icon(Icons.refresh),
            tooltip: 'Refresh',
            onPressed: _reloadRecipes,
          ),
        ],
      ),
      backgroundColor: Theme.of(context).colorScheme.surface,
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: widget.recipes.length,
        itemBuilder: (context, index) {
          final recipe = widget.recipes[index];
          return RecipeRecommendationCard(
            recipe: recipe,
            isFavorite: recipe.isFavorite,
            onFavoriteTap: () => _toggleFavorite(index),
            onTap: () async {
              // Navigate to recipe ingredients page and wait for result
              await Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => RecipeIngredientsPage(recipe: recipe),
                ),
              );
              // Refresh the UI when coming back to reflect any changes
              setState(() {});
            },
          );
        },
      ),
    );
  }
}
