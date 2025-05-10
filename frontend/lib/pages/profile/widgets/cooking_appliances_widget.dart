import 'package:flutter/material.dart';

class CookingAppliancesWidget extends StatelessWidget {
  final List<String> appliances;
  final VoidCallback onOpenSelector;
  final void Function(String) onApplianceRemoved;

  const CookingAppliancesWidget({
    super.key,
    required this.appliances,
    required this.onOpenSelector,
    required this.onApplianceRemoved,
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
              'Cooking Appliances',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 8),
            GestureDetector(
              onTap: onOpenSelector,
              child: InputDecorator(
                decoration: InputDecoration(
                  hintText: '--Select Tags--',
                  border: OutlineInputBorder(),
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 8,
                  ),
                ),
                child: Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children:
                      appliances
                          .map(
                            (app) => Chip(
                              label: Text(app),
                              onDeleted: () => onApplianceRemoved(app),
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
