import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:nibbles/core/logger.dart';

class DioClient {
  static final DioClient _instance = DioClient._internal();
  factory DioClient() => _instance;

  final Dio _dio = Dio(
    BaseOptions(
      baseUrl: 'http://localhost:3000/api/',
      connectTimeout: const Duration(seconds: 10),
      receiveTimeout: const Duration(seconds: 10),
      validateStatus: (status) => status != null && status < 400,
    ),
  );

  final _storage = FlutterSecureStorage();
  final _logger = getLogger();

  DioClient._internal() {
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          _logger.d('📡 Interceptor triggered for: ${options.uri}');
          final token = await _storage.read(key: 'access_token');
          if (token != null) {
            _logger.d('🔐 Using access token: $token');
            options.headers['Authorization'] = 'Bearer $token';
          }
          return handler.next(options);
        },
        onError: (e, handler) async {
          _logger.d('🛑 onError called with status: ${e.response?.statusCode}');
          _logger.d('⚠️ Intercepted error: ${e.response?.statusCode}');
          if (e.response != null) {
            _logger.d('🚨 Dio error status code: ${e.response?.statusCode}');
            _logger.d('🚨 Dio error data: ${e.response?.data}');
          }
          if (e.response?.statusCode == 400) {
            _logger.d('🧩 Request caused 400 error');
            _logger.d('🔍 Request path: ${e.requestOptions.path}');
            _logger.d('📦 Request data: ${e.requestOptions.data}');
            _logger.d('📨 Request headers: ${e.requestOptions.headers}');
          }
          if (e.response?.statusCode == 401) {
            final refreshToken = await _storage.read(key: 'refresh_token');
            if (refreshToken != null) {
              try {
                _logger.d('🔁 Attempting token refresh...');
                _logger.d('🔁 Using refresh token: $refreshToken');
                final refreshResponse = await _dio.post(
                  'auth/refresh',
                  data: {'refresh_token': refreshToken},
                );
                final newAccessToken = refreshResponse.data['access_token'];
                _logger.d('✅ New access token: $newAccessToken');
                await _storage.write(
                  key: 'access_token',
                  value: newAccessToken,
                );
                e.requestOptions.headers['Authorization'] =
                    'Bearer $newAccessToken';
                final clonedRequest = await _dio.fetch(e.requestOptions);
                return handler.resolve(clonedRequest);
              } catch (refreshError) {
                _logger.d('❌ Refresh failed: $refreshError');
                return handler.reject(refreshError as DioException);
              }
            }
          }
          return handler.next(e);
        },
      ),
    );
  }

  Dio get client => _dio;
}
