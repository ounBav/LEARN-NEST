import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendMessageInput {
  @Field(() => String, { nullable: true })
  userName!: string;

  @Field(() => String, { nullable: true })
  message!: string;
}
