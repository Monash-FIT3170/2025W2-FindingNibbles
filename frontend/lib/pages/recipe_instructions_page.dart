import 'package:flutter/material.dart';
import 'recipe_ingredients_page.dart'; // Import to access Recipe model

class RecipeInstructionsPage extends StatefulWidget {
  final Recipe recipe;

  const RecipeInstructionsPage({super.key, required this.recipe});

  @override
  State<RecipeInstructionsPage> createState() => _RecipeInstructionsPageState();
}

class _RecipeInstructionsPageState extends State<RecipeInstructionsPage> {
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
          // Your image + gradient + title + time indicator + fav icon
          // Tab selector
          // Instructions list
        ],
      ),
    );
  }
}
