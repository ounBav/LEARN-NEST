/* eslint-disable prettier/prettier */
import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmptyString } from 'src/common';

@ArgsType()
export class SendWebNotificationArgs {
  @Field(() => String!)
  @IsNotEmptyString()
  payload!: string;
}
