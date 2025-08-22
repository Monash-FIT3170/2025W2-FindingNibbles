import 'package:flutter/material.dart';
import 'package:nibbles/core/logger.dart';
import 'package:nibbles/service/recipe/recipe_service.dart';
import 'recipe_model.dart';

class RecipeIngredientsPage extends StatefulWidget {
  final RecipeModel recipe;
  const RecipeIngredientsPage({super.key, required this.recipe});

  @override
  State<RecipeIngredientsPage> createState() => _RecipeIngredientsPageState();
}

class _RecipeIngredientsPageState extends State<RecipeIngredientsPage> {
  int currentStep = 0;
  int currentTab = 0;
  final RecipeService _recipeService = RecipeService();
  final _logger = getLogger();

  late List<bool> checkedIngredients;

  @override
  void initState() {
    super.initState();
    checkedIngredients = List.generate(
      widget.recipe.ingredients.length,
      (_) => false,
    );
  }

  Future<void> _logCalories() async {
    DateTime? selectedDate = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime(2020),
      lastDate: DateTime(2030),
    );

    if (selectedDate != null) {
      try {
        await _recipeService.logCalories(
          widget.recipe.calories,
          selectedDate,
          widget.recipe,
        );
        if (!mounted) return;
        _logger.i('Calories logged successfully!');
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Calories logged successfully!')),
        );
      } catch (e) {
        if (!mounted) return;
        _logger.e('Failed to log calories: ${e.toString()}');
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to log calories: ${e.toString()}')),
        );
      }
    }
  }

  Widget _buildIngredientsList(TextTheme textTheme, ColorScheme colorScheme) {
    return Column(
      children: [
        Container(
          alignment: Alignment.centerLeft,
          padding: const EdgeInsets.only(left: 16, top: 16, bottom: 8),
          child: Text('Ingredients:', style: textTheme.titleLarge),
        ),
        Expanded(
          child: ListView.builder(
            itemCount: widget.recipe.ingredients.length,
            itemBuilder: (context, index) {
              return Padding(
                padding: const EdgeInsets.symmetric(
                  horizontal: 16,
                  vertical: 8,
                ),
                child: Row(
                  children: [
                    InkWell(
                      onTap: () {
                        setState(() {
                          checkedIngredients[index] =
                              !checkedIngredients[index];
                        });
                      },
                      child: Container(
                        width: 24,
                        height: 24,
                        decoration: BoxDecoration(
                          color:
                              checkedIngredients[index]
                                  ? colorScheme.primary
                                  : Colors.white,
                          borderRadius: BorderRadius.circular(4),
                          border: Border.all(
                            color:
                                checkedIngredients[index]
                                    ? colorScheme.primary
                                    : colorScheme.outline,
                            width: 1.5,
                          ),
                        ),
                        child:
                            checkedIngredients[index]
                                ? Icon(
                                  Icons.check,
                                  size: 16,
                                  color: colorScheme.onPrimary,
                                )
                                : null,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        widget.recipe.ingredients[index],
                        style:
                            checkedIngredients[index]
                                ? textTheme.bodyLarge?.copyWith(
                                  decoration: TextDecoration.lineThrough,
                                  color: colorScheme.outline,
                                )
                                : textTheme.bodyLarge,
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildInstructionList(TextTheme textTheme, ColorScheme colorScheme) {
    return GestureDetector(
      // Add swipe functionality
      onHorizontalDragEnd: (details) {
        if (details.primaryVelocity! > 0) {
          // Swipe right - go to previous step
          if (currentStep > 0) {
            setState(() {
              currentStep--;
            });
          }
        } else if (details.primaryVelocity! < 0) {
          // Swipe left - go to next step
          if (currentStep < widget.recipe.instructions.length - 1) {
            setState(() {
              currentStep++;
            });
          }
        }
      },
      child: Column(
        children: [
          // Display the current step's instructions
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Text(
                widget
                    .recipe
                    .instructions[currentStep], // Display the current step
                style: textTheme.bodyLarge?.copyWith(height: 1.5),
              ),
            ),
          ),

          // Step navigation at the bottom - horizontally scrollable
          Center(
            child: Container(
              width:
                  MediaQuery.of(context).size.width *
                  5 /
                  6, // Limit width to 5/6 of screen
              padding: const EdgeInsets.symmetric(vertical: 16),
              child: SingleChildScrollView(
                scrollDirection: Axis.horizontal,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: List.generate(widget.recipe.instructions.length, (
                    index,
                  ) {
                    final isActive = currentStep == index;

                    return GestureDetector(
                      onTap: () {
                        setState(() {
                          currentStep = index; // Update the current step
                        });
                      },
                      child: Container(
                        margin: const EdgeInsets.symmetric(
                          horizontal: 8,
                        ), // Spacing between indicators
                        width: 30, // Width of the indicator
                        height: 30, // Height of the indicator
                        decoration: BoxDecoration(
                          color:
                              isActive
                                  ? colorScheme
                                      .primary // Active step color
                                  : colorScheme
                                      .surfaceContainerHighest, // Inactive step color
                          shape: BoxShape.circle, // Circular shape
                        ),
                        child: Center(
                          child: Text(
                            '${index + 1}', // Step number
                            style: TextStyle(
                              color:
                                  isActive
                                      ? colorScheme
                                          .onPrimary // Active step text color
                                      : colorScheme
                                          .onSurfaceVariant, // Inactive step text color
                              fontWeight: FontWeight.bold, // Font weight
                            ),
                          ),
                        ),
                      ),
                    );
                  }),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;
    final colorScheme = Theme.of(context).colorScheme;

    return Scaffold(
      backgroundColor: colorScheme.surface,
      appBar: AppBar(
        backgroundColor: colorScheme.surface,
        elevation: 0,
        leading: BackButton(color: colorScheme.onSurface),
        title: Text(
          widget
              .recipe
              .title, // Changed from 'Recipe List' to actual recipe title
          style: textTheme.titleMedium?.copyWith(color: colorScheme.onSurface),
        ),
      ),
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Recipe Image Container
            Container(
              height: 150,
              margin: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: colorScheme.surfaceContainerHighest,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Icon(
                Icons.image,
                size: 50,
                color: colorScheme.onSurfaceVariant,
              ),
            ),

            // Tab Navigation
            Container(
              decoration: BoxDecoration(
                border: Border(
                  bottom: BorderSide(
                    color: colorScheme.outlineVariant,
                    width: 1,
                  ),
                ),
              ),
              child: Row(
                children: [
                  _buildTab(
                    'Ingredients',
                    currentTab == 0,
                    () => setState(() => currentTab = 0),
                    textTheme,
                    colorScheme,
                  ),
                  _buildTab(
                    'Instructions',
                    currentTab == 1,
                    () => setState(() => currentTab = 1),
                    textTheme,
                    colorScheme,
                  ),
                ],
              ),
            ),

            // Content
            Expanded(
              child:
                  currentTab == 0
                      ? _buildIngredientsList(textTheme, colorScheme)
                      : _buildInstructionList(textTheme, colorScheme),
            ),
            Padding(
              padding: const EdgeInsets.all(16.0),
              child: ElevatedButton(
                onPressed: _logCalories,
                child: const Text('Log Calories'),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTab(
    String text,
    bool isSelected,
    VoidCallback onTap,
    TextTheme textTheme,
    ColorScheme colorScheme,
  ) {
    return Expanded(
      child: InkWell(
        onTap: onTap,
        child: Column(
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 16),
              child: Text(
                text,
                style: textTheme.labelLarge?.copyWith(
                  color:
                      isSelected
                          ? colorScheme.primary
                          : colorScheme.onSurfaceVariant,
                  fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                ),
              ),
            ),
            Container(
              height: 2,
              color: isSelected ? colorScheme.primary : Colors.transparent,
            ),
          ],
        ),
      ),
    );
  }
}
