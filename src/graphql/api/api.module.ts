/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ShareModule } from './shared/share.module';
@Module({
  imports: [ShareModule],
  controllers: [],
  providers: [],
  exports: []
})
export class ApiModule {}