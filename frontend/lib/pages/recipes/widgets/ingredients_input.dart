import 'package:flutter/material.dart';
import 'package:nibbles/core/ingredient_suggestions.dart';

class IngredientsInput extends StatefulWidget {
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
  State<IngredientsInput> createState() => _IngredientsInputState();
}

class _IngredientsInputState extends State<IngredientsInput> {
  List<String> _suggestions = [];
  bool _showSuggestions = false;

  void _onTextChanged(String value) {
    setState(() {
      _suggestions = IngredientSuggestions.filterIngredients(value);
      _showSuggestions = value.isNotEmpty && _suggestions.isNotEmpty;
    });
  }

  void _selectSuggestion(String suggestion) {
    // Clear UI state first to prevent layout issues
    setState(() {
      _showSuggestions = false;
      _suggestions = [];
    });
    // Then clear the controller
    widget.controller.clear();
    // Finally add the ingredient (triggers parent rebuild)
    widget.onAddIngredient(suggestion);
  }

  void _addCustomIngredient([String? value]) {
    final text = value ?? widget.controller.text;
    if (text.isNotEmpty) {
      // Clear UI state first
      setState(() {
        _showSuggestions = false;
        _suggestions = [];
      });
      // Then clear the controller
      widget.controller.clear();
      // Finally add the ingredient (triggers parent rebuild)
      widget.onAddIngredient(text);
    }
  }

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
              child: Column(
                children: [
                  TextFormField(
                    controller: widget.controller,
                    decoration: const InputDecoration(
                      labelText: 'Add an ingredient',
                      border: OutlineInputBorder(),
                      contentPadding: EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 8,
                      ),
                    ),
                    onChanged: _onTextChanged,
                    onFieldSubmitted: _addCustomIngredient,
                  ),
                  // Suggestions dropdown
                  if (_showSuggestions)
                    Container(
                      constraints: const BoxConstraints(maxHeight: 200),
                      decoration: BoxDecoration(
                        border: Border.all(color: Colors.grey.shade300),
                        borderRadius: const BorderRadius.only(
                          bottomLeft: Radius.circular(4),
                          bottomRight: Radius.circular(4),
                        ),
                        color: Theme.of(context).colorScheme.surface,
                      ),
                      child: ListView.builder(
                        shrinkWrap: true,
                        itemCount: _suggestions.length,
                        itemBuilder: (context, index) {
                          final suggestion = _suggestions[index];
                          return ListTile(
                            dense: true,
                            title: Text(suggestion),
                            onTap: () => _selectSuggestion(suggestion),
                          );
                        },
                      ),
                    ),
                ],
              ),
            ),
            IconButton(
              icon: const Icon(Icons.add),
              onPressed: _addCustomIngredient,
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
              widget.ingredients.isEmpty
                  ? const Center(
                    child: Text('No ingredients added yet. Add one above.'),
                  )
                  : ListView.builder(
                    shrinkWrap: true,
                    padding: EdgeInsets.zero,
                    itemCount: widget.ingredients.length,
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
                                  widget.ingredients[index],
                                  style: const TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                              ),
                              IconButton(
                                icon: const Icon(Icons.delete, size: 24),
                                onPressed:
                                    () => widget.onRemoveIngredient(
                                      widget.ingredients[index],
                                    ),
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
