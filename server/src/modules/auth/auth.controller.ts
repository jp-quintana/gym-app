import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos';
import { CreateUserDto } from 'src/common/dtos';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto, @Req() request: Request) {
    return this.authService.login(loginUserDto);
  }
}
