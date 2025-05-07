// lib/pages/liked_page.dart
import 'package:flutter/material.dart';
import 'package:nibbles/widget/resteraunt/restaurant_card.dart';

class LikedPage extends StatelessWidget {
  const LikedPage({Key? key}) : super(key: key);
  static const Color _background = Color(0xFFAD2C50);
  static const Color _sheetColor = Color(0xFFF2F2F2);

  @override
  Widget build(BuildContext context) {
    // Example data
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
      backgroundColor: _background,
      appBar: AppBar(
        backgroundColor: _background,
        elevation: 0,
        leading: const BackButton(color: Colors.white),
        title: const Text('Favourites', style: TextStyle(color: Colors.white)),
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
                color: _sheetColor,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Favourite Restaurants',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFFAD2C50),
                    ),
                  ),
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
                              // Temporary placeholder for missing images
                              placeholder: const Icon(
                                Icons.restaurant,
                                size: 50,
                                color: Colors.grey,
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
                color: _sheetColor,
                borderRadius: BorderRadius.circular(16),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: const [
                  Text(
                    'Favourite Recipes',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFFAD2C50),
                    ),
                  ),
                  SizedBox(height: 12),
                  // Placeholder for recipes
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
