/* eslint-disable prettier/prettier */
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn({ type: 'int8' })
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  body?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  createdBy!: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  updatedBy!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  updatedAt!: Date;
}
