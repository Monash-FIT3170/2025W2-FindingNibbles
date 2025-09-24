// lib/pages/create_account_page.dart
import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:nibbles/pages/auth/login_page.dart';
import 'package:nibbles/pages/auth/verification_code_page.dart';
import 'package:nibbles/service/auth/auth_service.dart';
import 'package:nibbles/theme/app_theme.dart';

class CreateAccountPage extends StatefulWidget {
  const CreateAccountPage({super.key});

  @override
  State<CreateAccountPage> createState() => _CreateAccountPageState();
}

class _CreateAccountPageState extends State<CreateAccountPage> {
  final firstNameController = TextEditingController();
  final lastNameController = TextEditingController();
  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final authService = AuthService();

  // Add password validation state
  bool _isPasswordValid = true;
  String _passwordErrorMessage = '';
  bool _isPasswordFocused = false; // Track if password field is being edited

  @override
  void dispose() {
    firstNameController.dispose();
    lastNameController.dispose();
    emailController.dispose();
    passwordController.dispose();
    super.dispose();
  }

  // Password validation function
  bool _validatePassword(String password) {
    if (password.isEmpty) {
      setState(() {
        _isPasswordFocused = false; // Hide requirements for empty password
      });
      return false;
    }

    if (password.length < 8) {
      setState(() {
        _passwordErrorMessage = 'Password must be at least 8 characters';
        _isPasswordValid = false;
      });
      return false;
    }

    if (!password.contains(RegExp(r'[A-Z]'))) {
      setState(() {
        _passwordErrorMessage =
            'Password must contain at least one uppercase letter';
        _isPasswordValid = false;
      });
      return false;
    }

    if (!password.contains(RegExp(r'[!@#$%^&*(),.?":{}|<>]'))) {
      setState(() {
        _passwordErrorMessage =
            'Password must contain at least one special character';
        _isPasswordValid = false;
      });
      return false;
    }

    // Password is valid, clear any error messages
    setState(() {
      _passwordErrorMessage = '';
      _isPasswordValid = true;
      // If you want to auto-hide the requirements when valid:
      // _isPasswordFocused = false;
    });
    return true;
  }

  void register() async {
    final firstName = firstNameController.text.trim();
    final lastName = lastNameController.text.trim();
    final email = emailController.text.trim();
    final password = passwordController.text.trim();

    if (firstName.isEmpty ||
        lastName.isEmpty ||
        email.isEmpty ||
        password.isEmpty) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please fill in all fields')),
      );
      return;
    }

    // Validate password strength before submitting
    if (!_validatePassword(password)) {
      if (!mounted) return;
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text(_passwordErrorMessage)));
      return;
    }

    final success = await authService.registerWithEmail(
      email,
      firstName,
      lastName,
      password,
    );

    if (!mounted) return; // Proper check if widget is still mounted

    if (success) {
      Navigator.push(
        context,
        MaterialPageRoute(builder: (_) => VerificationCodePage(email: email)),
      );
    } else {
      // Try to resend verification if registration failed (likely user exists but not verified)
      final resendSuccess = await authService.newVerification(email);
      if (resendSuccess) {
        if (!mounted) return;
        Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => VerificationCodePage(email: email)),
        );
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Verification code resent to your email.'),
          ),
        );
      } else {
        if (!mounted) return;
        ScaffoldMessenger.of(
          context,
        ).showSnackBar(const SnackBar(content: Text('Registration failed')));
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.colorScheme.primary,
      body: Column(
        children: [
          // Top section with back button and title
          Container(
            width: double.infinity,
            padding: const EdgeInsets.only(
              top: 70,
              bottom: 60,
              left: 16,
              right: 16,
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                IconButton(
                  icon: const Icon(Icons.arrow_back, color: Colors.white),
                  onPressed: () {
                    Navigator.of(context).maybePop();
                  },
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Create your account',
                    style: AppTheme.textTheme.headlineLarge?.copyWith(
                      color: Colors.white,
                    ),
                    textAlign: TextAlign.center,
                  ),
                ),
                // Dummy box to keep title centered
                const SizedBox(width: 48),
              ],
            ),
          ),

          // Main white content with rounded top corners
          Expanded(
            child: Container(
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(32),
                  topRight: Radius.circular(32),
                ),
              ),
              child: SingleChildScrollView(
                padding: const EdgeInsets.fromLTRB(24, 36, 24, 24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    // First Name field
                    TextField(
                      controller: firstNameController,
                      decoration: InputDecoration(
                        labelText: 'First Name',
                        hintText: 'John',
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Last Name field
                    TextField(
                      controller: lastNameController,
                      decoration: InputDecoration(
                        labelText: 'Last Name',
                        hintText: 'Smith',
                      ),
                    ),
                    const SizedBox(height: 24),
                    // Email field
                    TextField(
                      controller: emailController,
                      keyboardType: TextInputType.emailAddress,
                      decoration: InputDecoration(
                        labelText: 'Email',
                        hintText: 'example@mail.com',
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Password field
                    TextField(
                      controller: passwordController,
                      obscureText: true,
                      onChanged: (value) => _validatePassword(value),
                      onTap: () {
                        setState(() {
                          _isPasswordFocused = true;
                        });
                      },
                      onEditingComplete: () {
                        setState(() {
                          _isPasswordFocused = false;
                        });
                      },
                      decoration: InputDecoration(labelText: 'Password'),
                    ),

                    // Only show password requirements during typing and only if not valid
                    if (_isPasswordFocused && !_isPasswordValid)
                      Padding(
                        padding: const EdgeInsets.only(top: 8, left: 8),
                        child: Text(
                          _passwordErrorMessage,
                          style: TextStyle(
                            color: AppTheme.colorScheme.error,
                            fontSize: 12,
                          ),
                        ),
                      ),

                    const SizedBox(height: 36),

                    // Create Account button
                    SizedBox(
                      height: 56,
                      child: ElevatedButton(
                        onPressed: register,
                        child: const Text(
                          'CREATE ACCOUNT',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Already have an account prompt
                    Center(
                      child: Text.rich(
                        TextSpan(
                          text: "Already Have an Account? ",
                          style: TextStyle(color: AppTheme.textPrimary),
                          children: [
                            TextSpan(
                              text: 'Sign In',
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
                                          builder: (_) => LoginPage(),
                                        ),
                                      );
                                    },
                            ),
                          ],
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
