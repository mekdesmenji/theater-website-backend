import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty, ApiResponse } from '@nestjs/swagger';
export enum Payment_method {
  TELEBIRR = 'TELEBIRR',
  CBE_BIRR = 'CBE_BIRR',
}

export enum OrderStatus {
  BOOKED = 'BOOKED',
  CONFIRMED = 'CONFIRMED',
  ISSUED = 'ISSUED',
  CHECKED_IN = 'CHECKED_IN',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

@Entity('Orders')
export class Order {
  @ApiProperty({
    example: '0000-0000-0000-0000',
    description: 'ID of the user placing the order',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  user_id: string;

  @ApiProperty({
    example: 'schedule456',
    description: 'ID of the selected schedule',
  })
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

  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  @Column({ type: 'enum', enum: Payment_method })
  payment_method: Payment_method;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
