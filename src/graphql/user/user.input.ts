/* eslint-disable prettier/prettier */
import { Field, InputType, Int } from '@nestjs/graphql';
import { EntityStatus, UserTypeEnum } from 'src/common/types/enum';

@InputType()
export class CreateUserInput {
  @Field(() => String!)
  first_name: string;

  @Field(() => String!)
  last_name: string;

  @Field(() => String!)
  username: string;

  @Field(() => String!)
  email: string;

  @Field(() => String!)
  password: string;

  @Field(() => Int!)
  roleId: number;

  @Field(() => EntityStatus, { defaultValue: EntityStatus.ACTIVE })
  status: EntityStatus;

  @Field(() => UserTypeEnum, { defaultValue: UserTypeEnum.USER })
  userType: UserTypeEnum;
}
