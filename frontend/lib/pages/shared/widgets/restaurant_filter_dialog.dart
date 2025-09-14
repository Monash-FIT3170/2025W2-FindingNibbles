import 'package:flutter/material.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/theme/app_theme.dart';

class RestaurantFilterDialog extends StatefulWidget {
  final int initialMinimumRating;
  final CuisineDto? initialSelectedCuisine;
  final List<CuisineDto> availableCuisines;
  final bool isSearchMode;
  final String searchQuery;
  final Function(int minimumRating, CuisineDto? selectedCuisine) onApply;
  final Future<CuisineDto?> Function({bool skipApplyLogic})
  showCuisineSelectionDialog;

  const RestaurantFilterDialog({
    super.key,
    required this.initialMinimumRating,
    required this.initialSelectedCuisine,
    required this.availableCuisines,
    required this.isSearchMode,
    required this.searchQuery,
    required this.onApply,
    required this.showCuisineSelectionDialog,
  });

  @override
  State<RestaurantFilterDialog> createState() => _RestaurantFilterDialogState();
}

class _RestaurantFilterDialogState extends State<RestaurantFilterDialog> {
  late int tempMinimumRating;
  late CuisineDto? tempSelectedCuisine;

  @override
  void initState() {
    super.initState();
    tempMinimumRating = widget.initialMinimumRating;
    tempSelectedCuisine = widget.initialSelectedCuisine;
  }

  @override
  Widget build(BuildContext context) {
    return StatefulBuilder(
      builder: (context, setState) {
        return AlertDialog(
          title: const Text('Filter Restaurants'),
          contentPadding: const EdgeInsets.fromLTRB(
            24,
            12,
            24,
            24,
          ), // Reduced top padding
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                contentPadding: EdgeInsets.fromLTRB(
                  28,
                  0,
                  28,
                  0,
                ), // Remove extra padding from ListTile
                title: const Text('Min Rating'),
                subtitle: DropdownButton<int>(
                  value: tempMinimumRating,
                  isExpanded: true,
                  items:
                      List.generate(5, (index) => index + 1)
                          .map(
                            (rating) => DropdownMenuItem(
                              value: rating,
                              child: Row(
                                children: [
                                  Text('$rating'),
                                  const SizedBox(width: 4),
                                  Icon(
                                    Icons.star,
                                    color:
                                        AppTheme
                                            .colorScheme
                                            .primary, // Use app's maroon color
                                    size: 18,
                                  ),
                                ],
                              ),
                            ),
                          )
                          .toList(),
                  onChanged: (value) {
                    setState(() {
                      tempMinimumRating = value!;
                    });
                  },
                ),
              ),
              if (!widget
                  .isSearchMode) // Only show cuisine filter when not searching
                ListTile(
                  contentPadding: EdgeInsets.fromLTRB(
                    28,
                    0,
                    28,
                    0,
                  ), // Remove extra padding from ListTile
                  title: const Text('Cuisine'),
                  subtitle: InkWell(
                    onTap: () async {
                      final selected = await widget.showCuisineSelectionDialog(
                        skipApplyLogic: true,
                      );
                      setState(() {
                        tempSelectedCuisine = selected;
                      });
                    },
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 8),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            tempSelectedCuisine?.name ?? 'All',
                            style: const TextStyle(fontSize: 16),
                          ),
                          const Icon(Icons.arrow_drop_down),
                        ],
                      ),
                    ),
                  ),
                ),
              if (widget.isSearchMode)
                ListTile(
                  contentPadding:
                      EdgeInsets.zero, // Remove extra padding from ListTile
                  leading: const Icon(Icons.info_outline),
                  title: const Text('Search Mode'),
                  subtitle: Text(
                    'Cuisine filter disabled while searching for "${widget.searchQuery}"',
                  ),
                ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () {
                Navigator.pop(context);
                widget.onApply(tempMinimumRating, tempSelectedCuisine);
              },
              child: const Text('Apply'),
            ),
          ],
        );
      },
    );
  }
}
