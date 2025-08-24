/// DTO for Google Places autocomplete results
class GooglePlacesAutocompleteDto {
  final String placeId;
  final String description;
  final GooglePlacesStructuredFormattingDto structuredFormatting;
  final List<String> types;

  GooglePlacesAutocompleteDto({
    required this.placeId,
    required this.description,
    required this.structuredFormatting,
    required this.types,
  });

  factory GooglePlacesAutocompleteDto.fromJson(Map<String, dynamic> json) {
    return GooglePlacesAutocompleteDto(
      placeId: json['place_id'] ?? '',
      description: json['description'] ?? '',
      structuredFormatting: GooglePlacesStructuredFormattingDto.fromJson(
        json['structured_formatting'] ?? {},
      ),
      types: json['types'] != null ? List<String>.from(json['types']) : [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'place_id': placeId,
      'description': description,
      'structured_formatting': structuredFormatting.toJson(),
      'types': types,
    };
  }
}

class GooglePlacesStructuredFormattingDto {
  final String mainText;
  final String? secondaryText;

  GooglePlacesStructuredFormattingDto({
    required this.mainText,
    this.secondaryText,
  });

  factory GooglePlacesStructuredFormattingDto.fromJson(
    Map<String, dynamic> json,
  ) {
    return GooglePlacesStructuredFormattingDto(
      mainText: json['main_text'] ?? '',
      secondaryText: json['secondary_text'],
    );
  }

  Map<String, dynamic> toJson() {
    return {'main_text': mainText, 'secondary_text': secondaryText};
  }
}
