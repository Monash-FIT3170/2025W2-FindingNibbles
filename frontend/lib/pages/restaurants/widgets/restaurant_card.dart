import 'package:flutter/material.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';

class RestaurantCard extends StatelessWidget {
  final RestaurantDto restaurant;
  final VoidCallback onTap;
  final VoidCallback onFavoriteTap;
  final bool isLiked;
  final double height; // Add height parameter
  final Widget? placeholder;

  const RestaurantCard({
    super.key,
    required this.restaurant,
    required this.onTap,
    required this.onFavoriteTap,
    required this.isLiked,
    this.height = 90.0, // Default height
    this.placeholder,
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
                  restaurant.icon != null && restaurant.icon!.isNotEmpty
                      ? Image.network(
                        restaurant.icon!,
                        height: adjustedHeight,
                        width: double.infinity,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) {
                          return Container(
                            height: adjustedHeight,
                            width: double.infinity,
                            color: Colors.grey[300],
                            child:
                                placeholder ??
                                Icon(
                                  Icons.restaurant,
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
                        child:
                            placeholder ??
                            Icon(
                              Icons.restaurant,
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
                  color: Color.fromRGBO(
                    0,
                    0,
                    0,
                    0.6,
                  ), // Fixed opacity without withOpacity
                ),
              ),
            ),

            // Smaller rating badge
            Positioned(
              top: 6, // Reduced from 8
              right: 6, // Reduced from 8
              child: Container(
                padding: const EdgeInsets.symmetric(
                  horizontal: 6,
                  vertical: 2,
                ), // Reduced padding
                decoration: BoxDecoration(
                  color: Colors.amber,
                  borderRadius: BorderRadius.circular(
                    12,
                  ), // Slightly smaller radius
                ),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(
                      Icons.star,
                      size: 12,
                      color: Colors.white,
                    ), // Smaller icon
                    const SizedBox(width: 2),
                    Text(
                      restaurant.rating?.toStringAsFixed(1) ?? '4.0',
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                        fontSize: 10, // Smaller text
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // Restaurant info with smaller font sizes - adjusted right margin and positioning
            Positioned(
              left: 12,
              bottom: 8,
              right: 12, // Reduced right margin to use full width
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Title with better constraints to avoid overlapping the rating
                  ConstrainedBox(
                    constraints: BoxConstraints(
                      maxWidth:
                          MediaQuery.of(context).size.width -
                          100, // Reduced width to avoid rating
                    ),
                    child: Text(
                      restaurant.name,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  // Price and favorite icon row
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        _getPriceRange(restaurant.priceLevel),
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

  // Helper method to convert price level to dollar signs
  String _getPriceRange(int? priceLevel) {
    if (priceLevel == null) return '\$';

    switch (priceLevel) {
      case 1:
        return '\$';
      case 2:
        return '\$\$';
      case 3:
        return '\$\$\$';
      default:
        return '\$'.padRight(priceLevel > 0 ? priceLevel : 1, '\$');
    }
  }
}
