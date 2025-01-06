import { Injectable } from '@nestjs/common';
import { UserLoginDTO } from './dtos';

@Injectable()
export class AuthService {
  async login(userLoginDto: UserLoginDTO) {}
}
