// lib/pages/login_page.dart
import 'package:flutter/material.dart';
import 'package:nibbles/navigation/app_navigation.dart';
import 'package:nibbles/pages/auth/create_account_page.dart';
import 'package:nibbles/service/auth/auth_service.dart';

class LoginPage extends StatelessWidget {
  const LoginPage({Key? key}) : super(key: key);
  static const _primary = Color(0xFFAD2C50);

  @override
  Widget build(BuildContext context) {
    final emailController = TextEditingController();
    final passwordController = TextEditingController();
    final authService = AuthService();

    void _login() async {
      final email = emailController.text.trim();
      final password = passwordController.text.trim();

      if (email.isEmpty || password.isEmpty) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Please fill in all fields')),
        );
        return;
      }

      final success = await authService.loginWithEmail(email, password);
      if (success) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (_) => const AppNavigation()),
        ); // Navigate to home
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Invalid email or password')),
        );
      }
    }

    void _loginWithGoogle() async {
      final success = await authService.loginWithGoogle();
      if (success) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (_) => const AppNavigation()),
        ); // Navigate to home
      } else {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('Google login failed')));
      }
    }

    return Scaffold(
      backgroundColor: _primary,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const SizedBox(height: 24),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 24),
              child: Text(
                'Sign into your account',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: Container(
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(24),
                    topRight: Radius.circular(24),
                  ),
                ),
                padding: const EdgeInsets.symmetric(
                  horizontal: 24,
                  vertical: 32,
                ),
                child: SingleChildScrollView(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.stretch,
                    children: [
                      TextField(
                        controller: emailController,
                        decoration: InputDecoration(
                          labelText: 'Email',
                          hintText: 'example@mail.com',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      TextField(
                        controller: passwordController,
                        obscureText: true,
                        decoration: InputDecoration(
                          labelText: 'Password',
                          border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Align(
                        alignment: Alignment.centerRight,
                        child: TextButton(
                          onPressed: () {},
                          child: const Text('Forgot Password?'),
                        ),
                      ),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: _login,
                        style: ElevatedButton.styleFrom(
                          backgroundColor: _primary,
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(8),
                          ),
                          padding: const EdgeInsets.symmetric(vertical: 16),
                          foregroundColor:
                              Colors.white, // Text color set to white
                        ),
                        child: const Text('SIGN IN'),
                      ),
                      const SizedBox(height: 16),
                      Center(
                        child: GestureDetector(
                          onTap:
                              () => Navigator.push(
                                context,
                                MaterialPageRoute(
                                  builder: (_) => const CreateAccountPage(),
                                ),
                              ),
                          child: const Text.rich(
                            TextSpan(
                              text: "Don't have an account? ",
                              children: [
                                TextSpan(
                                  text: 'Sign Up',
                                  style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    color: _primary,
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(height: 24),
                      Center(
                        child: OutlinedButton.icon(
                          icon: const Icon(Icons.g_mobiledata),
                          label: const Text('Continue with Google'),
                          onPressed: _loginWithGoogle,
                          style: OutlinedButton.styleFrom(
                            side: const BorderSide(color: Colors.grey),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(8),
                            ),
                            padding: const EdgeInsets.symmetric(
                              vertical: 12,
                              horizontal: 16,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
