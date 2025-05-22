import 'package:flutter/material.dart';
import 'package:nibbles/service/profile/appliance_dto.dart';
import 'package:nibbles/service/profile/profile_service.dart';

class CookingAppliancesWidget extends StatefulWidget {
  final List<ApplianceRequirementDto> appliances;
  final void Function(ApplianceRequirementDto) onApplianceRemoved;
  final void Function(ApplianceRequirementDto) onApplianceAdded;
  final Function() onRefresh;

  const CookingAppliancesWidget({
    super.key,
    required this.appliances,
    required this.onApplianceRemoved,
    required this.onApplianceAdded,
    required this.onRefresh,
  });

  @override
  CookingAppliancesWidgetState createState() => CookingAppliancesWidgetState();
}

class CookingAppliancesWidgetState extends State<CookingAppliancesWidget> {
  final TextEditingController _controller = TextEditingController();
  final ProfileService _profileService = ProfileService();
  List<ApplianceRequirementDto> _availableAppliances = [];

  @override
  void initState() {
    super.initState();
    _fetchAvailableAppliances();
  }

  Future<void> _fetchAvailableAppliances() async {
    try {
      _availableAppliances = await _profileService.getDefaultAppliances();
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Error loading appliances: $e')));
    }
  }

  void _showAddApplianceDialog() {
    showDialog(
      context: context,
      builder: (dialogContext) {
        return AlertDialog(
          title: const Text('Add Appliance'),
          content: TextField(
            controller: _controller,
            decoration: const InputDecoration(hintText: 'Enter appliance name'),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(dialogContext);
              },
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () async {
                final newApplianceName = _controller.text.trim();
                if (newApplianceName.isNotEmpty) {
                  try {
                    // First check if this appliance already exists
                    final existingAppliance =
                        _availableAppliances
                            .where(
                              (app) =>
                                  app.name.toLowerCase() ==
                                  newApplianceName.toLowerCase(),
                            )
                            .toList();

                    if (existingAppliance.isNotEmpty) {
                      widget.onApplianceAdded(existingAppliance.first);
                    } else {
                      // Create new appliance
                      final newAppliance = await _profileService
                          .createAppliance(newApplianceName, null);
                      if (!mounted) return;
                      widget.onApplianceAdded(newAppliance);
                      // Refresh appliances
                      _fetchAvailableAppliances();
                    }
                    _controller.clear();
                    if (dialogContext.mounted) {
                      Navigator.pop(dialogContext);
                    }
                  } catch (e) {
                    if (!mounted) return;
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(content: Text('Error adding appliance: $e')),
                    );
                    if (dialogContext.mounted) {
                      Navigator.pop(dialogContext);
                    }
                  }
                }
              },
              child: const Text('Add'),
            ),
          ],
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
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'Cooking Appliances',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                IconButton(
                  icon: const Icon(Icons.add),
                  onPressed: _showAddApplianceDialog,
                ),
              ],
            ),
            const SizedBox(height: 8),
            InputDecorator(
              decoration: InputDecoration(
                hintText: '--Select Appliances--',
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(8),
                ),
                contentPadding: const EdgeInsets.symmetric(
                  horizontal: 12,
                  vertical: 8,
                ),
              ),
              child:
                  widget.appliances.isEmpty
                      ? const Text('No appliances added')
                      : Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children:
                            widget.appliances
                                .map(
                                  (app) => Chip(
                                    label: Text(app.name),
                                    onDeleted:
                                        () => widget.onApplianceRemoved(app),
                                  ),
                                )
                                .toList(),
                      ),
            ),
          ],
        ),
      ),
    );
  }
}
