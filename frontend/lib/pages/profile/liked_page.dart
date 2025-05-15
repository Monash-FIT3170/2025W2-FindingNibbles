// lib/pages/liked_page.dart
import 'package:flutter/material.dart';
import 'package:nibbles/pages/restaurants/widgets/restaurant_card.dart';
import 'package:nibbles/pages/restaurants/widgets/recipe_card.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/profile/recipe_dto.dart';
import 'package:nibbles/service/profile/resteraunt_dto.dart';

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
      print('Error loading favorites: $e');
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        leading: const BackButton(),
        title: Text('Favourites', style: textTheme.titleLarge),
      ),
      body:
          _isLoading
              ? const Center(child: CircularProgressIndicator())
              : SingleChildScrollView(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Favourite Restaurants Section
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.1),
                            blurRadius: 8,
                            offset: const Offset(0, 4),
                          ),
                        ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Favourite Restaurants',
                            style: textTheme.titleMedium,
                          ),
                          const SizedBox(height: 12),
                          ListView.builder(
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            itemCount: _favoriteRestaurants.length,
                            itemBuilder: (context, index) {
                              final restaurant = _favoriteRestaurants[index];
                              return Padding(
                                padding: const EdgeInsets.only(bottom: 12),
                                child: RestaurantCard(
                                  restaurant: restaurant,
                                  isLiked: true,
                                  onTap: () {
                                    print('Tapped on ${restaurant.name}');
                                  },
                                  onFavoriteTap: () async {
                                    try {
                                      await _profileService
                                          .removeFavouriteRestaurant(
                                            restaurant.id,
                                          );
                                      setState(() {
                                        _favoriteRestaurants.remove(restaurant);
                                      });
                                    } catch (e) {
                                      print(
                                        'Failed to remove ${restaurant.name} from favourites: $e',
                                      );
                                    }
                                  },
                                ),
                              );
                            },
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),
                    // Favourite Recipes Section
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.1),
                            blurRadius: 8,
                            offset: const Offset(0, 4),
                          ),
                        ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Favourite Recipes',
                            style: textTheme.titleMedium,
                          ),
                          const SizedBox(height: 12),
                          ListView.builder(
                            shrinkWrap: true,
                            physics: const NeverScrollableScrollPhysics(),
                            itemCount: _favoriteRecipes.length,
                            itemBuilder: (context, index) {
                              final recipe = _favoriteRecipes[index];
                              return Padding(
                                padding: const EdgeInsets.only(bottom: 12),
                                child: RecipeCard(
                                  recipe: recipe,
                                  isLiked: true,
                                  onTap: () {
                                    print('Tapped on ${recipe.title}');
                                  },
                                  onFavoriteTap: () async {
                                    try {
                                      await _profileService
                                          .removeFavouriteRecipe(recipe.id);
                                      setState(() {
                                        _favoriteRecipes.remove(recipe);
                                      });
                                    } catch (e) {
                                      print(
                                        'Failed to remove ${recipe.title} from favourites: $e',
                                      );
                                    }
                                  },
                                ),
                              );
                            },
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
    );
  }
}
