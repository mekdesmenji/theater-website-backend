import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsString,
} from 'class-validator';
import { Payment_method, OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  schedule_id: string;

  @IsNotEmpty()
  @IsString()
  show_date: string;

  @IsNotEmpty()
  @IsString()
  show_time: string;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  seats: string[];

  @IsEnum(Payment_method)
  payment_method: Payment_method;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  total_price: number;
}
