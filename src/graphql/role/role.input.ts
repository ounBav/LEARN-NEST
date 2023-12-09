/* eslint-disable prettier/prettier */
import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmptyString } from 'src/common';

@InputType()
export class CreateRoleInput {
  @Field(() => String!)
  @IsNotEmptyString()
  name!: string;

  @Field(() => String!, { nullable: true })
  description!: string;
}

@InputType()
export class UpdateRoleInput extends CreateRoleInput {
  @Field(() => Int!)
  id!: number;
}
