import 'dart:async';
import 'package:flutter/material.dart';
import 'package:nibbles/pages/profile/profile_page.dart';
import 'package:nibbles/service/restaurant-menu/menu_analysis_tracker.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/pages/home/restaurant_details_page.dart';
import 'package:nibbles/pages/home/home_page.dart';
import 'package:nibbles/pages/recipes/recipes_page.dart';
import 'package:nibbles/pages/map/map_page.dart';

class AppNavigation extends StatefulWidget {
  final int initialPageIndex;
  const AppNavigation({super.key, this.initialPageIndex = 0});

  @override
  State<AppNavigation> createState() => _AppNavigationState();
}

class _AppNavigationState extends State<AppNavigation> {
  late int currentPageIndex;
  final MenuAnalysisTracker _analysisTracker = MenuAnalysisTracker();
  final ProfileService _profileService = ProfileService();
  StreamSubscription<RestaurantAnalysisInfo>? _completionSubscription;

  @override
  void initState() {
    super.initState();
    currentPageIndex = widget.initialPageIndex;
    _listenForCompletions();
  }

  @override
  void dispose() {
    _completionSubscription?.cancel();
    super.dispose();
  }

  void _listenForCompletions() {
    _completionSubscription = _analysisTracker.completionStream.listen((info) {
      _showCompletionNotification(info);
    });
  }

  void _showCompletionNotification(RestaurantAnalysisInfo info) {
    if (!mounted) return;

    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Row(
          children: [
            const Icon(Icons.restaurant_menu, color: Colors.white, size: 22),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text(
                    'Menu ready!',
                    style: TextStyle(
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                      fontSize: 15,
                    ),
                  ),
                  Text(
                    info.restaurantName,
                    style: const TextStyle(fontSize: 13, color: Colors.white70),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                ],
              ),
            ),
          ],
        ),
        backgroundColor: Colors.black87,
        duration: const Duration(seconds: 5),
        behavior: SnackBarBehavior.floating,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        action: SnackBarAction(
          label: 'View',
          textColor: Colors.white,
          onPressed: () => _navigateToRestaurant(info.restaurantId),
        ),
      ),
    );
  }

  Future<void> _navigateToRestaurant(int restaurantId) async {
    try {
      // Fetch favorites to check status
      final favorites = await _profileService.getFavouriteRestaurants();
      final favoriteRestaurant = favorites.cast<RestaurantDto?>().firstWhere(
        (r) => r?.id == restaurantId,
        orElse: () => null,
      );

      if (favoriteRestaurant != null) {
        // Restaurant is in favorites, use that data
        if (!mounted) return;
        Navigator.of(context).push(
          MaterialPageRoute(
            builder:
                (context) => RestaurantDetailsPage(
                  restaurant: favoriteRestaurant,
                  isFavorite: true,
                ),
          ),
        );
      } else {
        // Restaurant not in favorites, show message to go find it
        if (!mounted) return;
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: const Text(
              'Go to the Home or Map page to view this restaurant',
            ),
            duration: const Duration(seconds: 3),
            action: SnackBarAction(
              label: 'Home',
              onPressed: () {
                setState(() {
                  currentPageIndex = 0; // Navigate to home page
                });
              },
            ),
          ),
        );
      }
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text('Go to Home or Map page to view the restaurant'),
          duration: const Duration(seconds: 3),
          action: SnackBarAction(
            label: 'Home',
            onPressed: () {
              setState(() {
                currentPageIndex = 0; // Navigate to home page
              });
            },
          ),
        ),
      );
    }
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
