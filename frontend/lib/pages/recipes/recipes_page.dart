import 'package:flutter/material.dart';
import 'package:nibbles/core/logger.dart';
import 'package:nibbles/pages/recipes/widgets/appliances_selection.dart';
import 'package:nibbles/pages/recipes/widgets/dietary_requirements.dart';
import 'package:nibbles/pages/recipes/widgets/ingredients_input.dart';
import 'package:nibbles/pages/recipes/widgets/recipe_difficulty.dart';
import 'package:nibbles/service/appliance/appliance_service.dart';
import 'package:nibbles/service/profile/dietary_dto.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/recipe/recipe_service.dart';
import 'package:nibbles/pages/recipes/recipe_recommendations_page.dart';

class RecipesPage extends StatefulWidget {
  const RecipesPage({super.key});

  @override
  State<RecipesPage> createState() => _RecipesPageState();
}

class _RecipesPageState extends State<RecipesPage> {
  final _logger = getLogger();
  final List<String> ingredients = [];
  final TextEditingController _ingredientInputController =
      TextEditingController();
  RecipeDifficulty selectedDifficulty = RecipeDifficulty.any;
  List<Appliance> availableAppliances = [];
  List<Appliance> selectedAppliances = [];
  List<DietaryRequirementDto> availableDietaries = [];
  List<DietaryRequirementDto> selectedDietaries = [];
  bool isLoading = false;
  bool useDietaryRestrictions = true;

  // Services
  final ProfileService _profileService = ProfileService();
  final ApplianceService _applianceService = ApplianceService();
  final RecipeService _recipeService = RecipeService();

  @override
  void initState() {
    super.initState();
    setState(() {
      isLoading = true;
    });

    // Use Future.wait to wait for both async operations to complete
    Future.wait([_fetchDietaries(), _fetchAppliances()])
        .then((_) {
          if (mounted) {
            setState(() {
              isLoading = false;
            });
          }
        })
        .catchError((error) {
          if (mounted) {
            setState(() {
              isLoading = false;
            });
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text('Failed to load data: ${error.toString()}'),
              ),
            );
          }
        });
  }

  Future<void> _fetchDietaries() async {
    try {
      final fetchedDietaries = await _profileService.getDietaryRestrictions();
      setState(() {
        availableDietaries = fetchedDietaries;
      });
    } catch (e) {
      _logger.e('Failed to fetch dietaries: ${e.toString()}');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to load dietaries: ${e.toString()}')),
        );
      }
    }
  }

  Future<void> _fetchAppliances() async {
    try {
      final fetchedAppliances = await _applianceService.fetchAppliances();

      setState(() {
        availableAppliances = fetchedAppliances;
      });
    } catch (e) {
      _logger.e('Failed to fetch appliances: ${e.toString()}');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to load appliances: ${e.toString()}')),
        );
      }
    }
  }

