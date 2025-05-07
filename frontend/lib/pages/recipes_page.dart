import 'package:flutter/material.dart';
import 'package:nibbles/service/recipe_service.dart';

class RecipesPage extends StatelessWidget {
  const RecipesPage({super.key});

  @override
  Widget build(BuildContext context) {
    final ThemeData theme = Theme.of(context);
    return Card(
      shadowColor: Colors.transparent,
      margin: const EdgeInsets.all(8.0),
      child: SizedBox.expand(
        child: Center(
          child: Text('Recipes page', style: theme.textTheme.titleLarge),
        ),
      ),
    );
  }
}




class RecipePage extends StatefulWidget {
  const RecipePage({super.key});

  @override
  _RecipePageState createState() => _RecipePageState();
}

class _RecipePageState extends State<RecipePage> {
  List<dynamic>? recipes;

  @override
  void initState() {
    super.initState();
    RecipeService.fetchRecipes().then((data) {
      setState(() {
        recipes = data;
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    if (recipes == null) {
      return Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    return Scaffold(
      appBar: AppBar(title: Text('Recipes')),
      body: ListView.builder(
        itemCount: recipes!.length,
        itemBuilder: (context, index) {
          final recipe = recipes![index];
          return ListTile(
            title: Text(recipe['title']),
            subtitle: Text(recipe['description']),
          );
        },
      ),
    );
  }
}
