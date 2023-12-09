import { Module } from '@nestjs/common';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { FirebaseAdminService } from 'src/api/shared/firebase-admin.service';
import { FirebaseAdminModule } from 'src/lib/firebase/firebase-admin.module';

@Module({
  imports: [FirebaseAdminModule],
  providers: [ChatResolver, ChatService, FirebaseAdminService],
  exports: [ChatService, ChatResolver, FirebaseAdminService],
})
export class ChatModule {}
