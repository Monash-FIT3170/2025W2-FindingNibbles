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
        const SizedBox(height: 16), // Add spacing from top
        // Heading
        Text('Ingredients', style: Theme.of(context).textTheme.titleMedium),
        const SizedBox(height: 8),
        // Input field with inline add functionality
        TextField(
          controller: controller,
          decoration: const InputDecoration(
            labelText: 'Add an ingredient',
            border: OutlineInputBorder(),
            contentPadding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
          ),
          onSubmitted: (value) {
            if (value.trim().isNotEmpty) {
              onAddIngredient(value);
            }
          },
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
                  ? const Padding(
                    padding: EdgeInsets.symmetric(vertical: 8),
                    child: Center(
                      child: Text(
                        'No ingredients added yet.',
                        style: TextStyle(color: Colors.grey),
                      ),
                    ),
                  )
                  : Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children:
                        ingredients.map((ingredient) {
                          return InputChip(
                            label: Text(ingredient),
                            onDeleted: () => onRemoveIngredient(ingredient),
                          );
                        }).toList(),
                  ),
        ),
      ],
    );
  }
}
