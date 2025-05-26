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
      return '';
    }
    return 'Price: ${'\$' * level}';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Nearby Restaurants')),
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
                mainAxisSpacing: 8,
                crossAxisSpacing: 8,
                childAspectRatio: 3 / 2,
              ),
              itemBuilder: (context, index) {
                final restaurant = restaurants[index];
                return Container(
                  decoration: BoxDecoration(
                    color: Colors.white,
                    border: Border.all(color: Colors.grey.shade300),
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.grey.withValues(),
                        spreadRadius: 1,
                        blurRadius: 4,
                        offset: const Offset(2, 2),
                      ),
                    ],
                  ),
                  padding: const EdgeInsets.all(12),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        restaurant.name,
                        style: const TextStyle(
                          color: Colors.red,
                          fontSize: 16,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      const SizedBox(height: 4),
                      Text('⭐ ${restaurant.rating?.toStringAsFixed(1)}'),
                      const SizedBox(height: 4),
                      // assuming priceLevel is int? on RestaurantDto
                      Text(formatPriceLevel(restaurant.priceLevel)),
                    ],
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
