/* eslint-disable prettier/prettier */
import { EntityStatus } from 'src/common/types/enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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

  @Column({ nullable: true, type: "int8" })
  roleId!: number

  @CreateDateColumn({type: "timestamptz"})
  createdAt!: Date;
  
  @UpdateDateColumn({type: "timestamptz"})
  updatedAt!: Date;

  @Column({type: 'enum', enum: EntityStatus , default: EntityStatus.ACTIVE})
  status: string;
}
