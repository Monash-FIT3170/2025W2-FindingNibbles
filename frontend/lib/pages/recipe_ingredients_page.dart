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
      appBar: AppBar(title: Text(recipe.title)),
      body: ListView.builder(
        itemCount: recipe.ingredients.length,
        itemBuilder: (context, index) {
          return CheckboxListTile(
            title: Text(recipe.ingredients[index]),
            value: checkedIngredients[index],
            onChanged: (bool? value) {
              setState(() {
                checkedIngredients[index] = value ?? false;
              });
            },
          );
        },
      ),
    );
  }
}
