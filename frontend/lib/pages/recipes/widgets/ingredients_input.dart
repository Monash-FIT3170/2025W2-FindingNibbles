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
    return Card(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
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
          ),
          const SizedBox(height: 8),
          Container(
            constraints: const BoxConstraints(maxHeight: 200),
            child:
                ingredients.isEmpty
                    ? const Padding(
                      padding: EdgeInsets.all(12.0),
                      child: Text('No ingredients added yet. Add one above.'),
                    )
                    : ListView.builder(
                      padding: EdgeInsets.zero,
                      shrinkWrap: true,
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
      ),
    );
  }
}
