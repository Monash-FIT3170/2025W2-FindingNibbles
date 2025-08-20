import 'package:flutter/material.dart';
import 'package:nibbles/theme/app_theme.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/pages/recipes/recipes_page.dart'; // <-- add this (adjust path/name if needed)

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
  int? _dailyCalories;

  @override
  void initState() {
    super.initState();
    _loadCaloriesForDay(_selectedDay);
  }

  Future<void> _loadCaloriesForDay(DateTime day) async {
    final calories = await _profileService.getDailyCalories(day);
    setState(() {
      _dailyCalories = calories;
    });
  }

  @override
  Widget build(BuildContext context) {
    final double bottomSafe = MediaQuery.of(context).padding.bottom;
    final double fabSpace = 80.0; // FAB height + desired gap (adjust if needed)
    final double contentPaddingBottom = bottomSafe + fabSpace;
    return Scaffold(
      extendBody: true,
      backgroundColor: AppTheme.colorScheme.primary,
      appBar: AppBar(
        title: const Text('Calorie Log'),
        backgroundColor: AppTheme.colorScheme.primary,
        elevation: 0,
      ),
      body: SafeArea(
        child: Container(
          color: AppTheme.colorScheme.primary,
          padding: EdgeInsets.fromLTRB(16,16,16,contentPaddingBottom),
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
                                _loadCaloriesForDay(selectedDay);
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
              SizedBox(
                height: MediaQuery.of(context).size.height * 0.55,
                child: Container(
                  width: double.infinity,
                  decoration: BoxDecoration(
                    color: AppTheme.colorScheme.secondary,
                    borderRadius: BorderRadius.circular(16),
                  ),
                  padding: const EdgeInsets.all(16),
                  child: _dailyCalories == null
                      ? const Center(child: CircularProgressIndicator())
                      : (_dailyCalories != 0 ? _buildEntriesList() : _buildEmptyState()),
                ),
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: AppTheme.colorScheme.secondary,
        child: Icon(Icons.add, color: AppTheme.colorScheme.primary, size: 36),
        onPressed: () {
          Navigator.of(context).push(
            MaterialPageRoute(
              builder: (context) => const RecipesPage(),
            ),
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
            Text(
              _dailyCalories?.toString() ?? '0',
              style: const TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
            ),
            const SizedBox(width: 8),
            const Text(
              'kcal',
              style: TextStyle(fontSize: 14, color: Colors.black54),
            ),
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
                            color: AppTheme.textOnPrimary,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const Spacer(),
                        Text(
                          entry['subtitle']!,
                          style: const TextStyle(color: AppTheme.textSecondary),
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
                color: AppTheme.colorScheme.surface,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(Icons.delete, color: AppTheme.colorScheme.error),
            ),
          ),
        ),
      ],
    );
  }
}
