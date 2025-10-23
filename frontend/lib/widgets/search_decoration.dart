import 'package:flutter/material.dart';

InputDecoration buildSearchDecoration({
  required ColorScheme colorScheme,
  String? hintText,
  Widget? suffixIcon,
}) {
  return InputDecoration(
    hintText: hintText ?? 'Search...',
    labelText: hintText == null ? 'Search' : null,
    labelStyle: TextStyle(color: colorScheme.primary),
    prefixIcon: Icon(Icons.search, color: colorScheme.primary),
    suffixIcon: suffixIcon,
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide.none,
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(12),
      borderSide: BorderSide(color: colorScheme.primary, width: 2),
    ),
    filled: true,
    fillColor: Colors.grey.shade100,
    contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
  );
}
