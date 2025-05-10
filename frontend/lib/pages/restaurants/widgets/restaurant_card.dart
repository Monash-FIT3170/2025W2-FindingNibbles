// lib/widgets/restaurant_card.dart
import 'package:flutter/material.dart';

class RestaurantCard extends StatelessWidget {
  final String imageUrl;
  final String name;
  final String subtitle;
  final double rating;
  final bool isFavorite;
  final VoidCallback onTap;
  final VoidCallback onFavoriteTap;
  final Widget? placeholder; // Add a placeholder property

  const RestaurantCard({
    super.key,
    required this.imageUrl,
    required this.name,
    required this.subtitle,
    required this.rating,
    required this.isFavorite,
    required this.onTap,
    required this.onFavoriteTap,
    this.placeholder, // Optional placeholder
  });

  @override
  Widget build(BuildContext context) {
    final colorScheme = Theme.of(context).colorScheme;

    return GestureDetector(
      onTap: onTap,
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        child: Row(
          children: [
            // Display image or placeholder
            imageUrl.isNotEmpty
                ? ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Image.network(
                    imageUrl,
                    width: 80,
                    height: 80,
                    fit: BoxFit.cover,
                    errorBuilder: (context, error, stackTrace) {
                      return placeholder ??
                          const Icon(Icons.error, size: 50, color: Colors.red);
                    },
                  ),
                )
                : (placeholder ??
                    const Icon(Icons.restaurant, size: 50, color: Colors.grey)),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(name),
                  const SizedBox(height: 4),
                  Text(subtitle),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      const Icon(Icons.star, size: 16, color: Colors.amber),
                      const SizedBox(width: 4),
                      Text(rating.toString()),
                    ],
                  ),
                ],
              ),
            ),
            IconButton(
              icon: Icon(
                isFavorite ? Icons.favorite : Icons.favorite_border,
                color: isFavorite ? colorScheme.primary : colorScheme.onSurface,
              ),
              onPressed: onFavoriteTap,
            ),
          ],
        ),
      ),
    );
  }
}
