import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BotMessageInput {
  @Field(() => String)
  message!: string;
}

@InputType()
export class BotCreatePollVoteInput {
  @Field(() => String)
  question!: string;

  @Field(() => [String])
  options!: string[];
}
