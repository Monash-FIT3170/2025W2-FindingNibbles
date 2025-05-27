import 'package:flutter/material.dart';
import 'recipe_ingredients_page.dart';
import 'package:nibbles/pages/recipes/recipes_page.dart';
import 'recipe_model.dart';
import 'package:nibbles/service/recipe/recipe_service.dart' as recipe_service;

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

  void _toggleFavorite(int index) {
    setState(() {
      widget.recipes[index].isFavorite = !widget.recipes[index].isFavorite;
    });
  }

  void _reloadRecipes() async {
    try {
      // Create loading indicator
      showDialog(
        context: context,
        barrierDismissible: false,
        builder: (BuildContext context) {
          return Center(child: CircularProgressIndicator());
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
      backgroundColor: colorScheme.surface,
      appBar: AppBar(
        backgroundColor: colorScheme.surface,
        elevation: 0,
        leading: BackButton(color: colorScheme.onSurface),
        centerTitle: false,
        title: Text(
          'Based on your ingredients:',
          style: textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
            color: colorScheme.onSurface,
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.refresh, color: colorScheme.onSurface),
            tooltip: 'Refresh',
            onPressed: _reloadRecipes,
          ),
          IconButton(
            icon: Icon(Icons.filter_list, color: colorScheme.onSurface),
            tooltip: 'Filter',
            onPressed: () {
              Navigator.pushReplacement(
                context,
                MaterialPageRoute(builder: (context) => const RecipesPage()),
              );
            },
          ),
        ],
      ),
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
      child: Container(
        // Reduce bottom margin
        margin: const EdgeInsets.only(bottom: 8),
        decoration: BoxDecoration(
          color: colorScheme.surfaceContainerHighest,
          borderRadius: BorderRadius.circular(12), // Slightly smaller radius
          boxShadow: [
            BoxShadow(
              color: colorScheme.shadow.withAlpha((0.05 * 255).toInt()),
              blurRadius: 4, // Reduced blur
              offset: const Offset(0, 2), // Reduced offset
            ),
          ],
        ),
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
        ClipRRect(
          borderRadius: const BorderRadius.vertical(top: Radius.circular(12)),
          child: Container(
            // Reduce height to half
            height: 80,
            width: double.infinity,
            color: colorScheme.surfaceContainerHighest,
            child: Icon(
              Icons.image,
              // Keep icon size the same
              size: 50,
              color: colorScheme.onSurfaceVariant,
            ),
          ),
        ),
        Positioned(
          right: 8,
          top: 8,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
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
              // Keep text size the same
              style: textTheme.labelSmall?.copyWith(
                color: colorScheme.onPrimary,
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
      // Reduce padding
      padding: const EdgeInsets.all(8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            recipe.title,
            // Keep text size the same
            style: textTheme.titleMedium?.copyWith(
              color: colorScheme.onSurface,
            ),
          ),
          const SizedBox(height: 4), // Reduced spacing
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Icon(
                    Icons.access_time,
                    // Keep icon size the same
                    size: 16,
                    color: colorScheme.onSurfaceVariant,
                  ),
                  const SizedBox(width: 4),
                  Text(
                    '${recipe.estimatedTimeMinutes} min',
                    // Keep text size the same
                    style: textTheme.labelMedium?.copyWith(
                      color: colorScheme.onSurfaceVariant,
                    ),
                  ),
                ],
              ),
              IconButton(
                icon: Icon(
                  recipe.isFavorite ? Icons.favorite : Icons.favorite_border,
                  // Keep icon size the same
                  size: 24,
                  color:
                      recipe.isFavorite
                          ? colorScheme.error
                          : colorScheme.onSurfaceVariant,
                ),
                // Reduce padding around the button
                constraints: const BoxConstraints(minWidth: 32, minHeight: 32),
                padding: EdgeInsets.zero,
                onPressed: () => _toggleFavorite(index),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
