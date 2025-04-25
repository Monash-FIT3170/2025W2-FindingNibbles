import { IsEmail, IsString, Length } from 'class-validator';

export class VerifyEmailDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 8, { message: 'Verification code must be 8 characters long.' })
  code: number;
}