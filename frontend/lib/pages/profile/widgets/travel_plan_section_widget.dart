import 'package:flutter/material.dart';
import 'package:nibbles/theme/app_theme.dart';

class TravelPlanSectionWidget extends StatelessWidget {
  final VoidCallback onOpen;

  const TravelPlanSectionWidget({super.key, required this.onOpen});

  @override
  Widget build(BuildContext context) {
    final cs = AppTheme.colorScheme;

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Card(
        elevation: 2,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        child: InkWell(
          borderRadius: BorderRadius.circular(12),
          onTap: onOpen,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8),
            child: ListTile(
              contentPadding: const EdgeInsets.symmetric(
                horizontal: 8,
                vertical: 8,
              ),
              leading: CircleAvatar(
                radius: 22,
                backgroundColor: cs.primary.withOpacity(0.12),
                child: Icon(Icons.flight_takeoff, color: cs.primary),
              ),
              title: const Text(
                'Travel plan',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
              ),
              subtitle: const Text(
                'Create and manage trips, food goals and restaurant lists for your travels.',
                style: TextStyle(fontSize: 13),
              ),
              trailing: const Icon(Icons.chevron_right),
            ),
          ),
        ),
      ),
    );
  }
}
