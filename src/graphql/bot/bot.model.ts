import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Bot {
  @Field(() => Boolean)
  ok!: boolean;

  @Field(() => UserBot)
  result!: UserBot;
}

export class UserBot {
  @Field(() => Int)
  id!: number;

  @Field(() => Boolean)
  is_bot!: boolean;

  @Field(() => Boolean)
  can_join_groups!: boolean;

  @Field(() => Boolean)
  can_read_all_group_messages!: boolean;

  @Field(() => Boolean)
  supports_inline_queries!: boolean;

  @Field(() => String)
  first_name!: string;

  @Field(() => String)
  username!: string;
}
