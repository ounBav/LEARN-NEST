import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { EntityStatus } from 'src/common/types/enum';

@ObjectType()
export class Product {
  @Field(() => Int)
  id!: number;

  @Field(() => String)
  name!: string;

  @Field(() => String, { nullable: true, defaultValue: '' })
  description?: string;

  @Field(() => Int, { nullable: true })
  createdBy?: number;

  @Field(() => Int, { nullable: true })
  updatedBy?: number;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: Date;

  @Field(() => GraphQLISODateTime, { nullable: true })
  updatedAt?: Date;

  @Field(() => EntityStatus)
  status?: EntityStatus;
}
