import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

// Restaurant model
class Restaurant {
  final int id;
  final String name;
  final double rating;
  final int? priceLevel;

  Restaurant({
    required this.id,
    required this.name,
    required this.rating,
    this.priceLevel,
  });

  factory Restaurant.fromJson(Map<String, dynamic> json) {
    return Restaurant(
      id: json['id'],
      name: json['name'],
      rating: (json['rating'] as num).toDouble(),
      priceLevel: json['priceLevel'],
    );
  }
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  late Future<List<Restaurant>> _restaurantsFuture;

  @override
  void initState() {
    super.initState();
    _restaurantsFuture = fetchRestaurants();
  }

  Future<List<Restaurant>> fetchRestaurants() async {
    final response = await http.get(
      Uri.parse(
        'http://10.0.2.2:3000/api/restaurant',
      ), // update port/url if needed
    );

    print('fetchRestaurants called');
    print('Response status: ${response.statusCode}');
    print('Response body: ${response.body}');

    if (response.statusCode == 200) {
      List jsonList = json.decode(response.body);
      return jsonList.map((json) => Restaurant.fromJson(json)).toList();
    } else {
      throw Exception('Failed to load restaurants');
    }
  }

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
        child: FutureBuilder<List<Restaurant>>(
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
                        color: Colors.grey.withOpacity(0.3),
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
                      Text('⭐ ${restaurant.rating.toStringAsFixed(1)}'),
                      const SizedBox(height: 4),
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
