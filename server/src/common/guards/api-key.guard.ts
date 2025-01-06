import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Environment } from '../enums';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKeyHeader = request.header('Api-Key');

    const apiKey =
      this.configService.get<string>('nodeEnv') === Environment.PRODUCTION
        ? this.configService.get<string>('nodeEnv')
        : 'my-api-key';

    if (apiKeyHeader !== apiKey)
      throw new UnauthorizedException('Unauthorized to access');

    return true;
  }
}
