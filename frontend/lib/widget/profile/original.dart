import 'package:flutter/material.dart';

class CookingAppliancesWidget extends StatefulWidget {
  final List<String> appliances;
  final VoidCallback onOpenSelector;
  final void Function(String) onApplianceRemoved;
  final void Function(String) onApplianceAdded;

  const CookingAppliancesWidget({
    Key? key,
    required this.appliances,
    required this.onOpenSelector,
    required this.onApplianceRemoved,
    required this.onApplianceAdded,
  }) : super(key: key);

  @override
  _CookingAppliancesWidgetState createState() =>
      _CookingAppliancesWidgetState();
}

class _CookingAppliancesWidgetState extends State<CookingAppliancesWidget> {
  final TextEditingController _controller = TextEditingController();

  void _showAddApplianceDialog() {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Add Appliance'),
          content: TextField(
            controller: _controller,
            decoration: const InputDecoration(hintText: 'Enter appliance name'),
          ),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                final newAppliance = _controller.text.trim();
                if (newAppliance.isNotEmpty) {
                  widget.onApplianceAdded(newAppliance);
                  _controller.clear();
                  Navigator.pop(context);
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
            GestureDetector(
              onTap: widget.onOpenSelector,
              child: InputDecorator(
                decoration: InputDecoration(
                  hintText: '--Select Tags--',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                  ),
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 8,
                  ),
                ),
                child: widget.appliances.isEmpty
                    ? const Text('No appliances added')
                    : Wrap(
                        spacing: 8,
                        runSpacing: 8,
                        children: widget.appliances
                            .map(
                              (app) => Chip(
                                label: Text(app),
                                onDeleted: () => widget.onApplianceRemoved(app),
                              ),
                            )
                            .toList(),
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}