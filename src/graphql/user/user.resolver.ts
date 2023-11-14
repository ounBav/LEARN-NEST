/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { CreateUserInput } from './user.input';
@Resolver(() => User)
export class UserResolver {
    constructor(private userService: UserService){}
    /**
     * Query
     */
    @Query(() => [User]!)
    getUsers() {
        return this.userService.findAllUsers();
    }

    @Query(() => User!)
    getUserById(id: string){
        return this.userService.findUserById(id);
    }

    /**
    * Mutation
    */
    @Mutation(() => User!)
    createUser(@Args('CreateUserInput') body: CreateUserInput) {
        return this.userService.createUser(body);
    }
}
