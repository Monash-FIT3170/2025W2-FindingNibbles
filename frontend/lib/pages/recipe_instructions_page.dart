import 'package:flutter/material.dart';
import 'recipe_ingredients_page.dart'; // Import to access Recipe model

class RecipeInstructionsPage extends StatefulWidget {
  final Recipe recipe;

  const RecipeInstructionsPage({super.key, required this.recipe});

  @override
  State<RecipeInstructionsPage> createState() => _RecipeInstructionsPageState();
}


class _RecipeInstructionsPageState extends State<RecipeInstructionsPage> {
  int currentStep = 0;

  // Sample steps for the recipe
  final List<String> steps = [
    'Step 1 - Prepare the Pork\n\nCut pork spare ribs into bite-sized pieces. Clean the pork (optional but highly recommended). Fill a small pot with water (enough to cover the spare ribs when added). Add salt (1 teaspoon). Bring the water to a boil. Add pork ribs and blanch the pork for 8 minutes or until scum floats to the top. This will remove the impurities and off-smell of pork. Drain the ribs in a colander in the sink. Rinse thoroughly under cold running water. Pork ribs are now ready to be cooked.',
    'Step 2 - Marinate the Pork\n\nIn a large bowl, combine fish sauce, diced shallot, ground black pepper, and 1 tablespoon of sugar. Add the pork ribs and mix well. Let the pork marinate for at least 30 minutes.',
    'Step 3 - Prepare the Caramel Sauce\n\nIn a pan, add 2 tablespoons of sugar and heat over medium heat until the sugar melts and turns golden brown. Add 1/2 cup of water and stir until the caramel dissolves completely.',
    'Step 4 - Cook the Pork\n\nHeat a large pan over medium heat. Add the marinated pork ribs and cook until lightly browned. Pour the caramel sauce over the pork and stir well. Add the bouillon powder and coconut soda. Cover and simmer for 20 minutes.',
    'Step 5 - Garnish and Serve\n\nOnce the pork is tender and the sauce has thickened, remove from heat. Garnish with thinly sliced green onions and serve hot with steamed rice.',
  ];

  void goToStep(int step) {
    setState(() {
      currentStep = step;
    });
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
      ),
      body: Column(
        children: [
          // Your image + gradient + title + time indicator + fav icon
          // Tab selector
          // Instructions list
        ],
      ),
    );
  }
}
