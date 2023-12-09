/* eslint-disable prettier/prettier */
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RoleFilter {
  @Field(() => Int!, { nullable: true })
  id: number;
}
