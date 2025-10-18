import 'package:flutter/material.dart';
import '../service/restaurant-menu/dish_dto.dart';

class DishCard extends StatelessWidget {
  final DishDto dish;

  const DishCard({super.key, required this.dish});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Dish name
            Text(
              dish.name,
              style: theme.textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.bold,
              ),
            ),
            if (dish.description != null) ...[
              const SizedBox(height: 8),
              Text(
                dish.description!,
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: colorScheme.onSurfaceVariant,
                ),
              ),
            ],
            const SizedBox(height: 12),
            // Price and Calories row
            Row(
              children: [
                if (dish.price != null) ...[
                  Icon(
                    Icons.attach_money,
                    size: 16,
                    color: colorScheme.primary,
                  ),
                  Text(
                    dish.price!.toStringAsFixed(2),
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: colorScheme.primary,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(width: 16),
                ],
                if (dish.calories != null) ...[
                  Icon(
                    Icons.local_fire_department,
                    size: 16,
                    color: colorScheme.secondary,
                  ),
                  const SizedBox(width: 4),
                  Text(
                    '${dish.calories} cal',
                    style: theme.textTheme.bodyMedium?.copyWith(
                      color: colorScheme.secondary,
                    ),
                  ),
                ],
              ],
            ),
            // Dietary tags
            if (dish.dietaryTags.isNotEmpty) ...[
              const SizedBox(height: 12),
              Wrap(
                spacing: 6,
                runSpacing: 6,
                children:
                    dish.dietaryTags
                        .map(
                          (tag) => Chip(
                            label: Text(tag, style: theme.textTheme.bodySmall),
                            backgroundColor: colorScheme.secondaryContainer,
                            labelStyle: TextStyle(
                              color: colorScheme.onSecondaryContainer,
                            ),
                            visualDensity: VisualDensity.compact,
                          ),
                        )
                        .toList(),
              ),
            ],
          ],
        ),
      ),
    );
  }
}
