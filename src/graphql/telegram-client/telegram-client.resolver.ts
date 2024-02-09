import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TelegramClientService } from './telegram-client.service';
import { ResultTelegram } from './telegram-client.model';
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
}
