// /* eslint-disable prettier/prettier */
// import { Type } from '@nestjs/common';
// import { ArgsType, Field, Int, registerEnumType } from '@nestjs/graphql';

// enum OrderBy {
//   NATURAL
// }

// registerEnumType(OrderBy, { name: 'OrderBy' });

// export function Filtered<T, U>(classRef: Type<T>, orderByRef?: U) {
//   const OrderClass = orderByRef || OrderBy;
//   @ArgsType()
//   abstract class FilteredType<T, U> {
//     @Field(() => classRef, { nullable: true, defaultValue: null })
//     filter!: T;

//     @Field(() => Int, { nullable: true, defaultValue: 20 })
//     limit!: number;

//     @Field(() => Int, { nullable: true, defaultValue: 0 })
//     offset!: number;

//     @Field(() => [OrderClass], { nullable: true })
//     order?: U[];
//   }
//   return FilteredType as new () => FilteredType<T, U>;
// }
