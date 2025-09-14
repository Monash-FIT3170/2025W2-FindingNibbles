import 'package:flutter/material.dart';
import 'package:nibbles/service/profile/calorie_log_dto.dart';
import 'package:nibbles/theme/app_theme.dart';
import 'package:nibbles/pages/profile/widgets/calorie_entry_card_widget.dart';

class CalorieContentBody extends StatelessWidget {
  final int? dailyCalories;
  final List<CalorieLogDto> loggedRecipes;
  final Function(int) onDeleteEntry;

  const CalorieContentBody({
    super.key,
    required this.dailyCalories,
    required this.loggedRecipes,
    required this.onDeleteEntry,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: AppTheme.colorScheme.onPrimary,
        borderRadius: BorderRadius.circular(16),
      ),
      padding: const EdgeInsets.all(16),
      child: dailyCalories == null
          ? const Center(child: CircularProgressIndicator())
          : (dailyCalories != 0 ? _buildEntriesList(context) : _buildEmptyState(context)),
    );
  }

  Widget _buildEmptyState(BuildContext context) {
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

  Widget _buildEntriesList(BuildContext context) {
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
              dailyCalories?.toString() ?? '-',
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
              ? _buildEmptyState(context)
              : ListView.separated(
                  itemCount: loggedRecipes.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 12),
                  itemBuilder: (context, index) {
                    final log = loggedRecipes[index];
                    return CalorieEntryCard(
                      log: log,
                      onDelete: () => onDeleteEntry(log.id),
                    );
                  },
                ),
        ),
      ],
    );
  }
}