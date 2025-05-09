import 'package:flutter/material.dart';
import 'package:nibbles/core/logger.dart';
import 'package:nibbles/service/appliance/appliance_service.dart';
import 'package:nibbles/service/profile/dietary_dto.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/recipe/recipe_service.dart';

class RecipesPage extends StatefulWidget {
  const RecipesPage({super.key});

  @override
  State<RecipesPage> createState() => _RecipesPageState();
}

class _RecipesPageState extends State<RecipesPage> {
  final _logger = getLogger();
  final List<String> ingredients = [];
  final List<int> appliances = [];
  final TextEditingController _ingredientInputController =
      TextEditingController();
  // Can be either all, saved, or selected
  String dietaryMode = '';
  RecipeDifficulty selectedDifficulty = RecipeDifficulty.any;
  List<Appliance> availableAppliances = [];
  List<DietaryRequirementDto> dietaries = [];
  bool isLoading = false;

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
    _fetchDietaries();
    _fetchAppliances();
    setState(() {
      isLoading = false;
    });
  }

  Future<void> _fetchDietaries() async {
    try {
      final fetchedDietaries = await _profileService.getDietaryRestrictions();

      setState(() {
        dietaries = fetchedDietaries;
      });
    } catch (e) {
      _logger.e('Failed to fetch dietaries: ${e.toString()}');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to load dietaries: ${e.toString()}'),
            backgroundColor: Colors.red,
          ),
        );
      }
    }
  }

  Future<void> _fetchAppliances() async {
    try {
      final fetchedAppliances = await _applianceService.fetchAppliances(
        selectedAppliances: appliances,
      );

      setState(() {
        availableAppliances = fetchedAppliances;
      });
    } catch (e) {
      _logger.e('Failed to fetch appliances: ${e.toString()}');
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to load appliances: ${e.toString()}'),
            backgroundColor: Colors.red,
          ),
        );
      }
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

  // Toggle appliance selection and update the appliances list
  void _toggleAppliance(Appliance appliance, StateSetter setDrawerState) {
    setDrawerState(() {
      appliance.isSelected = !appliance.isSelected;

      // Update the appliances list based on selection
      if (appliance.isSelected) {
        if (!appliances.contains(appliance.id)) {
          appliances.add(appliance.id);
        }
      } else {
        appliances.remove(appliance.id);
      }
    });
  }

  void _removeAppliance(int appliance) {
    setState(() {
      appliances.remove(appliance);
      // Also update the selection state in the availableAppliances list
      final index = availableAppliances.indexWhere((a) => a.id == appliance);
      if (index >= 0) {
        availableAppliances[index].isSelected = false;
      }
    });
  }

  void _showAppliancesDrawer() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      builder: (BuildContext context) {
        return StatefulBuilder(
          builder: (BuildContext context, StateSetter setDrawerState) {
            return DraggableScrollableSheet(
              initialChildSize: 0.8,
              minChildSize: 0.5,
              maxChildSize: 0.95,
              builder: (context, scrollController) {
                return Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Kitchen Appliances',
                            style: Theme.of(context).textTheme.headlineSmall,
                          ),
                          TextButton.icon(
                            onPressed: () {
                              Navigator.pop(context);
                            },
                            icon: const Icon(Icons.check),
                            label: const Text('Done'),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),
                      const Text(
                        'Select appliances available in your kitchen:',
                        style: TextStyle(fontSize: 16),
                      ),
                      const SizedBox(height: 16),
                      if (isLoading)
                        const Center(child: CircularProgressIndicator())
                      else if (availableAppliances.isEmpty)
                        const Center(
                          child: Text(
                            'No appliances found. Please try again later.',
                          ),
                        )
                      else
                        Expanded(
                          child: ListView.builder(
                            controller: scrollController,
                            itemCount: availableAppliances.length,
                            itemBuilder: (context, index) {
                              final appliance = availableAppliances[index];
                              return CheckboxListTile(
                                title: Text(appliance.name),
                                value: appliance.isSelected,
                                onChanged: (bool? value) {
                                  _toggleAppliance(appliance, setDrawerState);
                                },
                              );
                            },
                          ),
                        ),
                      const SizedBox(height: 16),
                      SizedBox(
                        width: double.infinity,
                        child: ElevatedButton(
                          onPressed: () {
                            _fetchAppliances();
                            Navigator.pop(context);
                          },
                          child: const Text('Save Selection'),
                        ),
                      ),
                    ],
                  ),
                );
              },
            );
          },
        );
      },
    );
  }

  // Generate recipes using RecipeService
  Future<void> _generateRecipes() async {
    try {
      final recipeResults = await _recipeService.generateRecipes(
        ingredients: ingredients,
        dietaryMode: dietaryMode,
        // We can cast id to an int here since we are loading
        // existing dietaries from the server
        dietaries: dietaries.map((e) => e.id!).toList(),
        appliances: appliances,
        difficultyLevel: selectedDifficulty,
      );

      _logger.d(recipeResults);
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
  Widget build(BuildContext context) {
    return Card(
      shadowColor: Colors.transparent,
      margin: const EdgeInsets.all(8.0),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _ingredientInputController,
                    decoration: const InputDecoration(
                      hintText: 'Add an ingredient',
                      border: OutlineInputBorder(),
                    ),
                    onSubmitted: _addIngredient,
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.add),
                  onPressed:
                      () => _addIngredient(_ingredientInputController.text),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Expanded(
              child: Container(
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.green, width: 2),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: ListView.builder(
                  padding: EdgeInsets.zero,
                  itemCount: ingredients.length,
                  itemBuilder: (context, index) {
                    return ListTile(
                      title: Text(ingredients[index]),
                      trailing: IconButton(
                        icon: const Icon(Icons.delete),
                        onPressed: () => _removeIngredient(ingredients[index]),
                      ),
                    );
                  },
                ),
              ),
            ),
            const SizedBox(height: 16),
            Container(
              decoration: BoxDecoration(
                border: Border.all(color: Colors.red.shade200, width: 2),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Column(
                children: [
                  ListTile(
                    title: const Text('Recipe Difficulty'),
                    contentPadding: EdgeInsets.only(left: 16.0, right: 16.0),
                  ),
                  Align(
                    alignment: Alignment.center,
                    child: SingleChildScrollView(
                      scrollDirection: Axis.horizontal,
                      child: Wrap(
                        spacing: 8.0,
                        children:
                            RecipeDifficulty.values.map((difficulty) {
                              return ChoiceChip(
                                label: Text(difficulty.name.toUpperCase()),
                                selected: selectedDifficulty == difficulty,
                                onSelected: (bool selected) {
                                  setState(() {
                                    selectedDifficulty = difficulty;
                                  });
                                },
                              );
                            }).toList(),
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: SizedBox(
                      width: double.infinity,
                      child: ElevatedButton.icon(
                        onPressed: _showAppliancesDrawer,
                        icon: const Icon(Icons.kitchen),
                        label: const Text('Kitchen Appliances'),
                      ),
                    ),
                  ),
                  if (appliances.isNotEmpty)
                    Padding(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 16.0,
                        vertical: 8.0,
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Selected Appliances:',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 14,
                            ),
                          ),
                          const SizedBox(height: 8),
                          Wrap(
                            spacing: 8.0,
                            runSpacing: 4.0,
                            children:
                                availableAppliances
                                    .where((a) => appliances.contains(a.id))
                                    .map(
                                      (appliance) => Chip(
                                        label: Text(appliance.name),
                                        deleteIcon: const Icon(
                                          Icons.clear,
                                          size: 16,
                                        ),
                                        onDeleted: () {
                                          setState(() {
                                            _removeAppliance(appliance.id);
                                            appliance.isSelected = false;
                                          });
                                        },
                                      ),
                                    )
                                    .toList(),
                          ),
                        ],
                      ),
                    ),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16.0),
              child: SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: _generateRecipes,
                  icon: const Icon(Icons.restaurant_menu),
                  label: const Text('Generate Recipes'),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Theme.of(context).primaryColor,
                    foregroundColor: Colors.white,
                    padding: const EdgeInsets.symmetric(vertical: 16.0),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
