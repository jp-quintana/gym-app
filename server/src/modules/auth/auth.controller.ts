import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLoginDTO } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userLoginDto: UserLoginDTO) {
    return this.authService.login(userLoginDto);
  }
}
