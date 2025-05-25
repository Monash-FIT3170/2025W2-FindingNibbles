import 'package:flutter/material.dart';
import 'package:nibbles/service/auth/auth_service.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/profile/user_dto.dart';
import 'package:nibbles/pages/profile/widgets/personal_info_widget.dart';
import 'package:nibbles/core/logger.dart';

class PersonalInfoPage extends StatefulWidget {
  const PersonalInfoPage({super.key});

  @override
  PersonalInfoPageState createState() => PersonalInfoPageState();
}

class PersonalInfoPageState extends State<PersonalInfoPage> {
  final AuthService _authService = AuthService();
  final ProfileService _profileService = ProfileService();
  late Future<Map<String, dynamic>> _personalInfo;
  final _logger = getLogger();

  @override
  void initState() {
    super.initState();
    _loadUserInfo();
  }

  Future<void> _loadUserInfo() async {
    setState(() {
      _personalInfo = _authService.getUserProfile();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Personal Info')),
      body: FutureBuilder<Map<String, dynamic>>(
        future: _personalInfo,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData) {
            return const Center(child: Text('No user details found.'));
          }

          final user = snapshot.data!;
          final userData = {
            'firstName': user['firstName'] ?? '',
            'lastName': user['lastName'] ?? '',
            'email': user['email'] ?? '',
          };

          return ListView(
            padding: const EdgeInsets.all(16.0),
            children: [
              PersonalInfo(user: userData, onUpdateField: _handleFieldUpdate),
            ],
          );
        },
      ),
    );
  }

  /// Function to handle updating user details
  Future<void> _handleFieldUpdate(String fieldName, String newValue) async {
    UpdateUserDto? data;
    switch (fieldName) {
      case 'firstName':
        data = UpdateUserDto(firstName: newValue);
        break;
      case 'lastName':
        data = UpdateUserDto(lastName: newValue);
        break;
      case 'email':
        data = UpdateUserDto(email: newValue);
        break;
      default:
        return;
    }

    try {
      await _profileService.updateUserProfile(data); // update details
      await _loadUserInfo(); // Reload user info to reflect the changes
      if (!mounted) return; // Check if the widget is still mounted
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('$fieldName updated successfully!')),
      );
    } catch (error) {
      _logger.d('Error updating $fieldName: $error');
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('An error occurred while updating.')),
      );
    }
  }
}

extension StringCasingExtension on String {
  String capitalize() =>
      length > 0 ? '${this[0].toUpperCase()}${substring(1).toLowerCase()}' : '';
}
