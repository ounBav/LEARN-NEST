import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { IsNotEmptyString } from 'src/common';

@ObjectType()
export class Category {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @IsNotEmptyString()
  name: string;

  @Field(() => Int)
  createdBy: number;

  @Field(() => Int)
  updatedBy: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt!: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt!: Date;
}
