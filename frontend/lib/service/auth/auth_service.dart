import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:nibbles/core/dio_client.dart';

class AuthService {
  final Dio _dio = DioClient().client;
  final _storage = FlutterSecureStorage();
  final GoogleSignIn _googleSignIn = GoogleSignIn(
    clientId: 'to_do',
    scopes: ['email', 'profile'],
  );

  // Saves the access and refresh tokens to secure storage
  Future<void> _saveTokens(Map<String, dynamic> data) async {
    await _storage.write(key: 'access_token', value: data['access_token']);
    await _storage.write(key: 'refresh_token', value: data['refresh_token']);
  }

  Future<bool> loginWithEmail(String email, String password) async {
    try {
      print('Attempting login with email: $email');
      final response = await _dio.post(
        'auth/login',
        data: {'email': email, 'password': password},
      );
      print('Received response: ${response.data}');
      await _saveTokens(response.data);
      return true;
    } catch (e) {
      print('Login error: $e');
      return false;
    }
  }

  Future<bool> loginWithGoogle() async {
    try {
      print('Attempting Google login');
      final googleUser = await _googleSignIn.signIn();

      if (googleUser == null) {
        print('Google sign-in was cancelled');
        return false;
      }

      final googleAuth = await googleUser.authentication;

      if (googleAuth.idToken == null) {
        print('Google idToken is null, cannot proceed');
        return false;
      }

      print('Google idToken: ${googleAuth.idToken}');

      // Send id_token to your backend
      final response = await _dio.post(
        'auth/google/token',
        data: {'idToken': googleAuth.idToken},
      );

      print('Received response: ${response.data}');
      await _saveTokens(response.data);
      return true;
    } catch (e, stackTrace) {
      print("Google login failed with error: $e");
      print("Stack trace: $stackTrace");
      return false;
    }
  }

  Future<bool> registerWithEmail(
    String email,
    String firstName,
    String lastName,
    String password,
  ) async {
    try {
      print('Attempting registration for: $email');
      print(
        'Registration payload: {email: $email, firstName: $firstName, lastName: $lastName, password: $password}',
      );
      final response = await _dio.post(
        'auth/register',
        data: {
          'email': email,
          'firstName': firstName,
          'lastName': lastName,
          'password': password,
        },
      );
      print('Registration response: ${response.data}');
      return true;
    } catch (e) {
      print('Registration error: $e');
      return false;
    }
  }

  Future<bool> verifyEmail(String email, String code) async {
    try {
      print('Verifying email: $email with code: $code');
      final response = await _dio.post(
        'auth/verify',
        data: {'email': email, 'code': code},
      );
      print('Verification response status: ${response.statusCode}');
      print('Received response: ${response.data}');
      await _saveTokens(response.data);
      return true;
    } catch (e) {
      print('Verification error: $e');
      return false;
    }
  }

  Future<bool> newVerification(String email) async {
    try {
      print('Requesting new verification for: $email');
      final response = await _dio.post(
        'auth/new-verification',
        data: {'email': email},
      );
      print('New verification response: ${response.statusCode}');
      return response.statusCode == 201;
    } catch (e) {
      print('New verification error: $e');
      return false;
    }
  }
}
