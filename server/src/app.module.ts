import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configSchema, rootConfig } from './config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configSchema,
      load: [rootConfig],
      envFilePath: ['.env.local'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<'postgres' | 'sqlite'>('dbType'),
        host: configService.get<string>('dbHost'),
        port: configService.get<number>('dbPort'),
        username: configService.get<string>('dbUsername'),
        password: configService.get<string>('dbPassword'),
        database: configService.get<string>('dbName'),
        autoLoadEntities: true,
        synchronize: configService.get<string>('nodeEnv') !== 'production',
      }),
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
