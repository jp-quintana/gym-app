import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos';
import { CreateUserDto } from 'src/common/dtos';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Req() request: Request,
    @Res() res: Response,
  ) {
    return this.authService.login(loginUserDto, res);
  }
}
