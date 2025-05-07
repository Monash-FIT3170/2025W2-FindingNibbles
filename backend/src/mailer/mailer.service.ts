import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });
  }

  async sendMail(to: string, subject: string, html: string) {
    const fromEmail = this.configService.get<string>('MAIL_USER');
    const info = await this.transporter.sendMail({
      from: `"Fynds" <${fromEmail}>`,
      to,
      subject,
      html,
    });

    console.log('✉️  Message sent: %s', info.messageId);
    return info;
  }

  async sendVerificationEmail(email: string, code: number) {
    const fromEmail = this.configService.get<string>('MAIL_USER');
    try {
      const info = await this.transporter.sendMail({
        from: `"FindingNibbles" <${fromEmail}>`,
        to: email,
        subject: 'Verify your email address',
        text: `Your verification code is ${code}.`,
      });

      console.log('✉️  Verification email sent: %s', info.messageId);
    } catch (error) {
      console.error('❌ Error sending verification email:', error);
    }
  }

  async sendNewVerificationEmail(email: string, code: number) {
    const fromEmail = this.configService.get<string>('MAIL_USER');
    try {
      const info = await this.transporter.sendMail({
        from: `"FindingNibbles" <${fromEmail}>`,
        to: email,
        subject: 'New verification code',
        text: `Your new verification code is ${code}.`,
      });
      console.log('✉️  New verification email sent: %s', info.messageId);
    } catch (error) {
      console.error('❌ Error sending new verification email:', error);
    }
  }
}
