import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Chat } from './chat.model';
import { ChatService } from './chat.service';
import { ChatInput } from './chat.input';

@Resolver('chat')
export class ChatResolver {
  constructor(private readonly chatService: ChatService) {}
  @Mutation(() => Chat)
  createChat(@Args('input') input: ChatInput) {
    this.chatService.createChat(input);
  }
}
