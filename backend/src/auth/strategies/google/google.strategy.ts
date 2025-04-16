import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    configService: ConfigService,
    private authService: AuthService,
  ) {
    // We can safely use non-null assertion operator here because Joi validates
    // environment variables on startup.
    super({
      clientID: configService.get<string>('GOOGLE_CLIENT_ID')!,
      clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET')!,
      callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL')!,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<void> {
    if (
      !profile.id ||
      !profile.emails?.[0]?.value ||
      !profile.name?.givenName ||
      !profile.name?.familyName
    ) {
      done(new Error('No ID or email provided from Google'), undefined);
      return;
    }

    const user = await this.authService.validateOrCreateGoogleUser(profile);

    done(null, user);
  }
}
