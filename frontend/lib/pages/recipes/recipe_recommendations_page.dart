import 'dart:math';

import 'package:flutter/material.dart';
import 'package:nibbles/core/logger.dart';
import 'package:nibbles/pages/recipes/widgets/dice_widget.dart';
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

  Color _getDifficultyColor(
    recipe_service.RecipeDifficulty diff,
    ColorScheme cs,
  ) {
    switch (diff) {
      case recipe_service.RecipeDifficulty.hard:
        return cs.error; // Using semantic color
      case recipe_service.RecipeDifficulty.medium:
        return cs.tertiary; // Using semantic color
      default:
        return cs.primary;
    }
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
    final textTheme = Theme.of(context).textTheme;
    final colorScheme = Theme.of(context).colorScheme;

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
          return _buildRecipeCard(recipe, index, textTheme, colorScheme);
        },
      ),
    );
  }

  Widget _buildRecipeCard(
    RecipeModel recipe,
    int index,
    TextTheme textTheme,
    ColorScheme colorScheme,
  ) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => RecipeIngredientsPage(recipe: recipe),
          ),
        );
      },
      child: Card(
        clipBehavior: Clip.antiAlias,
        margin: const EdgeInsets.only(bottom: 16),
        child: Column(
          children: [
            _buildRecipeImage(recipe, textTheme, colorScheme),
            _buildRecipeDetails(recipe, index, textTheme, colorScheme),
          ],
        ),
      ),
    );
  }

  Widget _buildRecipeImage(
    RecipeModel recipe,
    TextTheme textTheme,
    ColorScheme colorScheme,
  ) {
    return Stack(
      children: [
        // Hero Image
        SizedBox(
          height: 200,
          width: double.infinity,
          child:
              recipe.imageURL != null && recipe.imageURL!.isNotEmpty
                  ? Image.network(
                    recipe.imageURL!,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) {
                      return Container(
                        color: colorScheme.surfaceContainerHighest,
                        child: Icon(
                          Icons.restaurant,
                          size: 60,
                          color: colorScheme.onSurfaceVariant,
                        ),
                      );
                    },
                  )
                  : Container(
                    color: colorScheme.surfaceContainerHighest,
                    child: Icon(
                      Icons.restaurant,
                      size: 60,
                      color: colorScheme.onSurfaceVariant,
                    ),
                  ),
        ),
        // Difficulty badge
        Positioned(
          right: 8,
          top: 8,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: _getDifficultyColor(
                recipe_service.RecipeDifficulty.values.firstWhere(
                  (e) => e.name == recipe.difficultyLevel.name,
                ),
                colorScheme,
              ),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Text(
              recipe.difficultyLevel.name[0].toUpperCase() +
                  recipe.difficultyLevel.name.substring(1),
              style: textTheme.labelMedium?.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildRecipeDetails(
    RecipeModel recipe,
    int index,
    TextTheme textTheme,
    ColorScheme colorScheme,
  ) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  recipe.title,
                  style: textTheme.titleLarge?.copyWith(
                    color: colorScheme.onSurface,
                    fontWeight: FontWeight.bold,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              IconButton(
                icon: Icon(
                  recipe.isFavorite ? Icons.favorite : Icons.favorite_border,
                  size: 28,
                  color:
                      recipe.isFavorite
                          ? colorScheme.error
                          : colorScheme.onSurfaceVariant,
                ),
                onPressed: () => _toggleFavorite(index),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Icon(
                Icons.access_time,
                size: 20,
                color: colorScheme.primary,
              ),
              const SizedBox(width: 6),
              Text(
                '${recipe.estimatedTimeMinutes} min',
                style: textTheme.bodyMedium?.copyWith(
                  color: colorScheme.onSurface,
                ),
              ),
              const SizedBox(width: 20),
              Icon(
                Icons.local_fire_department,
                size: 20,
                color: colorScheme.primary,
              ),
              const SizedBox(width: 6),
              Text(
                '${recipe.calories} cal',
                style: textTheme.bodyMedium?.copyWith(
                  color: colorScheme.onSurface,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
