class GetBestDishRequestDto {
  final List<String> dietaryRequirements;

  GetBestDishRequestDto({required this.dietaryRequirements});

  Map<String, dynamic> toJson() {
    return {'dietaryRequirements': dietaryRequirements};
  }
}

class BestDishDto {
  final int id;
  final String name;
  final String? description;
  final double? price;
  final String? category;
  final List<String> dietaryTags;
  final int restaurantId;
  final String restaurantName;

  BestDishDto({
    required this.id,
    required this.name,
    this.description,
    this.price,
    this.category,
    required this.dietaryTags,
    required this.restaurantId,
    required this.restaurantName,
  });

  factory BestDishDto.fromJson(Map<String, dynamic> json) {
    return BestDishDto(
      id: json['id'] as int,
      name: json['name'] as String,
      description: json['description'] as String?,
      price: (json['price'] as num?)?.toDouble(),
      category: json['category'] as String?,
      dietaryTags:
          (json['dietaryTags'] as List<dynamic>)
              .map((tag) => tag as String)
              .toList(),
      restaurantId: json['restaurantId'] as int,
      restaurantName: json['restaurantName'] as String,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'price': price,
      'category': category,
      'dietaryTags': dietaryTags,
      'restaurantId': restaurantId,
      'restaurantName': restaurantName,
    };
  }
}

class GetBestDishSuccessResponseDto {
  final bool success;
  final BestDishDto dish;
  final String message;

  GetBestDishSuccessResponseDto({
    required this.success,
    required this.dish,
    required this.message,
  });

  factory GetBestDishSuccessResponseDto.fromJson(Map<String, dynamic> json) {
    return GetBestDishSuccessResponseDto(
      success: json['success'] as bool,
      dish: BestDishDto.fromJson(json['dish'] as Map<String, dynamic>),
      message: json['message'] as String,
    );
  }
}

class GetBestDishErrorResponseDto {
  final bool success;
  final String error;
  final String message;
  final List<String> requestedDietaryRequirements;
  final int restaurantId;

  GetBestDishErrorResponseDto({
    required this.success,
    required this.error,
    required this.message,
    required this.requestedDietaryRequirements,
    required this.restaurantId,
  });

  factory GetBestDishErrorResponseDto.fromJson(Map<String, dynamic> json) {
    return GetBestDishErrorResponseDto(
      success: json['success'] as bool,
      error: json['error'] as String,
      message: json['message'] as String,
      requestedDietaryRequirements:
          (json['requestedDietaryRequirements'] as List<dynamic>)
              .map((req) => req as String)
              .toList(),
      restaurantId: json['restaurantId'] as int,
    );
  }
}

/// Union type for the API response - either success or error
class GetBestDishResponseDto {
  final GetBestDishSuccessResponseDto? success;
  final GetBestDishErrorResponseDto? error;

  GetBestDishResponseDto._({this.success, this.error});

  factory GetBestDishResponseDto.success(
    GetBestDishSuccessResponseDto response,
  ) {
    return GetBestDishResponseDto._(success: response);
  }

  factory GetBestDishResponseDto.error(GetBestDishErrorResponseDto response) {
    return GetBestDishResponseDto._(error: response);
  }

  factory GetBestDishResponseDto.fromJson(Map<String, dynamic> json) {
    if (json['success'] == true) {
      return GetBestDishResponseDto.success(
        GetBestDishSuccessResponseDto.fromJson(json),
      );
    } else {
      return GetBestDishResponseDto.error(
        GetBestDishErrorResponseDto.fromJson(json),
      );
    }
  }

  bool get isSuccess => success != null;
  bool get isError => error != null;
}
