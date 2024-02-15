import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TelegramClientService } from './telegram-client.service';
import { ResultTelegram, TelegramUser } from './telegram-client.model';
import { SendMessageInput } from './telegram-client.input';

@Resolver(() => Boolean)
export class TelegramClientResolver {
  constructor(private readonly service: TelegramClientService) {}

  @Mutation(() => ResultTelegram)
  checkUserTelegramAcc(@Args('phone') phone: string) {
    return this.service.checkUserTelegramAcc(phone);
  }

  @Mutation(() => Boolean)
  sendMessageByUserName(@Args('mess') mess: SendMessageInput) {
    return this.service.sendMessageByUserName(mess);
  }

  @Query(() => [TelegramUser])
  // @Query(() => String)
  searchTelegram(@Args('search') search: string) {
    return this.service.searchContact(search);
  }
}
