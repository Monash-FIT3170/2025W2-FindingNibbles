import 'package:flutter/material.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/theme/app_theme.dart';

class CuisineSelectionDialog extends StatefulWidget {
  final List<CuisineDto> availableCuisines;
  final List<CuisineDto>? favoriteCuisines; // List of favorited cuisines
  final bool
  allowSelectingFavorited; // Whether user can select already favorited cuisines
  final bool skipApplyLogic;
  final Function(CuisineDto cuisine)? onCuisineSelected; // For apply logic

  const CuisineSelectionDialog({
    super.key,
    required this.availableCuisines,
    this.favoriteCuisines,
    this.allowSelectingFavorited =
        true, // Default to true for backward compatibility
    this.skipApplyLogic = false,
    this.onCuisineSelected,
  });

  @override
  State<CuisineSelectionDialog> createState() => _CuisineSelectionDialogState();
}

class _CuisineSelectionDialogState extends State<CuisineSelectionDialog> {
  String localSearchTerm = '';
  late List<CuisineDto> localFiltered;

  @override
  void initState() {
    super.initState();
    localFiltered = [...widget.availableCuisines];
  }

  bool _isFavorited(CuisineDto cuisine) {
    return widget.favoriteCuisines?.any((fav) => fav.id == cuisine.id) ?? false;
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      scrollable: true,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
      title: Text(
        'Select Cuisine',
        style: TextStyle(
          color: AppTheme.colorScheme.primary,
          fontWeight: FontWeight.bold,
        ),
      ),
      content: SizedBox(
        width: double.maxFinite,
        height: 300,
        child: Column(
          children: [
            TextField(
              decoration: InputDecoration(
                labelText: 'Search',
                labelStyle: TextStyle(color: AppTheme.colorScheme.primary),
                prefixIcon: Icon(
                  Icons.search,
                  color: AppTheme.colorScheme.primary,
                ),
              ),
              onChanged: (value) {
                setState(() {
                  localSearchTerm = value.toLowerCase();
                  localFiltered =
                      widget.availableCuisines
                          .where(
                            (cuisine) => cuisine.name.toLowerCase().contains(
                              localSearchTerm,
                            ),
                          )
                          .toList();
                });
              },
            ),
            const SizedBox(height: 16),
            Expanded(
              child:
                  localFiltered.isEmpty
                      ? Center(
                        child: Text(
                          'No matches',
                          style: AppTheme.textTheme.displayMedium,
                        ),
                      )
                      : ListView.builder(
                        itemCount:
                            localFiltered.length + 1, // +1 for "All" option
                        itemBuilder: (context, index) {
                          if (index == 0) {
                            // "All" option
                            return ListTile(
                              title: const Text('All'),
                              subtitle: const Text('Show all cuisines'),
                              tileColor: Colors.grey.shade50,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(8),
                              ),
                              onTap: () => Navigator.of(context).pop(null),
                            );
                          }
                          final cuisine = localFiltered[index - 1];
                          final isFavorited = _isFavorited(cuisine);
                          final canSelect =
                              widget.allowSelectingFavorited || !isFavorited;

                          return ListTile(
                            enabled: canSelect,
                            title: Text(
                              cuisine.name,
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: canSelect ? null : Colors.grey,
                              ),
                            ),
                            subtitle:
                                cuisine.description != null &&
                                        cuisine.description!.isNotEmpty
                                    ? Text(
                                      cuisine.description!,
                                      maxLines: 2,
                                      overflow: TextOverflow.ellipsis,
                                      style: TextStyle(
                                        color: canSelect ? null : Colors.grey,
                                      ),
                                    )
                                    : null,
                            trailing:
                                isFavorited
                                    ? const Icon(
                                      Icons.star,
                                      color: Colors.amber,
                                      size: 20,
                                    )
                                    : null,
                            tileColor:
                                index % 2 == 1 ? Colors.grey.shade50 : null,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(8),
                            ),
                            onTap:
                                canSelect
                                    ? () {
                                      if (!widget.skipApplyLogic &&
                                          widget.onCuisineSelected != null) {
                                        widget.onCuisineSelected!(cuisine);
                                      }
                                      Navigator.of(context).pop(cuisine);
                                    }
                                    : null,
                          );
                        },
                      ),
            ),
          ],
        ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Cancel'),
        ),
      ],
    );
  }
}
