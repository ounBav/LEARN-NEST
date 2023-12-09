import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ChatInput {
  @Field(() => String)
  header: string;

  @Field(() => String, { nullable: true })
  content: string;
}
