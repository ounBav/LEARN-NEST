/* eslint-disable prettier/prettier */
import { IsNotEmptyArrayString, IsNotEmptyString } from '../common/index';
import { EntityStatus } from '../common/types/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmptyArrayString()
  name!: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '-' })
  description?: string;

  @Column({ type: 'varchar', nullable: true })
  @IsNotEmptyString()
  createdBy?: string;

  @Column({ type: 'varchar', nullable: true })
  updatedBy?: string;

  @Column({ type: 'int8', nullable: true })
  imageId?: number;

  @Column({ type: 'int8' })
  categoryId!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;

  @Column({ type: 'enum', enum: EntityStatus, default: EntityStatus.ACTIVE })
  status!: string;
}
