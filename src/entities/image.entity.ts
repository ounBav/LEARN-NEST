/* eslint-disable prettier/prettier */
import { EntityStatus } from '../common/types/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('images')
export class ImageEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id!: number;

  @Column({ type: 'varchar' })
  name!: string;

  @Column({ type: 'int', nullable: true })
  createdBy?: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdDate!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedDate!: Date;

  @Column({ type: 'enum', enum: EntityStatus, default: EntityStatus.ACTIVE })
  status!: string;
}
