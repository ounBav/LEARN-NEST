/* eslint-disable prettier/prettier */
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader';
import { RoleEntity } from '../../entities/index';
import { In, Repository } from 'typeorm';
import { Role } from '../role/rolse.model';

@Injectable({ scope: Scope.REQUEST })
export class UserLoader {
  constructor(
    @InjectRepository(RoleEntity) private RoleRepo: Repository<RoleEntity>,
  ) {}

  readonly findRoleId = new DataLoader<number, Role>(async (ids) => {
    const roleIds = [...new Set(ids.filter((id) => id))];
    if (!roleIds.length) return roleIds.map(() => null);
    const results = await this.RoleRepo.find({ where: { id: In(roleIds) } });

    return roleIds.map((id) => results.find((x) => x.id == id)) as any;
  });
}
