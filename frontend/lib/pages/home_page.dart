import 'package:flutter/material.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'package:nibbles/service/restaurant/restaurant_service.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late Future<List<RestaurantDto>> _restaurantsFuture;

  @override
  void initState() {
    super.initState();
    _restaurantsFuture = RestaurantService().getRestaurants();
  }

  // assuming RestaurantDto has priceLevel or similar, otherwise adapt
  String formatPriceLevel(int? level) {
    if (level == null) {
      return 'Price: ?';
    }
    return 'Price: ${'\$' * level}';
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Nearby Restaurants'),
        automaticallyImplyLeading: false, // Hide back button
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: FutureBuilder<List<RestaurantDto>>(
          future: _restaurantsFuture,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            } else if (snapshot.hasError) {
              return Center(child: Text('Error: ${snapshot.error}'));
            } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
              return const Center(child: Text('No restaurants found.'));
            }

            final restaurants = snapshot.data!;
            return GridView.builder(
              itemCount: restaurants.length,
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                mainAxisSpacing: 4,
                crossAxisSpacing: 4,
                childAspectRatio: 3 / 2,
              ),
              itemBuilder: (context, index) {
                final restaurant = restaurants[index];
                return Card(
                  child: Padding(
                    padding: const EdgeInsets.all(12.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          restaurant.name,
                          style: theme.textTheme.titleSmall?.copyWith(
                            color: colorScheme.primary,
                          ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                        const SizedBox(height: 4),
                        Row(
                          children: [
                            Icon(
                              Icons.star,
                              color: colorScheme.secondary,
                              size: 18,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              restaurant.rating?.toStringAsFixed(1) ?? '',
                              style: const TextStyle(
                                fontWeight: FontWeight.w500,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 4),
                        Text(formatPriceLevel(restaurant.priceLevel)),
                      ],
                    ),
                  ),
                );
              },
            );
          },
        ),
      ),
    );
  }
}
