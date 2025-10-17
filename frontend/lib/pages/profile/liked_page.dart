// lib/pages/liked_page.dart
import 'package:flutter/material.dart';
import 'package:nibbles/core/logger.dart';
import 'package:nibbles/pages/home/restaurant_details_page.dart';
import 'package:nibbles/pages/profile/widgets/restaurant_card.dart';
import 'package:nibbles/pages/recipes/widgets/recipe_card.dart';
import 'package:nibbles/pages/shared/widgets/cuisine_selection_dialog.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/service/cuisine/cuisine_service.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/profile/recipe_dto.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'package:nibbles/theme/app_theme.dart';

class LikedPage extends StatefulWidget {
  const LikedPage({super.key});

  @override
  State<LikedPage> createState() => _LikedPageState();
}

class _LikedPageState extends State<LikedPage> {
  final ProfileService _profileService = ProfileService();
  final CuisineService _cuisineService = CuisineService();
  List<RestaurantDto> _favoriteRestaurants = [];
  List<RecipeDto> _favoriteRecipes = [];
  List<RecipeDto> _filteredRecipes = [];
  List<CuisineDto> _favoriteCuisines = [];
  List<CuisineDto> _allCuisines = [];
  bool _isLoading = true;
  final _logger = getLogger();
  CuisineDto? _selectedCuisine;

  @override
  void initState() {
    super.initState();
    _loadFavorites();
  }

  Future<void> _loadFavorites() async {
    try {
      final restaurants = await _profileService.getFavouriteRestaurants();
      final recipes = await _profileService.getFavouriteRecipes();
      final cuisines = await _profileService.getUserCuisines(); // ✅ changed
      final allCuisines = await _cuisineService.getAllCuisines();

      setState(() {
        _favoriteRestaurants = restaurants;
        _favoriteRecipes = recipes;
        _filteredRecipes = recipes;
        _favoriteCuisines = cuisines;
        _allCuisines = allCuisines;
        _isLoading = false;
      });
    } catch (e) {
      _logger.e('Error loading favorites: $e');
      setState(() {
        _isLoading = false;
      });
    }
  }

  void _filterRecipesByCuisine(CuisineDto? cuisine) {
    setState(() {
      _selectedCuisine = cuisine;
      if (cuisine == null) {
        _filteredRecipes = List.from(_favoriteRecipes);
      } else {
        _filteredRecipes =
            _favoriteRecipes
                .where((recipe) => recipe.cuisineId == cuisine.id)
                .toList();
      }
    });
  }

