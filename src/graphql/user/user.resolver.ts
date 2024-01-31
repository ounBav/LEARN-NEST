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
import { Auth } from '../../common/decorator/gql-auth-decorator';
@Resolver(() => User)
export class UserResolver {
  constructor(
    private userService: UserService,
    private loader: UserLoader,
  ) {}
  //==============================
  // QUERY
  //==============================
  @Auth('ADMIN', 'SUPER_ADMIN')
  @Query(() => [User]!)
  getUsers() {
    return this.userService.findAllUsers();
  }

  @Auth('ADMIN', 'SUPER_ADMIN')
  @Query(() => User!)
  getUserById(id: string) {
    return this.userService.findUserById(id);
  }

  //==============================
  // MUTATION
  //==============================
  @Auth('ADMIN', 'SUPER_ADMIN')
  @Mutation(() => User!)
  createUser(@Args('CreateUserInput') body: CreateUserInput) {
    return this.userService.createUser(body);
  }

  //==============================
  // RESOLVE FIELD
  //==============================
  @Auth('ADMIN', 'SUPER_ADMIN')
  @ResolveField(() => Role, { nullable: true })
  role(@Parent() { roleId }: User) {
    return this.loader.findRoleId.load(roleId);
  }
}
