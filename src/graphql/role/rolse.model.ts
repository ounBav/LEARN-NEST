/* eslint-disable prettier/prettier */
import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { EntityStatus } from '../../common/types/enum';

@ObjectType()
export class Role {
  @Field(() => Int!)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true })
  description!: string;

  @Field(() => EntityStatus)
  status!: EntityStatus;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt!: Date;

  // @Field(() => GraphQLISODateTime,{ nullable: true })
  // upatedAt!: Date;
}
