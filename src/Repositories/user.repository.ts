import { UserEntity } from '@entities';
import { BaseRepository } from 'src/lib/typeorm/base.repository';
import { EntityRepository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {}
