import 'package:flutter/material.dart';
import 'recipe_model.dart';

class RecipeIngredientsPage extends StatefulWidget {
  const RecipeIngredientsPage({super.key});

  @override
  State<RecipeIngredientsPage> createState() => _RecipeIngredientsPageState();
}

class _RecipeIngredientsPageState extends State<RecipeIngredientsPage> {
  int currentStep = 0;
  int currentTab = 0;

  final Recipe recipe = Recipe(
    title: 'Traditional spare ribs baked',
    imageUrl: 'placeholder',
    cookingTime: 55,
    ingredients: [
      '1kg pork spare ribs',
      '2 tablespoons fish sauce',
      '1 shallot (finely diced)',
      '1/2 teaspoon ground black pepper',
      '3 cloves garlic (finely chopped)',
      '3 tablespoons granulated sugar (divided)',
      '1 tablespoon chicken or mushroom bouillon powder',
      '3/4 cup coconut soda',
      '1 green onion (optional, thinly sliced)',
      '1/2 cup water',
    ],
    instructions: [
      'Step 1 - Prepare the Pork...',
      'Step 2 - Marinate the Pork...',
      'Step 3 - Prepare the Caramel Sauce...',
      'Step 4 - Cook the Pork...',
      'Step 5 - Garnish and Serve...',
    ],
    isFavorite: false,
  );

  late List<bool> checkedIngredients;

  @override
  void initState() {
    super.initState();
    checkedIngredients = List.generate(recipe.ingredients.length, (_) => false);
    checkedIngredients[0] = true;
  }

  Widget _buildIngredientsList() {
    final textTheme = Theme.of(context).textTheme;
    final colorScheme = Theme.of(context).colorScheme;

    return Column(
      children: [
        Container(
          alignment: Alignment.centerLeft,
          padding: const EdgeInsets.only(left: 16, top: 16, bottom: 8),
          child: Text('Ingredients:', style: textTheme.titleLarge),
        ),
        Expanded(
          child: ListView.builder(
            itemCount: recipe.ingredients.length,
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
                        recipe.ingredients[index],
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

  Widget _buildInstructionList() {
    final textTheme = Theme.of(context).textTheme;
    final colorScheme = Theme.of(context).colorScheme;

    return Column(
      children: [
        // Display the current step's instructions
        Expanded(
          child: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Text(
              recipe.instructions[currentStep], // Display the current step
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
            children: List.generate(recipe.instructions.length, (index) {
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
        centerTitle: false,
        title: Text(
          'Recipe List',
          style: textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.bold,
            color: colorScheme.onSurface,
          ),
        ),
        actions: [
          IconButton(
            icon: Icon(Icons.more_horiz, color: colorScheme.onSurface),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: Stack(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: Container(
                    height: 150,
                    width: double.infinity,
                    color: colorScheme.surfaceContainerHighest,
                    child: Center(
                      child: Icon(
                        Icons.image,
                        size: 50,
                        color: colorScheme.onSurfaceVariant.withAlpha(
                          (0.6 * 255).toInt(),
                        ),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
          Container(
            decoration: BoxDecoration(
              border: Border(
                bottom: BorderSide(
                  color: colorScheme.outline.withAlpha((0.5 * 255).toInt()),
                  width: 0.5,
                ),
              ),
            ),
            child: Row(
              children: [
                Expanded(
                  child: InkWell(
                    onTap: () {
                      setState(() {
                        currentTab = 0; // Set to Ingredients tab
                      });
                    },
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          child: Text(
                            'Ingredients',
                            style: textTheme.labelLarge?.copyWith(
                              fontWeight: FontWeight.bold,
                              color:
                                  currentTab == 0
                                      ? colorScheme.primary
                                      : colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ),
                        Container(
                          height: 2,
                          color:
                              currentTab == 0
                                  ? colorScheme.primary
                                  : Colors.transparent,
                        ),
                      ],
                    ),
                  ),
                ),
                Expanded(
                  child: InkWell(
                    onTap: () {
                      setState(() {
                        currentTab = 1; // Set to Cooking Instructions tab
                      });
                    },
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 14),
                          child: Text(
                            'Cooking Instructions',
                            style: textTheme.labelLarge?.copyWith(
                              color:
                                  currentTab == 1
                                      ? colorScheme.primary
                                      : colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ),
                        Container(
                          height: 2,
                          color:
                              currentTab == 1
                                  ? colorScheme.primary
                                  : Colors.transparent,
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
          // Display the appropriate content based on the active tab
          Expanded(
            child:
                currentTab == 0
                    ? _buildIngredientsList()
                    : _buildInstructionList(),
          ),
        ],
      ),
    );
  }
}
