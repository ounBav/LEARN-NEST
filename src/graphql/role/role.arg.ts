/* eslint-disable prettier/prettier */
import { ArgsType, Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class RoleFilter {
  @Field(() => Int!, { nullable: true })
  id: number;
}

@ArgsType()
export class RoleArgs extends RoleFilter {}
