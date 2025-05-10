import 'package:flutter/material.dart';
import 'recipe_instructions_page.dart';

class Recipe {
  final String title;
  final String imageUrl;
  final int cookingTime;
  final List<String> ingredients;
  final List<String> instructions;
  bool isFavorite;

  Recipe({
    required this.title,
    required this.imageUrl,
    required this.cookingTime,
    required this.ingredients,
    required this.instructions,
    this.isFavorite = false,
  });
}

class RecipeIngredientsPage extends StatefulWidget {
  const RecipeIngredientsPage({super.key});

  @override
  State<RecipeIngredientsPage> createState() => _RecipeIngredientsPageState();
}

class _RecipeIngredientsPageState extends State<RecipeIngredientsPage> {
  final Recipe recipe = Recipe(
    title: 'Traditional spare ribs baked',
    imageUrl: 'placeholder',
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
    instructions: [
      'Step 1 - Prepare the Pork',
      'Step 2 - Marinate the Pork',
      'Step 3 - Prepare the Caramel Sauce',
      'Step 4 - Cook the Pork',
      'Step 5 - Garnish and Serve',
    ],
    isFavorite: false,
  );

  late List<bool> checkedIngredients;

  @override
  void initState() {
    super.initState();
    checkedIngredients = List.generate(recipe.ingredients.length, (_) => false);
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

  Widget _buildIngredientsList() {
    return Expanded(
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
                InkWell(
                  onTap: () {
                    setState(() {
                      checkedIngredients[index] = !checkedIngredients[index];
                    });
                  },
                  child: Container(
                    width: 24,
                    height: 24,
                    decoration: BoxDecoration(
                      color: checkedIngredients[index] ? Colors.red : Colors.white,
                      borderRadius: BorderRadius.circular(4),
                      border: Border.all(
                        color: checkedIngredients[index] ? Colors.red : Colors.grey,
                        width: 1.5,
                      ),
                    ),
                    child: checkedIngredients[index]
                        ? const Icon(
                            Icons.check,
                            size: 16,
                            color: Colors.white,
                          )
                        : null,
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Text(
                    recipe.ingredients[index],
                    style: TextStyle(
                      decoration: checkedIngredients[index]
                          ? TextDecoration.lineThrough
                          : null,
                      color: checkedIngredients[index] ? Colors.grey : Colors.black,
                      fontSize: 16,
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildInstructionList(){
    return Expanded(
      child: ListView.builder(
        itemCount: recipe.instructions.length,
        itemBuilder: (context, index) {
          return Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: 16,
              vertical: 8,
            ),
            child: Text(
              recipe.instructions[index],
              style: const TextStyle(fontSize: 16),
            ),
          );
        },
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
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Stack(
              children: [
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
                        colors: [Colors.black.withOpacity(0.7), Colors.transparent],
                      ),
                    ),
                  ),
                ),
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
                Positioned(
                  bottom: 8,
                  right: 8,
                  child: Row(
                    children: [
                      const Icon(Icons.access_time, color: Colors.white, size: 16),
                      const SizedBox(width: 4),
                      Text(
                        '${recipe.cookingTime} min',
                        style: const TextStyle(color: Colors.white),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Container(
            alignment: Alignment.centerLeft,
            padding: const EdgeInsets.only(left: 16, top: 16, bottom: 8),
            child: const Text(
              'Ingredients:',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
          _buildIngredientsList(),
        ],
      ),
    );
  }
}
