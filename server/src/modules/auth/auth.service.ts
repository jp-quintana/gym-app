import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dtos';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/common/dtos';

import * as bcrypt from 'bcrypt';
import { JwtPayload, UserRequest } from 'src/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSession } from './entities';
import { Repository } from 'typeorm';
import { AuthTokens } from './interfaces';
import { Response } from 'express';

// TODO: set cookie and add isMobile flag to request body to adjust response based on request device
@Injectable()
export class AuthService {
  private generateAccessToken: (payload: JwtPayload) => string;
  private generateTokens: (payload: JwtPayload) => AuthTokens;
  private setTokensInCookie: (
    accessToken: string,
    refreshToken: string,
    res: Response,
  ) => void;

  constructor(
    @InjectRepository(AuthSession)
    private readonly authSessionRepository: Repository<AuthSession>,
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.generateAccessToken = (payload: JwtPayload) => {
      return this.jwtService.sign(payload, {
        secret: this.configService.get<string>('accessTokenSecret'),
        expiresIn: this.configService.get<string>('accessTokenTtl'),
      });
    };
    this.generateTokens = (payload: JwtPayload) => {
      const accessToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('accessTokenSecret'),
        expiresIn: this.configService.get<string>('accessTokenTtl'),
      });

      const refreshToken = this.jwtService.sign(payload, {
        secret: this.configService.get<string>('refreshTokenSecret'),
        expiresIn: this.configService.get<string>('refreshTokenTtl'),
      });

      const { exp: accessExp } = this.jwtService.decode(accessToken) as {
        exp: number;
      };
      const { exp: refreshExp } = this.jwtService.decode(refreshToken) as {
        exp: number;
      };

      return {
        accessToken,
        refreshToken,
        accessTokenExpiresAt: new Date(accessExp * 1000),
        refreshTokenExpiresAt: new Date(refreshExp * 1000),
      };
    };
    this.setTokensInCookie = (
      accessToken: string,
      refreshToken: string,
      res: Response,
    ) => {
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

  async register(createUserDto: CreateUserDto) {
    let encryptedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.usersService.create({
      ...createUserDto,
      password: encryptedPassword,
    });

    const payload = { userId: user.id, email: user.email };

    return {
      accessToken: this.generateAccessToken(payload),
    };
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const user = await this.usersService.findOneByEmail(loginUserDto.email);

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { userId: user.id, email: user.email };

    const {
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    } = this.generateTokens(payload);

    await this.authSessionRepository.save({
      refreshToken,
      expiresAt: refreshTokenExpiresAt,
      userId: user.id,
    });

    this.setTokensInCookie(accessToken, refreshToken, res);

    res.send({
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    });
  }

  async refresh(req: UserRequest, res: Response) {
    const user = await this.usersService.findOneByEmail(req.user.userId);

    if (user.deleted) {
      throw new UnauthorizedException('User account deleted');
    }

    // TODO: update
    const authSession = await this.authSessionRepository.findOne({
      where: { userId: user.id, deleted: false },
    });

    if (!authSession) {
      throw new UnauthorizedException('No active session found');
    }

    if (authSession.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token expired');
    }

    const payload = { userId: user.id, email: user.email };

    const {
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    } = this.generateTokens(payload);

    try {
      res.send({
        accessToken,
        refreshToken,
        accessTokenExpiresAt,
        refreshTokenExpiresAt,
      });
    } catch (error: any) {
      console.error('Error during refresh:', error);
      throw new BadRequestException('Failed to refresh tokens');
    }
  }
}
