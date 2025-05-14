// lib/pages/liked_page.dart
import 'package:flutter/material.dart';
import 'package:nibbles/pages/restaurants/widgets/restaurant_card.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/profile/resteraunt_dto.dart';

class LikedPage extends StatefulWidget {
  const LikedPage({super.key});

  @override
  State<LikedPage> createState() => _LikedPageState();
}

class _LikedPageState extends State<LikedPage> {
  final ProfileService _profileService = ProfileService();
  List<RestaurantDto> _favoriteRestaurants = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadFavoriteRestaurants();
  }

  Future<void> _loadFavoriteRestaurants() async {
    try {
      final restaurants = await _profileService.getFavouriteRestaurants();
      setState(() {
        _favoriteRestaurants = restaurants;
        _isLoading = false;
      });
    } catch (e) {
      print('Error loading favorite restaurants: $e');
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
                    // Restaurants Section
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Favourite Restaurants',
                            style: textTheme.titleMedium,
                          ),
                          const SizedBox(height: 12),
                          Column(
                            children:
                                _favoriteRestaurants.map((restaurant) {
                                  return Padding(
                                    padding: const EdgeInsets.only(bottom: 12),
                                    child: RestaurantCard(
                                      restaurant: restaurant,
                                      isLiked:
                                          true, // Always true for liked restaurants
                                      onTap: () {
                                        print('Tapped on ${restaurant.name}');
                                      },
                                      onFavoriteTap: () async {
                                        // Remove the restaurant from the list
                                        try {
                                          await _profileService
                                              .removeFavouriteRestaurant(
                                                restaurant.id,
                                              );
                                          setState(() {
                                            _favoriteRestaurants.remove(
                                              restaurant,
                                            );
                                          });
                                          print(
                                            'Removed ${restaurant.name} from favourites',
                                          );
                                        } catch (e) {
                                          print(
                                            'Failed to remove ${restaurant.name} from favourites: $e',
                                          );
                                        }
                                      },
                                    ),
                                  );
                                }).toList(),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 24),
                    // Recipes Section Placeholder
                    Container(
                      padding: const EdgeInsets.all(16),
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(16),
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Favourite Recipes',
                            style: textTheme.titleMedium,
                          ),
                          const SizedBox(height: 12),
                          const Text('No favourite recipes yet.'),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
    );
  }
}
