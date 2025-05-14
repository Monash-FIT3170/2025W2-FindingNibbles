import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsStrongPassword()
  oldPassword: string;

  @IsNotEmpty()
  @IsStrongPassword()
  newPassword: string;

  @IsNotEmpty()
  confirmNewPassword: string;
}
