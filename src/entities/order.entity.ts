/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn({ type: 'int8' })
  id!: number;

  @Column({ type: 'int8' })
  paymentId!: number;

  @Column({ type: 'int8' })
  orderBy!: number;

  @Column({ type: 'float8' })
  totalPrice!: number;

  @Column({ type: 'timestamptz' })
  orderDate!: Date;
}
