// lib/pages/title_page.dart
import 'package:flutter/material.dart';
import 'package:nibbles/pages/auth/login_page.dart';
import 'package:nibbles/service/auth/auth_service.dart';
import 'package:nibbles/navigation/app_navigation.dart';

class TitlePage extends StatelessWidget {
  const TitlePage({Key? key}) : super(key: key);
  static const _primary = Color(0xFFAD2C50);

  @override
  Widget build(BuildContext context) {
    final authService = AuthService();

    // Check if the user is logged in and redirect to AppNavigation if true
    Future<void> _checkLoginStatus() async {
      final isLoggedIn = await authService.checkLoginStatus();
      if (isLoggedIn) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (context) => const AppNavigation()),
        );
      }
    }

    // Call the login status check when the page loads
    WidgetsBinding.instance.addPostFrameCallback((_) => _checkLoginStatus());

    return Scaffold(
      backgroundColor: _primary,
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const SizedBox(),
              Column(
                children: [
                  const Text(
                    'FINDINGNIBBLES',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 32,
                      fontWeight: FontWeight.bold,
                      letterSpacing: 2,
                    ),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Find food fast',
                    style: TextStyle(color: Colors.white70, fontSize: 16),
                  ),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  OutlinedButton(
                    onPressed:
                        () => Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const LoginPage(),
                          ),
                        ),
                    style: OutlinedButton.styleFrom(
                      side: const BorderSide(color: Colors.white),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                    child: const Text(
                      'SIGN IN',
                      style: TextStyle(color: Colors.white),
                    ),
                  ),
                  const SizedBox(height: 12),
                  ElevatedButton(
                    onPressed: () => Navigator.pushNamed(context, '/register'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(8),
                      ),
                      padding: const EdgeInsets.symmetric(vertical: 16),
                    ),
                    child: Text(
                      'REGISTER',
                      style: TextStyle(
                        color: _primary,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
