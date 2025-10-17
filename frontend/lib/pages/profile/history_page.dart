// lib/pages/history_page.dart
import 'package:flutter/material.dart';
import 'package:nibbles/service/profile/history_service.dart';
import 'package:nibbles/service/profile/restaurant_dto.dart';
import 'package:nibbles/pages/profile/widgets/restaurant_card.dart';
import 'package:nibbles/theme/app_theme.dart';

class HistoryPage extends StatefulWidget {
  const HistoryPage({super.key});

  @override
  State<HistoryPage> createState() => _HistoryPageState();
}

class _HistoryPageState extends State<HistoryPage> {
  final HistoryService _historyService = HistoryService();
  List<RestaurantDto> _history = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadHistory();
  }

  Future<void> _loadHistory() async {
    final history = await _historyService.getHistory();
    setState(() {
      _history = history;
      _isLoading = false;
    });
  }

  Future<void> _clearHistory() async {
    await _historyService.clearHistory();
    setState(() => _history.clear());
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.colorScheme.primary,
      appBar: AppBar(
        backgroundColor: AppTheme.colorScheme.primary,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppTheme.surfaceColor),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          'Browsing History',
          style: TextStyle(
            color: AppTheme.surfaceColor,
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(
              Icons.delete_outline,
              color: AppTheme.surfaceColor,
            ),
            onPressed: _clearHistory,
            tooltip: 'Clear browsing history',
          ),
        ],
      ),
      body:
          _isLoading
              ? const Center(
                child: CircularProgressIndicator(color: AppTheme.surfaceColor),
              )
              : Container(
                margin: const EdgeInsets.only(top: 16),
                decoration: const BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(32),
                    topRight: Radius.circular(32),
                  ),
                ),
                child:
                    _history.isEmpty
                        ? const Center(
                          child: Text('No recently viewed restaurants.'),
                        )
                        : ListView.builder(
                          itemCount: _history.length,
                          itemBuilder: (context, index) {
                            final restaurant = _history[index];
                            return RestaurantCard(
                              restaurant: restaurant,
                              isLiked:
                                  false, // History page doesn't track likes here
                              height: 80.0,
                              onTap: () {
                                // Optional: show popup with restaurant info or do nothing
                              },
                              onFavoriteTap: () {}, // Empty function, no action
                            );
                          },
                        ),
              ),
    );
  }
}
