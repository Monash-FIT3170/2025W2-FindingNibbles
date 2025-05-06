import 'package:flutter/material.dart';
import 'package:nibbles/pages/profile/liked_page.dart';
import 'package:nibbles/widget/profile/cooking_appliances_widget.dart';
import 'package:nibbles/widget/profile/dietary_requirements_widget.dart';
import 'package:nibbles/widget/profile/logout_widget.dart';
import 'package:nibbles/widget/profile/personal_menu_widget.dart';

class ProfilePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFAD2C50), // Background color
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
                child: Text(
                  'Profile',
                  style: TextStyle(
                    color: Colors.white, // White text color
                    fontSize: 32, // Font size for the header
                    fontWeight: FontWeight.bold, // Bold font weight
                  ),
                ),
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
