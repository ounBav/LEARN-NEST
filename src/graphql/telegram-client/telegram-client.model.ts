import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResultTelegram {
  @Field(() => String)
  recipientAccount?: string;
}

@ObjectType()
export class TelegramUser {
  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  phone?: string;

  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => Boolean, { nullable: true })
  bot?: boolean;

  @Field(() => Boolean, { nullable: true })
  scam?: boolean;

  @Field(() => Boolean, { nullable: true })
  fake?: boolean;

  @Field(() => Boolean, { nullable: true })
  premium?: boolean;
}
