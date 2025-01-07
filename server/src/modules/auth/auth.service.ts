import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginUserDto } from './dtos';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/common/dtos';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from 'src/common/interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private generateAccessToken: (payload: JwtPayload) => Promise<string>;

  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.generateAccessToken = async (payload: JwtPayload) => {
      return await this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('accessTokenSecret'),
        expiresIn: this.configService.get<string>('accessTokenTtl'),
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

    return {
      accessToken: await this.generateAccessToken(payload),
    };
  }
}
