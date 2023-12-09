/* eslint-disable prettier/prettier */
import { IsNotEmptyArrayString, IsNotEmptyNumber } from 'src/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn({ type: 'int8' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @IsNotEmptyArrayString()
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true, default: '-' })
  description: string;

  @Column({ type: 'int8' })
  @IsNotEmptyNumber()
  createdBy: number;

  @Column({ type: 'int8', nullable: true })
  updatedBy: number;

  @Column({ type: 'int8', nullable: true })
  imageId: number;

  @Column({ type: 'int8' })
  categoryId: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
