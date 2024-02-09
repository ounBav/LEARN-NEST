import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ResultTelegram {
  @Field(() => String)
  recipientAccount?: string;
}
