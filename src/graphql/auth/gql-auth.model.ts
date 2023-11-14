/* eslint-disable prettier/prettier */
import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../user/user.model';

@ObjectType()
export class GqlAuth {}

@ObjectType()
export class LoginResponse {
  @Field()
  user!: User;

  @Field(() => String!)
  token!: string;
}
