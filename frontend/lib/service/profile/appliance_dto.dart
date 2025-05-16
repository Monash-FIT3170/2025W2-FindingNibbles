class ApplianceRequirementDto {
  final int? id; // Optional for new entries
  final String name;
  final String? description;

  ApplianceRequirementDto({this.id, required this.name, this.description});

  // Factory method to create a DTO from JSON
  factory ApplianceRequirementDto.fromJson(Map<String, dynamic> json) {
    return ApplianceRequirementDto(
      id: json['id'] as int?,
      name: json['name'] as String,
      description: json['description'] as String?,
    );
  }

  // Method to convert the DTO to JSON
  Map<String, dynamic> toJson() {
    return {'id': id, 'name': name, 'description': description};
  }
}