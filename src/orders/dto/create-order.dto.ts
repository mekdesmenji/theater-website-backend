import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentMethod, OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @ApiProperty({
    example: 'user123',
    description: 'ID of the user placing the order',
  })
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    example: 'schedule456',
    description: 'ID of the selected schedule',
  })
  @IsString()
  @IsNotEmpty()
  schedule_id: string;

  @ApiProperty({ example: '2025-08-20', description: 'Date of the show' })
  @IsNotEmpty()
  @IsString()
  show_date: string;

  @ApiProperty({ example: '18:30', description: 'Time of the show' })
  @IsNotEmpty()
  @IsString()
  show_time: string;

  @ApiProperty({
    example: ['A1', 'A2'],
    description: 'Seats selected for the order',
  })
  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  seats: string[];

  @ApiProperty({
    example: PaymentMethod.TELEBIRR,
    description: 'Payment method used',
  })
  @IsEnum(PaymentMethod)
  payment_method: PaymentMethod;

  @ApiProperty({
    example: OrderStatus.BOOKED,
    description: 'Current status of the order',
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({ example: 2, description: 'Number of tickets' })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @ApiProperty({ example: 50, description: 'Total price of the order' })
  @IsNotEmpty()
  @IsNumber()
  total_price: number;
}
