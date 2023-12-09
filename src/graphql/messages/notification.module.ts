/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { NotificationResolver } from './notification.resolver';
import { NotificationService } from './notification.service';
import { FirebaseAdminModule } from 'src/lib/firebase/firebase-admin.module';
import { FirebaseAdminService } from 'src/api/shared/firebase-admin.service';
@Module({
  imports: [FirebaseAdminModule],
  // controllers: [],
  providers: [NotificationResolver, NotificationService, FirebaseAdminService],
  exports: [NotificationResolver, NotificationService, FirebaseAdminService],
})
export class NotificationModule {}
