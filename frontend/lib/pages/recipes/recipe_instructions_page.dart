import 'package:flutter/material.dart';
import 'recipe_ingredients_page.dart'; // Import to access Recipe model

class RecipeInstructionsPage extends StatefulWidget {
  final Recipe recipe;

  const RecipeInstructionsPage({super.key, required this.recipe});

  @override
  State<RecipeInstructionsPage> createState() => _RecipeInstructionsPageState();
}
