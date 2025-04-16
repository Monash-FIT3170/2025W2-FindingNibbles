import * as argon2 from 'argon2';
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'generated/prisma';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/strategies/jwt/jwt.strategy';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Profile } from 'passport-google-oauth20';
import { randomInt } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const passwordHash = await argon2.hash(registerDto.password);
    const verifyCode = randomInt(10000000, 99999999);

    // If in development mode, log the verification code
    if (this.configService.get<string>('NODE_ENV') === 'development') {
      console.log(`Verification code for ${registerDto.email}: ${verifyCode}`);
    } else {
      // Email the verification code to the user
      // await this.mailerService.sendVerificationEmail(
      //   registerDto.email,
      //   verifyCode,
      // );
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

  async verifyEmail(email: string, code: number): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) return null;
    if (user.isVerified) return null;
    if (user?.verifyCode !== code) return null;

    await this.userService.update(user.id, {
      isVerified: true,
      verifyCode: null,
    });
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
      access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        ignoreExpiration: false,
      });
      return {
        access_token: this.jwtService.sign(payload, { expiresIn: '15m' }),
      };
    } catch {
      throw new BadRequestException('Invalid or expired refresh token.');
    }
  }
}
