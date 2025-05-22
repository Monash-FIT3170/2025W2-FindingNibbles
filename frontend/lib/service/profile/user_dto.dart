class UserDto {
  final String? firstName;
  final String? lastName;
  final String? email;
  final String? password;
  final bool? isVerified;
  final int? verifyCode;
  final String? provider;
  final String? providerId;
  final List<int>? userCuisinePreferences;

  UserDto({
    this.firstName,
    this.lastName,
    this.email,
    this.password,
    this.isVerified,
    this.verifyCode,
    this.provider,
    this.providerId,
    this.userCuisinePreferences,
  });

  /// Creates DTO from JSON map.
  factory UserDto.fromJson(Map<String, dynamic> json) {
    return UserDto(
      firstName: json['firstName'] as String?,
      lastName: json['lastName'] as String?,
      email: json['email'] as String?,
      password: json['password'] as String?,
      isVerified: json['isVerified'] as bool?,
      verifyCode: json['verifyCode'] as int?,
      provider: json['provider'] as String?,
      providerId: json['providerId'] as String?,
      userCuisinePreferences:
          (json['userCuisinePreferences'] as List<dynamic>?)
              ?.map((e) => e as int)
              .toList(),
    );
  }

  /// Converts this DTO to JSON map, omitting null fields.
  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};
    if (firstName != null) data['firstName'] = firstName;
    if (lastName != null) data['lastName'] = lastName;
    if (email != null) data['email'] = email;
    if (password != null) data['password'] = password;
    if (isVerified != null) data['isVerified'] = isVerified;
    if (verifyCode != null) data['verifyCode'] = verifyCode;
    if (provider != null) data['provider'] = provider;
    if (providerId != null) data['providerId'] = providerId;
    if (userCuisinePreferences != null) {
      data['userCuisinePreferences'] = userCuisinePreferences;
    }
    return data;
  }
}

class updateUserDto {
  final String? firstName;
  final String? lastName;
  final String? email;

  updateUserDto({this.firstName, this.lastName, this.email});

  factory updateUserDto.fromJson(Map<String, dynamic> json) {
    return updateUserDto(
      firstName: json['firstName'] as String?,
      lastName: json['lastName'] as String?,
      email: json['email'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};
    if (firstName != null) data['firstName'] = firstName;
    if (lastName != null) data['lastName'] = lastName;
    if (email != null) data['email'] = email;

    return data;
  }
}
