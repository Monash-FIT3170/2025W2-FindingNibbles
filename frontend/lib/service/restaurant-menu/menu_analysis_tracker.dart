import 'dart:async';
import 'package:flutter/foundation.dart';

/// Callback type for navigation to restaurant details
typedef NavigateToRestaurantCallback =
    void Function(int restaurantId, String restaurantName);

/// Data class to hold restaurant info for notifications
class RestaurantAnalysisInfo {
  final int restaurantId;
  final String restaurantName;

  RestaurantAnalysisInfo({
    required this.restaurantId,
    required this.restaurantName,
  });
}

/// Singleton service to track ongoing menu analysis operations
class MenuAnalysisTracker extends ChangeNotifier {
  static final MenuAnalysisTracker _instance = MenuAnalysisTracker._internal();

  factory MenuAnalysisTracker() => _instance;

  MenuAnalysisTracker._internal();

  // Map of restaurantId to analysis status
  final Map<int, MenuAnalysisStatus> _analysisStatus = {};

  // Map of restaurantId to restaurant info
  final Map<int, RestaurantAnalysisInfo> _restaurantInfo = {};

  // Stream controllers for real-time updates
  final Map<int, StreamController<MenuAnalysisStatus>> _controllers = {};

  // Stream controller for completion notifications
  final StreamController<RestaurantAnalysisInfo> _completionController =
      StreamController<RestaurantAnalysisInfo>.broadcast();

  /// Stream of restaurant analysis completions for showing notifications
  Stream<RestaurantAnalysisInfo> get completionStream =>
      _completionController.stream;

  /// Start tracking an analysis for a restaurant
  void startAnalysis(int restaurantId, String restaurantName) {
    _analysisStatus[restaurantId] = MenuAnalysisStatus.analyzing;
    _restaurantInfo[restaurantId] = RestaurantAnalysisInfo(
      restaurantId: restaurantId,
      restaurantName: restaurantName,
    );
    _getOrCreateController(restaurantId).add(MenuAnalysisStatus.analyzing);
    notifyListeners();
  }

  /// Mark analysis as complete for a restaurant
  void completeAnalysis(int restaurantId) {
    _analysisStatus[restaurantId] = MenuAnalysisStatus.completed;
    _getOrCreateController(restaurantId).add(MenuAnalysisStatus.completed);

    // Emit completion notification
    final info = _restaurantInfo[restaurantId];
    if (info != null) {
      _completionController.add(info);
    }

    notifyListeners();

    // Auto-clear after a delay
    Future.delayed(const Duration(seconds: 5), () {
      clearAnalysis(restaurantId);
    });
  }

  /// Mark analysis as failed for a restaurant
  void failAnalysis(int restaurantId, String error) {
    _analysisStatus[restaurantId] = MenuAnalysisStatus.failed;
    _getOrCreateController(restaurantId).add(MenuAnalysisStatus.failed);
    notifyListeners();

    // Auto-clear after a delay
    Future.delayed(const Duration(seconds: 5), () {
      clearAnalysis(restaurantId);
    });
  }

  /// Clear analysis status for a restaurant
  void clearAnalysis(int restaurantId) {
    _analysisStatus.remove(restaurantId);
    _restaurantInfo.remove(restaurantId);
    _controllers[restaurantId]?.add(MenuAnalysisStatus.idle);
    notifyListeners();
  }

  /// Get restaurant info for a restaurant ID
  RestaurantAnalysisInfo? getRestaurantInfo(int restaurantId) {
    return _restaurantInfo[restaurantId];
  }

  /// Get current status for a restaurant
  MenuAnalysisStatus getStatus(int restaurantId) {
    return _analysisStatus[restaurantId] ?? MenuAnalysisStatus.idle;
  }

  /// Check if analysis is in progress
  bool isAnalyzing(int restaurantId) {
    return _analysisStatus[restaurantId] == MenuAnalysisStatus.analyzing;
  }

  /// Get a stream for a specific restaurant's analysis status
  Stream<MenuAnalysisStatus> getStatusStream(int restaurantId) {
    return _getOrCreateController(restaurantId).stream;
  }

  StreamController<MenuAnalysisStatus> _getOrCreateController(
    int restaurantId,
  ) {
    if (!_controllers.containsKey(restaurantId)) {
      _controllers[restaurantId] =
          StreamController<MenuAnalysisStatus>.broadcast();
    }
    return _controllers[restaurantId]!;
  }

  @override
  void dispose() {
    for (var controller in _controllers.values) {
      controller.close();
    }
    _controllers.clear();
    _completionController.close();
    super.dispose();
  }
}

enum MenuAnalysisStatus { idle, analyzing, completed, failed }
