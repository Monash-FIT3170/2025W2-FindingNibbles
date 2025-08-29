import 'package:flutter/material.dart';
import 'package:nibbles/pages/profile/liked_page.dart';
import 'package:nibbles/pages/profile/widgets/cooking_appliances_widget.dart';
import 'package:nibbles/pages/profile/widgets/cuisine_preferrences_widget.dart';
import 'package:nibbles/pages/profile/widgets/dietary_requirements_widget.dart';
import 'package:nibbles/pages/profile/widgets/logout_widget.dart';
import 'package:nibbles/pages/profile/widgets/personal_menu_widget.dart';
import 'package:nibbles/service/cuisine/cuisine_dto.dart';
import 'package:nibbles/service/profile/dietary_dto.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/profile/appliance_dto.dart';
import 'package:nibbles/theme/app_theme.dart';
import 'package:nibbles/core/logger.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  ProfilePageState createState() => ProfilePageState();
}

class ProfilePageState extends State<ProfilePage> {
  List<ApplianceRequirementDto> appliances = [];
  final ProfileService _profileService = ProfileService();
  final _logger = getLogger();
  List<DietaryRequirementDto> _dietaryRequirements = [];
  List<CuisineDto> _cuisines = [];
  List<ApplianceRequirementDto> _appliances = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadDietaryRequirements();
    _loadAppliances();
    _loadCuisines();
  }

  void _addDietaryRequirement(DietaryRequirementDto requirement) {
    setState(() {
      _dietaryRequirements.add(requirement);
    });
  }

  void _removeDietaryRequirement(DietaryRequirementDto requirement) {
    setState(() {
      _dietaryRequirements.removeWhere((r) => r.id == requirement.id);
    });
  }

  void _addAppliance(ApplianceRequirementDto appliance) {
    setState(() {
      _appliances.add(appliance);
    });
  }

  void _removeAppliance(ApplianceRequirementDto appliance) {
    setState(() {
      _appliances.removeWhere((r) => r.id == appliance.id);
    });
  }

  void _addCuisinePreference(CuisineDto cuisine) {
    _logger.d('Adding cuisine preference: ${cuisine.name} (ID: ${cuisine.id})');
    setState(() {
      _cuisines.add(cuisine);
    });
    _logger.d('Current cuisine preferences count: ${_cuisines.length}');
  }

  void _removeCuisinePreference(CuisineDto cuisine) {
    _logger.d(
      'Removing cuisine preference: ${cuisine.name} (ID: ${cuisine.id})',
    );
    setState(() {
      _cuisines.removeWhere((r) => r.id == cuisine.id);
    });
    _logger.d('Current cuisine preferences count: ${_cuisines.length}');
  }

  /*
   * Loading user specific dietary requirments
   */
  Future<void> _loadDietaryRequirements() async {
    if (!mounted) return;
    setState(() {
      isLoading = true;
    });
    try {
      final requirements = await _profileService.getDietaryRequirements();
      if (mounted) {
        setState(() {
          _dietaryRequirements = requirements;
          isLoading = false;
        });
      }
    } catch (e) {
      debugPrint('Error fetching dietary requirements: $e');
      if (mounted) {
        setState(() {
          isLoading = false;
        });
      }
    }
  }

  Future<void> _loadCuisines() async {
    if (!mounted) return;
    _logger.d('Starting to load user cuisines...');
    setState(() {
      isLoading = true;
    });
    try {
      final cuisines = await _profileService.getUserCuisines();
      if (mounted) {
        _logger.d('Successfully loaded ${cuisines.length} user cuisines');
        setState(() {
          _cuisines = cuisines;
          isLoading = false;
        });
      }
    } catch (e) {
      _logger.e('Error fetching user cuisines: $e');
      debugPrint('Error fetching user cuisines: $e');
      if (mounted) {
        setState(() {
          isLoading = false;
        });
        // Show user-friendly error message
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              'Failed to load cuisine preferences: ${e.toString()}',
            ),
            backgroundColor: Colors.red,
            duration: Duration(seconds: 5),
          ),
        );
      }
    }
  }

  Future<void> _loadAppliances() async {
    if (!mounted) return;
    setState(() {
      isLoading = true;
    });
    try {
      final appliances = await _profileService.getUserAppliances();
      if (mounted) {
        setState(() {
          _appliances = appliances;
          isLoading = false;
        });
      }
    } catch (e) {
      debugPrint('Error fetching dietary requirements: $e');
      if (mounted) {
        setState(() {
          isLoading = false;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.colorScheme.primary,
      body: SafeArea(
        child:
            isLoading
                ? const Center(
                  child: CircularProgressIndicator(
                    color: AppTheme.surfaceColor,
                  ),
                )
                : Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Text(
                        'Profile',
                        style: const TextStyle(
                          color: Colors.white,
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    // Use Expanded with SingleChildScrollView to prevent overflow
                    Expanded(
                      child: SingleChildScrollView(
                        physics: const AlwaysScrollableScrollPhysics(),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            PersonalMenuWidget(
                              onPersonalInfo: () {},
                              onFavourites: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => const LikedPage(),
                                  ),
                                );
                              },
                              onMyReviews: () {},
                            ),
                            DietaryRequirementsWidget(
                              dietaryRequirements: _dietaryRequirements,
                              onAdd: _addDietaryRequirement,
                              onRemove: _removeDietaryRequirement,
                            ),
                            CuisinePreferencesWidget(
                              cuisinePreferences: _cuisines,
                              onAdd: _addCuisinePreference,
                              onRemove: _removeCuisinePreference,
                            ),
                            CookingAppliancesWidget(
                              appliances: _appliances,
                              onAdd: _addAppliance,
                              onRemove: _removeAppliance,
                            ),
                            LogoutWidget(onLogout: () {}),
                            // Add padding at the bottom to ensure content doesn't get cut off
                            const SizedBox(height: 80),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
      ),
    );
  }
}
