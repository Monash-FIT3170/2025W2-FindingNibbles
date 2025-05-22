import * as argon2 from 'argon2';
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategies/jwt/jwt.strategy';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Profile } from 'passport-google-oauth20';
import { randomInt } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '../mailer/mailer.service';
import { OAuth2Client } from 'google-auth-library';
import { AuthTokens } from './dto/tokens.dto';
import { User } from 'generated/prisma';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private googleClient: OAuth2Client,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const passwordHash = await argon2.hash(registerDto.password);
    const verifyCode = randomInt(10000000, 99999999);

    // If in development mode, log the verification code
    if (this.configService.get<string>('NODE_ENV') === 'development') {
      console.log(`Verification code for ${registerDto.email}: ${verifyCode}`);
    }

    try {
      await this.mailerService.sendVerificationEmail(
        registerDto.email,
        verifyCode,
      );
    } catch (err) {
      console.error('Failed to send verification email:', err);
    }

    return this.userService.create({
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      email: registerDto.email,
      passwordHash,
      provider: 'local',
      isVerified: false,
      verifyCode,
    });
  }

  async verifyEmail(email: string, code: number): Promise<AuthTokens | null> {
    console.log(`Verifying email for ${email} with code ${code}`);
    const user = await this.userService.findOneByEmail(email);
    if (!user) return null;
    if (user.isVerified) return null;
    if (user.verifyCode !== Number(code)) return null;
    await this.userService.update(user.id, {
      isVerified: true,
      verifyCode: null,
    });

    return this.login(user);
  }

  async newValidationCode(email: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) return null;
    if (user.isVerified) return null;
    if (user.provider !== 'local') return null; // they should use their existing provider
    if (user.providerId) return null; // they should use their existing provider
    if (!user.verifyCode) return null;
    const newCode = randomInt(10000000, 99999999);
    user.verifyCode = newCode;
    await this.userService.update(user.id, { verifyCode: newCode });
    try {
      await this.mailerService.sendNewVerificationEmail(email, newCode);
    } catch (err) {
      console.error('Failed to send new verification email:', err);
    }
    return user;
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) return null;
    if (!user.passwordHash) return null;
    if (!user.isVerified) return null;
    if (user.provider !== 'local') return null; // they should use their existing provider

    const isPasswordValid = await argon2.verify(user.passwordHash, password);
    if (user && isPasswordValid) return user;

    return null;
  }

  async validateOrCreateGoogleUser(profile: Profile): Promise<User> {
    const providerId = profile.id;
    // We validate that these fields are present in `google.strategy.ts`
    // so we can cast them to strings here
    const email = profile.emails?.[0].value as string;
    const firstName = profile.name?.givenName as string;
    const lastName = profile.name?.familyName as string;

    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) return existingUser;

    return this.userService.create({
      email,
      firstName,
      lastName,
      passwordHash: null, // No password for Google users
      provider: 'google',
      providerId,
      isVerified: true,
    });
  }

  login(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '30d' }),
    };
  }

  refreshAccessToken(token: string): Promise<{ access_token: string }> {
    try {
      const { sub, email, firstName, lastName } =
        this.jwtService.verify<JwtPayload>(token, {
          ignoreExpiration: false,
          secret: this.configService.get<string>('REFRESH_SECRET'),
        });
      const access_token = this.jwtService.sign(
        { sub, email, firstName, lastName },
        { expiresIn: '45m' },
      );
      return Promise.resolve({ access_token });
    } catch (error) {
      console.error('❌ [AuthService] refreshAccessToken error:', error);
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }

  async validateGoogleToken(
    token: string,
  ): Promise<{ access_token: string; refresh_token: string } | null> {
    const ticket = await this.googleClient.verifyIdToken({
      idToken: token,
      audience: [
        this.configService.get<string>('GOOGLE_CLIENT_ID_ANDROID') || '',
        this.configService.get<string>('GOOGLE_CLIENT_ID_IOS') || '',
      ],
    });
    const payload = ticket.getPayload();
    if (!payload) return null;

    const profile = {
      id: payload.sub,
      emails: [{ value: payload.email }],
      name: {
        givenName: payload.given_name,
        familyName: payload.family_name,
      },
    } as Profile;

    const user = await this.validateOrCreateGoogleUser(profile);
    return this.login(user);
  }

  async changePassword(
    user: { id: number },
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { oldPassword, newPassword } = changePasswordDto;

    // Find the user
    const existingUser = await this.userService.findOneById(user.id);

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    // Compare old password with that stored in database
    if (!existingUser.passwordHash) {
      throw new BadRequestException(
        'User has no password set. Ensure this account was not created using Google login.',
      );
    }

    const isPasswordValid = await argon2.verify(
      existingUser.passwordHash,
      oldPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid old password');
    }

    // Change user's password
    const newPasswordHash = await argon2.hash(newPassword);
    await this.userService.update(user.id, { passwordHash: newPasswordHash });
  }
}
