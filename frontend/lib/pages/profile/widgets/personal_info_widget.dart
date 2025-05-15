import 'package:flutter/material.dart';

class PersonalInfo extends StatefulWidget {
  final Map<String, dynamic> user;
  final Function(String, String)? onUpdateField; // Callback for when a field is updated - Function (fieldName, newFieldValue)

  const PersonalInfo({Key? key, required this.user, this.onUpdateField}) : super(key: key);

  @override
  State<PersonalInfo> createState() => _PersonalInfoState();
}

class _PersonalInfoState extends State<PersonalInfo> {
  final Map<String, TextEditingController> _controllers = {}; // Map to hold all texting editing controllers for user fields
  final Map<String, bool> _isEditing = {}; // Map to track whether each field is currently being edited
  final FocusNode _textFieldFocusNode = FocusNode(); // Manages which text field is currently active or 'focused'

  @override
  void initState(){
    super.initState();
    _controllers['firstName'] = TextEditingController(text: widget.user['firstName'] ?? '');
    _controllers['lastName'] = TextEditingController(text: widget.user['lastName'] ?? '');
    _controllers['email'] = TextEditingController(text: widget.user['email'] ?? '');
    _isEditing['firstName'] = false;
    _isEditing['lastName'] = false;
    _isEditing['email'] = false;
  }



  @override
  Widget build(BuildContext context) {
    return Stack(
      alignment: Alignment.center,
      clipBehavior: Clip.none,
      children: [
        Container(
          margin: const EdgeInsets.only(top: 50),
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 60),
          decoration: BoxDecoration(
            color: const Color(0xFFF2F2F2),
            borderRadius: const BorderRadius.only(
              topLeft: Radius.circular(24),
              topRight: Radius.circular(24),
            ),
          ),
          child: Column(
            children: [
              const SizedBox(height: 40),
              _buildInfoTile('First Name', 'firstName'),
              _buildInfoTile('Last Name', 'lastName'),
              _buildInfoTile('Email', 'email'),
              const SizedBox(height: 30),
              ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.lock_outline),
                label: const Text('Change Password'),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.grey[700],
                  foregroundColor: Colors.white,
                  minimumSize: const Size(double.infinity, 50),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(16),
                  ),
                ),
              ),
              const SizedBox(height: 20),
            ],
          ),
        ),
        Positioned(
          top: 0,
          child: Stack(
            alignment: Alignment.bottomRight,
            children: [
              CircleAvatar(radius: 60, backgroundColor: Colors.orange[100]),
              Positioned(
                right: 0,
                bottom: 4,
                child: Container(
                  decoration: const BoxDecoration(
                    color: Colors.indigo,
                    shape: BoxShape.circle,
                  ),
                  padding: const EdgeInsets.all(6),
                  child: const Icon(Icons.edit, size: 16, color: Colors.white),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildInfoTile(
    String label,
    String fieldName
  ) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6.0),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.2),
              blurRadius: 5,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    label,
                    style: const TextStyle(
                      color: Color(0xFFAD2C50),
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  _isEditing[fieldName]! // if the user is editing this field
                        ? TextFormField(
                          controller: _controllers[fieldName], // links back to _controllers which stores all text entered by users in each field
                          decoration: const InputDecoration(border: InputBorder.none),
                          focusNode: _textFieldFocusNode,
                          onFieldSubmitted: (value) {
                            setState(() {
                              _isEditing[fieldName] = false;
                            });
                            widget.onUpdateField?.call(fieldName, value);
                          },
                        )
                      : Text(_controllers[fieldName]!.text,
                          style: const TextStyle(color: Colors.grey)),
                ],
              ),
            ),
            GestureDetector(
              onTap: () {
                setState(() {
                  _isEditing[fieldName] = !_isEditing[fieldName]!;
                  if (_isEditing[fieldName]!) {
                    WidgetsBinding.instance.addPostFrameCallback((_) {
                      FocusScope.of(context).requestFocus(_textFieldFocusNode);
                    });
                  } else {
                    widget.onUpdateField?.call(fieldName, _controllers[fieldName]!.text);
                  }
                });
              },
              child: Icon(_isEditing[fieldName]! ? Icons.check : Icons.edit,
                  color: Color(0xFFAD2C50)),
            ),
          ],
        ),
      ),
    );
  }
}
