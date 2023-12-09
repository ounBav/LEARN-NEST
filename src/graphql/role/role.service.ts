/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities';
import { Not, Repository } from 'typeorm';
import { EntityStatus } from 'src/common/types/enum';
import { CreateRoleInput, UpdateRoleInput } from './role.input';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity) readonly roleRepo: Repository<RoleEntity>,
  ) {}
  /*************************
   * QUERY
   *************************/
  async getRoles() {
    return this.roleRepo.find();
  }

  async getRole(id: number) {
    return this.validateRole(id);
  }
  /*************************
   * MUTATION
   *************************/

  async createRole(role: CreateRoleInput) {
    return this.roleRepo.save({ ...role });
  }

  async updateRole(input: UpdateRoleInput) {
    const { id, name } = input;
    const role = await this.validateRole(id);
    const count = await this.roleRepo.count({ where: { id: Not(id), name } });
    if (count) throw new BadRequestException('Role is already existed');

    return await this.roleRepo.save({ ...role, name });
  }

  /*************************
   * PRIVATE FUNCTION
   *************************/

  async validateRole(id: number) {
    const ROLE = await this.roleRepo.findOne({
      where: { id, status: EntityStatus.ACTIVE },
    });
    if (!ROLE) throw new NotFoundException('This role not found.');
    return ROLE;
  }
}