  Future<void> _showAddCuisineDialog() async {
    // Get available cuisines (all cuisines minus user's current favorites)
    final availableCuisines =
        _allCuisines
            .where(
              (cuisine) =>
                  !_favoriteCuisines.any((fav) => fav.id == cuisine.id),
            )
            .toList();

    if (availableCuisines.isEmpty) {
      // Show a message if user already has all cuisines
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('You already have all available cuisines!'),
          duration: Duration(seconds: 2),
        ),
      );
      return;
    }

    await showDialog<CuisineDto>(
      context: context,
      builder:
          (context) => CuisineSelectionDialog(
            availableCuisines:
                _allCuisines, // Show all cuisines, not just available
            favoriteCuisines:
                _favoriteCuisines, // Pass favorite cuisines for star icons
            allowSelectingFavorited:
                false, // Prevent selecting already favorited cuisines
            onCuisineSelected: (cuisine) async {
              await _addCuisinePreference(cuisine);
            },
          ),
    );
  }

  Future<void> _addCuisinePreference(CuisineDto cuisine) async {
    try {
      await _profileService.addCuisinePreference(cuisine.id);
      setState(() {
        _favoriteCuisines.add(cuisine);
      });

      // Show success message
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Added ${cuisine.name} to your preferences!'),
            backgroundColor: Colors.green,
            duration: const Duration(seconds: 2),
          ),
        );
      }
    } catch (e) {
      _logger.e('Failed to add ${cuisine.name} to preferences: $e');

      // Show error message
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to add ${cuisine.name}: ${e.toString()}'),
            backgroundColor: Colors.red,
            duration: const Duration(seconds: 3),
          ),
        );
      }
    }
  }

  Future<void> _removeCuisinePreference(CuisineDto cuisine) async {
    try {
      await _profileService.removeCuisinePreference(cuisine.id);
      setState(() {
        _favoriteCuisines.remove(cuisine);
      });

      // Show success message
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Removed ${cuisine.name} from your preferences'),
            backgroundColor: Colors.orange,
            duration: const Duration(seconds: 2),
          ),
        );
      }
    } catch (e) {
      _logger.e('Failed to remove ${cuisine.name} from favourites: $e');

      // Show error message
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to remove ${cuisine.name}: ${e.toString()}'),
            backgroundColor: Colors.red,
            duration: const Duration(seconds: 3),
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.colorScheme.primary,
      appBar: AppBar(
        backgroundColor: AppTheme.colorScheme.primary,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.surfaceColor),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'Favourites',
          style: TextStyle(
            color: AppTheme.surfaceColor,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
      body:
          _isLoading
              ? const Center(
                child: CircularProgressIndicator(color: AppTheme.surfaceColor),
              )
              : Container(
                margin: const EdgeInsets.only(top: 16),
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(32),
                    topRight: Radius.circular(32),
                  ),
                ),
                child: Column(
                  children: [
                    const SizedBox(height: 16),
                    Expanded(
                      child: SingleChildScrollView(
                        physics: const ClampingScrollPhysics(),
                        padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // Favourite Restaurants Section
                            Container(
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: Colors.grey.shade100,
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    'Favourite Restaurants',
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                      color: AppTheme.colorScheme.primary,
                                    ),
                                  ),
                                  const SizedBox(height: 12),
                                  SizedBox(
                                    height: 320,
                                    child:
                                        _favoriteRestaurants.isEmpty
                                            ? Center(
                                              child: Text(
                                                'No favourite restaurants yet.',
                                                style:
                                                    AppTheme
                                                        .textTheme
                                                        .bodyLarge,
                                              ),
                                            )
                                            : ListView.builder(
                                              itemCount:
                                                  _favoriteRestaurants.length,
                                              itemBuilder: (context, index) {
                                                final restaurant =
                                                    _favoriteRestaurants[index];
                                                return Padding(
                                                  padding:
                                                      const EdgeInsets.only(
                                                        bottom: 3,
                                                      ),
                                                  child: RestaurantCard(
                                                    restaurant: restaurant,
                                                    isLiked: true,
                                                    height: 80.0,
                                                    onTap: () {
                                                      Navigator.push(
                                                        context,
                                                        MaterialPageRoute(
                                                          builder:
                                                              (context) =>
                                                                  RestaurantDetailsPage(
                                                                    restaurant:
                                                                        restaurant,
                                                                    isFavorite:
                                                                        true,
                                                                  ),
                                                        ),
                                                      ).then((_) {
                                                        // Refresh the favorites list when returning
                                                        _loadFavorites();
                                                      });
                                                    },
                                                    onFavoriteTap: () async {
                                                      try {
                                                        await _profileService
                                                            .removeFavouriteRestaurant(
                                                              restaurant.id,
                                                            );
                                                        setState(() {
                                                          _favoriteRestaurants
                                                              .remove(
                                                                restaurant,
                                                              );
                                                        });
                                                      } catch (e) {
                                                        _logger.e(
                                                          'Failed to remove ${restaurant.name} from favourites: $e',
                                                        );
                                                      }
                                                    },
                                                  ),
                                                );
                                              },
                                            ),
                                  ),
                                ],
                              ),
                            ),

                            const SizedBox(height: 24),

                            // Favourite Recipes Section
                            Container(
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: Colors.grey.shade100,
                                borderRadius: BorderRadius.circular(16),
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        'Favourite Recipes',
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                          color: AppTheme.colorScheme.primary,
                                        ),
                                      ),
                                      DropdownButton<CuisineDto>(
                                        value: _selectedCuisine,
                                        hint: const Text('All Cuisines'),
                                        items: [
                                          const DropdownMenuItem<CuisineDto>(
                                            value: null,
                                            child: Text('All Cuisines'),
                                          ),
                                          ..._allCuisines.map((cuisine) {
                                            return DropdownMenuItem<CuisineDto>(
                                              value: cuisine,
                                              child: Text(cuisine.name),
                                            );
                                          }),
                                        ],
                                        onChanged: _filterRecipesByCuisine,
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 12),
                                  SizedBox(
                                    height: 320,
                                    child:
                                        _filteredRecipes.isEmpty &&
                                                _selectedCuisine != null
                                            ? Center(
                                              child: Text(
                                                'No favourite recipes for this cuisine yet.',
                                                style:
                                                    AppTheme
                                                        .textTheme
                                                        .bodyLarge,
                                              ),
                                            )
                                            : _favoriteRecipes.isEmpty
                                            ? Center(
                                              child: Text(
                                                'No favourite recipes yet.',
                                                style:
                                                    AppTheme
                                                        .textTheme
                                                        .bodyLarge,
                                              ),
                                            )
                                            : ListView.builder(
                                              itemCount:
                                                  _filteredRecipes.length,
                                              itemBuilder: (context, index) {
                                                final recipe =
                                                    _filteredRecipes[index];
                                                return Padding(
                                                  padding:
                                                      const EdgeInsets.only(
                                                        bottom: 3,
                                                      ),
                                                  child: RecipeCard(
                                                    recipe: recipe,
                                                    isLiked: true,
                                                    height: 80.0,
                                                    onTap: () {},
                                                    onFavoriteTap: () async {
                                                      try {
                                                        await _profileService
                                                            .removeFavouriteRecipe(
                                                              recipe.id,
                                                            );
                                                        setState(() {
                                                          _favoriteRecipes
                                                              .remove(recipe);
                                                          _filterRecipesByCuisine(
                                                            _selectedCuisine,
                                                          );
                                                        });
                                                      } catch (e) {
                                                        _logger.e(
                                                          'Failed to remove ${recipe.title} from favourites: $e',
                                                        );
                                                      }
                                                    },
                                                  ),
                                                );
                                              },
                                            ),
                                  ),
                                ],
                              ),
                            ),

                            const SizedBox(height: 24),

                            // Favourite Cuisines Section
                            Container(
                              padding: const EdgeInsets.all(16),
                              decoration: BoxDecoration(
                                color: Colors.grey.shade100,
                                borderRadius: BorderRadius.circular(16),
                              ),
                              constraints: const BoxConstraints(
                                minHeight: 100, // ✅ keeps box from shrinking
                              ),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    children: [
                                      Text(
                                        'Favourite Cuisines',
                                        style: TextStyle(
                                          fontSize: 18,
                                          fontWeight: FontWeight.bold,
                                          color: AppTheme.colorScheme.primary,
                                        ),
                                      ),
                                      IconButton(
                                        onPressed: _showAddCuisineDialog,
                                        icon: Icon(
                                          Icons.add_circle_outline,
                                          color: AppTheme.colorScheme.primary,
                                        ),
                                        tooltip: 'Add cuisine preference',
                                      ),
                                    ],
                                  ),
                                  const SizedBox(height: 12),
                                  _favoriteCuisines.isEmpty
                                      ? Center(
                                        child: Text(
                                          'No favourite cuisines yet.',
                                          style: AppTheme.textTheme.bodyLarge,
                                        ),
                                      )
                                      : Wrap(
                                        spacing: 8,
                                        runSpacing: 8,
                                        children:
                                            _favoriteCuisines.map((cuisine) {
                                              return Chip(
                                                label: Text(cuisine.name),
                                                onDeleted: () async {
                                                  await _removeCuisinePreference(
                                                    cuisine,
                                                  );
                                                },
                                              );
                                            }).toList(),
                                      ),
                                ],
                              ),
                            ),

                            const SizedBox(height: 32),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
    );
  }
}
