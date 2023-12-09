/* eslint-disable prettier/prettier */
import { IsNotEmptyArrayString } from 'src/common';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn({ type: 'int8' })
  id: number;

  @Column({ type: 'varchar' })
  @IsNotEmptyArrayString()
  name: string;

  @Column({ type: 'int8' })
  createdBy: number;

  @Column({ type: 'int8', nullable: true })
  updatedBy: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}
