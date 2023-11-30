/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { FirebaseAdminProvider } from './firebase-admin-provider';

@Module({
  providers: [FirebaseAdminProvider],
  exports: [FirebaseAdminProvider],
})
export class FirebaseAdminModule {}
