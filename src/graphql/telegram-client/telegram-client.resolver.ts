import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TelegramClientService } from './telegram-client.service';
import { ResultTelegram, TelegramUser } from './telegram-client.model';
import {
  AddContactInput,
  SendMessageInput,
  SignInInput,
} from './telegram-client.input';

@Resolver(() => Boolean)
export class TelegramClientResolver {
  constructor(private readonly service: TelegramClientService) {}

  @Mutation(() => ResultTelegram)
  checkUserTelegramAcc(@Args('phone') phone: string) {
    return this.service.checkUserTelegramAcc(phone);
  }

  @Mutation(() => Boolean)
  telegramSendMessage(@Args('mess') mess: SendMessageInput) {
    return this.service.telegramSendMessage(mess);
  }

  @Query(() => [TelegramUser])
  searchTelegram(@Args('search') search: string) {
    return this.service.searchContact(search);
  }

  @Query(() => Boolean)
  searchSticker(@Args('search') search: string) {
    return this.service.searchSticker(search);
  }

  @Mutation(() => Boolean)
  addContact(@Args('input') input: AddContactInput) {
    return this.service.addContact(input);
  }

  @Mutation(() => Boolean)
  telegramSendVerifyCode() {
    return this.service.telegramSendVerifyCode();
  }

  @Mutation(() => Boolean)
  startTelegramClient(@Args('input') input: SignInInput) {
    return this.service.startTelegramClient(input);
  }
}
