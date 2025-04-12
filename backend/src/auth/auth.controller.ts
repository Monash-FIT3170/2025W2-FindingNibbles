import {
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { LocalAuthGuard } from 'src/auth/strategies/local/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/strategies/jwt/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'generated/prisma';
import { RegisterDto } from 'src/auth/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: ExpressRequest & { user: User }) {
    // The LocalAuthGuard will have already validated the user and populated req.user
    // The full user object is not returned in the response
    return this.authService.login(req.user);
  }

  @Post('refresh')
  refreshToken(@Body('refresh_token') refreshToken: string) {
    if (!refreshToken) {
      throw new BadRequestException('Refresh token is required.');
    }
    return this.authService.refreshToken(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  getProfile(@Request() req: ExpressRequest & { user: User }) {
    return req.user;
  }
}
