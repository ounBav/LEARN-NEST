/* eslint-disable prettier/prettier */
import { Field, InputType } from '@nestjs/graphql';
import { UserRole, UserStatus } from 'src/common/types/enum';

@InputType()
export class CreateUserInput {

    @Field(() => String!)
    first_name:string

    @Field(() => String!)
    last_name:string

    @Field(() => String!)
    username:string

    @Field(() => String!)
    email:string

    @Field(() => String!)
    password:string

    @Field(() => UserRole!)
    role:UserRole

    @Field(() => UserStatus)
    status:UserStatus
}