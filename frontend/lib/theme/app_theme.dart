import 'package:flutter/material.dart';

/// Application theme constants and color scheme
class AppTheme {
  // Primary brand colors
  static const Color primaryColor = Color(0xFFB4435C);
  static const Color secondaryColor = Color(0xFFF4CDD5);
  static const Color signInColor = Color(0xFF8B4B57);

  // Neutral colors
  static const Color backgroundColor = Colors.white;
  static const Color surfaceColor = Colors.white;
  static const Color errorColor = Color(0xFFB00020);

  // Text colors
  static const Color textPrimary = Colors.black;
  static const Color textSecondary = Colors.black87;
  static const Color textDisabled = Colors.black38;
  static const Color textBody = Colors.black;
  static const Color textOnPrimary = Colors.white;
  static const Color textPrimaryColour = Color(0xFFB4435C);

  // Get the app's color scheme
  static ColorScheme get colorScheme => const ColorScheme(
    brightness: Brightness.light,
    primary: primaryColor,
    onPrimary: Colors.white,
    secondary: secondaryColor,
    onSecondary: Colors.black,
    error: errorColor,
    onError: Colors.white,
    surface: surfaceColor,
    onSurface: textPrimary,
  );

  // Get the app's text theme
  static TextTheme get textTheme => Typography.blackCupertino.copyWith(
    headlineLarge: const TextStyle(
      fontSize: 32,
      fontWeight: FontWeight.bold,
      color: textOnPrimary,
    ),
    headlineMedium: const TextStyle(
      fontSize: 28,
      fontWeight: FontWeight.bold,
      color: textOnPrimary,
    ),
    headlineSmall: const TextStyle(
      fontSize: 24,
      fontWeight: FontWeight.bold,
      color: textOnPrimary,
    ),
    titleLarge: const TextStyle(
      fontSize: 22,
      fontWeight: FontWeight.w600,
      color: textPrimary,
    ),
    titleMedium: const TextStyle(
      fontSize: 18,
      fontWeight: FontWeight.w600,
      color: textPrimary,
    ),
    titleSmall: const TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.bold,
      color: textPrimary,
    ),
    bodyLarge: const TextStyle(fontSize: 16, color: textPrimary),
    bodyMedium: const TextStyle(fontSize: 16, color: textBody),
    bodySmall: const TextStyle(fontSize: 14, color: textPrimary),
    labelLarge: const TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.w600,
      color: textPrimary,
    ),
    displaySmall: const TextStyle(
      color: textPrimary,
      fontWeight: FontWeight.w600,
    ),
  );

  // Get the complete theme data
  static ThemeData get themeData => ThemeData(
    colorScheme: colorScheme,
    textTheme: textTheme,
    scaffoldBackgroundColor: backgroundColor,
    appBarTheme: const AppBarTheme(
      backgroundColor: primaryColor,
      foregroundColor: Colors.white,
      elevation: 0,
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: primaryColor,
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
        elevation: 0,
      ),
    ),
    outlinedButtonTheme: OutlinedButtonThemeData(
      style: OutlinedButton.styleFrom(
        side: BorderSide(color: colorScheme.surface, width: 2),
        foregroundColor: colorScheme.onPrimary,
        padding: const EdgeInsets.symmetric(vertical: 16),
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(28)),
      ),
    ),
    textButtonTheme: TextButtonThemeData(
      style: TextButton.styleFrom(foregroundColor: primaryColor),
    ),
    inputDecorationTheme: InputDecorationTheme(
      labelStyle: const TextStyle(
        color: primaryColor,
        fontWeight: FontWeight.w600,
      ),
      hintStyle: TextStyle(color: textPrimary, fontSize: 14),
      filled: true,
      fillColor: Colors.grey.shade100,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: BorderSide.none,
      ),
      enabledBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: BorderSide.none,
      ),
      focusedBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: const BorderSide(color: primaryColor, width: 2),
      ),
      errorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: BorderSide(color: errorColor),
      ),
      focusedErrorBorder: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: BorderSide(color: errorColor, width: 2),
      ),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 20),
    ),
    chipTheme: ChipThemeData(
      labelStyle: TextStyle(color: colorScheme.onSurface),
      secondaryLabelStyle: TextStyle(color: colorScheme.onPrimary),
      selectedColor: colorScheme.primary,
      checkmarkColor: colorScheme.onPrimary,
      shape: RoundedRectangleBorder(
        side: BorderSide(color: colorScheme.primary, width: 1.5),
        borderRadius: BorderRadius.circular(12),
      ),
    ),
    cardTheme: CardTheme(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
    ),
  );
}
