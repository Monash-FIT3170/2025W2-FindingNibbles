
import 'package:flutter/material.dart';
import 'recipe_instructions_page.dart'; // Keep this import

class Recipe {
  final String title;
  final String imageUrl;
  final int cookingTime;
  final List<String> ingredients;
  final List<dynamic> instructions;
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
  int currentStep = 0;
  int currentTab =  0;

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
      'Step 1 - Prepare the Pork...',
      'Step 2 - Marinate the Pork...',
      'Step 3 - Prepare the Caramel Sauce...',
      'Step 4 - Cook the Pork...',
      'Step 5 - Garnish and Serve...',
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



  Widget _buildIngredientsList() {
    return Column(
      children: [
        Container(
          alignment: Alignment.centerLeft,
          padding: const EdgeInsets.only(left: 16, top: 16, bottom: 8),
          child: const Text(
            'Ingredients:',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
        ),
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
                            ? const Icon(Icons.check, size: 16, color: Colors.white)
                            : null,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        recipe.ingredients[index],
                        style: TextStyle(
                          decoration: checkedIngredients[index] ? TextDecoration.lineThrough : null,
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
        ),
      ],
    );
  }

  Widget _buildInstructionList() {
    return Column(
      children: [
        // Display the current step's instructions
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              recipe.instructions[currentStep], // Display the current step
              style: const TextStyle(
                fontSize: 16,
                height: 1.5, // Line height for better readability
              ),
            ),
          ),
        ),

        // Step navigation at the bottom
        Container(
          padding: const EdgeInsets.symmetric(vertical: 16),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.center, // Center the step indicators
            children: List.generate(recipe.instructions.length, (index) {
              return GestureDetector(
                onTap: () {
                  setState(() {
                    currentStep = index; // Update the current step
                  });
                },
                child: Container(
                  margin: const EdgeInsets.symmetric(horizontal: 8), // Spacing between indicators
                  width: 30, // Width of the indicator
                  height: 30, // Height of the indicator
                  decoration: BoxDecoration(
                    color: currentStep == index
                        ? Colors.red // Active step color
                        : Colors.grey[300], // Inactive step color
                    shape: BoxShape.circle, // Circular shape
                  ),
                  child: Center(
                    child: Text(
                      '${index + 1}', // Step number
                      style: TextStyle(
                        color: currentStep == index
                            ? Colors.white // Active step text color
                            : Colors.black, // Inactive step text color
                        fontWeight: FontWeight.bold, // Font weight
                      ),
                    ),
                  ),
                ),
              );
            }),
          ),
        ),
      ],
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
              ],
            ),
          ),
          Container(
            decoration: const BoxDecoration(
              border: Border(
                bottom: BorderSide(color: Colors.grey, width: 0.5),
              ),
            ),
            child: Row(
              children: [
                Expanded(
                  child: InkWell(
                    onTap: () {
                      setState(() {
                        currentTab = 0; // Set to Ingredients tab
                      });
                    },
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
                        Container(height: 2, color: currentTab == 0 ? Colors.red : Colors.transparent),
                      ],
                    ),
                  ),
                ),
                Expanded(
                  child: InkWell(
                    onTap: () {
                      setState(() {
                        currentTab = 1; // Set to Cooking Instructions tab
                      });
                    },
                    child: Column(
                      children: [
                        const Padding(
                          padding: EdgeInsets.symmetric(vertical: 14),
                          child: Text(
                            'Cooking Instructions',
                            style: TextStyle(color: Colors.grey),
                          ),
                        ),
                        Container(height: 2, color: currentTab == 1 ? Colors.red : Colors.transparent),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
          // Display the appropriate content based on the active tab
          currentTab == 0 ? _buildIngredientsList() : _buildInstructionList(),
        ],
      ),
    );
  }
}
