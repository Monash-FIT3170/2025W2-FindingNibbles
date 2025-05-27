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
            // Background image layer
            ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child:
                  (recipe.imageURL != null && recipe.imageURL!.isNotEmpty)
                      ? Image.network(
                        recipe.imageURL!,
                        height: adjustedHeight,
                        width: double.infinity,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) {
                          return Container(
                            height: adjustedHeight,
                            width: double.infinity,
                            color: Colors.grey[300],
                            child: Icon(
                              Icons.restaurant_menu,
                              size: 50,
                              color: Colors.grey[700],
                            ),
                          );
                        },
                      )
                      : Container(
                        height: adjustedHeight,
                        width: double.infinity,
                        color: Colors.grey[300],
                        child: Icon(
                          Icons.restaurant_menu,
                          size: 50,
                          color: Colors.grey[700],
                        ),
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
}
