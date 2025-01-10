import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { IsEqual } from 'src/common/decorators';
import { UserRole } from '../enums';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsEqual('password')
  confirmPassword: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
