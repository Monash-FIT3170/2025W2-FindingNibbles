import 'package:flutter/material.dart';
import 'package:nibbles/pages/profile/widgets/personal_info_widget.dart';
import 'package:nibbles/service/auth/auth_service.dart';

class PersonalInfoPage extends StatefulWidget {
  const PersonalInfoPage({Key? key}) : super(key: key);

  @override
  State<PersonalInfoPage> createState() => _PersonalInfoPageState();
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
      appBar: AppBar(
        title: const Text('Personal Info'),
        leading: BackButton(),
      ),
      body: FutureBuilder<Map<String, dynamic>>(
        future: _personalInfo,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }

          if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }

          final user = snapshot.data;
          if (user == null) {
            return const Center(child: Text('No user details found.'));
          }

          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              PersonalInfo(user: user),
            ],
          );
        },
      ),
    );
  }
}
