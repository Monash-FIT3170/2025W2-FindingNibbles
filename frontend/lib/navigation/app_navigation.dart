import 'package:flutter/material.dart';
import 'package:nibbles/pages/recipe_ingredients_page.dart';
import 'package:nibbles/pages/profile_page.dart';
import '../pages/home_page.dart';
import '../pages/restaurants/restaurants_page.dart';
import '../pages/recipes/recipes_page.dart';

class AppNavigation extends StatefulWidget {
  const AppNavigation({super.key});

  @override
  State<AppNavigation> createState() => _AppNavigationState();
}

class _AppNavigationState extends State<AppNavigation> {
  int currentPageIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: NavigationBar(
        onDestinationSelected: (int index) {
          setState(() {
            currentPageIndex = index;
          });
        },
        selectedIndex: currentPageIndex,
        destinations: const <Widget>[
          NavigationDestination(
            selectedIcon: Icon(Icons.home),
            icon: Icon(Icons.home_outlined),
            label: 'Home',
          ),
          NavigationDestination(
            selectedIcon: Icon(Icons.restaurant),
            icon: Icon(Icons.restaurant_outlined),
            label: 'Restaurants',
          ),
          NavigationDestination(
            selectedIcon: Icon(Icons.menu_book),
            icon: Icon(Icons.menu_book_outlined),
            label: 'Recipes',
          ),
          NavigationDestination(
            selectedIcon: Icon(Icons.list),
            icon: Icon(Icons.list_outlined),
            label: 'Ingredients',
          ),
          NavigationDestination(
            selectedIcon: Icon(Icons.person_2),
            icon: Icon(Icons.person_2_outlined),
            label: 'Profile',
          ),
        ],
      ),
      body:
          <Widget>[
            const HomePage(),
            const RestaurantsPage(),
            const RecipesPage(),
            const RecipeIngredientsPage(), //get rid of this once app has been tested
            ProfilePage(),
          ][currentPageIndex],
    );
  }
}
