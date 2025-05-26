import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';
import { GoogleStrategy } from './strategies/google/google.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { MailerModule } from '../mailer/mailer.module';
import { OAuth2Client } from 'google-auth-library';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './strategies/jwt/jwt-auth.guard';

/**
 * This module separates access and refresh token services:
 * - Access Token Service: Issues short-lived tokens (60s) for authenticating API requests.
 * - Refresh Token Service: Issues long-lived tokens (7d) for obtaining new access tokens.
 * This separation enhances security, simplifies lifecycle management, and improves user experience.
 */
@Module({
  imports: [
    UserModule,
    PassportModule,
    MailerModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('AUTH_SECRET'),
      }),
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    {
      provide: OAuth2Client,
      useFactory: (configService: ConfigService) => {
        return new OAuth2Client(configService.get('GOOGLE_CLIENT_ID'));
      },
      inject: [ConfigService],
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
