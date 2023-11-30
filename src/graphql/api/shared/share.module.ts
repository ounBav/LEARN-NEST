/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { FirebaseAdminService } from './firebase-admin.service';
import { FirebaseAdminModule } from 'src/lib/firebase/firebase-admin.module';
// import { InjectFirebaseAdmin } from 'src/lib/firebase/firebase-admin-decorater';

@Module({
  imports:[FirebaseAdminModule],
  providers: [FirebaseAdminService],
  exports: [FirebaseAdminService]
})
export class ShareModule {}