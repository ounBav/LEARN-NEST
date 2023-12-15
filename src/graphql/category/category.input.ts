import { Field, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsAlpha()
  @MinLength(1)
  name!: string;
}

@InputType()
export class updateCategoryInput extends CreateCategoryInput {
  @Field(() => Int)
  id!: number;
}
