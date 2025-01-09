import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dtos';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/common/dtos';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/common/interfaces';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthSession } from './entities';
import { Repository } from 'typeorm';
import { AuthTokens } from './interfaces';

@Injectable()
export class AuthService {
  private generateAccessToken: (payload: JwtPayload) => string;
  private generateTokens: (payload: JwtPayload) => AuthTokens;

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

      // TODO: set cookie and add isMobile flag to request body to adjust response based on request device

      return {
        accessToken,
        refreshToken,
        accessTokenExpiresAt: new Date(accessExp * 1000),
        refreshTokenExpiresAt: new Date(refreshExp * 1000),
      };
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
      accessToken: await this.generateAccessToken(payload),
    };
  }

  async login(loginUserDto: LoginUserDto) {
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

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresAt,
      refreshTokenExpiresAt,
    };
  }
}
