import 'package:flutter/material.dart';

class RecipeIngredientsPage extends StatelessWidget {
  const RecipeIngredientsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    return Card(
      shadowColor: Colors.transparent,
      margin: const EdgeInsets.all(8.0),
      child: SizedBox.expand(
        child: Center(
          child: Text(
            'Recipe Ingredients page',
            style: theme.textTheme.titleLarge,
          ),
        ),
      ),
    );
  }
}
// This page is a placeholder for the recipe ingredients page. It will be replaced with the actual implementation later.