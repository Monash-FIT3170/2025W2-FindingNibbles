import 'package:flutter/material.dart';
import 'package:nibbles/pages/profile/liked_page.dart';
import 'package:nibbles/pages/profile/personal_info_page.dart';
import 'package:nibbles/pages/profile/widgets/cooking_appliances_widget.dart';
import 'package:nibbles/pages/profile/widgets/dietary_requirements_widget.dart';
import 'package:nibbles/pages/profile/widgets/logout_widget.dart';
import 'package:nibbles/pages/profile/widgets/personal_menu_widget.dart';
import 'package:nibbles/service/profile/dietary_dto.dart';
import 'package:nibbles/service/profile/profile_service.dart';

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  _ProfilePageState createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final ProfileService _profileService = ProfileService();
  List<DietaryRequirementDto> _dietaryRequirements = [];
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadDietaryRequirements();
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
      backgroundColor: Color(0xFFAD2C50),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: Text('Profile', style: textTheme.titleLarge),
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
                onOpenSelector: () {},
                onApplianceRemoved: _removeAppliance,
                onApplianceAdded: _addAppliance,
              ),
              LogoutWidget(onLogout: () {}),
            ],
          ),
        ),
      ),
    );
  }
}