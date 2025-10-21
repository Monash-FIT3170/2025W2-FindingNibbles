import 'package:flutter/material.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/core/logger.dart';
import 'package:nibbles/theme/app_theme.dart';
import 'package:nibbles/widgets/search_decoration.dart';

class CuisinePreferencesWidget extends StatefulWidget {
  final List<CuisineDto> cuisinePreferences;
  final void Function(CuisineDto) onAdd;
  final void Function(CuisineDto) onRemove;

  const CuisinePreferencesWidget({
    super.key,
    required this.cuisinePreferences,
    required this.onAdd,
    required this.onRemove,
  });

  @override
  CuisinePreferencesWidgetState createState() =>
      CuisinePreferencesWidgetState();
}

class CuisinePreferencesWidgetState extends State<CuisinePreferencesWidget> {
  final ProfileService _profileService = ProfileService();
  List<CuisineDto> _allDefaults = [];
  final _logger = getLogger();

  @override
  void initState() {
    super.initState();
    _loadDefaults();
  }

  Future<void> _loadDefaults() async {
    try {
      final defaults = await _profileService.getDefaultCuisines();
      setState(() {
        _allDefaults = defaults;
      });
    } catch (e) {
      _logger.e('Error loading cuisine defaults: $e');
      setState(() {
        _allDefaults = [];
      });
    }
  }

  Future<void> _createCustomCuisine(String name, String description) async {
    try {
      final newCuisine = await _profileService.createCuisine(name, description);
      widget.onAdd(newCuisine);
    } catch (e) {
      _logger.e('Error creating custom cuisine: $e');
    }
  }

  Future<void> _addCuisinePreference(int item) async {
    final scaffoldMessenger = ScaffoldMessenger.of(context);
    try {
      _logger.d('Attempting to add cuisine preference with ID: $item');
      await _profileService.addCuisinePreference(item);
      final cuisine = _allDefaults.firstWhere(
        (c) => c.id == item,
        orElse: () => throw Exception('Cuisine not found'),
      );
      _logger.i('Successfully added cuisine preference: ${cuisine.name}');
      widget.onAdd(cuisine);
    } catch (e) {
      _logger.e('Error adding cuisine preference: $e');
      // Show user-friendly error message
      if (mounted) {
        scaffoldMessenger.showSnackBar(
          SnackBar(
            content: Text('Failed to add cuisine preference: ${e.toString()}'),
            backgroundColor: Colors.red,
            duration: Duration(seconds: 5),
          ),
        );
      }
    }
  }

