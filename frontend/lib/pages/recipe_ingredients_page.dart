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
          child: Text('Recipe Ingredients page', style: theme.textTheme.titleLarge),
        ),
      ),
    );
  }
}

// This widget is used to display the recipe ingredients page.  
// It is a stateless widget that builds a card with a centered text.  