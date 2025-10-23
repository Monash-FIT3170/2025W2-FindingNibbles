import 'package:flutter/material.dart';
import 'package:nibbles/theme/app_theme.dart';
import 'package:nibbles/service/travel/travel_plan_service.dart';
import 'package:nibbles/pages/travel/trip_details_page.dart';

class TravelPlanPage extends StatefulWidget {
  const TravelPlanPage({super.key});

  @override
  State<TravelPlanPage> createState() => _TravelPlanPageState();
}

class _TravelPlanPageState extends State<TravelPlanPage> {
  final service = TravelPlanService();

  void _showCreateTripSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      showDragHandle: true,
      isScrollControlled: true,
      builder:
          (ctx) => Padding(
            padding: EdgeInsets.only(
              left: 16,
              right: 16,
              top: 12,
              bottom: MediaQuery.of(context).viewInsets.bottom + 24,
            ),
            child: _CreateTripForm(
              onSave: (tripName, start, end) {
                setState(() {
                  service.addTrip({
                    'name': tripName,
                    'start': start,
                    'end': end,
                    'restaurants': <Map<String, dynamic>>[],
                  });
                });
                Navigator.pop(context);
                ScaffoldMessenger.of(
                  context,
                ).showSnackBar(const SnackBar(content: Text('Trip created')));
              },
            ),
          ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final trips = service.trips;
    final colorScheme = AppTheme.colorScheme;

    return Scaffold(
      appBar: AppBar(title: const Text('Travel plan')),
      body:
          trips.isEmpty
              ? const Center(
                child: Text(
                  'No trips yet.\nTap + to create your first travel plan.',
                  textAlign: TextAlign.center,
                ),
              )
              : ListView.separated(
                padding: const EdgeInsets.all(16),
                itemCount: trips.length,
                separatorBuilder: (_, __) => const SizedBox(height: 8),
                itemBuilder: (context, idx) {
                  final trip = trips[idx];
                  return ListTile(
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    tileColor: colorScheme.surfaceContainerHighest,
                    leading: const Icon(Icons.flight_takeoff),
                    title: Text(trip['name']),
                    subtitle: Text(
                      '${trip['start']?.toString().split(' ').first ?? '-'} → ${trip['end']?.toString().split(' ').first ?? '-'}',
                    ),
                    trailing: const Icon(Icons.chevron_right),
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder:
                              (_) => TripDetailsPage(
                                tripName: trip['name'],
                                restaurants: trip['restaurants'] ?? [],
                              ),
                        ),
                      );
                    },
                  );
                },
              ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: colorScheme.primary,
        onPressed: () => _showCreateTripSheet(context),
        label: const Text('New Trip'),
        icon: const Icon(Icons.add),
      ),
    );
  }
}

class _CreateTripForm extends StatefulWidget {
  final void Function(String name, DateTime? start, DateTime? end) onSave;

  const _CreateTripForm({required this.onSave});

  @override
  State<_CreateTripForm> createState() => _CreateTripFormState();
}

class _CreateTripFormState extends State<_CreateTripForm> {
  final _formKey = GlobalKey<FormState>();
  final _nameCtrl = TextEditingController();
  DateTime? _start;
  DateTime? _end;

  @override
  void dispose() {
    _nameCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    const spacer = SizedBox(height: 12);

    return Form(
      key: _formKey,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Text(
            'Create new trip',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
          ),
          spacer,
          TextFormField(
            controller: _nameCtrl,
            decoration: const InputDecoration(
              labelText: 'Trip name',
              hintText: 'e.g. Japan spring 2025',
            ),
            validator:
                (v) =>
                    v == null || v.trim().isEmpty
                        ? 'Please enter a trip name'
                        : null,
          ),
          spacer,
          Row(
            children: [
              Expanded(
                child: OutlinedButton.icon(
                  style: OutlinedButton.styleFrom(
                    backgroundColor:
                        Colors.grey[200], // button background color
                    foregroundColor: Colors.black, // text and border colour
                  ),
                  icon: const Icon(Icons.calendar_today),
                  label: Text(
                    _start == null
                        ? 'Start date'
                        : _start!.toString().split(' ').first,
                  ),
                  onPressed: () async {
                    final now = DateTime.now();
                    final picked = await showDatePicker(
                      context: context,
                      firstDate: DateTime(now.year - 1),
                      lastDate: DateTime(now.year + 5),
                      initialDate: _start ?? now,
                    );
                    if (picked != null) setState(() => _start = picked);
                  },
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: OutlinedButton.icon(
                  style: OutlinedButton.styleFrom(
                    backgroundColor:
                        Colors.grey[200], // button background color
                    foregroundColor: Colors.black, // text and border colour
                  ),
                  icon: const Icon(Icons.calendar_today),
                  label: Text(
                    _end == null
                        ? 'End date'
                        : _end!.toString().split(' ').first,
                  ),
                  onPressed: () async {
                    final base = _start ?? DateTime.now();
                    final picked = await showDatePicker(
                      context: context,
                      firstDate: base,
                      lastDate: DateTime(base.year + 5),
                      initialDate: _end ?? base,
                    );
                    if (picked != null) setState(() => _end = picked);
                  },
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    backgroundColor:
                        Colors.grey[200], // button background color
                    foregroundColor: Colors.black, // text and border colour
                    minimumSize: const Size.fromHeight(40),
                  ),
                  onPressed: () => Navigator.pop(context),
                  child: const Text('Cancel'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    minimumSize: const Size.fromHeight(40),
                  ),
                  onPressed: () {
                    if (!_formKey.currentState!.validate()) return;
                    widget.onSave(_nameCtrl.text.trim(), _start, _end);
                  },
                  child: const Text('Save'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
