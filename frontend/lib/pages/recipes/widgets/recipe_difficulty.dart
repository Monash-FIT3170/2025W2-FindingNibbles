import 'package:flutter/material.dart';
import 'package:intl/intl.dart' show toBeginningOfSentenceCase;
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
        Padding(
          padding: const EdgeInsets.symmetric(vertical: 8.0),
          child: Text('Recipe Difficulty', style: textTheme.titleMedium),
        ),
        Align(
          alignment: Alignment.centerLeft,
          child: Wrap(
            spacing: 8,
            children:
                RecipeDifficulty.values.map((difficulty) {
                  return ChoiceChip(
                    label: Text(toBeginningOfSentenceCase(difficulty.name)),
                    selected: selectedDifficulty == difficulty,
                    showCheckmark: false,
                    onSelected: (bool selected) {
                      if (selected) {
                        onDifficultySelected(difficulty);
                      }
                    },
                  );
                }).toList(),
          ),
        ),
      ],
    );
  }
}
