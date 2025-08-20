import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';
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
    description: 'ID of the order',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '0000-0000-0000-0000',
    description: 'ID of the user placing the order',
  })
  @Column({ type: 'uuid' })
  user_id: string;

  @ApiProperty({
    example: 'schedule456',
    description: 'ID of the selected schedule',
  })
  @Column({ type: 'uuid' })
  schedule_id: string;

  @ApiProperty({ example: '2025-08-20', description: 'Date of the show' })
  @Column({ type: 'date' })
  show_date: string;

  @ApiProperty({ example: '18:30', description: 'Time of the show' })
  @Column({ type: 'time' })
  show_time: string;

  @ApiProperty({
    example: ['A1', 'A2'],
    description: 'Seats selected for the order',
  })
  @Column('text', { array: true })
  seats: string[];

  @ApiProperty({ example: 2, description: 'Number of tickets ordered' })
  @Column({ type: 'integer' })
  quantity: number;

  @ApiProperty({ example: 100.0, description: 'Total price of the order' })
  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total_price: number;

  @ApiProperty({
    example: OrderStatus.BOOKED,
    description: 'Current status of the order',
  })
  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  @ApiProperty({
    example: Payment_method.TELEBIRR,
    description: 'Payment method used',
  })
  @Column({ type: 'enum', enum: Payment_method })
  payment_method: Payment_method;

  @ApiProperty({
    example: '2025-08-20T10:00:00Z',
    description: 'The date and time when the record was created.',
  })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({
    example: '2025-09-20T10:00:00Z',
    description: 'The date and time when the record was updated.',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
