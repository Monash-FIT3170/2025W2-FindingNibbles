import 'package:flutter/material.dart';
import 'recipe_ingredients_page.dart';
import 'recipe_model.dart';
import 'package:nibbles/pages/recipes/recipes_page.dart';

class RecipeRecommendationsPage extends StatefulWidget {
  final List<RecipeModel> recipes;
  const RecipeRecommendationsPage({super.key, required this.recipes});

  @override
  State<RecipeRecommendationsPage> createState() =>
      _RecipeRecommendationsPageState();
}

class _RecipeRecommendationsPageState extends State<RecipeRecommendationsPage> {
  Color _getDifficultyColor(RecipeDifficulty diff, ColorScheme cs) {
    switch (diff) {
      case RecipeDifficulty.hard:
        return Colors.red;
      case RecipeDifficulty.medium:
        return Colors.orange;
      default:
        return cs.primary;
    }
  }

  void _toggleFavorite(int index) {
    setState(() {
      widget.recipes[index].isFavorite = !widget.recipes[index].isFavorite;
    });
  }

  void _reloadRecipes() {
    // Logic to reload recipes or update the list goes here
    // Removed print to comply with production code standards
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
          final r = widget.recipes[index];
          return GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => RecipeIngredientsPage(recipe: r),
                ),
              );
            },
            child: Container(
              margin: const EdgeInsets.only(bottom: 16),
              decoration: BoxDecoration(
                color: colorScheme.surfaceContainerHighest,
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withAlpha((0.05 * 255).round()),
                    blurRadius: 6,
                    offset: const Offset(0, 4),
                  ),
                ],
              ),
              child: Column(
                children: [
                  Stack(
                    children: [
                      ClipRRect(
                        borderRadius: const BorderRadius.vertical(
                          top: Radius.circular(16),
                        ),
                        child: Image.asset(
                          'imageUrl', // Placeholder for image URL, to be implemented
                          height: 160,
                          width: double.infinity,
                          fit: BoxFit.cover,
                        ),
                      ),
                      Positioned(
                        right: 10,
                        top: 10,
                        child: Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 8,
                            vertical: 4,
                          ),
                          decoration: BoxDecoration(
                            color: _getDifficultyColor(
                              r.difficultyLevel,
                              colorScheme,
                            ),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            r.difficultyLevel.name[0].toUpperCase() +
                                r.difficultyLevel.name.substring(1),
                            style: textTheme.labelSmall?.copyWith(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                  Padding(
                    padding: const EdgeInsets.all(12.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          r.title,
                          style: textTheme.bodyLarge?.copyWith(
                            fontWeight: FontWeight.bold,
                            color: colorScheme.onSurface,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                Icon(
                                  Icons.access_time,
                                  size: 16,
                                  color: colorScheme.onSurfaceVariant,
                                ),
                                const SizedBox(width: 4),
                                Text(
                                  '${r.estimatedTimeMinutes} min',
                                  style: textTheme.labelMedium?.copyWith(
                                    color: colorScheme.onSurfaceVariant,
                                  ),
                                ),
                              ],
                            ),
                            IconButton(
                              icon: Icon(
                                r.isFavorite
                                    ? Icons.favorite
                                    : Icons.favorite_border,
                                color:
                                    r.isFavorite
                                        ? Colors.red.shade800
                                        : colorScheme.onSurfaceVariant,
                              ),
                              onPressed: () => _toggleFavorite(index),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
