import 'package:flutter/material.dart';

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

          // Tab selector
          Container(
            decoration: const BoxDecoration(
              border: Border(
                bottom: BorderSide(color: Colors.grey, width: 0.5),
              ),
            ),
            child: Row(
              children: [
                Expanded(
                  child: Column(
                    children: [
                      const Padding(
                        padding: EdgeInsets.symmetric(vertical: 14),
                        child: Text(
                          'Ingredients',
                          style: TextStyle(
                            fontWeight: FontWeight.bold,
                            color: Colors.black,
                          ),
                        ),
                      ),
                      Container(height: 2, color: Colors.red),
                    ],
                  ),
                ),
                Expanded(
                  child: Column(
                    children: [
                      const Padding(
                        padding: EdgeInsets.symmetric(vertical: 14),
                        child: Text(
                          'Cooking Instructions',
                          style: TextStyle(color: Colors.grey),
                        ),
                      ),
                      Container(height: 2, color: Colors.transparent),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // Ingredients title
          Container(
            alignment: Alignment.centerLeft,
            padding: const EdgeInsets.only(left: 16, top: 16, bottom: 8),
            child: const Text(
              'Ingredients:',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),

          // Ingredients list
          Expanded(
            child: ListView.builder(
              itemCount: recipe.ingredients.length,
              itemBuilder: (context, index) {
                return Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 8,
                  ),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      // Custom checkbox
                      InkWell(
                        onTap: () {
                          setState(() {
                            checkedIngredients[index] =
                                !checkedIngredients[index];
                          });
                        },
                        child: Container(
                          width: 24,
                          height: 24,
                          decoration: BoxDecoration(
                            color:
                                checkedIngredients[index]
                                    ? Colors.red
                                    : Colors.white,
                            borderRadius: BorderRadius.circular(4),
                            border: Border.all(
                              color:
                                  checkedIngredients[index]
                                      ? Colors.red
                                      : Colors.grey,
                              width: 1.5,
                            ),
                          ),
                          child:
                              checkedIngredients[index]
                                  ? const Icon(
                                    Icons.check,
                                    size: 16,
                                    color: Colors.white,
                                  )
                                  : null,
                        ),
                      ),
                      const SizedBox(width: 12),
                      // Ingredient text
                      Expanded(
                        child: Text(
                          recipe.ingredients[index],
                          style: TextStyle(
                            decoration:
                                checkedIngredients[index]
                                    ? TextDecoration.lineThrough
                                    : null,
                            color:
                                checkedIngredients[index]
                                    ? Colors.grey
                                    : Colors.black,
                            fontSize: 16,
                          ),
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
