import { Module } from '@nestjs/common';
import { GoogleController } from './google/google.controller';
import { GoogleService } from './google/google.service';

@Module({
  controllers: [GoogleController],
  providers: [GoogleService]
})
export class Oauth2Module {}
