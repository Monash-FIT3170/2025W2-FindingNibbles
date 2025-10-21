import 'dart:convert';
import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:nibbles/service/profile/recipe_dto.dart';

class RecipeCard extends StatelessWidget {
  final RecipeDto recipe;
  final VoidCallback onTap;
  final VoidCallback onFavoriteTap;
  final bool isLiked;
  final double height;

  const RecipeCard({
    super.key,
    required this.recipe,
    required this.onTap,
    required this.onFavoriteTap,
    required this.isLiked,
    this.height = 90.0, // Default height
  });

  @override
  Widget build(BuildContext context) {
    // Reduce height by approximately one third
    final adjustedHeight = height * 0.8;

    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: adjustedHeight,
        margin: const EdgeInsets.only(bottom: 8),
        child: Stack(
          children: [
            // Background image layer with default image
            ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child:
                  (recipe.imageURL != null && recipe.imageURL!.isNotEmpty)
                      ? _buildImage(recipe.imageURL!, adjustedHeight)
                      : Image.asset(
                        'assets/images/default_recipe.jpg',
                        height: adjustedHeight,
                        width: double.infinity,
                        fit: BoxFit.cover,
                      ),
            ),

            // Overlay layer for darkening
            Positioned.fill(
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(12),
                  color: const Color.fromRGBO(0, 0, 0, 0.6),
                ),
              ),
            ),

            // Recipe info with smaller font sizes
            Positioned(
              left: 12,
              bottom: 8,
              right: 12,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Title with stricter overflow handling
                  ConstrainedBox(
                    constraints: BoxConstraints(
                      maxWidth: MediaQuery.of(context).size.width - 100,
                    ),
                    child: Text(
                      recipe.title,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  // Cuisine and favorite icon row
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        recipe.cuisine,
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                        ),
                      ),
                      GestureDetector(
                        onTap: onFavoriteTap,
                        child: Icon(
                          isLiked ? Icons.favorite : Icons.favorite_border,
                          color: isLiked ? Colors.red : Colors.white,
                          size: 16,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// Builds an image widget that supports both base64 data URLs and HTTP URLs
  Widget _buildImage(String imageUrl, double adjustedHeight) {
    // Check if the image is a base64 data URL
    if (imageUrl.startsWith('data:image')) {
      try {
        // Extract the base64 string after the comma
        final base64String = imageUrl.split(',')[1];
        // Decode the base64 string
        final Uint8List bytes = base64Decode(base64String);
        // Return Image.memory for base64 data
        return Image.memory(
          bytes,
          height: adjustedHeight,
          width: double.infinity,
          fit: BoxFit.cover,
        );
      } catch (e) {
        // If decoding fails, return default image
        return Image.asset(
          'assets/images/default_recipe.jpg',
          height: adjustedHeight,
          width: double.infinity,
          fit: BoxFit.cover,
        );
      }
    } else {
      // Regular HTTP/HTTPS URL
      return Image.network(
        imageUrl,
        height: adjustedHeight,
        width: double.infinity,
        fit: BoxFit.cover,
        errorBuilder: (context, error, stackTrace) {
          return Image.asset(
            'assets/images/default_recipe.jpg',
            height: adjustedHeight,
            width: double.infinity,
            fit: BoxFit.cover,
          );
        },
      );
    }
  }
}
