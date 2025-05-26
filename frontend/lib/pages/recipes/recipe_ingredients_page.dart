import 'package:flutter/material.dart';
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

  late List<bool> checkedIngredients;

  @override
  void initState() {
    super.initState();
    checkedIngredients = List.generate(
      widget.recipe.ingredients.length,
      (_) => false,
    );
    if (checkedIngredients.isNotEmpty) checkedIngredients[0] = true;
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
    return Column(
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

        // Step navigation at the bottom
        Container(
          padding: const EdgeInsets.symmetric(vertical: 16),
          child: Row(
            mainAxisAlignment:
                MainAxisAlignment.center, // Center the step indicators
            children: List.generate(widget.recipe.instructions.length, (index) {
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
      ],
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
          widget.recipe.title,  // Changed from 'Recipe List' to actual recipe title
          style: textTheme.titleMedium?.copyWith(
            color: colorScheme.onSurface,
          ),
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
                color: colorScheme.surfaceVariant,
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
              child: currentTab == 0
                  ? _buildIngredientsList(textTheme, colorScheme)
                  : _buildInstructionList(textTheme, colorScheme),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTab(String text, bool isSelected, VoidCallback onTap,
      TextTheme textTheme, ColorScheme colorScheme) {
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
                  color: isSelected ? colorScheme.primary : colorScheme.onSurfaceVariant,
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
