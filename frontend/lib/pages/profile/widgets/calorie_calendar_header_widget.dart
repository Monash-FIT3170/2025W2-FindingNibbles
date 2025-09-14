import 'package:flutter/material.dart';
import 'package:table_calendar/table_calendar.dart';
import 'package:nibbles/theme/app_theme.dart';

class CalorieCalendarHeader extends StatelessWidget {
  final DateTime focusedDay;
  final DateTime selectedDay;
  final Function(DateTime, DateTime) onDaySelected;
  final Function(DateTime) onPageChanged;
  final VoidCallback onCalendarTap;

  static const List<String> _monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const CalorieCalendarHeader({
    super.key,
    required this.focusedDay,
    required this.selectedDay,
    required this.onDaySelected,
    required this.onPageChanged,
    required this.onCalendarTap,
  });

  bool get _isTodaySelected => isSameDay(selectedDay, DateTime.now());

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.colorScheme.onPrimary,
        borderRadius: BorderRadius.circular(16),
      ),
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 14),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '${_monthNames[focusedDay.month - 1]} ${focusedDay.year}',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                    color: AppTheme.textPrimary,
                  ),
                ),
                const SizedBox(height: 8),
                SizedBox(
                  height: 70,
                  child: TableCalendar(
                    firstDay: DateTime.utc(2020, 1, 1),
                    lastDay: DateTime.utc(2030, 12, 31),
                    focusedDay: focusedDay,
                    calendarFormat: CalendarFormat.week,
                    headerVisible: false,
                    daysOfWeekVisible: false,
                    availableGestures: AvailableGestures.horizontalSwipe,
                    selectedDayPredicate: (day) => isSameDay(day, selectedDay),
                    onDaySelected: onDaySelected,
                    onPageChanged: onPageChanged,
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
                        color: _isTodaySelected
                            ? AppTheme.colorScheme.onPrimary
                            : AppTheme.textPrimary,
                      ),
                      defaultTextStyle: TextStyle(color: AppTheme.textPrimary),
                      weekendTextStyle: TextStyle(color: AppTheme.textSecondary),
                      outsideDaysVisible: false,
                    ),
                    daysOfWeekStyle: DaysOfWeekStyle(
                      weekdayStyle: TextStyle(color: AppTheme.textSecondary),
                      weekendStyle: TextStyle(color: AppTheme.textSecondary),
                    ),
                    rowHeight: 48,
                  ),
                ),
              ],
            ),
          ),
          IconButton(
            onPressed: onCalendarTap,
            icon: Icon(Icons.calendar_today, color: AppTheme.textPrimary),
          ),
        ],
      ),
    );
  }
}