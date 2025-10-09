class TravelPlanService {
  static final TravelPlanService _instance = TravelPlanService._internal();

  factory TravelPlanService() => _instance;
  TravelPlanService._internal();

  final List<Map<String, dynamic>> trips = [];

  void addTrip(Map<String, dynamic> trip) {
    trips.add(trip);
  }
}
