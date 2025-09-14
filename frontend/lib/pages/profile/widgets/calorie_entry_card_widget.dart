import 'package:flutter/material.dart';
import 'package:nibbles/service/profile/calorie_log_dto.dart';
import 'package:nibbles/service/profile/recipe_dto.dart';
import 'package:nibbles/theme/app_theme.dart';

class CalorieEntryCard extends StatelessWidget {
  final CalorieLogDto log;
  final VoidCallback onDelete;

  const CalorieEntryCard({
    super.key,
    required this.log,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    if (log.recipe != null) {
      return _buildEntryCardFromRecipe(context, log.recipe!, log.id);
    } else {
      return _buildCustomEntryCard(context, log);
    }
  }

  Widget _buildCustomEntryCard(BuildContext context, CalorieLogDto log) {
    return Stack(
      children: [
        Container(
          height: 95,
          padding: const EdgeInsets.all(12),
          decoration: BoxDecoration(
            color: AppTheme.tertiaryColor,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      log.mealName ?? 'Custom Meal',
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: AppTheme.textOnPrimary,
                        fontWeight: FontWeight.bold,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const Spacer(),
                    Text(
                      '${log.calories} kcal',
                      style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: AppTheme.textSecondary,
                      ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        Positioned(
          right: 8,
          top: 8,
          child: _buildDeleteButton(),
        ),
      ],
    );
  }

  Widget _buildEntryCardFromRecipe(BuildContext context, RecipeDto recipe, int logId) {
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
                    padding: const EdgeInsets.fromLTRB(12, 8, 56, 8),
                    decoration: BoxDecoration(
                      color: AppTheme.tertiaryColor,
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
          child: _buildDeleteButton(),
        ),
      ],
    );
  }

  Widget _buildDeleteButton() {
    return GestureDetector(
      onTap: onDelete,
      child: Container(
        padding: const EdgeInsets.all(6),
        decoration: BoxDecoration(
          color: AppTheme.surfaceColor,
          borderRadius: BorderRadius.circular(8),
          boxShadow: [
            BoxShadow(
              color: Colors.black12,
              blurRadius: 4,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Icon(Icons.delete, color: AppTheme.errorColor),
      ),
    );
  }
}