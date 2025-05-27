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
      children: [
        // Input field row
        Row(
          children: [
            Expanded(
              child: TextField(
                controller: controller,
                decoration: const InputDecoration(
                  hintText: 'Add an ingredient',
                  border: OutlineInputBorder(),
                  contentPadding: EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 8,
                  ),
                ),
                onSubmitted: onAddIngredient,
              ),
            ),
            IconButton(
              icon: const Icon(Icons.add),
              onPressed: () => onAddIngredient(controller.text),
            ),
          ],
        ),
        const SizedBox(height: 8),
        Expanded(
          child:
              ingredients.isEmpty
                  ? const Center(
                    child: Text('No ingredients added yet. Add one above.'),
                  )
                  : ListView.builder(
                    padding: EdgeInsets.zero,
                    itemCount: ingredients.length,
                    itemBuilder: (context, index) {
                      return ListTile(
                        dense: true,
                        title: Text(ingredients[index]),
                        trailing: IconButton(
                          icon: const Icon(Icons.delete),
                          onPressed:
                              () => onRemoveIngredient(ingredients[index]),
                        ),
                      );
                    },
                  ),
        ),
      ],
    );
  }
}
