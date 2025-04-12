import {
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Body,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'generated/prisma';
import { RegisterDto } from 'src/auth/types';

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
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  getProfile(@Request() req: ExpressRequest & { user: User }) {
    return req.user;
  }
}
