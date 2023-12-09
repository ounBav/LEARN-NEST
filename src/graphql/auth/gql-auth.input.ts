/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';

import {
  IsNotEmptyEmail,
  IsNotEmptyNumber,
  IsNotEmptyString,
  IsOptionalString,
} from '../../common/index';

@InputType()
export class LoginInput {
  @Field(() => String, { description: 'username of the user' })
  @IsNotEmptyString()
  username!: string;

  @Field(() => String, { description: 'password of the user' })
  @IsNotEmptyString()
  password!: string;

  @Field(() => String, { nullable: true })
  @IsOptionalString()
  deviceToken!: string;
}

@InputType()
export class AdminLoginInput {
  @Field(() => String)
  @IsNotEmptyEmail()
  email!: string;

  @Field(() => String!)
  @IsNotEmptyString()
  password!: string;

  @Field(() => String, { nullable: true })
  @IsOptionalString()
  deviceToken?: string;
}

@InputType()
export class ChangePassword {
  @Field(() => String!)
  @IsNotEmptyString()
  oldPassword!: string;

  @Field(() => String!)
  @IsNotEmptyString()
  newPassword!: string;
}

@InputType()
export class ResetPassword {
  @Field(() => Number)
  @IsNotEmptyNumber()
  id!: number;
}
