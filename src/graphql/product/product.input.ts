import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmptyNumber, IsNotEmptyString } from 'src/common';

@InputType()
export class createProductInput {
  @Field(() => String)
  @IsNotEmptyString()
  name!: string;

  @Field(() => String, { nullable: true, defaultValue: '' })
  description!: string;

  @Field(() => String, { nullable: true })
  createdBy!: string;

  @Field(() => String, { nullable: true })
  updatedBy!: string;

  @Field(() => Int, { nullable: true })
  @IsNotEmptyNumber()
  imageId!: number;

  @Field(() => Int)
  @IsNotEmptyNumber()
  categoryId!: number;
}

@InputType()
export class updateProductInput extends createProductInput {
  @Field(() => String)
  @IsNotEmptyNumber()
  id!: string;
}
