import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

@Injectable()
export class MailerService {
  private transporter: Transporter | null = null;

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

  async sendMail(
    to: string,
    subject: string,
    html: string,
  ): Promise<nodemailer.SentMessageInfo> {
    const fromEmail = this.configService.get<string>('MAIL_USER');
    try {
      if (!this.transporter) {
        throw new Error('Transporter not initialized');
      }
      const info = await this.transporter.sendMail({
        from: `"Fynds" <${fromEmail}>`,
        to,
        subject,
        html,
      });

      console.log('✉️  Message sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('❌ Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }

  async sendVerificationEmail(email: string, code: number): Promise<void> {
    const fromEmail = this.configService.get<string>('MAIL_USER');
    try {
      if (!this.transporter) {
        throw new Error('Transporter not initialized');
      }
      const info = await this.transporter.sendMail({
        from: `"FindingNibbles" <${fromEmail}>`,
        to: email,
        subject: 'Verify your email address',
        text: `Your verification code is ${code}.`,
      });

      console.log('✉️  Verification email sent: %s', info.messageId);
    } catch (error) {
      console.error('❌ Error sending verification email:', error);
      throw new Error('Failed to send verification email');
    }
  }

  async sendNewVerificationEmail(email: string, code: number): Promise<void> {
    const fromEmail = this.configService.get<string>('MAIL_USER');
    try {
      const info: nodemailer.SentMessageInfo = await this.transporter.sendMail({
        from: `"FindingNibbles" <${fromEmail}>`,
        to: email,
        subject: 'New verification code',
        text: `Your new verification code is ${code}.`,
      });

      console.log('✉️  New verification email sent: %s', info.messageId);
    } catch (error) {
      console.error('❌ Error sending new verification email:', error);
      throw new Error('Failed to send new verification email');
    }
  }
}
