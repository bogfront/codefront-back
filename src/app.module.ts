import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('APP_DB_HOST'),
        port: config.get<number>('APP_DB_PORT'),
        database: config.get<string>('APP_DB_NAME'),
        entities: [],
        synchronize: config.get<string>('NODE_ENV') === 'development'
      }),
      inject: [ConfigService],
    }),

    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
