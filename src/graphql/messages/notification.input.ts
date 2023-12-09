/* eslint-disable prettier/prettier */
import { ArgsType, Field, InputType } from '@nestjs/graphql';
import { IsNotEmptyString } from 'src/common';

@InputType()
export class NotificationInput {
  @Field(() => String)
  @IsNotEmptyString()
  title!: string;

  @Field(() => String, { nullable: true })
  body?: string;

  @Field(() => String, { nullable: true })
  to?: string;
}

@ArgsType()
export class NotificationArg extends NotificationInput {}

@InputType()
export class FirebaseUserId {
  @Field(() => String)
  userId: string;
}
