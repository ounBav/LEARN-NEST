import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BotService } from './bot.service';
import { BotCreatePollVoteInput, BotMessageInput } from './bot_message.input';

@Resolver('bot')
export class BotResolver {
  constructor(private readonly service: BotService) {}

  @Mutation(() => Boolean)
  getBotDialog() {
    return this.service.botMessage();
  }

  @Mutation(() => Boolean)
  botSendMessage(@Args('input') input: BotMessageInput) {
    return this.service.botSendMessage(input);
  }

  @Mutation(() => Boolean)
  botSendPollVote(@Args('poll') poll: BotCreatePollVoteInput) {
    return this.service.botSendPollVote(poll);
  }
}
