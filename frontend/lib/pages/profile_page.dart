import 'package:flutter/material.dart';
import 'package:nibbles/pages/profile/liked_page.dart';
import 'package:nibbles/pages/profile/widgets/cooking_appliances_widget.dart';
import 'package:nibbles/pages/profile/widgets/dietary_requirements_widget.dart';
import 'package:nibbles/pages/profile/widgets/logout_widget.dart';
import 'package:nibbles/pages/profile/widgets/personal_menu_widget.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    final textTheme = Theme.of(context).textTheme;

    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment:
                CrossAxisAlignment.start, // Aligns content to the left
            children: [
              // Add a header with "Profile" text
              Padding(
                padding: const EdgeInsets.all(
                  16.0,
                ), // Adds spacing around the text
                child: Text('Profile', style: textTheme.titleLarge),
              ),
              // Personal menu widget
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
              // Dietary requirements widget
              DietaryRequirementsWidget(
                tags: ['Vegan', 'Gluten Free', 'Peanut-allergic'],
                onOpenSelector: () {},
                onTagRemoved: (tag) {},
              ),
              // Cooking appliances widget
              CookingAppliancesWidget(
                appliances: [
                  'Toaster',
                  'Oven',
                  'Stove',
                  'Air-fryer',
                  'Waffle-maker',
                ],
                onOpenSelector: () {},
                onApplianceRemoved: (app) {},
              ),
              // Logout widget
              LogoutWidget(onLogout: () {}),
            ],
          ),
        ),
      ),
    );
  }
}