Future<void> _generateRecipes() async {
  try {
    final recipeResults = await _recipeService.generateRecipes(
      ingredients: ingredients,
      dietaries: useDietaryRestrictions
          ? selectedDietaries.map((d) => d.id!).toList()
          : [],
      appliances: selectedAppliances.map((a) => a.id).toList(),
      difficultyLevel: selectedDifficulty,
    );

    _logger.d(recipeResults);

    if (!mounted) return;
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const RecipeRecommendationsPage(),
      ),
    );
  } catch (e) {
    if (!mounted) return;

    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Error'),
          content: Text('Failed to generate recipes: ${e.toString()}'),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('OK'),
            ),
          ],
        );
      },
    );
  }
}


  @override
  void dispose() {
    _ingredientInputController.dispose();
    super.dispose();
  }

  void _addIngredient(String ingredient) {
    if (ingredient.isNotEmpty) {
      setState(() {
        ingredients.add(ingredient);
        _ingredientInputController.clear();
      });
    }
  }

  void _removeIngredient(String ingredient) {
    setState(() {
      ingredients.remove(ingredient);
    });
  }

  void _toggleAppliance(Appliance appliance) {
    setState(() {
      if (_isApplianceSelected(appliance)) {
        selectedAppliances.removeWhere((a) => a.id == appliance.id);
        appliance.isSelected = false;
      } else {
        selectedAppliances.add(appliance);
        appliance.isSelected = true;
      }
    });
  }

  bool _isApplianceSelected(Appliance appliance) {
    return selectedAppliances.any((a) => a.id == appliance.id);
  }

  bool _areAllAppliancesSelected() {
    return selectedAppliances.length == availableAppliances.length &&
        availableAppliances.every(
          (appliance) => selectedAppliances.any((a) => a.id == appliance.id),
        );
  }

  void _toggleAllAppliances(bool selected) {
    setState(() {
      if (_areAllAppliancesSelected()) {
        // Deselect all if all are already selected
        selectedAppliances.clear();
      } else {
        // Select all if not all are selected
        selectedAppliances = List.from(availableAppliances);
      }
    });
  }

  void _toggleDietary(DietaryRequirementDto dietary) {
    setState(() {
      if (_isDietarySelected(dietary)) {
        selectedDietaries.removeWhere((d) => d.id == dietary.id);
      } else {
        selectedDietaries.add(dietary);
      }
    });
  }

  bool _isDietarySelected(DietaryRequirementDto dietary) {
    return selectedDietaries.any((d) => d.id == dietary.id);
  }

  bool _areAllDietariesSelected() {
    return selectedDietaries.length == availableDietaries.length &&
        availableDietaries.every(
          (dietary) => selectedDietaries.any((d) => d.id == dietary.id),
        );
  }

  void _toggleAllDietaries() {
    setState(() {
      if (_areAllDietariesSelected()) {
        // Deselect all if all are already selected
        selectedDietaries.clear();
      } else {
        // Select all if not all are selected
        selectedDietaries = List.from(availableDietaries);
      }
    });
  }

  void _toggleDietaryRestrictions(bool value) {
    setState(() {
      useDietaryRestrictions = value;
    });
  }

  void _setDifficulty(RecipeDifficulty difficulty) {
    setState(() {
      selectedDifficulty = difficulty;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).colorScheme.surface,
      body: SafeArea(
        child:
            isLoading
                ? const Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      CircularProgressIndicator(),
                      SizedBox(height: 16),
                      Text('Loading recipe components...'),
                    ],
                  ),
                )
                : Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Non-scrollable ingredients section
                    Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: IngredientsInput(
                        ingredients: ingredients,
                        controller: _ingredientInputController,
                        onAddIngredient: _addIngredient,
                        onRemoveIngredient: _removeIngredient,
                      ),
                    ),

                    // Scrollable content area
                    Expanded(
                      child: SingleChildScrollView(
                        padding: const EdgeInsets.symmetric(horizontal: 16.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            DietaryRequirements(
                              useDietaryRestrictions: useDietaryRestrictions,
                              availableDietaries: availableDietaries,
                              selectedDietaries: selectedDietaries,
                              onToggleDietaryRestrictions:
                                  _toggleDietaryRestrictions,
                              onToggleDietary: _toggleDietary,
                              onToggleAll: _toggleAllDietaries,
                              isDietarySelected: _isDietarySelected,
                              areAllDietariesSelected: _areAllDietariesSelected,
                            ),
                            const SizedBox(height: 24),
                            RecipeDifficultySelector(
                              selectedDifficulty: selectedDifficulty,
                              onDifficultySelected: _setDifficulty,
                            ),
                            const SizedBox(height: 24),
                            AppliancesSelection(
                              availableAppliances: availableAppliances,
                              selectedAppliances: selectedAppliances,
                              onToggleAppliance: _toggleAppliance,
                              isApplianceSelected: _isApplianceSelected,
                              areAllAppliancesSelected:
                                  _areAllAppliancesSelected,
                              onToggleAll: _toggleAllAppliances,
                            ),
                            const SizedBox(height: 24),
                          ],
                        ),
                      ),
                    ),

                    // Fixed button at bottom
                    Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: SizedBox(
                        width: double.infinity,
                        child: ElevatedButton.icon(
                          onPressed: _generateRecipes,
                          icon: const Icon(Icons.restaurant_menu),
                          label: const Text('Generate Recipes'),
                        ),
                      ),
                    ),
                  ],
                ),
      ),
    );
  }
}
