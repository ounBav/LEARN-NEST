import { Injectable } from '@nestjs/common';
import { ChatInput } from './chat.input';
import { ChatEntity } from 'src/entities';
import { Repository } from 'typeorm';
import { FirebaseAdminService } from 'src/api/shared/firebase-admin.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepo: Repository<ChatEntity>,
    private readonly firebaseAdminservice: FirebaseAdminService,
  ) {}
  /***********************
   *QUERY
   *********************/
  /***********************
   *MUTATION
   **********************/

  async createChat(input: ChatInput) {
    const chat = await this.chatRepo.save({ ...input });
    this.firebaseAdminservice.writeChatData(chat);
    if (chat) {
      return chat;
    } else {
      return null;
    }
  }

  /***********************
   * PRIVATE FUNCTION
   **********************/
}
