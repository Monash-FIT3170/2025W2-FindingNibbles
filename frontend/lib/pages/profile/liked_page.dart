// lib/pages/liked_page.dart
import 'package:flutter/material.dart';
import 'package:nibbles/pages/profile/widgets/restaurant_card.dart';
import 'package:nibbles/pages/recipes/widgets/recipe_card.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/profile/recipe_dto.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'package:nibbles/core/logger.dart';
import 'package:nibbles/theme/app_theme.dart';

class LikedPage extends StatefulWidget {
  const LikedPage({super.key});

  @override
  State<LikedPage> createState() => _LikedPageState();
}

class _LikedPageState extends State<LikedPage> {
  final ProfileService _profileService = ProfileService();
  List<RestaurantDto> _favoriteRestaurants = [];
  List<RecipeDto> _favoriteRecipes = [];
  bool _isLoading = true;
  final _logger = getLogger();

  @override
  void initState() {
    super.initState();
    _loadFavorites();
  }

  Future<void> _loadFavorites() async {
    try {
      final restaurants = await _profileService.getFavouriteRestaurants();
      final recipes = await _profileService.getFavouriteRecipes();
      setState(() {
        _favoriteRestaurants = restaurants;
        _favoriteRecipes = recipes;
        _isLoading = false;
      });
    } catch (e) {
      _logger.e('Error loading favorites: $e');
      setState(() {
        _isLoading = false;
      });
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
                    // Add a fixed white space at the top
                    const SizedBox(height: 16),

                    // Use Expanded with SingleChildScrollView to constrain the scrollable area
                    Expanded(
                      child: SingleChildScrollView(
                        // Use physics to prevent over-scrolling
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
                                    height: 320, // Consistent height
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
                                                    height:
                                                        80.0, // Smaller card height
                                                    onTap: () {},
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
                                  Text(
                                    'Favourite Recipes',
                                    style: TextStyle(
                                      fontSize: 18,
                                      fontWeight: FontWeight.bold,
                                      color: AppTheme.colorScheme.primary,
                                    ),
                                  ),
                                  const SizedBox(height: 12),
                                  SizedBox(
                                    height: 320, // Consistent height
                                    child:
                                        _favoriteRecipes.isEmpty
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
                                                  _favoriteRecipes.length,
                                              itemBuilder: (context, index) {
                                                final recipe =
                                                    _favoriteRecipes[index];
                                                return Padding(
                                                  padding:
                                                      const EdgeInsets.only(
                                                        bottom: 3,
                                                      ),
                                                  child: RecipeCard(
                                                    recipe: recipe,
                                                    isLiked: true,
                                                    height:
                                                        80.0, // Smaller card height
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

                            // Add a spacer at the bottom as well
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
