import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';
import * as Entities from '../../entities/index';
import 'dotenv/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      port: parseInt(process.env.DB_PORT),
      database: process.env.DB_SCHEMA,
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: Object.values(Entities),
      keepConnectionAlive: true,
      synchronize: true,
      logging: true,
    };
  }
}
