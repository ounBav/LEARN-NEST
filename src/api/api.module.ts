/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ShareModule } from './shared/share.module';
import { UploadModule } from './upload/upload.module';
@Module({
  imports: [ShareModule, UploadModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ApiModule {}
