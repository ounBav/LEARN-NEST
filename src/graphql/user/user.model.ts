/* eslint-disable prettier/prettier */
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { nullable: true })
  id!: string;

  @Field(() => String, { nullable: true })
  first_name?: string;

  @Field(() => String, { nullable: true })
  last_name?: string;

  @Field(() => String, { nullable: true })
  username!: string;

  @Field(() => String, { nullable: true })
  email!: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => Int!)
  roleId!: number;

  @Field(() => String, { nullable: true })
  status!: string;

  @Field(() => String, { nullable: true })
  userType!: string;
}
