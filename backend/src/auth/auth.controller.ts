import {
  Controller,
  Post,
  Get,
  Request,
  UseGuards,
  Body,
  BadRequestException,
  UnauthorizedException,
  Req,
  Put,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { LocalAuthGuard } from './strategies/local/local-auth.guard';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { VerifyEmailDto } from './dto/verify.dto';
import { UserService } from '../user/user.service';
import { GoogleAuthGuard } from './strategies/google/google-auth.guard';
import { Public, RequestUser } from '../types';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordHash, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  @Public()
  @Post('verify')
  async verify(@Body() verifyEmailDto: VerifyEmailDto) {
    console.log('📩 Incoming verification:', verifyEmailDto);
    return this.authService.verifyEmail(
      verifyEmailDto.email,
      verifyEmailDto.code,
    );
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: ExpressRequest & { user: User }) {
    // The LocalAuthGuard will have already validated the user and populated req.user
    // The full user object is not returned in the response
    return this.authService.login(req.user);
  }

  @Public()
  @Get('login/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
    // Guard redirects to Google
  }

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  googleAuthRedirect(@Request() req: ExpressRequest & { user: User }) {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('google/token')
  loginWithGoogleToken(@Body('idToken') idToken: string) {
    return this.authService.validateGoogleToken(idToken);
  }

  @Public()
  @Post('refresh')
  refreshToken(@Body('refresh_token') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is required.');
    }
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Get('check')
  getProfile(@Req() req: RequestUser) {
    return req.user.sub;
  }

  @Public()
  @Post('new-verification')
  async sendNewVerificationEmail(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required.');
    }
    return this.authService.newValidationCode(email);
  }

  @Put('password')
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: RequestUser,
  ) {
    await this.authService.changePassword(
      { id: req.user.sub },
      changePasswordDto,
    );
    return { message: 'Password changed successfully' };
  }
}
