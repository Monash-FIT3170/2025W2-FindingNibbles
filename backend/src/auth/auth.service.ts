import * as bcrypt from 'bcrypt';
import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/types';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOneByEmail(email);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (user && isPasswordValid) return user;

    return null;
  }

  async register(registerDto: RegisterDto): Promise<User> {
    const passwordHash = await bcrypt.hash(registerDto.password, 10);
    return this.userService.create({
      name: registerDto.name,
      email: registerDto.email,
      passwordHash,
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
