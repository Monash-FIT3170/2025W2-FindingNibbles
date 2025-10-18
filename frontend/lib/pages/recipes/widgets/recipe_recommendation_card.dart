import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:nibbles/pages/recipes/recipe_ingredients_page.dart';
import 'package:nibbles/pages/recipes/recipe_model.dart';
import 'package:nibbles/service/recipe/recipe_service.dart' as recipe_service;

class RecipeRecommendationCard extends StatelessWidget {
  final RecipeModel recipe;
  final VoidCallback onFavoriteTap;
  final bool isFavorite;
  final VoidCallback? onTap;

  const RecipeRecommendationCard({
    super.key,
    required this.recipe,
    required this.onFavoriteTap,
    required this.isFavorite,
    this.onTap,
  });

  Color _getDifficultyColor(
    recipe_service.RecipeDifficulty diff,
    ColorScheme cs,
  ) {
    switch (diff) {
      case recipe_service.RecipeDifficulty.hard:
        return cs.error;
      case recipe_service.RecipeDifficulty.medium:
        return cs.tertiary;
      default:
        return cs.primary;
    }
  }

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final colorScheme = Theme.of(context).colorScheme;

    return GestureDetector(
      onTap:
          onTap ??
          () {
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
            _buildRecipeImage(textTheme, colorScheme),
            _buildRecipeDetails(textTheme, colorScheme),
          ],
        ),
      ),
    );
  }

  Widget _buildRecipeImage(TextTheme textTheme, ColorScheme colorScheme) {
    return Stack(
      children: [
        // Hero Image
        SizedBox(
          height: 200,
          width: double.infinity,
          child:
              recipe.imageURL != null && recipe.imageURL!.isNotEmpty
                  ? _buildImage(colorScheme)
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

  Widget _buildImage(ColorScheme colorScheme) {
    final imageUrl = recipe.imageURL!;

    // Check if it's a base64 data URL
    if (imageUrl.startsWith('data:image')) {
      try {
        // Extract base64 string from data URL
        final base64String = imageUrl.split(',')[1];
        final Uint8List bytes = base64Decode(base64String);

        return Image.memory(
          bytes,
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
        );
      } catch (e) {
        // If base64 decoding fails, show error icon
        return Container(
          color: colorScheme.surfaceContainerHighest,
          child: Icon(
            Icons.restaurant,
            size: 60,
            color: colorScheme.onSurfaceVariant,
          ),
        );
      }
    } else {
      // It's a regular URL
      return Image.network(
        imageUrl,
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
      );
    }
  }

  Widget _buildRecipeDetails(TextTheme textTheme, ColorScheme colorScheme) {
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
                  isFavorite ? Icons.favorite : Icons.favorite_border,
                  size: 28,
                  color:
                      isFavorite
                          ? colorScheme.error
                          : colorScheme.onSurfaceVariant,
                ),
                onPressed: onFavoriteTap,
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Icon(Icons.access_time, size: 20, color: colorScheme.primary),
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
