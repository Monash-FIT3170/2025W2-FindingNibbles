import 'package:flutter/material.dart';
import 'package:nibbles/navigation/app_navigation.dart';
import 'package:nibbles/service/profile/calorie_log_dto.dart';
import 'package:nibbles/theme/app_theme.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/pages/profile/widgets/calorie_calendar_header_widget.dart';
import 'package:nibbles/pages/profile/widgets/calorie_content_body.dart';

class CalorieLogPage extends StatefulWidget {
  const CalorieLogPage({super.key});

  @override
  State<CalorieLogPage> createState() => _CalorieLogPageState();
}

class _CalorieLogPageState extends State<CalorieLogPage> {
  final ProfileService _profileService = ProfileService();
  List<CalorieLogDto> loggedRecipes = [];
  DateTime _focusedDay = DateTime.now();
  DateTime _selectedDay = DateTime.now();
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

  Future<void> _handleDeleteEntry(int logId) async {
    try {
      setState(() {
        loggedRecipes.removeWhere((r) => r.id == logId);
      });
      await _profileService.removeCalorieLog(logId);
      await _loadCaloriesForDay(_selectedDay);
    } catch (e) {
      await _loadLoggedRecipes(_selectedDay);
    }
  }

  Future<void> _handleDatePicker() async {
    final DateTime? picked = await showDatePicker(
      context: context,
      initialDate: _selectedDay,
      firstDate: DateTime.utc(2020, 1, 1),
      lastDate: DateTime.utc(2030, 12, 31),
      initialEntryMode: DatePickerEntryMode.calendarOnly,
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
  }

  @override
  Widget build(BuildContext context) {
    final double bottomSafe = MediaQuery.of(context).padding.bottom;
    final double fabSpace = 80.0;
    final double contentPaddingBottom = bottomSafe + fabSpace;

    return Scaffold(
      extendBody: true,
      resizeToAvoidBottomInset: false,
      backgroundColor: AppTheme.colorScheme.primary,
      appBar: AppBar(
        title: const Text('Calorie Log'),
        backgroundColor: AppTheme.colorScheme.primary,
        elevation: 0,
        actions: [
          TextButton(
            onPressed: () {
              Navigator.of(context).pop();
              Navigator.of(context).pushReplacement(
                MaterialPageRoute(
                  builder:
                      (context) => const AppNavigation(initialPageIndex: 2),
                ),
              );
            },
            child: Text(
              'Log from Recipe',
              style: TextStyle(color: AppTheme.colorScheme.onPrimary),
            ),
          ),
        ],
      ),
      body: SafeArea(
        child: Container(
          color: AppTheme.colorScheme.primary,
          padding: EdgeInsets.fromLTRB(16, 16, 16, contentPaddingBottom),
          child: Column(
            children: [
              CalorieCalendarHeader(
                focusedDay: _focusedDay,
                selectedDay: _selectedDay,
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
                onCalendarTap: _handleDatePicker,
              ),
              const SizedBox(height: 16),
              SizedBox(
                height: MediaQuery.of(context).size.height * 0.55,
                child: CalorieContentBody(
                  dailyCalories: _dailyCalories,
                  loggedRecipes: loggedRecipes,
                  onDeleteEntry: _handleDeleteEntry,
                ),
              ),
            ],
          ),
        ),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: AppTheme.colorScheme.onPrimary,
        onPressed: _showAddCalorieDialog,
        child: Icon(Icons.add, color: AppTheme.colorScheme.primary, size: 36),
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
    );
  }

  Future<void> _showAddCalorieDialog() async {
    final mealNameController = TextEditingController();
    final caloriesController = TextEditingController();
    final formKey = GlobalKey<FormState>();

    return showDialog(
      context: context,
      builder:
          (ctx) => AlertDialog(
            contentPadding: const EdgeInsets.all(24),
            title: const Center(
              child: Text(
                'Log Details',
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: AppTheme.primaryColor,
                ),
              ),
            ),
            content: Form(
              key: formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  TextFormField(
                    controller: mealNameController,
                    decoration: const InputDecoration(labelText: 'Meal Name'),
                    maxLength: 25,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter a meal name';
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: 12),
                  TextFormField(
                    controller: caloriesController,
                    decoration: const InputDecoration(labelText: 'Calories'),
                    keyboardType: TextInputType.number,
                    maxLength: 6,
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return 'Please enter calories';
                      }
                      if (int.tryParse(value) == null) {
                        return 'Please enter a valid number';
                      }
                      if (int.parse(value) <= 0) {
                        return 'Calories must be greater than zero';
                      }
                      return null;
                    },
                  ),
                ],
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(ctx).pop(),
                child: const Text('Cancel'),
              ),
              ElevatedButton(
                onPressed: () async {
                  if (formKey.currentState!.validate()) {
                    final mealName = mealNameController.text;
                    final calories = int.parse(caloriesController.text);
                    try {
                      await _profileService.logCustomCalorie(
                        mealName,
                        calories,
                        _selectedDay,
                      );
                      if (!ctx.mounted) return;
                      Navigator.of(ctx).pop();
                      _loadCaloriesForDay(_selectedDay);
                      _loadLoggedRecipes(_selectedDay);
                    } catch (e) {
                      // Handle error
                    }
                  }
                },
                child: const Text('Save'),
              ),
            ],
          ),
    );
  }
}
