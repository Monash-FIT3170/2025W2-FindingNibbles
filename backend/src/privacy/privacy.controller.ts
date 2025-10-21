import { Controller, Get, Header, Res } from '@nestjs/common';
import { Response } from 'express';
import { Public } from '../types';

@Controller('privacy')
export class PrivacyController {
  @Public()
  @Get()
  @Header('Content-Type', 'text/html')
  getPrivacyPolicy(@Res() res: Response) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Privacy Policy - Finding Nibbles</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #2c3e50;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }
        h2 {
            color: #34495e;
            margin-top: 30px;
        }
        h3 {
            color: #7f8c8d;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #3498db;
            color: white;
        }
        tr:nth-child(even) {
            background-color: #f2f2f2;
        }
        a {
            color: #3498db;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        code {
            background-color: #f4f4f4;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        hr {
            border: none;
            border-top: 2px solid #ecf0f1;
            margin: 30px 0;
        }
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            .container {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Privacy Policy for Finding Nibbles</h1>
        
        <p><strong>Last Updated:</strong> October 21, 2025</p>
        <p><strong>Effective Date:</strong> October 21, 2025</p>
        
        <hr>
        
        <h2>Introduction</h2>
        <p>Finding Nibbles ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application Finding Nibbles (the "App").</p>
        
        <hr>
        
        <h2>Information We Collect</h2>
        
        <h3>1. Personal Information</h3>
        <p>When you create an account using Google Sign-In, we collect:</p>
        <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Profile picture (optional)</li>
            <li>Google account ID</li>
        </ul>
        
        <h3>2. Location Data</h3>
        <p>We collect approximate location data to:</p>
        <ul>
            <li>Show nearby restaurants on the map</li>
            <li>Provide location-based restaurant recommendations</li>
            <li>Calculate distances to restaurants</li>
        </ul>
        <p><strong>You can control location access through your device settings.</strong></p>
        
        <h3>3. Photos and Media</h3>
        <p>When you use the camera or photo library features:</p>
        <ul>
            <li>We access your device camera to allow you to take photos of recipes</li>
            <li>We access your photo library to allow you to select existing photos</li>
            <li>Photos you upload are stored on our servers and associated with your account</li>
        </ul>
        <p><strong>We only access photos when you explicitly use these features.</strong></p>
        
        <h3>4. Usage Data</h3>
        <p>We automatically collect:</p>
        <ul>
            <li>Recipes you view and save</li>
            <li>Restaurants you favorite</li>
            <li>Dietary preferences you set</li>
            <li>Cuisine preferences</li>
            <li>Calorie logs and meal tracking data</li>
            <li>Search queries within the app</li>
            <li>App interactions and navigation patterns</li>
        </ul>
        
        <h3>5. Device Information</h3>
        <p>We may collect:</p>
        <ul>
            <li>Device type and model</li>
            <li>Operating system version</li>
            <li>Unique device identifiers</li>
            <li>App version</li>
            <li>Crash reports and performance data</li>
        </ul>
        
        <hr>
        
        <h2>How We Use Your Information</h2>
        <p>We use the collected information to:</p>
        
        <h3>1. Provide Core Functionality:</h3>
        <ul>
            <li>Manage your account and authentication</li>
            <li>Display recipes and restaurants</li>
            <li>Save your preferences and favorites</li>
            <li>Track your calorie intake</li>
            <li>Show nearby restaurants on the map</li>
        </ul>
        
        <h3>2. Personalization:</h3>
        <ul>
            <li>Provide AI-powered recipe recommendations via Google Gemini</li>
            <li>Customize content based on your preferences</li>
            <li>Suggest meals based on your dietary requirements</li>
        </ul>
        
        <h3>3. Improve Our Services:</h3>
        <ul>
            <li>Analyze app usage patterns</li>
            <li>Fix bugs and crashes</li>
            <li>Enhance user experience</li>
            <li>Develop new features</li>
        </ul>
        
        <h3>4. Communication:</h3>
        <ul>
            <li>Send important updates about the app</li>
            <li>Respond to your inquiries and support requests</li>
        </ul>
        
        <hr>
        
        <h2>Data Sharing and Disclosure</h2>
        
        <h3>Third-Party Services</h3>
        <p>We use the following third-party services that may collect information:</p>
        
        <ol>
            <li><strong>Google Sign-In</strong>
                <ul>
                    <li>Used for: Account authentication</li>
                    <li>Data shared: Email, name, profile picture</li>
                    <li>Privacy Policy: <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></li>
                </ul>
            </li>
            <li><strong>Google Gemini AI</strong>
                <ul>
                    <li>Used for: AI-powered recipe recommendations</li>
                    <li>Data shared: Recipe preferences, dietary requirements</li>
                    <li>Privacy Policy: <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></li>
                </ul>
            </li>
            <li><strong>LocationIQ (OpenStreetMap)</strong>
                <ul>
                    <li>Used for: Map display and geocoding</li>
                    <li>Data shared: Location coordinates, search queries</li>
                    <li>Privacy Policy: <a href="https://locationiq.com/privacy">https://locationiq.com/privacy</a></li>
                </ul>
            </li>
            <li><strong>Google Play Services</strong>
                <ul>
                    <li>Used for: Core Android functionality</li>
                    <li>Privacy Policy: <a href="https://policies.google.com/privacy">https://policies.google.com/privacy</a></li>
                </ul>
            </li>
        </ol>
        
        <h3>We Do NOT:</h3>
        <ul>
            <li>Sell your personal information to third parties</li>
            <li>Share your data for advertising purposes</li>
            <li>Use your data for marketing without consent</li>
        </ul>
        
        <hr>
        
        <h2>Data Security</h2>
        <p>We implement appropriate technical and organizational measures to protect your information:</p>
        <ul>
            <li><strong>Encryption in Transit:</strong> All data is encrypted using HTTPS/TLS</li>
            <li><strong>Secure Storage:</strong> Data is stored on secure servers</li>
            <li><strong>Password Security:</strong> Passwords are hashed using industry-standard algorithms (Argon2)</li>
            <li><strong>Access Controls:</strong> Limited access to personal data</li>
        </ul>
        <p>However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.</p>
        
        <hr>
        
        <h2>Data Retention</h2>
        <p>We retain your information for as long as your account is active or as needed to provide services. When you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain it for legal purposes.</p>
        
        <hr>
        
        <h2>Your Rights and Choices</h2>
        <p>You have the right to:</p>
        <ol>
            <li><strong>Access Your Data:</strong> Request a copy of your personal information</li>
            <li><strong>Correct Your Data:</strong> Update inaccurate or incomplete information</li>
            <li><strong>Delete Your Data:</strong> Request deletion of your account and data</li>
            <li><strong>Opt-Out of Location Tracking:</strong> Disable location permissions in device settings</li>
            <li><strong>Control Camera Access:</strong> Disable camera permissions in device settings</li>
            <li><strong>Export Your Data:</strong> Request a copy of your data in a portable format</li>
        </ol>
        
        <h3>To Exercise Your Rights:</h3>
        <p>Email us at: <strong>findingnibbles@gmail.com</strong></p>
        <p>We will respond to your request within 30 days.</p>
        
        <hr>
        
        <h2>Children's Privacy</h2>
        <p>Finding Nibbles is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.</p>
        
        <hr>
        
        <h2>Permissions Used</h2>
        <p>Our app requests the following permissions:</p>
        
        <table>
            <thead>
                <tr>
                    <th>Permission</th>
                    <th>Purpose</th>
                    <th>Required?</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>Location (ACCESS_FINE_LOCATION, ACCESS_COARSE_LOCATION)</strong></td>
                    <td>Find nearby restaurants, show your location on map</td>
                    <td>Optional</td>
                </tr>
                <tr>
                    <td><strong>Camera</strong></td>
                    <td>Take photos of recipes</td>
                    <td>Optional</td>
                </tr>
                <tr>
                    <td><strong>Storage (READ_MEDIA_IMAGES)</strong></td>
                    <td>Select photos from gallery</td>
                    <td>Optional</td>
                </tr>
                <tr>
                    <td><strong>Internet</strong></td>
                    <td>Access recipes, restaurants, and backend services</td>
                    <td>Required</td>
                </tr>
            </tbody>
        </table>
        
        <p>You can manage permissions in your device settings at any time.</p>
        
        <hr>
        
        <h2>Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. We will notify you of any changes by:</p>
        <ul>
            <li>Posting the new Privacy Policy in the app</li>
            <li>Updating the "Last Updated" date at the top</li>
            <li>Sending an in-app notification for significant changes</li>
        </ul>
        <p>Your continued use of the app after changes constitutes acceptance of the updated policy.</p>
        
        <hr>
        
        <h2>International Data Transfers</h2>
        <p>Your information may be transferred to and stored on servers located outside your country of residence. By using the app, you consent to such transfers. We ensure appropriate safeguards are in place to protect your data.</p>
        
        <hr>
        
        <h2>Contact Us</h2>
        <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
        <p><strong>Email:</strong> findingnibbles@gmail.com<br>
        <strong>App:</strong> Finding Nibbles<br>
        <strong>Website:</strong> <a href="https://nibbles.lachlanmacphee.com">https://nibbles.lachlanmacphee.com</a></p>
        
        <hr>
        
        <h2>Legal Basis for Processing (GDPR)</h2>
        <p>If you are in the European Economic Area (EEA), our legal basis for collecting and using your information includes:</p>
        <ul>
            <li><strong>Consent:</strong> You have given us permission (e.g., for location access, camera access)</li>
            <li><strong>Contract:</strong> Processing is necessary to provide the app services</li>
            <li><strong>Legitimate Interests:</strong> To improve our services and prevent fraud</li>
        </ul>
        
        <hr>
        
        <h2>California Privacy Rights (CCPA)</h2>
        <p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):</p>
        <ul>
            <li>Right to know what personal information is collected</li>
            <li>Right to delete personal information</li>
            <li>Right to opt-out of the sale of personal information (we do not sell your information)</li>
            <li>Right to non-discrimination for exercising your rights</li>
        </ul>
        <p>To exercise these rights, contact us at findingnibbles@gmail.com</p>
        
