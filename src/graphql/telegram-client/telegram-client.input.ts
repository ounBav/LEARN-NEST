import { IsNotEmptyString } from '@common';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendMessageInput {
  @Field(() => String, { nullable: true })
  userName!: string;

  @Field(() => String, { nullable: true })
  message!: string;
}

@InputType()
export class AddContactInput {
  @Field(() => Boolean)
  addPhonePrivacyException!: boolean;

  @Field(() => String)
  username!: string;

  @Field(() => String)
  @IsNotEmptyString()
  firstName!: string;

  @Field(() => String)
  @IsNotEmptyString()
  lastName!: string;

  @Field(() => String, { nullable: true, defaultValue: '' })
  phone!: string;
}

@InputType()
export class SignInInput {
  @Field(() => String)
  phone!: string;

  @Field(() => String)
  verifyCode!: string;
}
