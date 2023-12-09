/* eslint-disable prettier/prettier */
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { Role } from './rolse.model';
import * as A from './role.arg';
import { CreateRoleInput, UpdateRoleInput } from './role.input';

@Resolver('Role')
export class RoleResolver {
  constructor(private roleService: RoleService) {}

  /*********************
   * QUERY
   ********************/

  @Query(() => [Role])
  getRoles() {
    return this.roleService.getRoles();
  }

  @Query(() => Role)
  getRole(@Args('id') { id }: A.RoleFilter) {
    return this.roleService.getRole(id);
  }

  /*******************
   * MUTATION
   *******************/

  @Mutation(() => Role)
  createRole(@Args('Role') role: CreateRoleInput) {
    return this.roleService.createRole(role);
  }

  @Mutation(() => Role)
  updateRole(@Args('Role') role: UpdateRoleInput) {
    return this.roleService.updateRole(role);
  }
}
