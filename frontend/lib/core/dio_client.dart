import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

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

  DioClient._internal() {
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          print('📡 Interceptor triggered for: ${options.uri}');
          final token = await _storage.read(key: 'access_token');
          if (token != null) {
            print('🔐 Using access token: $token');
            options.headers['Authorization'] = 'Bearer $token';
          }
          return handler.next(options);
        },
        onError: (e, handler) async {
          print('🛑 onError called with status: ${e.response?.statusCode}');
          print('⚠️ Intercepted error: ${e.response?.statusCode}');
          if (e.response != null) {
            print('🚨 Dio error status code: ${e.response?.statusCode}');
            print('🚨 Dio error data: ${e.response?.data}');
          }
          if (e.response?.statusCode == 400) {
            print('🧩 Request caused 400 error');
            print('🔍 Request path: ${e.requestOptions.path}');
            print('📦 Request data: ${e.requestOptions.data}');
            print('📨 Request headers: ${e.requestOptions.headers}');
          }
          if (e.response?.statusCode == 401) {
            final refreshToken = await _storage.read(key: 'refresh_token');
            if (refreshToken != null) {
              try {
                print('🔁 Attempting token refresh...');
                print('🔁 Using refresh token: $refreshToken');
                final refreshResponse = await _dio.post(
                  'auth/refresh',
                  data: {'refresh_token': refreshToken},
                );
                final newAccessToken = refreshResponse.data['access_token'];
                print('✅ New access token: $newAccessToken');
                await _storage.write(
                  key: 'access_token',
                  value: newAccessToken,
                );
                e.requestOptions.headers['Authorization'] =
                    'Bearer $newAccessToken';
                final clonedRequest = await _dio.fetch(e.requestOptions);
                return handler.resolve(clonedRequest);
              } catch (refreshError) {
                print('❌ Refresh failed: $refreshError');
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
