import { IsEmail, IsString } from 'class-validator';
import { IsEqual } from 'src/common/decorators';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  @IsEqual('password')
  confirmPassword: string;
}
