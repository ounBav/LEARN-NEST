/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RoleResolver } from './role.resolver';
import { RoleService } from './role.service';

@Module({
  providers: [RoleResolver, RoleService],
  exports: [RoleService, RoleResolver],
})
export class RoleModule {}
