/* eslint-disable prettier/prettier */
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuth, LoginResponse } from './gql-auth.model';
// import { User } from "../user/user.model";
import { GqlAuthService } from './gql-auth.service';
import { LoginInput } from './gql-auth.input';

@Resolver(() => GqlAuth)
export class GqlAuthResolver {
  constructor(public readonly authService: GqlAuthService) {}

  @Mutation(() => LoginResponse)
  async userLogin(@Args('LogingInput') loginInput: LoginInput) {
    return await this.authService.login(loginInput);
  }
}
