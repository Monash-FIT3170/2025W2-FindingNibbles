import 'package:flutter/material.dart';
import 'package:nibbles/pages/profile/liked_page.dart';
import 'package:nibbles/pages/profile/widgets/cooking_appliances_widget.dart';
import 'package:nibbles/pages/profile/widgets/dietary_requirements_widget.dart';
import 'package:nibbles/pages/profile/widgets/logout_widget.dart';
import 'package:nibbles/pages/profile/widgets/personal_menu_widget.dart';
import 'package:nibbles/service/profile/dietary_dto.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/profile/appliance_dto.dart';
import 'package:nibbles/theme/app_theme.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  ProfilePageState createState() => ProfilePageState();
}

class ProfilePageState extends State<ProfilePage> {
  List<ApplianceRequirementDto> appliances = [];
  final ProfileService _profileService = ProfileService();
  List<DietaryRequirementDto> _dietaryRequirements = [];
  List<ApplianceRequirementDto> _appliances = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadDietaryRequirements();
    _loadAppliances();
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
