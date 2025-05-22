import 'package:flutter/material.dart';
import 'package:nibbles/pages/profile/liked_page.dart';
import 'package:nibbles/pages/profile/personal_info_page.dart';
import 'package:nibbles/pages/profile/widgets/cooking_appliances_widget.dart';
import 'package:nibbles/pages/profile/widgets/dietary_requirements_widget.dart';
import 'package:nibbles/pages/profile/widgets/logout_widget.dart';
import 'package:nibbles/pages/profile/widgets/personal_menu_widget.dart';
import 'package:nibbles/service/profile/dietary_dto.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/profile/appliance_dto.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  ProfilePageState createState() => ProfilePageState();
}

class ProfilePageState extends State<ProfilePage> {
  List<ApplianceRequirementDto> appliances = [];
  final ProfileService _profileService = ProfileService();
  List<DietaryRequirementDto> _dietaryRequirements = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadDietaryRequirements();
    _fetchAppliances();
  }

  Future<void> _fetchAppliances() async {
    setState(() => isLoading = true);
    try {
      appliances = await _profileService.getUserAppliances();
    } catch (e) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Error fetching appliances: $e')));
    } finally {
      setState(() => isLoading = false);
    }
  }

  Future<void> _addAppliance(ApplianceRequirementDto appliance) async {
    setState(() => isLoading = true);
    try {
      await _profileService.addAppliance(appliance.id!);
      setState(() {
        appliances.add(appliance);
      });
    } catch (e) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Error adding appliance: $e')));
    } finally {
      setState(() => isLoading = false);
    }
  }

  Future<void> _removeAppliance(ApplianceRequirementDto appliance) async {
    setState(() => isLoading = true);
    try {
      await _profileService.removeAppliance(appliance.id!);
      setState(() {
        appliances.removeWhere((a) => a.id == appliance.id);
      });
    } catch (e) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Error removing appliance: $e')));
    } finally {
      setState(() => isLoading = false);
    }
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFAD2C50),
      body: SafeArea(
        child: isLoading
            ? const Center(child: CircularProgressIndicator())
            : RefreshIndicator(
                onRefresh: _fetchAppliances,
                child: SingleChildScrollView(
                  physics: const AlwaysScrollableScrollPhysics(),
                  child: Column(
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
                      PersonalMenuWidget(
                        onPersonalInfo: () {},
                        onFavourites: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(builder: (context) => const LikedPage()),
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
                        appliances: appliances,
                        onApplianceRemoved: _removeAppliance,
                        onApplianceAdded: _addAppliance,
                        onRefresh: _fetchAppliances,
                      ),
                      LogoutWidget(onLogout: () {}),
                    ],
                  ),
                ),
              ),
      ),
    );
  }
}
