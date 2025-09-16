import 'package:flutter/material.dart';

class IngredientsInput extends StatelessWidget {
  final List<String> ingredients;
  final TextEditingController controller;
  final Function(String) onAddIngredient;
  final Function(String) onRemoveIngredient;

  const IngredientsInput({
    super.key,
    required this.ingredients,
    required this.controller,
    required this.onAddIngredient,
    required this.onRemoveIngredient,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min, // Don't expand unnecessarily
      children: [
        // Input field row
        Row(
          children: [
            Expanded(
              child: TextFormField(
                controller: controller,
                decoration: const InputDecoration(
                  labelText: 'Add an ingredient',
                  border: OutlineInputBorder(),
                  contentPadding: EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 8,
                  ),
                ),
                onFieldSubmitted: onAddIngredient,
              ),
            ),
            IconButton(
              icon: const Icon(Icons.add),
              onPressed: () => onAddIngredient(controller.text),
            ),
          ],
        ),
        const SizedBox(height: 8),
        // Display added ingredients as chips (matching appliances/dietary style)
        InputDecorator(
          decoration: const InputDecoration(
            border: OutlineInputBorder(),
            contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          ),
          child:
              ingredients.isEmpty
                  ? const Center(
                    child: Text('No ingredients added yet. Add one above.'),
                  )
                  : ListView.builder(
                    padding: EdgeInsets.zero,
                    itemCount: ingredients.length,
                    itemBuilder: (context, index) {
                      return Container(
                        margin: const EdgeInsets.symmetric(vertical: 2),
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(12),
                          color:
                              Theme.of(
                                context,
                              ).inputDecorationTheme.fillColor ??
                              Theme.of(
                                context,
                              ).colorScheme.surfaceContainerHighest,
                        ),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 12,
                            vertical: 8,
                          ),
                          child: Row(
                            children: [
                              Expanded(
                                child: Text(
                                  ingredients[index],
                                  style: const TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                              ),
                              IconButton(
                                icon: const Icon(Icons.delete, size: 24),
                                onPressed:
                                    () =>
                                        onRemoveIngredient(ingredients[index]),
                                padding: EdgeInsets.zero,
                                constraints: const BoxConstraints(
                                  minWidth: 24,
                                  minHeight: 24,
                                ),
                              ),
                            ],
                          ),
                        ),
                      );
                    },
                  ),
        ),
      ],
    );
  }
}
