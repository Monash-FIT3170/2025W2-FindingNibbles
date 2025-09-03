import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private fromEmail: string;
  private transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.fromEmail =
      this.configService.get<string>('MAIL_USER') || 'findingnibbles@gmail.com';

    const port = this.configService.get<number>('MAIL_PORT') || 587;
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port,
      secure: port === 465,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  sendMail(to: string, subject: string, html: string) {
    const fromEmail = this.configService.get<string>('MAIL_USER');
    const mailOptions = {
      from: `"FindingNibbles" <${fromEmail}>`,
      to,
      subject,
      html,
    };

    this.transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent successfully');
      }
    });
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
