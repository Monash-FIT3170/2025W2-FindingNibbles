// lib/pages/liked_page.dart
import 'package:flutter/material.dart';
import 'package:nibbles/pages/restaurants/widgets/restaurant_card.dart';

class LikedPage extends StatelessWidget {
  const LikedPage({super.key});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    final favoriteRestaurants = [
      {
        'image': '', // Empty image URL
        'name': 'Dragon Hot Pot',
        'subtitle': 'Hot Pot \$\$',
        'rating': 4.1,
      },
      {
        'image': '', // Empty image URL
        'name': 'China Bar',
        'subtitle': 'Chinese \$',
        'rating': 3.8,
      },
      // Add more restaurants as needed
    ];

    return Scaffold(
      appBar: AppBar(
        elevation: 0,
        leading: const BackButton(),
        title: Text('Favourites', style: textTheme.titleLarge),
      ),
      body: SingleChildScrollView(
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
                  Text('Favourite Restaurants', style: textTheme.titleMedium),
                  const SizedBox(height: 12),
                  Column(
                    children:
                        favoriteRestaurants.map((data) {
                          return Padding(
                            padding: const EdgeInsets.only(bottom: 12),
                            child: RestaurantCard(
                              imageUrl: data['image']! as String,
                              name: data['name']! as String,
                              subtitle: data['subtitle']! as String,
                              rating: data['rating']! as double,
                              isFavorite: true,
                              onTap: () {},
                              onFavoriteTap: () {},
                              placeholder: const Icon(
                                Icons.restaurant,
                                size: 50,
                              ),
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
                  Text('Favourite Recipes', style: textTheme.titleMedium),
                  SizedBox(height: 12),
                  Text('No favourite recipes yet.'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
