import 'package:flutter/material.dart';
import 'package:nibbles/service/profile/dietary_dto.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/core/logger.dart';
import 'package:nibbles/theme/app_theme.dart';

class DietaryRequirementsWidget extends StatefulWidget {
  final List<DietaryRequirementDto> dietaryRequirements;
  final void Function(DietaryRequirementDto) onAdd;
  final void Function(DietaryRequirementDto) onRemove;

  const DietaryRequirementsWidget({
    super.key,
    required this.dietaryRequirements,
    required this.onAdd,
    required this.onRemove,
  });

  @override
  DietaryRequirementsWidgetState createState() =>
      DietaryRequirementsWidgetState();
}

class DietaryRequirementsWidgetState extends State<DietaryRequirementsWidget> {
  final ProfileService _profileService = ProfileService();
  List<DietaryRequirementDto> _allDefaults = [];
  final _logger = getLogger();

  @override
  void initState() {
    super.initState();
    _loadDefaults();
  }

  Future<void> _loadDefaults() async {
    try {
      final defaults = await _profileService.getDefaultDietaryRequirements();
      setState(() {
        _allDefaults = defaults;
      });
    } catch (e) {
      _logger.e('Error loading dietary requirements defaults: $e');
      setState(() {
        _allDefaults = [];
      });
    }
  }

  Future<void> _createCustomDietaryRequirement(
    String name,
    String description,
  ) async {
    try {
      final newDietary = await _profileService.createDietaryRequirement(
        name,
        description,
      );
      widget.onAdd(newDietary);
    } catch (e) {
      _logger.e('Error creating custom dietary requirement: $e');
    }
  }

  Future<void> _addDietaryRequirement(int item) async {
    try {
      await _profileService.addDietaryRequirement(item);
      final dietaryRequirement = _allDefaults.firstWhere(
        (d) => d.id == item,
        orElse: () => throw Exception('Dietary requirement not found'),
      );
      widget.onAdd(dietaryRequirement);
    } catch (e) {
      _logger.e('Error adding dietary requirement: $e');
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
            'Create Custom Dietary Requirement',
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
                final name = nameController.text.trim();
                final description = descriptionController.text.trim();

                if (name.isNotEmpty) {
                  await _createCustomDietaryRequirement(name, description);
                  if (!dialogContext.mounted) return;
                  Navigator.of(dialogContext).pop();
                } else {
                  // Optionally, show an error message if fields are empty
                  ScaffoldMessenger.of(context).showSnackBar(
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
        List<DietaryRequirementDto> localFiltered = [..._allDefaults];

        return StatefulBuilder(
          builder: (dialogContext, setState) {
            return AlertDialog(
              scrollable: true,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
              title: Text(
                'Add Dietary Requirement',
                style: TextStyle(
                  color: colorScheme.primary,
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
                        labelStyle: TextStyle(color: colorScheme.primary),
                        prefixIcon: Icon(
                          Icons.search,
                          color: colorScheme.primary,
                        ),
                      ),
                      onChanged: (value) {
                        setState(() {
                          localSearchTerm = value.toLowerCase();
                          localFiltered =
                              _allDefaults
                                  .where(
                                    (d) => d.name.toLowerCase().contains(
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
                                itemCount: localFiltered.length,
                                itemBuilder: (context, index) {
                                  final item = localFiltered[index];
                                  final isAlreadyAdded = widget
                                      .dietaryRequirements
                                      .any((d) => d.id == item.id);
                                  return ListTile(
                                    enabled: !isAlreadyAdded,
                                    title: Text(
                                      item.name,
                                      style: TextStyle(
                                        color:
                                            isAlreadyAdded
                                                ? Colors.grey
                                                : Colors.black,
                                      ),
                                    ),
                                    tileColor:
                                        index % 2 == 0
                                            ? Colors.grey.shade50
                                            : null,
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    onTap:
                                        isAlreadyAdded
                                            ? null
                                            : () async {
                                              await _addDietaryRequirement(
                                                item.id,
                                              );
                                              if (!dialogContext.mounted) {
                                                return;
                                              }
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
    final colorScheme = theme.colorScheme;

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
                Text('Dietary Requirements', style: theme.textTheme.titleSmall),
                IconButton(
                  icon: Icon(Icons.add, color: colorScheme.primary),
                  onPressed: _openAddDialog,
                ),
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
                    widget.dietaryRequirements.isEmpty
                        ? const Text('No dietaries added')
                        : Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children:
                              widget.dietaryRequirements.map((d) {
                                return InputChip(
                                  label: Text(d.name),
                                  onDeleted: () async {
                                    await _profileService
                                        .removeDietaryRequirement(d.id);
                                    widget.onRemove(d);
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
