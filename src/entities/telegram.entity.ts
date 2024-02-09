import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('telegrams')
export class TelegramEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'bigint' })
  chat_id!: number;

  @Column()
  is_bot!: boolean;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  username!: string;
}
