import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:nibbles/core/constants.dart';
import 'package:nibbles/core/dio_client.dart';
import 'package:nibbles/core/logger.dart';

class AuthService {
  final Dio _dio = DioClient().client;
  final _storage = FlutterSecureStorage();
  final _logger = getLogger();
  final GoogleSignIn _googleSignIn = GoogleSignIn(
    clientId: AppConstants.googleClientId,
    scopes: ['email', 'profile'],
  );

  // Saves the access and refresh tokens to secure storage
  Future<void> _saveTokens(Map<String, dynamic> data) async {
    await _storage.write(key: 'access_token', value: data['access_token']);
    await _storage.write(key: 'refresh_token', value: data['refresh_token']);
  }

  Future<String?> _getAccessToken() async {
    try {
      return await _storage.read(key: 'access_token');
    } catch (e) {
      print('Error reading access token from secure storage: $e');
      return null;
    }
  }

  Future<bool> loginWithEmail(String email, String password) async {
    try {
      _logger.d('Attempting login with email: $email');
      final response = await _dio.post(
        'auth/login',
        data: {'email': email, 'password': password},
      );
      _logger.d('Received response: ${response.data}');
      await _saveTokens(response.data);
      return true;
    } catch (e) {
      _logger.d('Login error: $e');
      return false;
    }
  }

  Future<bool> loginWithGoogle() async {
    try {
      _logger.d('Attempting Google login');
      final googleUser = await _googleSignIn.signIn();

      if (googleUser == null) {
        _logger.d('Google sign-in was cancelled');
        return false;
      }

      final googleAuth = await googleUser.authentication;

      if (googleAuth.idToken == null) {
        _logger.d('Google idToken is null, cannot proceed');
        return false;
      }

      _logger.d('Google idToken: ${googleAuth.idToken}');

      // Send id_token to your backend
      final response = await _dio.post(
        'auth/google/token',
        data: {'idToken': googleAuth.idToken},
      );

      _logger.d('Received response: ${response.data}');
      await _saveTokens(response.data);
      return true;
    } catch (e, stackTrace) {
      _logger.d("Google login failed with error: $e");
      _logger.d("Stack trace: $stackTrace");
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
      _logger.d('Attempting registration for: $email');
      _logger.d(
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
      _logger.d('Registration response: ${response.data}');
      return true;
    } catch (e) {
      _logger.d('Registration error: $e');
      return false;
    }
  }

  Future<bool> verifyEmail(String email, String code) async {
    try {
      _logger.d('Verifying email: $email with code: $code');
      final response = await _dio.post(
        'auth/verify',
        data: {'email': email, 'code': code},
      );
      _logger.d('Verification response status: ${response.statusCode}');
      _logger.d('Received response: ${response.data}');
      await _saveTokens(response.data);
      return true;
    } catch (e) {
      _logger.d('Verification error: $e');
      return false;
    }
  }

  Future<bool> newVerification(String email) async {
    try {
      _logger.d('Requesting new verification for: $email');
      final response = await _dio.post(
        'auth/new-verification',
        data: {'email': email},
      );
      _logger.d('New verification response: ${response.statusCode}');
      return response.statusCode == 201;
    } catch (e) {
      _logger.d('New verification error: $e');
      return false;
    }
  }

  /// Check whether the current user is still logged in by calling the protected /auth/check endpoint.
  /// Returns true if the JWT is valid (HTTP 200), false otherwise.
  Future<bool> checkLoginStatus() async {
    try {
      // Call the backend check endpoint with Authorization header
      final response = await _dio.get('auth/check');

      return response.statusCode == 200;
    } catch (e) {
      print('Login status check failed: $e');
      return false;
    }
  }

  Future<Map<String, dynamic>> getUserProfile() async {
    try {
      final token = await _getAccessToken();
      if (token == null) throw Exception('Not authenticated');

      final response = await _dio.get(
        'user/profile',
        options: Options(headers: {'Authorization': 'Bearer $token'}),
      );

      if (response.statusCode == 200) {
        return Map<String, dynamic>.from(response.data);
      } else {
        throw Exception('Failed to fetch profile: ${response.statusCode}');
      }
    } on DioException catch (e) {
      throw Exception(
        'Profile fetch failed: ${e.response?.data['message'] ?? e.message}',
      );
    } catch (e) {
      print('Error: $e'); // Add this line
      throw Exception('Failed to get profile: $e');
    }
  }
}
