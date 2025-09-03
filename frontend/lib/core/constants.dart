import 'package:latlong2/latlong.dart';

class AppConstants {
  // iOS Client ID
  static const String googleClientIdIOS =
      '1054514268037-m5797qhoes139be9tbph112nv1dseif6.apps.googleusercontent.com';

  // Web Client ID
  static const String googleClientIdWeb =
      '1054514268037-8ftrjva5bdb3tns5e3h9mupksgqgq3jo.apps.googleusercontent.com';

  // Android Client ID
  static const String googleClientIdAndroid =
      '1054514268037-t9vo1ajbisadcae1hr8gm3scpgs0vf4h.apps.googleusercontent.com';

  static const LatLng defaultMapInitialCenter = LatLng(
    -37.8136, // Latitude for Melbourne
    144.9631, // Longitude for Melbourne
  );
}
