import 'package:flutter/material.dart';
import 'package:nibbles/pages/profile/change_password_page.dart';

class PersonalInfo extends StatelessWidget {
  final Map<String, dynamic> user;

  const PersonalInfo({Key? key, required this.user}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final primary = Theme.of(context).primaryColor;
    return Column(
      children: [
        const CircleAvatar(
          radius: 48,
          child: Icon(Icons.person, size: 48),
        ),
        const SizedBox(height: 24),
        _buildInfoTile('First Name', user['firstName'] ?? '', primary),
        _buildInfoTile('Last Name', user['lastName'] ?? '', primary),
        _buildInfoTile('Email', user['email'] ?? '', primary),
        const SizedBox(height: 24),
        Card(
          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: ListTile(
            leading: Icon(Icons.lock_outline, color: primary),
            title: const Text('Change Password'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => const ChangePasswordPage(),
                ),
              );
            },
          ),
        ),
        
      ],
    );
  }

  Widget _buildInfoTile(String label, String value, Color primary) {
    return ListTile(
      title: Text(label, style: TextStyle(color: primary),),
      subtitle: Text(value),
      trailing: const Icon(Icons.edit),
      onTap: () {
        // implement editing here
      },
    );
  }
}
