import 'package:flutter/material.dart';
import 'package:nibbles/service/appliance/appliance_service.dart';

class AppliancesSelection extends StatefulWidget {
  final List<Appliance> availableAppliances;
  final List<Appliance> selectedAppliances;
  final Function(Appliance) onToggleAppliance;
  final Function(Appliance) isApplianceSelected;
  final Function() areAllAppliancesSelected;
  final Function(bool) onToggleAll;

  const AppliancesSelection({
    super.key,
    required this.availableAppliances,
    required this.selectedAppliances,
    required this.onToggleAppliance,
    required this.isApplianceSelected,
    required this.areAllAppliancesSelected,
    required this.onToggleAll,
  });

  @override
  State<AppliancesSelection> createState() => _AppliancesSelectionState();
}

class _AppliancesSelectionState extends State<AppliancesSelection> {
  bool _isExpanded = true;

  void _toggleExpanded() {
    setState(() {
      _isExpanded = !_isExpanded;
    });
  }

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        InkWell(
          onTap: _toggleExpanded,
          borderRadius: BorderRadius.circular(8),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Appliances', style: textTheme.titleMedium),
              Icon(
                _isExpanded
                    ? Icons.keyboard_arrow_up
                    : Icons.keyboard_arrow_down,
              ),
            ],
          ),
        ),
        if (_isExpanded)
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Wrap(
                spacing: 8,
                children: [
                  ChoiceChip(
                    label: const Text('All'),
                    selected: widget.areAllAppliancesSelected(),
                    onSelected: widget.onToggleAll,
                  ),
                  ...widget.availableAppliances.map(
                    (appliance) => ChoiceChip(
                      label: Text(appliance.name),
                      selected: widget.isApplianceSelected(appliance),
                      onSelected:
                          (selected) => widget.onToggleAppliance(appliance),
                    ),
                  ),
                ],
              ),
            ],
          ),
      ],
    );
  }
}
