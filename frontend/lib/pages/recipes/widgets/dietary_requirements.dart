import 'package:flutter/material.dart';
import 'package:nibbles/service/profile/dietary_dto.dart';

class DietaryRequirements extends StatelessWidget {
  final bool useDietaryRestrictions;
  final List<DietaryRequirementDto> availableDietaries;
  final List<DietaryRequirementDto> selectedDietaries;
  final Function(bool) onToggleDietaryRestrictions;
  final Function(DietaryRequirementDto) onToggleDietary;
  final Function() onToggleAll;
  final Function(DietaryRequirementDto) isDietarySelected;
  final Function() areAllDietariesSelected;

  const DietaryRequirements({
    super.key,
    required this.useDietaryRestrictions,
    required this.availableDietaries,
    required this.selectedDietaries,
    required this.onToggleDietaryRestrictions,
    required this.onToggleDietary,
    required this.onToggleAll,
    required this.isDietarySelected,
    required this.areAllDietariesSelected,
  });

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text('Dietary Requirements', style: textTheme.titleMedium),
            Switch(
              value: useDietaryRestrictions,
              onChanged: onToggleDietaryRestrictions,
            ),
          ],
        ),
        if (useDietaryRestrictions)
          SizedBox(
            child: Wrap(
              spacing: 8,
              runSpacing: 8,
              children: [
                FilterChip(
                  label: Text('All'),
                  selected: areAllDietariesSelected(),
                  onSelected: (selected) => onToggleAll(),
                ),
                ...availableDietaries.map(
                  (dietary) => FilterChip(
                    label: Text(dietary.name),
                    selected: isDietarySelected(dietary),
                    onSelected: (selected) => onToggleDietary(dietary),
                    showCheckmark: false,
                  ),
                ),
              ],
            ),
          ),
      ],
    );
  }
}
