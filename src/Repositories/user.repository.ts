import { UserEntity } from '../entities/index';
import { BaseRepository } from '../lib/typeorm/base.repository';
import { EntityRepository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {}
