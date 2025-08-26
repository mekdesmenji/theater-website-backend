import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Schedule } from 'src/schedules/entities/schedule.entity';

export enum PaymentMethod {
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
    example: '48239',
    description:
      'Unique 5-digit public ID for the order, sent to the user after booking',
    uniqueItems: true,
    nullable: true,
  })
  @Column({ unique: true, nullable: true })
  public_id: string;

  @BeforeInsert()
  generatePublicId() {
    this.public_id = Math.floor(10000 + Math.random() * 90000).toString();
  }

  @ManyToOne(() => User, (user) => user.order, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  @ApiPropertyOptional({
    description: 'The user who placed the order. Null if the user was deleted.',
    example: {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    },
    type: () => User,
  })
  user: User;

  @ApiProperty({
    example: '0000-0000-0000-0000',
    description: 'ID of the user placing the order',
  })
  @Column({ type: 'uuid', nullable: true })
  user_id: string | null;

  @ApiPropertyOptional({
    example: null,
    description:
      'The schedule associated with this order. It will be set to null if the schedule is deleted.',
    type: () => Schedule,
  })
  @ManyToOne(() => Schedule, (schedule) => schedule.order, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'schedule_id' })
  schedule: Schedule;

  @ApiProperty({
    example: 'schedule456',
    description: 'ID of the selected schedule',
  })
  @Column({ type: 'uuid', nullable: true })
  schedule_id: string | null;

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
    enum: OrderStatus,
    enumName: 'OrderStatus',
  })
  @Column({ type: 'enum', enum: OrderStatus })
  status: OrderStatus;

  @ApiProperty({
    example: PaymentMethod.TELEBIRR,
    description: 'Payment method used',
    enum: PaymentMethod,
    enumName: 'PaymentMethod',
  })
  @Column({ type: 'enum', enum: PaymentMethod })
  payment_method: PaymentMethod;

  @Column({ type: 'text', nullable: true })
  deleted_user_info: string | null;

  @Column({ type: 'text', nullable: true })
  searchTags: string | null;

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
