import * as argon2 from 'argon2';
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from 'generated/prisma';
import { JwtService } from '@nestjs/jwt';
import { GoogleUserData, JwtPayload } from 'src/auth/types';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<User> {
    const passwordHash = await argon2.hash(registerDto.password);
    return this.userService.create({
      name: registerDto.name,
      email: registerDto.email,
      passwordHash,
      provider: 'local',
    });
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) return null;
    if (!user.passwordHash) return null;

    const isPasswordValid = await argon2.verify(user.passwordHash, password);
    if (user && isPasswordValid) return user;

    return null;
  }

  async validateOrCreateGoogleUser(userData: GoogleUserData): Promise<User> {
    const existingUser = await this.userService.findOneByEmail(userData.email);
    if (existingUser) return existingUser;

    return this.userService.create({
      email: userData.email,
      name: userData.name,
      passwordHash: null, // No password for Google users
      provider: 'google',
      providerId: userData.id,
    });
  }

  login(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
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
