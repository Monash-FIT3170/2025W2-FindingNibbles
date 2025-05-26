import 'package:flutter/material.dart';
import 'package:nibbles/service/profile/appliance_dto.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/core/logger.dart';

class CookingAppliancesWidget extends StatefulWidget {
  final List<ApplianceRequirementDto> appliances;
  final void Function(ApplianceRequirementDto) onAdd;
  final void Function(ApplianceRequirementDto) onRemove;

  const CookingAppliancesWidget({
    super.key,
    required this.appliances,
    required this.onAdd,
    required this.onRemove,
  });

  @override
  CookingAppliancesWidgetState createState() => CookingAppliancesWidgetState();
}

class CookingAppliancesWidgetState extends State<CookingAppliancesWidget> {
  final ProfileService _profileService = ProfileService();
  List<ApplianceRequirementDto> _allDefaults = [];
  final _logger = getLogger();

  @override
  void initState() {
    super.initState();
    _loadDefaults();
  }

  Future<void> _loadDefaults() async {
    try {
      final defaults = await _profileService.getDefaultAppliances();
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

  Future<void> _addAppliance(int item) async {
    try {
      await _profileService.addAppliance(item);
      final appliance = _allDefaults.firstWhere(
        (d) => d.id == item,
        orElse: () => throw Exception('Dietary requirement not found'),
      );
      widget.onAdd(appliance);
    } catch (e) {
      _logger.e('Error adding dietary requirement: $e');
    }
  }

  void _openAddDialog() {
    final theme = Theme.of(context);
    final colorScheme = theme.colorScheme;

    showDialog(
      context: context,
      builder: (dialogContext) {
        String localSearchTerm = '';
        List<ApplianceRequirementDto> localFiltered = [..._allDefaults];

        return StatefulBuilder(
          builder: (dialogContext, setState) {
            return AlertDialog(
              scrollable: true,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(20),
              ),
              title: Text(
                'Add Appliance',
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
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide.none,
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide(
                            color: colorScheme.primary,
                            width: 2,
                          ),
                        ),
                        filled: true,
                        fillColor: Colors.grey.shade100,
                        contentPadding: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 14,
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
                                  style: TextStyle(color: Colors.grey[600]),
                                ),
                              )
                              : ListView.builder(
                                itemCount: localFiltered.length,
                                itemBuilder: (context, index) {
                                  final item = localFiltered[index];
                                  return ListTile(
                                    title: Text(item.name),
                                    tileColor:
                                        index % 2 == 0
                                            ? Colors.grey.shade50
                                            : null,
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(8),
                                    ),
                                    onTap: () async {
                                      await _addAppliance(item.id);
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
                OutlinedButton(
                  onPressed: () => Navigator.of(context).pop(),
                  style: OutlinedButton.styleFrom(
                    foregroundColor: Colors.grey[700],
                    side: BorderSide(color: Colors.grey.shade300),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
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
                Text(
                  'Appliances',
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: colorScheme.primary,
                    fontSize: 16,
                  ),
                ),
                const Spacer(),
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
                    widget.appliances.isEmpty
                        ? const Text(
                          'No current appliances',
                          style: TextStyle(color: Colors.grey),
                        )
                        : Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children:
                              widget.appliances.map((d) {
                                return InputChip(
                                  label: Text(d.name),
                                  onDeleted: () async {
                                    await _profileService.removeAppliance(d.id);
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
