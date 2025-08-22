import 'package:flutter/material.dart';
import 'package:nibbles/navigation/app_navigation.dart';
import 'package:nibbles/theme/app_theme.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/profile/recipe_dto.dart';

class CalorieLogPage extends StatefulWidget {
  const CalorieLogPage({super.key});

  @override
  State<CalorieLogPage> createState() => _CalorieLogPageState();
}

class _CalorieLogPageState extends State<CalorieLogPage> {
  final ProfileService _profileService = ProfileService();
  List<RecipeDto> loggedRecipes = [];
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
    _loadLoggedRecipes(_selectedDay);
  }

  Future<void> _loadLoggedRecipes(DateTime day) async {
    final recipes = await _profileService.getLoggedRecipes(day);
    setState(() {
      loggedRecipes = recipes;
    });
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
    final double fabSpace = 80.0;
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
          padding: EdgeInsets.fromLTRB(16, 16, 16, contentPaddingBottom),
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
                                _loadLoggedRecipes(selectedDay);
                              },
                              onPageChanged: (focusedDay) {
                                setState(() => _focusedDay = focusedDay);
                              },
                              calendarStyle: CalendarStyle(
                                selectedDecoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: AppTheme.colorScheme.primary,
                                ),
                                todayDecoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  border: Border.all(
                                    color: AppTheme.colorScheme.primary,
                                    width: 2,
                                  ),
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
                      onPressed: () async {
                        final DateTime? picked = await showDatePicker(
                          context: context,
                          initialDate: _selectedDay,
                          firstDate: DateTime.utc(2020, 1, 1),
                          lastDate: DateTime.utc(2030, 12, 31),
                          initialEntryMode:
                              DatePickerEntryMode
                                  .calendarOnly, // show calendar (month) view
                          helpText: 'Select date',
                          builder: (context, child) {
                            return Theme(
                              data: Theme.of(context).copyWith(
                                colorScheme: ColorScheme.light(
                                  primary: AppTheme.primaryColor,
                                  onPrimary: AppTheme.textOnPrimary,
                                  surface: AppTheme.surfaceColor,
                                  onSurface: AppTheme.textPrimary,
                                ),
                              ),
                              child: child!,
                            );
                          },
                        );

                        if (picked != null) {
                          setState(() {
                            _selectedDay = picked;
                            _focusedDay = picked;
                          });
                          await _loadCaloriesForDay(picked);
                          await _loadLoggedRecipes(picked);
                        }
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
                  child:
                      _dailyCalories == null
                          ? const Center(child: CircularProgressIndicator())
                          : (_dailyCalories != 0
                              ? _buildEntriesList()
                              : _buildEmptyState()),
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
          Navigator.of(context).pushReplacement(
            MaterialPageRoute(
              builder: (context) => const AppNavigation(initialPageIndex: 2),
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

  // ...existing code...
  Widget _buildEntriesList() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Total Calories',
          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                fontWeight: FontWeight.bold,
                color: AppTheme.textPrimary,
              ),
        ),
        const SizedBox(height: 6),
        Row(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            Text(
              _dailyCalories?.toString() ?? '-',
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: AppTheme.textPrimary,
                  ),
            ),
            const SizedBox(width: 8),
            Text(
              'kcal',
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: AppTheme.textSecondary,
              ),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Expanded(
          child: loggedRecipes.isEmpty
              ? _buildEmptyState()
              : ListView.separated(
                  itemCount: loggedRecipes.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 12),
                  itemBuilder: (context, index) {
                    final recipe = loggedRecipes[index];
                    return _buildEntryCardFromRecipe(recipe);
                  },
                ),
        ),
      ],
    );
  }

  Widget _buildEntryCardFromRecipe(RecipeDto recipe) {
    final title = recipe.title;
    final image = recipe.imageURL ?? 'assets/images/default_recipe.jpg';
    String subtitle = recipe.nutritionalInfo.first;

    return Stack(
      children: [
        ClipRRect(
          borderRadius: BorderRadius.circular(12),
          child: SizedBox(
            height: 95,
            child: Row(
              children: [
                AspectRatio(
                  aspectRatio: 3 / 2,
                  child: Image.asset(image, fit: BoxFit.cover),
                ),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                    decoration: BoxDecoration(
                      color: AppTheme.primaryColor.withOpacity(0.18),
                      borderRadius: const BorderRadius.only(
                        topRight: Radius.circular(12),
                        bottomRight: Radius.circular(12),
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          title,
                          style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                color: AppTheme.textOnPrimary,
                                fontWeight: FontWeight.bold,
                              ),
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis, 
                        ),
                        const Spacer(),
                        Text(
                          subtitle,
                          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                color: AppTheme.textSecondary,
                              ),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
        Positioned(
          right: 8,
          top: 8,
          child: GestureDetector(
            onTap: () async {
              if (recipe.logId == null) {
                return;
              }
              final int logId = recipe.logId!;
              try {
                // optimistically remove from UI
                setState(() {
                  loggedRecipes.removeWhere((r) => r.logId == logId);
                });
                // call backend
                await _profileService.removeCalorieLog(logId);
                // refresh totals
                await _loadCaloriesForDay(_selectedDay);
              } catch (e) {
                // revert UI if failure
                await _loadLoggedRecipes(_selectedDay);
              }
            },
            child: Container(
              padding: const EdgeInsets.all(6),
              decoration: BoxDecoration(
                color: AppTheme.surfaceColor,
                borderRadius: BorderRadius.circular(8),
                boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.08), blurRadius: 4, offset: const Offset(0, 2))],
              ),
              child: Icon(Icons.delete, color: AppTheme.errorColor),
            ),
          ),
        ),
      ],
    );
  }
}
