import 'package:flutter/material.dart';
import 'package:nibbles/service/profile/dietary_dto.dart';
import 'package:nibbles/service/profile/profile_service.dart';

class DietaryRequirementsWidget extends StatefulWidget {
  final List<DietaryRequirementDto> dietaryRestrictions;
  final void Function(DietaryRequirementDto) onAdd;
  final void Function(DietaryRequirementDto) onRemove;

  const DietaryRequirementsWidget({
    Key? key,
    required this.dietaryRestrictions,
    required this.onAdd,
    required this.onRemove,
  }) : super(key: key);

  @override
  _DietaryRequirementsWidgetState createState() =>
      _DietaryRequirementsWidgetState();
}

class _DietaryRequirementsWidgetState extends State<DietaryRequirementsWidget> {
  final ProfileService _profileService = ProfileService();
  List<DietaryRequirementDto> _allDefaults = [];
  List<DietaryRequirementDto> _filtered = [];
  String _searchTerm = '';

  @override
  void initState() {
    super.initState();
    _loadDefaults();
  }

  Future<void> _loadDefaults() async {
    try {
      final defaults = await _profileService.getDefaultDietaryRestrictions();
      setState(() {
        _allDefaults = defaults;
        _filtered = defaults;
      });
    } catch (e) {
      print('Error loading defaults: $e');
      setState(() {
        _allDefaults = [];
        _filtered = [];
      });
      // Optionally, show a snackbar or dialog to inform the user
    }
  }

  Future<void> _createCustomDietaryRestriction(
    String name,
    String description,
  ) async {
    try {
      final newDietary = await _profileService.createDietaryRestriction(
        name,
        description,
      );
      widget.onAdd(newDietary);
    } catch (e) {
      print('Error creating custom dietary restriction: $e');
      // Optionally, show a snackbar or dialog to inform the user
    }
  }

  Future<void> _addDietaryRequirement(int item) async {
    try {
      await _profileService.addDietaryRestriction(item);
      final dietaryRequirement = _allDefaults.firstWhere(
        (d) => d.id == item,
        orElse: () => throw Exception('Dietary requirement not found'),
      );
      widget.onAdd(dietaryRequirement);
    } catch (e) {
      print('Error adding dietary requirement: $e');
      // Optionally, show a snackbar or dialog to inform the user
    }
  }

  void _openCustomCreationDialog() {
    final TextEditingController nameController = TextEditingController();
    final TextEditingController descriptionController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Create Custom Dietary Restriction'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              TextField(
                controller: nameController,
                decoration: const InputDecoration(labelText: 'Name'),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: descriptionController,
                decoration: const InputDecoration(labelText: 'Description'),
              ),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () async {
                final name = nameController.text.trim();
                final description = descriptionController.text.trim();

                if (name.isNotEmpty && description.isNotEmpty) {
                  await _createCustomDietaryRestriction(name, description);
                  Navigator.of(context).pop();
                } else {
                  // Optionally, show an error message if fields are empty
                }
              },
              child: const Text('Create'),
            ),
          ],
        );
      },
    );
  }

  void _openAddDialog() {
    showDialog(
      context: context,
      builder: (context) {
        String localSearchTerm = '';
        List<DietaryRequirementDto> localFiltered = [..._allDefaults];

        return StatefulBuilder(
          builder: (context, setState) {
            return AlertDialog(
              scrollable: true,
              title: const Text('Add Dietary Restriction'),
              content: SizedBox(
                width: double.maxFinite,
                height: 300,
                child: Column(
                  children: [
                    TextField(
                      decoration: const InputDecoration(
                        labelText: 'Search',
                        prefixIcon: Icon(Icons.search),
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
                    const SizedBox(height: 12),
                    Expanded(
                      child:
                          localFiltered.isEmpty
                              ? const Center(child: Text('No matches'))
                              : ListView.builder(
                                itemCount: localFiltered.length,
                                itemBuilder: (context, index) {
                                  final item = localFiltered[index];
                                  return ListTile(
                                    title: Text(item.name),
                                    onTap: () async {
                                      await _addDietaryRequirement(item.id);
                                      Navigator.of(context).pop();
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
                  child: const Text('Create custom'),
                ),
                TextButton(
                  onPressed: () => Navigator.of(context).pop(),
                  child: const Text('Cancel'),
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
                const Text(
                  'Dietary Requirements',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                const Spacer(),
                IconButton(
                  icon: const Icon(Icons.add_circle_outline),
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
                    widget.dietaryRestrictions.isEmpty
                        ? const Text(
                          'No current dietary requirements',
                          style: TextStyle(color: Colors.grey),
                        )
                        : Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children:
                              widget.dietaryRestrictions.map((d) {
                                return InputChip(
                                  label: Text(d.name),
                                  onDeleted: () async {
                                    await _profileService
                                        .removeDietaryRestriction(d.id);
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
