import { Controller, Get, Header, Res } from '@nestjs/common';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Public } from '../types';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { marked } = require('marked') as {
  marked: (src: string) => Promise<string>;
};

@Controller('privacy')
export class PrivacyController {
  @Public()
  @Get()
  @Header('Content-Type', 'text/html')
  async getPrivacyPolicy(@Res() res: Response) {
    try {
      // Read the markdown file
      const privacyPath = join(
        __dirname,
        '..',
        '..',
        '..',
        'PRIVACY_POLICY.md',
      );
      const markdown = readFileSync(privacyPath, 'utf-8');

      // Convert markdown to HTML
      const html = await marked(markdown);
      // Wrap in a nice HTML template
      const fullHtml = `
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
        ${html}
    </div>
</body>
</html>
      `;
      res.send(fullHtml);
    } catch {
      res.status(500).send(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error - Finding Nibbles</title>
</head>
<body>
    <h1>Error Loading Privacy Policy</h1>
    <p>We're sorry, but there was an error loading the privacy policy. Please contact findingnibbles@gmail.com for assistance.</p>
</body>
</html>
      `);
    }
  }

  @Public()
  @Get('raw')
  @Header('Content-Type', 'text/plain')
  getPrivacyPolicyRaw(@Res() res: Response) {
    try {
      const privacyPath = join(
        __dirname,
        '..',
        '..',
        '..',
        'PRIVACY_POLICY.md',
      );
      const markdown = readFileSync(privacyPath, 'utf-8');
      res.send(markdown);
    } catch {
      res.status(500).send('Error loading privacy policy');
    }
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
