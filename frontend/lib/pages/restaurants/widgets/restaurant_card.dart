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
    return GestureDetector(
      onTap: onTap,
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        child: SizedBox(
          height: height, // Use the configurable height
          child: Row(
            children: [
              // Image container
              Container(
                width: height, // Match the height for a square image
                height: height,
                margin: const EdgeInsets.all(10),
                child:
                    (restaurant.icon != null && restaurant.icon!.isNotEmpty)
                        ? ClipRRect(
                          borderRadius: BorderRadius.circular(12),
                          child: Image.network(
                            restaurant.icon!,
                            width: height,
                            height: height,
                            fit: BoxFit.cover,
                            errorBuilder: (context, error, stackTrace) {
                              return placeholder ??
                                  const Icon(
                                    Icons.error,
                                    size: 50,
                                    color: Colors.red,
                                  );
                            },
                          ),
                        )
                        : (placeholder ??
                            const Icon(
                              Icons.restaurant,
                              size: 50,
                              color: Colors.grey,
                            )),
              ),
              const SizedBox(width: 12),
              // Text and details
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      restaurant.name,
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      restaurant.formattedAddress ?? 'No address available',
                      style: const TextStyle(fontSize: 14, color: Colors.grey),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
              // Favorite icon
              IconButton(
                icon: Icon(
                  isLiked ? Icons.favorite : Icons.favorite_border,
                  color: isLiked ? Colors.red : Colors.grey,
                ),
                onPressed: onFavoriteTap,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
