import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
}

export type JwtPayload = {
  sub: number;
  email: string;
  name: string;
};
