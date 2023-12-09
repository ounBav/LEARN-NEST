/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment')
export class PaymentEntity {
  @PrimaryGeneratedColumn({ type: 'int8' })
  id: number;

  @Column({ type: 'int8' })
  customerId: number;

  @Column({ type: 'varchar', length: 250 })
  paymentMethos: string;

  @Column({ type: 'timestamptz' })
  paymentDate: Date;
}
