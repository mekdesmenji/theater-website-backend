import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum payment_method {
  MobileMoneyTelebirr = 'Mobile Money (Telebirr)',
  MobileMoneyCBEBirr = 'Mobile Money (CBE Birr)',
}

export enum PaymentStatus {
  PENDING = 'Booked',
  COMPLETED = 'Confirmed',
  FAILED = 'Issued',
  CHECKED_IN = 'Checked-in',
  CANCELLED = 'Cancelled',
  EXPIRED = 'Expired',
}

@Entity('Orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'uuid' })
  schedule_id: string;

  @Column({ type: 'date' })
  show_date: string;

  @Column({ type: 'time' })
  show_time: string;

  @Column('text', { array: true })
  seats: string[];

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total_price: number;

  @Column({ type: 'varchar', length: 255 })
  movie_title: string;

  @Column({ type: 'enum', enum: PaymentStatus })
  status: PaymentStatus;

  @Column({ type: 'enum', enum: payment_method })
  payment_method: payment_method;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
