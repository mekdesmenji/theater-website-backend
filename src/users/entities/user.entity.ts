import { Order } from 'src/orders/entities/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('Users')
export class User {
  @ApiProperty({
    example: '0000-0000-0000-0000',
    description: 'ID of the user',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiPropertyOptional({
    example: [
      {
        id: 1,
        totalPrice: 45.0,
        status: 'BOOKED',
      },
      {
        id: 2,
        totalPrice: 12.5,
        status: 'EXPIRED',
      },
    ],
    description: 'A list of orders placed by this user.',
    type: () => [Order],
  })
  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  @ApiProperty({
    example: '1234567890',
    description: 'Phone number of the user',
  })
  @Column({ type: 'varchar', length: 20 })
  phone_number: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Name of the user',
  })
  @Column({ type: 'varchar', length: 255 })
  customer_name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the user',
  })
  @Column({ type: 'varchar', length: 255 })
  email: string;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Creation timestamp of the user',
  })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Last update timestamp of the user',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
