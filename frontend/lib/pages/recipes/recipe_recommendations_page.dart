import 'package:flutter/material.dart';
import 'recipe_ingredients_page.dart';
import 'recipe_model.dart';
import 'package:nibbles/pages/recipes/recipes_page.dart';

class RecipeRecommendationsPage extends StatefulWidget {
  const RecipeRecommendationsPage({super.key});

  @override
  State<RecipeRecommendationsPage> createState() => _RecipeRecommendationsPageState();
}

class _RecipeRecommendationsPageState extends State<RecipeRecommendationsPage> {
  final List<Recipe> recipes = [
    Recipe(
      title: 'Traditional spare ribs baked',
      imageUrl: 'assets/images/spare_ribs.jpg',
      cookingTime: 55,
      ingredients: ['Pork', 'Garlic', 'Soy Sauce', 'Sugar'],
      instructions: [
        'Preheat oven to 180°C',
        'Season ribs',
        'Bake for 55 minutes',
      ],
      isFavorite: false,
    ),
    Recipe(
      title: 'Spice Roasted Chicken with Flavored Rice',
      imageUrl: 'assets/images/roasted_chicken.jpg',
      cookingTime: 30,
      ingredients: ['Chicken', 'Rice', 'Spices'],
      instructions: ['Marinate chicken', 'Roast for 30 minutes', 'Cook rice'],
      isFavorite: false,
    ),
    Recipe(
      title: 'Spicy fried rice mix chicken bali',
      imageUrl: 'assets/images/fried_rice.jpg',
      cookingTime: 25,
      ingredients: ['Chicken', 'Rice', 'Chili'],
      instructions: ['Fry ingredients', 'Add rice and spices', 'Serve hot'],
      isFavorite: false,
    ),
  ];

  Color _getDifficultyColor(String difficulty, ColorScheme colorScheme) {
    switch (difficulty) {
      case 'Hard':
        return Colors.red;
      case 'Medium':
        return Colors.orange;
      default:
        return colorScheme.primary;
    }
  }

void _toggleFavorite(int index) {
  setState(() {
    recipes[index].isFavorite = !recipes[index].isFavorite;
  });
}

void _reloadRecipes() {
  // Logic to reload recipes or update the list goes here
  print("Recipes reloaded!");
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
        MaterialPageRoute(
          builder: (context) => const RecipesPage(),
        ),
      );
    },
  ),
],

      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: recipes.length,
        itemBuilder: (context, index) {
          final recipe = recipes[index];
          return GestureDetector(
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => const RecipeIngredientsPage(),
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
                    color: Colors.black.withOpacity(0.05),
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
                          recipe.imageUrl,
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
                            color: _getDifficultyColor(recipe.difficulty, colorScheme),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            recipe.difficulty,
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
                          recipe.title,
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
                                Icon(Icons.access_time, size: 16, color: colorScheme.onSurfaceVariant),
                                const SizedBox(width: 4),
                                Text(
                                  '${recipe.cookingTime} min',
                                  style: textTheme.labelMedium?.copyWith(color: colorScheme.onSurfaceVariant),
                                ),
                              ],
                            ),
                            IconButton(
                              icon: Icon(
                                recipe.isFavorite ? Icons.favorite : Icons.favorite_border,
                                color: recipe.isFavorite
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
