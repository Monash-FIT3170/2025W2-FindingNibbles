import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GOOGLE_MAIL_USER'),
        pass: this.configService.get<string>('GOOGLE_MAIL_PASS'),
      },
    });
  }

  sendMail(to: string, subject: string, html: string) {
    this.transporter.sendMail(
      {
        to,
        subject,
        html,
      },
      (error) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent successfully');
        }
      },
    );
  }

  sendVerificationEmail(email: string, code: number) {
    this.sendMail(
      email,
      'Verify your email address',
      `Your verification code is ${code}.`,
    );
  }

  sendNewVerificationEmail(email: string, code: number) {
    this.sendMail(
      email,
      'New verification code',
      `Your new verification code is ${code}.`,
    );
  }
}
