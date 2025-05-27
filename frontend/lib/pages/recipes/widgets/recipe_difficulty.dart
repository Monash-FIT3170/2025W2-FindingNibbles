import 'package:flutter/material.dart';
import 'package:nibbles/service/recipe/recipe_service.dart';

class RecipeDifficultySelector extends StatelessWidget {
  final RecipeDifficulty selectedDifficulty;
  final Function(RecipeDifficulty) onDifficultySelected;

  const RecipeDifficultySelector({
    super.key,
    required this.selectedDifficulty,
    required this.onDifficultySelected,
  });

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Recipe Difficulty', style: textTheme.titleMedium),
        Wrap(
          spacing: 8,
          children:
              RecipeDifficulty.values.map((difficulty) {
                return ChoiceChip(
                  label: Text(difficulty.name.toUpperCase()),
                  selected: selectedDifficulty == difficulty,
                  onSelected: (bool selected) {
                    if (selected) {
                      onDifficultySelected(difficulty);
                    }
                  },
                );
              }).toList(),
        ),
      ],
    );
  }
}
