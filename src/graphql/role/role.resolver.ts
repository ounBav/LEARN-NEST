/* eslint-disable prettier/prettier */
import { Query, Resolver } from '@nestjs/graphql';

@Resolver('Role')
export class RoleResolver {
    @Query()
    getRoles(){
        return 'role'
    }
}
