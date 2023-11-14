import { TypeOrmConfigService } from './typeorm.service';
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule as OrmModule } from '@nestjs/typeorm';
import * as Entities from '../../entities/index';

@Global()
@Module({
  imports: [
    OrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    OrmModule.forFeature(Object.values(Entities)),
  ],
  exports: [OrmModule],
})
export class TypeormModule {
  static forRoot():
    | import('@nestjs/common').Type<any>
    | import('@nestjs/common').DynamicModule
    | Promise<import('@nestjs/common').DynamicModule>
    | import('@nestjs/common').ForwardReference<any> {
    throw new Error('Method not implemented.');
  }
}
