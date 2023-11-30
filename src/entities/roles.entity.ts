/* eslint-disable prettier/prettier */
import { EntityStatus } from 'src/common/types/enum';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn({ type: 'int8' })
  id!: number;

  @Column({type: "varchar", length: 255, unique: true})
  name!: string;

  @Column({ type: "varchar", length: 255, nullable: true})
  description!: string;

  @CreateDateColumn({type: "timestamptz"})
  createdAt!: Date;

  @UpdateDateColumn({type: "timestamptz"})
  updatedAt!: Date;

  @Column({ type: 'enum', enum: EntityStatus, default: EntityStatus.ACTIVE })
  status!: string;
}
