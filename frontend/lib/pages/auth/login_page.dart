import 'package:flutter/material.dart';
import 'package:flutter/gestures.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:nibbles/core/logger.dart';
import 'package:nibbles/navigation/app_navigation.dart';
import 'package:nibbles/pages/auth/create_account_page.dart';
import 'package:nibbles/service/auth/auth_service.dart';
import 'package:nibbles/theme/app_theme.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _logger = getLogger();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final authService = AuthService();
  bool _obscurePassword = true;

  final FocusNode _passwordFocusNode = FocusNode();

  @override
  void dispose() {
    emailController.dispose();
    passwordController.dispose();
    _passwordFocusNode.dispose();
    super.dispose();
  }

  void login() async {
    final email = emailController.text.trim();
    final password = passwordController.text.trim();

    FocusScope.of(context).unfocus();

    if (email.isEmpty || password.isEmpty) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill in all fields')),
      );
      return;
    }

    final success = await authService.loginWithEmail(email, password);

    if (!mounted) return;

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

  void handleGoogleLogin(BuildContext context) async {
    try {
      final success = await authService.loginWithGoogle();
      if (!context.mounted) return;

      if (success) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (_) => const AppNavigation()),
        );
      } else {
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('Google login failed')));
      }
    } catch (e) {
      _logger.d('Error during Google login: $e');
      if (!context.mounted) return;

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('An error occurred during Google login')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.primaryColor,
      body: Column(
        children: [
          // Top section with just title
          Container(
            width: double.infinity,
            padding: const EdgeInsets.only(top: 150, bottom: 60),
            alignment: Alignment.center,
            child: Text(
              'Sign into your account',
              style: AppTheme.textTheme.headlineLarge,
              textAlign: TextAlign.center,
            ),
          ),

          // Main white content with more pronounced rounded top corners
          Expanded(
            child: Container(
              decoration: const BoxDecoration(
                color: AppTheme.backgroundColor,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(32),
                  topRight: Radius.circular(32),
                ),
              ),
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(24, 40, 24, 32),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    // Email field with floating label
                    TextField(
                      controller: emailController,
                      autocorrect: false,
                      textInputAction: TextInputAction.next,
                      onSubmitted:
                          (_) => FocusScope.of(
                            context,
                          ).requestFocus(_passwordFocusNode),
                      decoration: const InputDecoration(
                        labelText: 'Email',
                        hintText: 'example@mail.com',
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Password field with floating label
                    TextField(
                      controller: passwordController,
                      obscureText: _obscurePassword,
                      autocorrect: false,
                      focusNode: _passwordFocusNode,
                      textInputAction: TextInputAction.done,
                      onSubmitted: (_) => login(),
                      decoration: InputDecoration(
                        labelText: 'Password',
                        suffixIcon: IconButton(
                          icon: Icon(
                            _obscurePassword
                                ? Icons.visibility_off
                                : Icons.visibility,
                            color: Colors.grey,
                          ),
                          onPressed: () {
                            setState(() {
                              _obscurePassword = !_obscurePassword;
                            });
                          },
                        ),
                      ),
                    ),

                    // Forgot password aligned right
                    Align(
                      alignment: Alignment.centerRight,
                      child: TextButton(
                        onPressed: () {},
                        style: TextButton.styleFrom(
                          foregroundColor: Colors.black87,
                        ),
                        child: const Text('Forgot Password?'),
                      ),
                    ),

                    const SizedBox(height: 16),

                    // Sign In button - pill shaped and primary color
                    SizedBox(
                      height: 56,
                      child: ElevatedButton(
                        onPressed: login,
                        // The ElevatedButton style will be provided by the theme
                        child: const Text(
                          'SIGN IN',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ),

                    const SizedBox(height: 24),

                    // Sign up prompt
                    Center(
                      child: Text.rich(
                        TextSpan(
                          style: AppTheme.textTheme.bodyLarge,
                          text: "Don't Have an Account? ",
                          children: [
                            TextSpan(
                              text: 'Sign Up',
                              style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: AppTheme.colorScheme.primary,
                              ),
                              mouseCursor: SystemMouseCursors.click,
                              recognizer:
                                  TapGestureRecognizer()
                                    ..onTap = () {
                                      Navigator.pushReplacement(
                                        context,
                                        MaterialPageRoute(
                                          builder:
                                              (_) => const CreateAccountPage(),
                                        ),
                                      );
                                    },
                            ),
                          ],
                        ),
                      ),
                    ),

                    const SizedBox(height: 32),

                    // Or continue with
                    Center(
                      child: Text(
                        'Or continue with',
                        style: TextStyle(color: Colors.black54),
                      ),
                    ),

                    const SizedBox(height: 20),

                    // Google login button - with text
                    SizedBox(
                      height: 56,
                      child: OutlinedButton.icon(
                        onPressed: () => handleGoogleLogin(context),
                        icon: const Icon(
                          FontAwesomeIcons.google,
                          size: 18,
                          color: Colors.black,
                        ),
                        label: const Text(
                          'Google',
                          style: TextStyle(
                            color: AppTheme.textSecondary,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        style: OutlinedButton.styleFrom(
                          side: BorderSide(color: Colors.grey.shade300),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(28),
                          ),
                          backgroundColor: Colors.white,
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
    );
  }
}
