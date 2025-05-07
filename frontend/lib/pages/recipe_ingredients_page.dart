import 'package:flutter/material.dart';

class RecipeIngredientsPage extends StatelessWidget {
  const RecipeIngredientsPage({super.key});

  @override
  Widget build(BuildContext context) {  // This widget is used to display the recipe ingredients page.  
// It is a stateless widget that builds a card with a centered text.  
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

// Tab bar for Ingredients and Cooking Instructions
class RecipeTabBarPage extends StatelessWidget {
  const RecipeTabBarPage({super.key});

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('Recipe Details'),
          bottom: const TabBar(
            indicatorColor: Colors.pink,
            labelColor: Colors.pink,
            unselectedLabelColor: Colors.grey,
            tabs: [
              Tab(text: 'Ingredients'),
              Tab(text: 'Cooking Instructions'),
            ],
          ),
        ),
        body: const TabBarView(
          children: [
            Center(child: Text('Ingredients content here')),
            Center(child: Text('Cooking Instructions content here')),
          ],
        ),
      ),
    );
  }
}