  void _openCustomCreationDialog() {
    final TextEditingController nameController = TextEditingController();
    final TextEditingController descriptionController = TextEditingController();
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    showDialog(
      context: context,
      builder: (dialogContext) {
        return AlertDialog(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(20),
          ),
          title: Text(
            'Create Custom Cuisine',
            style: TextStyle(
              color: colorScheme.primary,
              fontWeight: FontWeight.bold,
            ),
          ),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: nameController,
                decoration: InputDecoration(labelText: 'Name'),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: descriptionController,
                decoration: InputDecoration(labelText: 'Description'),
                maxLines: 2,
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(dialogContext).pop(),
              style: TextButton.styleFrom(foregroundColor: Colors.grey[700]),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                final scaffoldMessenger = ScaffoldMessenger.of(context);
                final name = nameController.text.trim();
                final description = descriptionController.text.trim();

                if (name.isNotEmpty) {
                  await _createCustomCuisine(name, description);
                  if (!dialogContext.mounted) return;
                  Navigator.of(dialogContext).pop();
                } else {
                  // Optionally, show an error message if fields are empty
                  scaffoldMessenger.showSnackBar(
                    const SnackBar(content: Text('Please enter a name')),
                  );
                }
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: colorScheme.primary,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: const Text('Create'),
            ),
          ],
        );
      },
    );
  }

  void _openAddDialog() {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    showDialog(
      context: context,
      builder: (dialogContext) {
        String localSearchTerm = '';
        List<CuisineDto> localFiltered = [..._allDefaults];

        return StatefulBuilder(
          builder: (dialogContext, setState) {
            return AlertDialog(
              scrollable: true,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
              title: Text(
                'Add Cuisine Preference',
                style: TextStyle(
                  color: colorScheme.primary,
                  fontWeight: FontWeight.bold,
                ),
              ),
              content: SizedBox(
                width: double.maxFinite,
                height: 400,
                child: Column(
                  children: [
                    TextField(
                      onChanged: (value) {
                        setState(() {
                          localSearchTerm = value.toLowerCase();
                          localFiltered =
                              _allDefaults
                                  .where(
                                    (c) => c.name.toLowerCase().contains(
                                      localSearchTerm,
                                    ),
                                  )
                                  .toList();
                        });
                      },
                      decoration: buildSearchDecoration(
                        colorScheme: Theme.of(context).colorScheme,
                        hintText: 'Search cuisines...',
                      ),
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
                                itemCount: localFiltered.length,
                                itemBuilder: (context, index) {
                                  final item = localFiltered[index];
                                  return ListTile(
                                    title: Text(item.name),
                                    subtitle:
                                        item.description != null &&
                                                item.description!.isNotEmpty
                                            ? Text(
                                              item.description!,
                                              style: TextStyle(
                                                color: Colors.grey[600],
                                                fontSize: 12,
                                              ),
                                              maxLines: 2,
                                              overflow: TextOverflow.ellipsis,
                                            )
                                            : null,
                                    tileColor:
                                        index % 2 == 0
                                            ? Colors.grey.shade50
                                            : null,
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    onTap: () async {
                                      await _addCuisinePreference(item.id);
                                      if (!dialogContext.mounted) return;
                                      Navigator.of(dialogContext).pop();
                                    },
                                  );
                                },
                              ),
                    ),
                  ],
                ),
              ),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.of(context).pop();
                    _openCustomCreationDialog();
                  },
                  style: TextButton.styleFrom(
                    foregroundColor: colorScheme.primary,
                  ),
                  child: const Text('Create custom'),
                ),
                OutlinedButton(
                  onPressed: () => Navigator.of(context).pop(),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: Colors.white,
                    backgroundColor: AppTheme.primaryColor,
                    side: BorderSide(color: Colors.grey.shade300),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16,
                      vertical: 10,
                    ),
                  ),
                  child: const Text(
                    'Cancel',
                    style: TextStyle(fontWeight: FontWeight.w500),
                  ),
                ),
              ],
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Text('Cuisine Preferences', style: theme.textTheme.titleSmall),
                const Spacer(),
                IconButton(icon: Icon(Icons.add), onPressed: _openAddDialog),
              ],
            ),
            const SizedBox(height: 8),
            GestureDetector(
              onTap: _openAddDialog,
              child: InputDecorator(
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                  contentPadding: EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 8,
                  ),
                ),
                child:
                    widget.cuisinePreferences.isEmpty
                        ? const Text('No cuisine preferences added')
                        : Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children:
                              widget.cuisinePreferences.map((c) {
                                return InputChip(
                                  label: Text(c.name),
                                  onDeleted: () async {
                                    final scaffoldMessenger =
                                        ScaffoldMessenger.of(context);
                                    try {
                                      _logger.d(
                                        'Attempting to remove cuisine preference with ID: ${c.id}',
                                      );
                                      await _profileService
                                          .removeCuisinePreference(c.id);
                                      _logger.i(
                                        'Successfully removed cuisine preference: ${c.name}',
                                      );
                                      widget.onRemove(c);
                                    } catch (e) {
                                      _logger.e(
                                        'Error removing cuisine preference: $e',
                                      );
                                      // Show user-friendly error message
                                      if (mounted) {
                                        scaffoldMessenger.showSnackBar(
                                          SnackBar(
                                            content: Text(
                                              'Failed to remove cuisine preference: ${e.toString()}',
                                            ),
                                            backgroundColor: Colors.red,
                                            duration: Duration(seconds: 5),
                                          ),
                                        );
                                      }
                                    }
                                  },
                                );
                              }).toList(),
                        ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
