import 'package:flutter/material.dart';
import 'package:nibbles/pages/profile/profile_page.dart';
import '../pages/home/home_page.dart';
import '../pages/recipes/recipes_page.dart';
import '../pages/map/map_page.dart';

class AppNavigation extends StatefulWidget {
  final int initialPageIndex;
  const AppNavigation({super.key, this.initialPageIndex = 0});

  @override
  State<AppNavigation> createState() => _AppNavigationState();
}

class _AppNavigationState extends State<AppNavigation> {
  late int currentPageIndex;

  @override
  void initState() {
    super.initState();
    currentPageIndex = widget.initialPageIndex;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
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
            selectedIcon: Icon(Icons.map),
            icon: Icon(Icons.map_outlined),
            label: 'Map',
          ),
          NavigationDestination(
            selectedIcon: Icon(Icons.dining),
            icon: Icon(Icons.dining_outlined),
            label: 'Recipes',
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
            const MapPage(),
            const RecipesPage(),
            ProfilePage(),
          ][currentPageIndex],
    );
  }
}
