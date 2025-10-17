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
import 'package:nibbles/pages/profile/history_page.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  ProfilePageState createState() => ProfilePageState();
}

class ProfilePageState extends State<ProfilePage> {
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
    setState(() => _dietaryRequirements.add(requirement));
  }

  void _removeDietaryRequirement(DietaryRequirementDto requirement) {
    setState(() => _dietaryRequirements.removeWhere((r) => r.id == requirement.id));
  }

  void _addAppliance(ApplianceRequirementDto appliance) {
    setState(() => _appliances.add(appliance));
  }

  void _removeAppliance(ApplianceRequirementDto appliance) {
    setState(() => _appliances.removeWhere((r) => r.id == appliance.id));
  }

  Future<void> _loadDietaryRequirements() async {
    if (!mounted) return;
    setState(() => isLoading = true);
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
      if (mounted) setState(() => isLoading = false);
    }
  }

  Future<void> _loadAppliances() async {
    if (!mounted) return;
    setState(() => isLoading = true);
    try {
      final appliances = await _profileService.getUserAppliances();
      if (mounted) {
        setState(() {
          _appliances = appliances;
          isLoading = false;
        });
      }
    } catch (e) {
      debugPrint('Error fetching appliances: $e');
      if (mounted) setState(() => isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.colorScheme.primary,
      body: SafeArea(
        child: isLoading
            ? const Center(
                child: CircularProgressIndicator(color: AppTheme.surfaceColor),
              )
            : Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Padding(
                    padding: EdgeInsets.all(16.0),
                    child: Center(
                      child: Text(
                        'Profile',
                        style: TextStyle(
                          color: Colors.white,
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
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
                          Padding(
                            padding: const EdgeInsets.symmetric(horizontal: 16.0),
                            child: ListTile(
                              leading: const Icon(Icons.history, color: Colors.white),
                              title: const Text(
                                'Browsing History',
                                style: TextStyle(color: Colors.white, fontSize: 18),
                              ),
                              onTap: () {
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                    builder: (context) => const HistoryPage(),
                                  ),
                                );
                              },
                            ),
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
