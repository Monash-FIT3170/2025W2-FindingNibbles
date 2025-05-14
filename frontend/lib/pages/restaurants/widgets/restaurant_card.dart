import 'package:flutter/material.dart';
import 'package:nibbles/service/profile/resteraunt_dto.dart';

class RestaurantCard extends StatelessWidget {
  final RestaurantDto restaurant; // Accept a RestaurantDto object
  final VoidCallback onTap;
  final VoidCallback onFavoriteTap;
  final bool isLiked; // Add this property to control the "liked" state
  final Widget? placeholder; // Optional placeholder for missing images

  const RestaurantCard({
    super.key,
    required this.restaurant,
    required this.onTap,
    required this.onFavoriteTap,
    required this.isLiked, // Mark as required
    this.placeholder,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Card(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        child: SizedBox(
          height: 100, // Fixed height for the card
          child: Row(
            children: [
              // Display image or placeholder with fixed size
              Container(
                width: 80,
                height: 80,
                margin: const EdgeInsets.all(10), // Add some spacing
                child:
                    (restaurant.icon != null && restaurant.icon!.isNotEmpty)
                        ? ClipRRect(
                          borderRadius: BorderRadius.circular(12),
                          child: Image.network(
                            restaurant.icon!,
                            width: 80,
                            height: 80,
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
              // Fixed size for text and details
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(
                      height: 20, // Fixed height for the title
                      child: Text(
                        restaurant.name,
                        style: const TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                        overflow: TextOverflow.ellipsis, // Handle long text
                      ),
                    ),
                    const SizedBox(height: 4),
                    SizedBox(
                      height: 20, // Fixed height for the address
                      child: Text(
                        restaurant.formattedAddress ?? 'No address available',
                        style: const TextStyle(
                          fontSize: 14,
                          color: Colors.grey,
                        ),
                        overflow: TextOverflow.ellipsis, // Handle long text
                      ),
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        const Icon(Icons.star, size: 16, color: Colors.amber),
                        const SizedBox(width: 4),
                        Text(
                          restaurant.rating?.toStringAsFixed(1) ?? 'N/A',
                          style: const TextStyle(fontSize: 14),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              // Fixed size for the favorite icon
              Container(
                width: 40,
                height: 40,
                alignment: Alignment.center,
                child: IconButton(
                  icon: Icon(
                    isLiked
                        ? Icons.favorite
                        : Icons.favorite_border, // Dynamic icon
                    color: isLiked ? Colors.red : Colors.grey, // Dynamic color
                  ),
                  onPressed:
                      onFavoriteTap, // Handle unliking logic in the parent widget
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
