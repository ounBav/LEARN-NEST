/* eslint-disable prettier/prettier */
import { UserRole, UserStatus } from 'src/common/types/enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type: 'varchar', nullable: false})
  first_name: string;

  @Column({type: 'varchar', nullable: false})
  last_name: string;

  @Column({type: 'varchar', nullable: false})
  username: string;

  @Column({type: 'varchar', nullable: false})
  email: string;

  @Column({type: 'varchar', nullable: false})
  password: string;

  @Column({type: 'enum', enum: UserRole , default: UserRole.GUEST})
  role: string;

  @Column({type: 'enum', enum: UserStatus , default: UserStatus.ACTIVE})
  status: string;
}
