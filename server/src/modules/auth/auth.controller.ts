import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos';
import { Response } from 'express';
import { IUserRequest } from 'src/common/interfaces';
import { RefreshGuard } from 'src/common/guards';
import { CreateUserDto } from '../user/dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    return this.authService.login(loginUserDto, res);
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  refresh(@Req() req: IUserRequest, @Res() res: Response) {
    return this.authService.refresh(req, res);
  }
}
