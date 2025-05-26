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
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;
    final textTheme = theme.textTheme;

    return GestureDetector(
      onTap: onTap,
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        elevation: 2,
        child: SizedBox(
          height: height,
          child: Row(
            children: [
              // Image container
              Container(
                width: height,
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
                                  Icon(
                                    Icons.error,
                                    size: 50,
                                    color: colorScheme.error,
                                  );
                            },
                          ),
                        )
                        : (placeholder ??
                            Icon(
                              Icons.restaurant,
                              size: 50,
                              color: Colors.grey.shade400,
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
                      style: textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                        color: colorScheme.onSurface,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      restaurant.formattedAddress ?? 'No address available',
                      style: textTheme.bodyMedium?.copyWith(
                        color: colorScheme.onSurface.withOpacity(0.7),
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),

              // Favorite icon
              IconButton(
                icon: Icon(
                  isLiked ? Icons.favorite : Icons.favorite_border,
                  color: isLiked ? colorScheme.primary : Colors.grey.shade400,
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
