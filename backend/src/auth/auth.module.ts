import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local/local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt/jwt.strategy';
import { GoogleStrategy } from './strategies/google/google.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { MailerModule } from '../mailer/mailer.module';
import { OAuth2Client } from 'google-auth-library';

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
        signOptions: { expiresIn: '60s' },
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
      provide: 'REFRESH_SERVICE',
      useFactory: (config: ConfigService) =>
        new JwtService({
          secret: config.get<string>('REFRESH_SECRET'),
          signOptions: { expiresIn: '7d' },
        }),
      inject: [ConfigService],
    },
  ],
  exports: [AuthService, 'REFRESH_SERVICE'],
  controllers: [AuthController],
})
export class AuthModule {}