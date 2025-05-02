import { Module } from '@nestjs/common';
import { GoogleController } from './google/google.controller';

@Module({
  controllers: [GoogleController]
})
export class Oauth2Module {}
