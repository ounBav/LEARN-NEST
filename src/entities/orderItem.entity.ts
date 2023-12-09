/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orderItems')
export class OrderItemEntity {
  @PrimaryGeneratedColumn({ type: 'int8' })
  id: number;

  @Column({ type: 'int8' })
  orderId: number;

  @Column({ type: 'int8' })
  productId: number;

  @Column({ type: 'int8' })
  quantity: number;
}
