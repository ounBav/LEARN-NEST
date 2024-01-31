import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Chat {
  @Field(() => Int!)
  id!: number;

  @Field(() => String)
  head!: string;

  @Field(() => String)
  content!: string;
}