        <hr>
        
        <p style="text-align: center; margin-top: 40px;"><strong>By using Finding Nibbles, you acknowledge that you have read and understood this Privacy Policy.</strong></p>
    </div>
</body>
</html>
    `;

    res.send(html);
  }

  @Public()
  @Get('data-deletion')
  @Header('Content-Type', 'text/html')
  getDataDeletion(@Res() res: Response) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account & Data Deletion - Finding Nibbles</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        h1 {
            color: #e74c3c;
            border-bottom: 3px solid #e74c3c;
            padding-bottom: 10px;
        }
        h2 {
            color: #34495e;
            margin-top: 30px;
        }
        .warning-box {
            background-color: #fff3cd;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .info-box {
            background-color: #d1ecf1;
            border-left: 4px solid #17a2b8;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
        .email-box {
            background-color: #f8f9fa;
            border: 2px solid #3498db;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            text-align: center;
        }
        .email-link {
            font-size: 1.3em;
            color: #3498db;
            text-decoration: none;
            font-weight: bold;
        }
        .email-link:hover {
            text-decoration: underline;
        }
        ul {
            padding-left: 20px;
        }
        li {
            margin: 10px 0;
        }
        .steps {
            counter-reset: step-counter;
            list-style: none;
            padding-left: 0;
        }
        .steps li {
            counter-increment: step-counter;
            margin: 20px 0;
            padding-left: 40px;
            position: relative;
        }
        .steps li::before {
            content: counter(step-counter);
            position: absolute;
            left: 0;
            top: 0;
            background-color: #3498db;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }
        @media (max-width: 600px) {
            body {
                padding: 10px;
            }
            .container {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🗑️ Account & Data Deletion Request</h1>
        
        <p><strong>Finding Nibbles</strong> respects your right to privacy and control over your personal data. If you wish to delete your account and all associated data, please follow the instructions below.</p>

        <div class="warning-box">
            <strong>⚠️ Warning:</strong> Account deletion is permanent and cannot be undone. All your data including recipes, favorites, calorie logs, and preferences will be permanently deleted.
        </div>

        <h2>How to Request Account & Data Deletion</h2>

        <p>To delete your account and all associated data, please send an email to:</p>

        <div class="email-box">
            <a href="mailto:findingnibbles@gmail.com?subject=Account%20Deletion%20Request&body=I%20would%20like%20to%20request%20the%20deletion%20of%20my%20Finding%20Nibbles%20account%20and%20all%20associated%20data.%0A%0AAccount%20Email%3A%20%5BYour%20email%20address%5D%0A%0AThank%20you." class="email-link">
                findingnibbles@gmail.com
            </a>
        </div>

        <h2>Email Requirements</h2>

        <div class="info-box">
            <p><strong>Subject:</strong> Account Deletion Request</p>
            <p><strong>Required Information:</strong></p>
            <ul>
                <li>Your account email address (the one you used to sign up)</li>
                <li>Confirmation that you want to delete all your data</li>
            </ul>
        </div>

        <h2>What Happens After You Request Deletion?</h2>

        <ol class="steps">
            <li>
                <strong>Email Confirmation</strong><br>
                You will receive a confirmation email acknowledging your deletion request within 24 hours.
            </li>
            <li>
                <strong>Verification</strong><br>
                We will verify your identity to ensure the request is legitimate and to protect your account security.
            </li>
            <li>
                <strong>Data Deletion</strong><br>
                Your account and all associated data will be permanently deleted within 30 days of your request.
            </li>
            <li>
                <strong>Final Confirmation</strong><br>
                You will receive a final confirmation email once your data has been completely removed from our systems.
            </li>
        </ol>

        <h2>What Data Will Be Deleted?</h2>

        <p>When you request account deletion, the following data will be permanently removed:</p>

        <ul>
            <li>✅ Your account information (email, name, profile picture)</li>
            <li>✅ Saved recipes and favorite recipes</li>
            <li>✅ Favorite restaurants</li>
            <li>✅ Calorie logs and meal tracking data</li>
            <li>✅ Dietary preferences and requirements</li>
            <li>✅ Appliance preferences</li>
            <li>✅ Cuisine preferences</li>
            <li>✅ Location data</li>
            <li>✅ User-uploaded photos</li>
            <li>✅ All app usage data and preferences</li>
        </ul>

        <h2>Data Retention</h2>

        <p>Please note:</p>
        <ul>
            <li>Some data may be retained for legal or regulatory purposes (e.g., transaction records, legal compliance)</li>
            <li>Anonymized data used for analytics may be retained but cannot be linked back to you</li>
            <li>Cached data in backups will be deleted within 90 days</li>
        </ul>

        <h2>Alternative: In-App Deletion (Coming Soon)</h2>

        <div class="info-box">
            <p>We are working on implementing in-app account deletion. In the future, you will be able to delete your account directly from the app settings.</p>
        </div>

        <h2>Need Help?</h2>

        <p>If you have questions about the deletion process or need assistance, please contact us at:</p>
        
        <div class="email-box">
            <a href="mailto:findingnibbles@gmail.com" class="email-link">
                findingnibbles@gmail.com
            </a>
        </div>

        <hr style="margin: 40px 0; border: none; border-top: 2px solid #ecf0f1;">

        <p style="text-align: center; color: #7f8c8d; font-size: 0.9em;">
            <a href="/api/privacy" style="color: #3498db; text-decoration: none;">Privacy Policy</a> | 
            <strong>Finding Nibbles</strong> | 
            Last Updated: October 21, 2025
        </p>
    </div>
</body>
</html>
    `;

    res.send(html);
  }
}
