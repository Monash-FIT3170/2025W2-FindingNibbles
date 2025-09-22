// lib/pages/verification_code_page.dart
import 'package:flutter/material.dart';
import 'package:nibbles/navigation/app_navigation.dart';
import 'package:nibbles/service/auth/auth_service.dart';
import 'package:nibbles/theme/app_theme.dart';

class VerificationCodePage extends StatefulWidget {
  final String email; // Pass the email to this page
  const VerificationCodePage({super.key, required this.email});

  @override
  VerificationCodePageState createState() => VerificationCodePageState();
}

class VerificationCodePageState extends State<VerificationCodePage> {
  final _codeController = TextEditingController();
  final AuthService _authService = AuthService();
  late String _email;

  @override
  void initState() {
    super.initState();
    _email = widget.email;
  }

  void _verifyCode() async {
    final code = _codeController.text.trim();
    if (code.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please enter the verification code')),
      );
      return;
    }

    final success = await _authService.verifyEmail(_email, code);
    if (!mounted) return; // Check if widget is still mounted

    if (success) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (_) => const AppNavigation()),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Invalid verification code')),
      );
    }
  }

  void _resendCode() async {
    final success = await _authService.newVerification(_email);
    if (!mounted) return; // Check if widget is still mounted

    if (success) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text('Verification code resent')));
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Failed to resend verification code')),
      );
    }
  }

  void _changeEmailDialog() async {
    final controller = TextEditingController(text: _email);
    final result = await showDialog<String>(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text('Change Email'),
          content: TextField(
            controller: controller,
            decoration: const InputDecoration(labelText: 'New Email'),
            keyboardType: TextInputType.emailAddress,
            autofocus: true,
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.pop(context),
              child: const Text('Cancel'),
            ),
            ElevatedButton(
              onPressed: () {
                final newEmail = controller.text.trim();
                if (newEmail.isNotEmpty && newEmail != _email) {
                  Navigator.pop(context, newEmail);
                } else {
                  Navigator.pop(context);
                }
              },
              child: const Text('Update'),
            ),
          ],
        );
      },
    );
    if (result != null && result.isNotEmpty && result != _email) {
      setState(() {
        _email = result;
      });
      // Send new verification code to new email
      _resendCode();
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
                  child: Column(
                    children: [
                      Text(
                        'Verify Your Email',
                        style: AppTheme.textTheme.headlineMedium?.copyWith(
                          color: Colors.white,
                        ),
                        textAlign: TextAlign.center,
                      ),
                      const SizedBox(height: 16),
                      Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 8),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Flexible(
                              child: Text(
                                'We sent a code to $_email',
                                style: AppTheme.textTheme.headlineSmall
                                    ?.copyWith(color: Colors.white70),
                                textAlign: TextAlign.center,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                            IconButton(
                              icon: const Icon(
                                Icons.edit,
                                color: Colors.white70,
                                size: 20,
                              ),
                              tooltip: 'Change email',
                              onPressed: _changeEmailDialog,
                            ),
                          ],
                        ),
                      ),
                    ],
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
                color: AppTheme.backgroundColor,
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
                    Text(
                      'Enter the 8-digit code below:',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w500,
                        color: AppTheme.textSecondary,
                      ),
                    ),
                    const SizedBox(height: 24),

                    // Verification code field
                    TextField(
                      controller: _codeController,
                      keyboardType: TextInputType.number,
                      maxLength: 8,
                      decoration: InputDecoration(
                        labelText: 'Verification Code',
                      ),
                    ),
                    const SizedBox(height: 36),

                    // Verify button
                    SizedBox(
                      height: 56,
                      child: ElevatedButton(
                        onPressed: _verifyCode,
                        child: const Text(
                          'VERIFY',
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),

                    // Resend code
                    Center(
                      child: TextButton(
                        onPressed: _resendCode,
                        style: TextButton.styleFrom(
                          foregroundColor: AppTheme.textPrimaryColour,
                        ),
                        child: const Text(
                          'Resend code',
                          style: TextStyle(fontWeight: FontWeight.w600),
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
