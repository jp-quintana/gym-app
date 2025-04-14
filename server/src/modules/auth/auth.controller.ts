import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos';
import { Response } from 'express';
import { IUserRequest } from 'src/common/interfaces';
import { RefreshGuard } from 'src/common/guards';
import { CreateUserDto } from '../user/dtos';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  private setTokensInCookie: (
    accessToken: string,
    refreshToken: string,
    res: Response,
  ) => void;

  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    this.setTokensInCookie = (accessToken, refreshToken, res) => {
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: this.configService.get<string>('nodeEnv') === 'production',
        sameSite: 'strict',
        maxAge: this.configService.get<number>('accessCookieTtl'),
      });
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: this.configService.get<string>('nodeEnv') === 'production',
        sameSite: 'strict',
        maxAge: this.configService.get<number>('refreshCookieTtl'),
      });
    };
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const payload = await this.authService.register(createUserDto);

    this.setTokensInCookie(payload.accessToken, payload.refreshToken, res);

    return res.send(payload);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const payload = await this.authService.login(loginUserDto);

    this.setTokensInCookie(payload.accessToken, payload.refreshToken, res);

    return res.send(payload);
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  async refresh(@Req() req: IUserRequest, @Res() res: Response) {
    const payload = await this.authService.refresh(
      req.user.userId,
      req.user.refreshToken,
    );

    this.setTokensInCookie(payload.accessToken, payload.refreshToken, res);

    return res.send(payload);
  }
}
