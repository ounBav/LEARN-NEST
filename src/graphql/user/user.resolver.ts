/* eslint-disable prettier/prettier */
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { CreateUserInput } from './user.input';
import { Role } from '../role/rolse.model';
import { UserLoader } from './user.loader';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/guards/auth.guard';
@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private loader: UserLoader,
  ) {}
  /**
   * Query
   */
  @UseGuards(GqlAuthGuard)
  @Query(() => [User]!)
  getUsers() {
    return this.userService.findAllUsers();
  }

  @Query(() => User!)
  getUserById(id: string) {
    return this.userService.findUserById(id);
  }

  /**
   * Mutation
   */
  @Mutation(() => User!)
  createUser(@Args('CreateUserInput') body: CreateUserInput) {
    return this.userService.createUser(body);
  }

  /**
   * RESOLVER FIELD
   */

  @ResolveField(() => Role, { nullable: true })
  role(@Parent() { roleId }: User) {
    return this.loader.findRoleId.load(roleId);
  }
}
