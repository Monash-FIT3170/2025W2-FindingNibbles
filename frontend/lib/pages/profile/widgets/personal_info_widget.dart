import 'package:flutter/material.dart';
import 'package:nibbles/pages/profile/change_password_page.dart';

class PersonalInfo extends StatefulWidget {
  final Map<String, dynamic> user;
  final Function(String, String)?
  onUpdateField; // Callback for when a field is updated - Function (fieldName, newFieldValue)

  const PersonalInfo({Key? key, required this.user, this.onUpdateField})
    : super(key: key);

  @override
  State<PersonalInfo> createState() => _PersonalInfoState();
}

class _PersonalInfoState extends State<PersonalInfo> {
  final Map<String, TextEditingController> _controllers =
      {}; // Map to hold all texting editing controllers for user fields
  final Map<String, bool> _isEditing =
      {}; // Map to track whether each field is currently being edited
  final FocusNode _textFieldFocusNode =
      FocusNode(); // Manages which text field is currently active or 'focused'

  @override
  void initState() {
    super.initState();
    _controllers['firstName'] = TextEditingController(
      text: widget.user['firstName'] ?? '',
    );
    _controllers['lastName'] = TextEditingController(
      text: widget.user['lastName'] ?? '',
    );
    _controllers['email'] = TextEditingController(
      text: widget.user['email'] ?? '',
    );
    _isEditing['firstName'] = false;
    _isEditing['lastName'] = false;
    _isEditing['email'] = false;
  }

  @override
  Widget build(BuildContext context) {
    final primary = Theme.of(context).primaryColor;
    return Column(
      children: [
        const CircleAvatar(radius: 48, child: Icon(Icons.person, size: 48)),
        const SizedBox(height: 24),
        _buildInfoTile('First Name', 'firstName', primary),
        _buildInfoTile('Last Name', 'lastName', primary),
        _buildInfoTile('Email', 'email', primary),
        const SizedBox(height: 10),
        Card(
          margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          child: ListTile(
            leading: Icon(Icons.lock_outline, color: primary),
            title: const Text('Change Password'),
            trailing: const Icon(Icons.arrow_forward_ios, size: 16),
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const ChangePasswordPage()),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildInfoTile(String label, String fieldName, Color primary) {
    return Column(
      children: [
        ListTile(
          title: Text(label, style: TextStyle(color: primary)),
          subtitle:
              _isEditing[fieldName]!
                  ? TextFormField(
                    controller: _controllers[fieldName],
                    focusNode: _textFieldFocusNode,
                    decoration: const InputDecoration(
                      border: InputBorder.none,
                      isCollapsed: true, // to reduce extra padding
                    ),
                    onFieldSubmitted: (value) {
                      setState(() {
                        _isEditing[fieldName] = false;
                      });
                      widget.onUpdateField?.call(fieldName, value);
                    },
                  )
                  : Text(_controllers[fieldName]!.text),
          trailing: IconButton(
            icon: Icon(
              _isEditing[fieldName]! ? Icons.check : Icons.edit,
              color: primary,
            ),
            onPressed: () {
              setState(() {
                _isEditing[fieldName] = !_isEditing[fieldName]!;
                if (_isEditing[fieldName]!) {
                  WidgetsBinding.instance.addPostFrameCallback((_) {
                    FocusScope.of(context).requestFocus(_textFieldFocusNode);
                  });
                } else {
                  widget.onUpdateField?.call(
                    fieldName,
                    _controllers[fieldName]!.text,
                  );
                }
              });
            },
          ),
        ),
        const Divider(height: 0),
      ],
    );
  }
}
