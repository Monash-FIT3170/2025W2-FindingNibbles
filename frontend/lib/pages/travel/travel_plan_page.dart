import 'package:flutter/material.dart';
import 'package:nibbles/theme/app_theme.dart';

class TravelPlanPage extends StatefulWidget {
  const TravelPlanPage({super.key});

  @override
  State<TravelPlanPage> createState() => _TravelPlanPageState();
}

class _TravelPlanPageState extends State<TravelPlanPage>
    with SingleTickerProviderStateMixin {
  late final TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 4, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  // TODO: replace with real models and services
  // class Trip { final String id; final String name; ... }

  @override
  Widget build(BuildContext context) {
    final colorScheme = AppTheme.colorScheme;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Travel plan'),
        bottom: TabBar(
          controller: _tabController,
          isScrollable: true,
          tabs: const [
            Tab(icon: Icon(Icons.flight), text: 'Trips'),
            Tab(icon: Icon(Icons.restaurant), text: 'Food list'),
            Tab(icon: Icon(Icons.map), text: 'Itinerary'),
            Tab(icon: Icon(Icons.settings), text: 'Preferences'),
          ],
        ),
        actions: [
          IconButton(
            tooltip: 'New trip',
            icon: const Icon(Icons.add),
            onPressed: () {
              _showCreateTripSheet(context);
            },
          ),
        ],
      ),
      body: TabBarView(
        controller: _tabController,
        children: const [
          _TripsTab(),
          _FoodListTab(),
          _ItineraryTab(),
          _PreferencesTab(),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: colorScheme.primary,
        onPressed: () {
          // TODO: hook to add item depending on active tab
          final index = _tabController.index;
          switch (index) {
            case 0:
              _showCreateTripSheet(context);
              break;
            case 1:
              _showAddFoodPlaceDialog(context);
              break;
            case 2:
              _showAddItineraryItemDialog(context);
              break;
            case 3:
              _showEditPrefsDialog(context);
              break;
          }
        },
        label: const Text('Add'),
        icon: const Icon(Icons.add),
      ),
    );
  }

  // Bottom sheets and dialogs are placeholders for now.

  static void _showCreateTripSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      showDragHandle: true,
      isScrollControlled: true,
      builder: (ctx) => const Padding(
        padding: EdgeInsets.fromLTRB(16, 12, 16, 24),
        child: _CreateTripForm(),
      ),
    );
  }

  static void _showAddFoodPlaceDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Add restaurant or cafe'),
        content: const Text('Later connect to Nibbles restaurants search.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Close')),
        ],
      ),
    );
  }

  static void _showAddItineraryItemDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Add itinerary item'),
        content: const Text('Later support dates, times and linked food spots.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Close')),
        ],
      ),
    );
  }

  static void _showEditPrefsDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Travel preferences'),
        content: const Text('Later sync with Profile dietary and appliances.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Close')),
        ],
      ),
    );
  }
}

class _TripsTab extends StatelessWidget {
  const _TripsTab();

  @override
  Widget build(BuildContext context) {
    // TODO: replace with real list from service
    final demoTrips = const [
      ('jpn-2025', 'Japan spring 2025'),
      ('sgp-2025', 'Singapore food crawl'),
    ];

    return ListView.separated(
      padding: const EdgeInsets.all(16),
      itemCount: demoTrips.length,
      separatorBuilder: (_, __) => const SizedBox(height: 8),
      itemBuilder: (context, idx) {
        final t = demoTrips[idx];
        return ListTile(
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          tileColor: Theme.of(context).colorScheme.surfaceContainerHighest,
          leading: const Icon(Icons.flight),
          title: Text(t.$2),
          subtitle: const Text('Tap to open trip details'),
          trailing: const Icon(Icons.chevron_right),
          onTap: () {
            // TODO: push Trip details page
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Open trip: ${t.$2}')),
            );
          },
        );
      },
    );
  }
}

class _FoodListTab extends StatelessWidget {
  const _FoodListTab();

  @override
  Widget build(BuildContext context) {
    // TODO: connect to saved restaurants for selected trip
    return const Center(
      child: Text('Save restaurants you want to try on this trip.'),
    );
  }
}

class _ItineraryTab extends StatelessWidget {
  const _ItineraryTab();

  @override
  Widget build(BuildContext context) {
    // TODO: calendar or day-by-day agenda view
    return const Center(
      child: Text('Plan daily schedule and link places to eat.'),
    );
  }
}

class _PreferencesTab extends StatelessWidget {
  const _PreferencesTab();

  @override
  Widget build(BuildContext context) {
    // TODO: pull defaults from Profile (dietary, appliances) and allow per-trip overrides
    return const Center(
      child: Text('Trip-specific preferences and constraints.'),
    );
  }
}

class _CreateTripForm extends StatefulWidget {
  const _CreateTripForm();

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
    final spacer = const SizedBox(height: 12);

    return Form(
      key: _formKey,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Text('Create trip', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
          spacer,
          TextFormField(
            controller: _nameCtrl,
            decoration: const InputDecoration(
              labelText: 'Trip name',
              hintText: 'e.g. Japan spring 2025',
            ),
            validator: (v) => v == null || v.trim().isEmpty ? 'Please enter a trip name' : null,
          ),
          spacer,
          Row(
            children: [
              Expanded(
                child: OutlinedButton.icon(
                  icon: const Icon(Icons.calendar_today),
                  label: Text(_start == null ? 'Start date' : _start!.toString().split(' ').first),
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
                  icon: const Icon(Icons.calendar_today),
                  label: Text(_end == null ? 'End date' : _end!.toString().split(' ').first),
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
                  onPressed: () => Navigator.pop(context),
                  child: const Text('Cancel'),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: ElevatedButton(
                  onPressed: () {
                    if (!_formKey.currentState!.validate()) return;
                    // TODO: save trip through a TravelPlanService then pop
                    Navigator.pop(context);
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Trip created')),
                    );
                  },
                  child: const Text('Save'),
                ),
              ),
            ],
          ),
          MediaQuery.of(context).viewInsets.bottom == 0
              ? const SizedBox(height: 0)
              : const SizedBox(height: 12),
        ],
      ),
    );
  }
}
