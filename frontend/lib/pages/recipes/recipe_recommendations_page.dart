import 'package:flutter/material.dart';
import 'recipe_ingredients_page.dart';
import 'recipe_model.dart';

class RecipeFormatPage extends StatefulWidget {
  const RecipeFormatPage({super.key});

  @override
  State<RecipeFormatPage> createState() => _RecipeFormatPageState();
}

class _RecipeFormatPageState extends State<RecipeFormatPage> {
  final List<Recipe> recipes = [
    Recipe(
      title: 'Traditional spare ribs baked',
      imageUrl: 'assets/images/spare_ribs.jpg',
      cookingTime: 55,
      ingredients: ['Pork', 'Garlic', 'Soy Sauce', 'Sugar'],
      instructions: ['Preheat oven to 180°C', 'Season ribs', 'Bake for 55 minutes'],
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

  Color _getDifficultyColor(String difficulty) {
    switch (difficulty) {
      case 'Hard':
        return Colors.red;
      case 'Medium':
        return Colors.orange;
      default:
        return Colors.green;
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

  void _openFilter() {
    // Logic to open filter dialog or page goes here
    print("Filter opened!");
  }

@override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF5F5F5),
      appBar: AppBar(
        title: const Text(
          'Based on your ingredients:',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        backgroundColor: const Color(0xFFB4436C),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _reloadRecipes, // Reload function
            tooltip: 'Reload',
          ),
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () {
              Navigator.pop(context); // Go back to previous screen
            },
            tooltip: 'Filter',
          ),
        ],
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16),
              itemCount: recipes.length,
              itemBuilder: (context, index) {
                final recipe = recipes[index];
                return GestureDetector(
                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => RecipeIngredientsPage(),
                      ),
                    );
                  },
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 16),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: const [
                        BoxShadow(
                          color: Colors.black12,
                          blurRadius: 4,
                          offset: Offset(0, 2),
                        )
                      ],
                    ),
                    child: Column(
                      children: [
                        Stack(
                          children: [
                            ClipRRect(
                              borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
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
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: _getDifficultyColor(recipe.difficulty),
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                child: Text(
                                  recipe.difficulty,
                                  style: const TextStyle(
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
                                style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Row(
                                    children: [
                                      const Icon(Icons.access_time, size: 16),
                                      const SizedBox(width: 4),
                                      Text('${recipe.cookingTime} min'),
                                    ],
                                  ),
                                  IconButton(
                                    icon: Icon(
                                      recipe.isFavorite
                                          ? Icons.favorite
                                          : Icons.favorite_border,
                                      color: recipe.isFavorite
                                          ? Colors.red.shade800
                                          : null, // dark red when filled
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
          ),
        ],
      ),
    );
  }
}