import 'package:flutter/material.dart';
import 'package:nibbles/theme/app_theme.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:nibbles/service/profile/profile_service.dart';

class CalorieLogPage extends StatefulWidget {
  const CalorieLogPage({super.key});

  @override
  State<CalorieLogPage> createState() => _CalorieLogPageState();
}

// ...existing code...
class _CalorieLogPageState extends State<CalorieLogPage> {
  final ProfileService _profileService = ProfileService();
  // Sample data for the skeleton UI
  final List<Map<String, String>> _entries = [
    {
      'title': 'Congee',
      'subtitle': '250-332 kcal',
      'image': 'assets/images/default_recipe.jpg',
    },
    {
      'title': 'Taco',
      'subtitle': '354-412 kcal',
      'image': 'assets/images/default_recipe.jpg',
    },
    {
      'title': 'Char Siew Pork',
      'subtitle': '512-642 kcal',
      'image': 'assets/images/default_recipe.jpg',
    },
    {
      'title': 'Lasagne',
      'subtitle': '456-512 kcal',
      'image': 'assets/images/default_recipe.jpg',
    },
  ];

  // replaced the integer index with real DateTime state for TableCalendar
  DateTime _focusedDay = DateTime.now();
  DateTime _selectedDay = DateTime.now();

  static const List<String> _monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  bool get _isTodaySelected => isSameDay(_selectedDay, DateTime.now());

  Future<int> _fetchDailyCalories() async {
    return await _profileService.getDailyCalories(_selectedDay);
  }

  @override
  Widget build(BuildContext context) {
    // TEMP: show entries only when selected day is today - will change to fetch by date
    final bool hasEntries =
        _entries.isNotEmpty && isSameDay(_selectedDay, DateTime.now());
    return Scaffold(
      appBar: AppBar(
        title: const Text('Calorie Log'),
        backgroundColor: AppTheme.colorScheme.primary,
        elevation: 0,
      ),
      body: SafeArea(
        child: Container(
          color: AppTheme.colorScheme.primary,
          padding: const EdgeInsets.all(16),
          child: Column(
            children: [
              Container(
                decoration: BoxDecoration(
                  color: AppTheme.colorScheme.secondary,
                  borderRadius: BorderRadius.circular(16),
                ),
                padding: const EdgeInsets.symmetric(
                  vertical: 12,
                  horizontal: 14,
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '${_monthNames[_focusedDay.month - 1]} ${_focusedDay.year}',
                            style: Theme.of(
                              context,
                            ).textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.bold,
                              color: AppTheme.textPrimary,
                            ),
                          ),
                          const SizedBox(height: 8),

                          // Week strip
                          SizedBox(
                            height: 70,
                            child: TableCalendar(
                              firstDay: DateTime.utc(2020, 1, 1),
                              lastDay: DateTime.utc(2030, 12, 31),
                              focusedDay: _focusedDay,
                              calendarFormat: CalendarFormat.week,
                              headerVisible: false,
                              daysOfWeekVisible: false,
                              availableGestures:
                                  AvailableGestures.horizontalSwipe,
                              selectedDayPredicate:
                                  (day) => isSameDay(day, _selectedDay),
                              onDaySelected: (selectedDay, focusedDay) {
                                setState(() {
                                  _selectedDay = selectedDay;
                                  _focusedDay = focusedDay;
                                });
                              },
                              onPageChanged: (focusedDay) {
                                setState(() => _focusedDay = focusedDay);
                              },
                              calendarStyle: CalendarStyle(
                                selectedDecoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: AppTheme.colorScheme.primary,
                                ),
                                todayDecoration:
                                    _isTodaySelected
                                        ? BoxDecoration(
                                          shape: BoxShape.circle,
                                          color: AppTheme.colorScheme.primary,
                                        )
                                        : const BoxDecoration(
                                          color: Colors.transparent,
                                        ),
                                todayTextStyle: TextStyle(
                                  color:
                                      _isTodaySelected
                                          ? AppTheme.colorScheme.onPrimary
                                          : AppTheme.textPrimary,
                                ),
                                defaultTextStyle: TextStyle(
                                  color: AppTheme.textPrimary,
                                ),
                                weekendTextStyle: TextStyle(
                                  color: AppTheme.textSecondary,
                                ),
                                outsideDaysVisible: false,
                              ),
                              daysOfWeekStyle: DaysOfWeekStyle(
                                weekdayStyle: TextStyle(
                                  color: AppTheme.textSecondary,
                                ),
                                weekendStyle: TextStyle(
                                  color: AppTheme.textSecondary,
                                ),
                              ),
                              rowHeight: 48,
                            ),
                          ),
                        ],
                      ),
                    ),
                    IconButton(
                      onPressed: () {
                        // placeholder for calendar picker
                      },
                      icon: Icon(
                        Icons.calendar_today,
                        color: AppTheme.textPrimary,
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              // Main Body
              Expanded(
                child: Container(
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: AppTheme.colorScheme.secondary,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  padding: const EdgeInsets.all(16),
                  child: hasEntries ? _buildEntriesList() : _buildEmptyState(),
                ),
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: AppTheme.colorScheme.secondary, // light pink
        child: Icon(Icons.add, color: AppTheme.colorScheme.primary, size: 36),
        onPressed: () {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Add calorie (placeholder)')),
          );
        },
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }

  // if no calorie log saved to the date
  Widget _buildEmptyState() {
    return Center(
      child: Text(
        'There are no calories\nlogged for this day.',
        textAlign: TextAlign.center,
        style: Theme.of(context).textTheme.titleMedium?.copyWith(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: AppTheme.colorScheme.primary,
        ),
      ),
    );
  }

  Widget _buildEntriesList() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Text(
          'Total Calories',
          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 6),
        Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            FutureBuilder<int>(
              future: _fetchDailyCalories(),
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const CircularProgressIndicator();
                } else if (snapshot.hasError) {
                  return Text('Error: ${snapshot.error}');
                } else {
                  return Text(
                    snapshot.data.toString(),
                    style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
                  );
                }
              },
            ),
            SizedBox(width: 8),
            Text('kcal', style: TextStyle(fontSize: 14, color: Colors.black54)),
          ],
        ),
        const SizedBox(height: 12),
        Expanded(
          child: ListView.separated(
            itemCount: _entries.length,
            separatorBuilder: (_, __) => const SizedBox(height: 12),
            itemBuilder: (context, index) {
              final item = _entries[index];
              return _buildEntryCard(item);
            },
          ),
        ),
      ],
    );
  }

  Widget _buildEntryCard(Map<String, String> entry) {
    return Stack(
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(12),
          child: SizedBox(
            height: 88,
            child: Row(
              children: [
                AspectRatio(
                  aspectRatio: 3 / 2,
                  child: Image.asset(entry['image']!, fit: BoxFit.cover),
                ),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                      vertical: 8,
                    ),
                    decoration: BoxDecoration(
                      color: Colors.black.withOpacity(0.35),
                      borderRadius: const BorderRadius.only(
                        topRight: Radius.circular(12),
                        bottomRight: Radius.circular(12),
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          entry['title']!,
                          style: const TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const Spacer(),
                        Text(
                          entry['subtitle']!,
                          style: const TextStyle(color: Colors.white70),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
        // delete icon
        Positioned(
          right: 8,
          top: 8,
          child: GestureDetector(
            onTap: () {
              // placeholder for delete
              setState(() {
                _entries.removeWhere((e) => e['title'] == entry['title']);
              });
            },
            child: Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.9),
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.delete, color: Colors.red),
            ),
          ),
        ),
      ],
    );
  }
}
