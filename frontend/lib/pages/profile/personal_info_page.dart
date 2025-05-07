import 'package:flutter/material.dart';
import 'package:nibbles/service/auth/auth_service.dart';
import 'package:nibbles/widget/profile/personal_info_widget.dart';

class PersonalInfoPage extends StatefulWidget {
  const PersonalInfoPage({Key? key}) : super(key: key);

  static const Color _background = Color(0xFFAD2C50);

  @override
  _PersonalInfoPageState createState() => _PersonalInfoPageState();
}

class _PersonalInfoPageState extends State<PersonalInfoPage> {
  final AuthService _authService = AuthService();
  late Future<Map<String, dynamic>> _personalInfo;

  @override
  void initState() {
    super.initState();
    _personalInfo = _authService.getUserProfile();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: PersonalInfoPage._background,
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

          return SingleChildScrollView(
            child: Column(
              children: [
                const SizedBox(height: 60),
                Row(
                  children: [
                    IconButton(
                      icon: const Icon(Icons.arrow_back, color: Colors.white),
                      onPressed: () => Navigator.of(context).pop(),
                    ),
                    const Text(
                      'Personal Info',
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 22,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 20),
                PersonalInfo(user: user),
              ],
            ),
          );
        },
      ),
    );
  }
}
