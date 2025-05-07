import 'package:flutter/material.dart';

class DietaryRequirementsWidget extends StatelessWidget {
  final List<String> tags;
  final VoidCallback onOpenSelector;
  final void Function(String) onTagRemoved;

  const DietaryRequirementsWidget({
    super.key,
    required this.tags,
    required this.onOpenSelector,
    required this.onTagRemoved,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Dietary Requirements',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            GestureDetector(
              onTap: onOpenSelector,
              child: InputDecorator(
                decoration: InputDecoration(
                  hintText: '--Select Tags--',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 8,
                  ),
                ),
                child: Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children:
                      tags
                          .map(
                            (tag) => Chip(
                              label: Text(tag),
                              onDeleted: () => onTagRemoved(tag),
                            ),
                          )
                          .toList(),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
