import 'package:flutter/material.dart';
import 'recipe_instructions_page.dart'; // Keep this import

class Recipe {
  final String title;
  final String imageUrl;
  final int cookingTime;
  final List<String> ingredients;
  bool isFavorite;

  Recipe({
    required this.title,
    required this.imageUrl,
    required this.cookingTime,
    required this.ingredients,
    this.isFavorite = false,
  });
}

class RecipeIngredientsPage extends StatefulWidget {
  const RecipeIngredientsPage({super.key});

  @override
  State<RecipeIngredientsPage> createState() => _RecipeIngredientsPageState();
}

class _RecipeIngredientsPageState extends State<RecipeIngredientsPage> {
  // Sample recipe data (this would come from your data source)
  final Recipe recipe = Recipe(
    title: 'Traditional spare ribs baked',
    imageUrl: 'placeholder', // You'd replace this with actual image URL
    cookingTime: 55,
    ingredients: [
      '1kg pork spare ribs',
      '2 tablespoons fish sauce',
      '1 shallot (finely diced)',
      '1/2 teaspoon ground black pepper',
      '3 cloves garlic (finely chopped)',
      '3 tablespoons granulated sugar (divided)',
      '1 tablespoon chicken or mushroom bouillon powder',
      '3/4 cup coconut soda',
      '1 green onion (optional, thinly sliced)',
      '1/2 cup water',
    ],
    isFavorite: false,
  );

  // Track checked ingredients
  late List<bool> checkedIngredients;

  @override
  void initState() {
    super.initState();
    // Initialize all ingredients as unchecked
    checkedIngredients = List.generate(recipe.ingredients.length, (_) => false);
    // Set first ingredient as checked for demonstration
    checkedIngredients[0] = true;
  }

  void navigateToInstructionsPage() {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => RecipeInstructionsPage(recipe: recipe),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: const BackButton(color: Colors.black),
        centerTitle: false,
        title: const Text(
          'Recipe List',
          style: TextStyle(
            color: Colors.black,
            fontSize: 18,
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.more_horiz, color: Colors.black),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          // Recipe image
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Stack(
              children: [
                // Image with gray placeholder
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: Container(
                    height: 150,
                    width: double.infinity,
                    color: Colors.grey[300],
                    child: const Center(
                      child: Icon(Icons.image, size: 50, color: Colors.grey),
                    ),
                  ),
                ),

                // Gradient overlay
                Positioned(
                  bottom: 0,
                  left: 0,
                  right: 0,
                  child: Container(
                    height: 60,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.bottomCenter,
                        end: Alignment.topCenter,
                        colors: [
                          Colors.black.withValues(alpha: 0.7),
                          Colors.transparent.withValues(alpha: 0.0),
                        ],
                      ),
                    ),
                  ),
                ),

                // Title text
                Positioned(
                  bottom: 8,
                  left: 8,
                  child: Text(
                    recipe.title,
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                      fontSize: 18,
                    ),
                  ),
                ),

                // Time indicator
                Positioned(
                  bottom: 8,
                  right: 8,
                  child: Row(
                    children: [
                      const Icon(
                        Icons.access_time,
                        color: Colors.white,
                        size: 16,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        '${recipe.cookingTime} min',
                        style: const TextStyle(color: Colors.white),
                      ),
                    ],
                  ),
                ),
                // Favorite button
                Positioned(
                  top: 8,
                  right: 8,
                  child: Container(
                    width: 30,
                    height: 30,
                    decoration: BoxDecoration(
                      color: Colors.white.withValues(alpha: 0.3),
                      color: Colors.white.withOpacity(0.3),
                      shape: BoxShape.circle,
                      border: Border.all(color: Colors.white, width: 1),
                    ),
                    child: IconButton(
                      padding: EdgeInsets.zero,
                      iconSize: 18,
                      icon: Icon(
                        recipe.isFavorite
                            ? Icons.favorite
                            : Icons.favorite_border,
                        color: Colors.pink,
                      ),
                      onPressed: () {
                        setState(() {
                          recipe.isFavorite = !recipe.isFavorite;
                        });
                      },
                    ),
                  ),
                ),
              ],
            ),
          ),