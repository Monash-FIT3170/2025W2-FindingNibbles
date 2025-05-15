import 'package:flutter/material.dart';
import 'package:nibbles/service/auth/auth_service.dart';
import 'package:nibbles/service/profile/profile_service.dart';
import 'package:nibbles/service/profile/user_dto.dart';
import 'package:nibbles/pages/profile/widgets/personal_info_widget.dart';

class PersonalInfoPage extends StatefulWidget {
  const PersonalInfoPage({super.key});

  @override
  _PersonalInfoPageState createState() => _PersonalInfoPageState();
}

class _PersonalInfoPageState extends State<PersonalInfoPage> {
  final AuthService _authService = AuthService();
  final ProfileService _profileService = ProfileService();
  late Future<Map<String, dynamic>> _personalInfo;

  @override
  void initState() {
    super.initState();
    _loadUserInfo();
  }

  Future<void> _loadUserInfo() async {
    _personalInfo = _authService.getUserProfile();
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Personal Info'),
      ),
      body: FutureBuilder<Map<String, dynamic>>(
        future: _personalInfo,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            print('Detailed error: ${snapshot.error}');
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData) {
            return const Center(child: Text('No user details found.'));
          }

          final user = snapshot.data!;

          return SingleChildScrollView(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: PersonalInfo(
                user: user,
                onUpdateField: _handleFieldUpdate,
              ),
            ),
          );
        },
      ),
    );
  }

  /// Function to handle updating user details
  Future<void> _handleFieldUpdate(String fieldName, String newValue) async {
    updateUserDto? data;
    print(fieldName);
    switch (fieldName) {
      case 'firstName':
        data = updateUserDto(firstName: newValue);
        print(data.firstName);
        break;
      case 'lastName':
        data = updateUserDto(lastName: newValue);
        break;
      case 'email':
        data = updateUserDto(email: newValue);
        break;
      default:
        return;
    }

    try {
      _profileService.updateUserProfile(data); // update details
      _loadUserInfo(); // Reload user info to reflect the changes
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('${fieldName} updated successfully!')),
      );
    } catch (error) {
      print('Error updating $fieldName: $error');
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('An error occurred while updating.')),
      );
    }
  }
}