import 'package:flutter/material.dart';
import 'package:nibbles/pages/profile/liked_page.dart';
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
  bool _isProfileLoading = true; // General profile loading
  bool _isAppliancesLoading =
      false; // Specific loading for appliance operations

  @override
  void initState() {
    super.initState();
    _loadAllProfileData();
  }

  Future<void> _loadAllProfileData() async {
    setState(() {
      _isProfileLoading = true;
    });
    try {
      await Future.wait([_loadDietaryRequirements(), _fetchAppliances()]);
    } catch (e) {
      debugPrint('Error loading all profile data: $e');
    } finally {
      if (mounted) {
        setState(() {
          _isProfileLoading = false;
        });
      }
    }
  }

  Future<void> _fetchAppliances() async {
    // Only set appliance loading true if it's not already true to avoid unnecessary setState
    if (!_isAppliancesLoading && mounted) {
      setState(() => _isAppliancesLoading = true);
    }
    try {
      appliances = await _profileService.getUserAppliances();
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Error fetching appliances: $e')));
    } finally {
      if (mounted) {
        setState(() => _isAppliancesLoading = false);
      }
    }
  }

  Future<void> _addAppliance(ApplianceRequirementDto appliance) async {
    if (!_isAppliancesLoading && mounted) {
      setState(() => _isAppliancesLoading = true);
    }
    try {
      await _profileService.addAppliance(appliance.id!);
      setState(() {
        appliances.add(appliance);
      });
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Error adding appliance: $e')));
    } finally {
      if (mounted) {
        setState(() => _isAppliancesLoading = false);
      }
    }
  }

  Future<void> _removeAppliance(ApplianceRequirementDto appliance) async {
    if (!_isAppliancesLoading && mounted) {
      setState(() => _isAppliancesLoading = true);
    }
    try {
      await _profileService.removeAppliance(appliance.id!);
      setState(() {
        appliances.removeWhere((a) => a.id == appliance.id);
      });
    } catch (e) {
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text('Error removing appliance: $e')));
    } finally {
      if (mounted) {
        setState(() => _isAppliancesLoading = false);
      }
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
    try {
      final requirements = await _profileService.getDietaryRequirements();
      if (mounted) {
        setState(() {
          _dietaryRequirements = requirements;
        });
      }
    } catch (e) {
      debugPrint('Error fetching dietary requirements: $e');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFAD2C50),
      body: SafeArea(
        child:
            _isProfileLoading
                ? const Center(child: CircularProgressIndicator())
                : RefreshIndicator(
                  onRefresh: _loadAllProfileData, // Refresh all data
                  child: SingleChildScrollView(
                    physics: const AlwaysScrollableScrollPhysics(),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Padding(
                          padding: EdgeInsets.all(16.0),
                          child: Text(
                            'Profile',
                            style: TextStyle(
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
                          appliances: appliances,
                          onApplianceRemoved: _removeAppliance,
                          onApplianceAdded: _addAppliance,
                          isAddingRemoving: _isAppliancesLoading,
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
