/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
// import { MulterModule } from '@nestjs/platform-express';
import { UploadController } from './upload.controler';
// import { multerConfig } from 'src/lib/configs/upload_multer.config';
import { FirebaseAdminService } from '../shared/firebase-admin.service';
import { FirebaseAdminModule } from 'src/lib/firebase/firebase-admin.module';

@Module({
  imports: [FirebaseAdminModule],
  controllers: [UploadController],
  providers: [UploadService, UploadController, FirebaseAdminService],
  exports: [UploadService],
})
export class UploadModule {}
