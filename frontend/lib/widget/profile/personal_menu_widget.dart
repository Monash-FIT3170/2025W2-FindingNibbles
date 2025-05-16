import 'package:flutter/material.dart';
import 'package:nibbles/pages/profile/liked_page.dart';
import 'package:nibbles/pages/profile/personal_info_page.dart';

class PersonalMenuWidget extends StatelessWidget {
  final VoidCallback onPersonalInfo;
  final VoidCallback onFavourites;
  final VoidCallback onMyReviews;

  const PersonalMenuWidget({
    super.key,
    required this.onPersonalInfo,
    required this.onFavourites,
    required this.onMyReviews,
  });

  @override
  Widget build(BuildContext context) {
    final primary = Theme.of(context).primaryColor;
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
      child: Column(
        children: [
          ListTile(
            leading: Icon(Icons.person, color: primary),
            title: const Text('Personal Info'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              // Navigate to LikedPage when tapped
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const PersonalInfoPage()),
              );
            },
          ),
          const Divider(height: 1),
          ListTile(
            leading: Icon(Icons.favorite, color: primary),
            title: const Text('Favourites'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              // Navigate to LikedPage when tapped
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => const LikedPage()),
              );
            },
          ),
          const Divider(height: 1),
          ListTile(
            leading: Icon(Icons.star, color: primary),
            title: const Text('My Reviews'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: onMyReviews,
          ),
        ],
      ),
    );
  }
}