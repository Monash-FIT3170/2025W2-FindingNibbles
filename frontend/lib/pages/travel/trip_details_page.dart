import 'package:flutter/material.dart';
import 'package:nibbles/theme/app_theme.dart';

class TripDetailsPage extends StatelessWidget {
  final String tripName;
  final List<Map<String, dynamic>> restaurants; // placeholder for now

  const TripDetailsPage({
    super.key,
    required this.tripName,
    required this.restaurants,
  });

  @override
  Widget build(BuildContext context) {
    final colorScheme = AppTheme.colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: Text(tripName),
      ),
      body: restaurants.isEmpty
          ? const Center(
              child: Text(
                'No restaurants saved yet.\nTap + to add some!',
                textAlign: TextAlign.center,
              ),
            )
          : ListView.separated(
              padding: const EdgeInsets.all(16),
              itemCount: restaurants.length,
              separatorBuilder: (_, __) => const SizedBox(height: 8),
              itemBuilder: (context, idx) {
                final r = restaurants[idx];
                return ListTile(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  tileColor: colorScheme.surfaceContainerHighest,
                  leading: const Icon(Icons.restaurant),
                  title: Text(r['name']),
                  subtitle: Text(r['address'] ?? 'No address'),
                );
              },
            ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: colorScheme.primary,
        onPressed: () {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Add restaurant feature coming soon')),
          );
        },
        label: const Text('Add Restaurant'),
        icon: const Icon(Icons.add),
      ),
    );
  }
}
