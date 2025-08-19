import 'package:flutter/material.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/theme/app_theme.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';

class RestaurantFilterData {
  final int minimumRating;
  final CuisineDto? selectedCuisine;

  const RestaurantFilterData({
    required this.minimumRating,
    this.selectedCuisine,
  });

  RestaurantFilterData copyWith({
    int? minimumRating,
    CuisineDto? selectedCuisine,
    bool clearCuisine = false,
  }) {
    return RestaurantFilterData(
      minimumRating: minimumRating ?? this.minimumRating,
      selectedCuisine: clearCuisine ? null : (selectedCuisine ?? this.selectedCuisine),
    );
  }

  bool get hasActiveFilters => minimumRating > 1 || selectedCuisine != null;

  List<String> get activeFilterLabels {
    List<String> labels = [];
    if (selectedCuisine != null) {
      labels.add(selectedCuisine!.name);
    }
    if (minimumRating > 1) {
      labels.add('$minimumRating+ ⭐');
    }
    return labels;
  }
}

class RestaurantFilterDialog extends StatefulWidget {
  final RestaurantFilterData initialFilter;
  final List<CuisineDto> availableCuisines;
  final Function(RestaurantFilterData) onApply;

  const RestaurantFilterDialog({
    super.key,
    required this.initialFilter,
    required this.availableCuisines,
    required this.onApply,
  });

  @override
  State<RestaurantFilterDialog> createState() => _RestaurantFilterDialogState();

  static Future<void> show({
    required BuildContext context,
    required RestaurantFilterData initialFilter,
    required List<CuisineDto> availableCuisines,
    required Function(RestaurantFilterData) onApply,
  }) {
    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return RestaurantFilterDialog(
          initialFilter: initialFilter,
          availableCuisines: availableCuisines,
          onApply: onApply,
        );
      },
    );
  }
}

class _RestaurantFilterDialogState extends State<RestaurantFilterDialog> {
  late int _minimumRating;
  late CuisineDto? _selectedCuisine;

  @override
  void initState() {
    super.initState();
    _minimumRating = widget.initialFilter.minimumRating;
    _selectedCuisine = widget.initialFilter.selectedCuisine;
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    return AlertDialog(
      title: Text(
        'Filter Restaurants',
        style: theme.textTheme.titleMedium,
      ),
      content: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          ListTile(
            leading: const Icon(Icons.star),
            title: const Text('Min Rating'),
            subtitle: DropdownButton<int>(
              value: _minimumRating,
              isExpanded: true,
              items: List.generate(5, (index) => index + 1)
                  .map(
                    (rating) => DropdownMenuItem(
                      value: rating,
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text('$rating'),
                          const SizedBox(width: 4),
                          Icon(
                            Icons.star,
                            size: 16,
                            color: colorScheme.onSurface,
                          ),
                        ],
                      ),
                    ),
                  )
                  .toList(),
              onChanged: (value) {
                setState(() {
                  _minimumRating = value!;
                });
              },
            ),
          ),
          ListTile(
            leading: const Icon(Icons.restaurant_menu),
            title: const Text('Cuisine'),
            subtitle: DropdownButton<CuisineDto?>(
              value: _selectedCuisine,
              isExpanded: true,
              items: [
                const DropdownMenuItem<CuisineDto?>(
                  value: null,
                  child: Text('All'),
                ),
                ...widget.availableCuisines.map(
                  (cuisine) => DropdownMenuItem(
                    value: cuisine,
                    child: Text(cuisine.name),
                  ),
                ),
              ],
              onChanged: (value) {
                setState(() {
                  _selectedCuisine = value;
                });
              },
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
            final newFilter = RestaurantFilterData(
              minimumRating: _minimumRating,
              selectedCuisine: _selectedCuisine,
            );
            Navigator.pop(context);
            widget.onApply(newFilter);
          },
          child: const Text('Apply'),
        ),
      ],
    );
  }
}

class RestaurantFilterChip extends StatelessWidget {
  final RestaurantFilterData filter;
  final VoidCallback onClear;
  final EdgeInsets? margin;
  final bool showForMap; // Different styling for map vs list view

  const RestaurantFilterChip({
    super.key,
    required this.filter,
    required this.onClear,
    this.margin,
    this.showForMap = false,
  });

  @override
  Widget build(BuildContext context) {
    if (!filter.hasActiveFilters) return const SizedBox.shrink();

    final activeLabels = filter.activeFilterLabels;
    
    Widget chipContent;
    if (showForMap) {
      // For map view - show individual components
      List<Widget> filterWidgets = [];
      
      if (filter.selectedCuisine != null) {
        filterWidgets.add(Text(filter.selectedCuisine!.name));
      }

      if (filter.minimumRating > 1) {
        if (filterWidgets.isNotEmpty) {
          filterWidgets.add(const Text(' • '));
        }
        filterWidgets.addAll([
          Text('${filter.minimumRating}'),
          Icon(Icons.star, size: 16, color: AppTheme.colorScheme.onPrimary),
        ]);
      }
      
      chipContent = Row(mainAxisSize: MainAxisSize.min, children: filterWidgets);
    } else {
      // For list view - show joined labels
      chipContent = Text(activeLabels.join(' • '));
    }

    final chip = Chip(
      label: chipContent,
      deleteIcon: Icon(
        Icons.close,
        size: 18,
        color: showForMap ? AppTheme.colorScheme.onPrimary : null,
      ),
      onDeleted: onClear,
      backgroundColor: AppTheme.colorScheme.primary,
      side: showForMap ? BorderSide.none : null,
      labelStyle: showForMap 
          ? TextStyle(
              color: AppTheme.colorScheme.onPrimary,
              fontSize: 14,
            )
          : null,
    );

    if (margin != null) {
      return Container(
        margin: margin,
        child: chip,
      );
    }
    
    return chip;
  }
}

// Helper mixin for pages that use restaurant filtering
mixin RestaurantFilterMixin<T extends StatefulWidget> on State<T> {
  RestaurantFilterData _filterData = const RestaurantFilterData(minimumRating: 1);
  List<CuisineDto> _availableCuisines = [];

  RestaurantFilterData get currentFilter => _filterData;
  List<CuisineDto> get availableCuisines => _availableCuisines;

  void updateFilter(RestaurantFilterData newFilter) {
    setState(() {
      _filterData = newFilter;
    });
    onFilterChanged(newFilter);
  }

  void clearFilters() {
    updateFilter(const RestaurantFilterData(minimumRating: 1));
  }

  void showFilterDialog(BuildContext context) {
    RestaurantFilterDialog.show(
      context: context,
      initialFilter: _filterData,
      availableCuisines: _availableCuisines,
      onApply: updateFilter,
    );
  }

  // Set available cuisines (call this when cuisines are loaded)
  void setAvailableCuisines(List<CuisineDto> cuisines) {
    setState(() {
      _availableCuisines = cuisines;
    });
  }

  // Override this method in your pages to handle filter changes
  void onFilterChanged(RestaurantFilterData filter);

  // Helper method to apply rating filter to restaurant list
  List<RestaurantDto> applyRatingFilter(List<RestaurantDto> restaurants) {
    return restaurants.where((restaurant) {
      return restaurant.rating != null && 
            restaurant.rating! >= _filterData.minimumRating;
    }).toList();
  }
}