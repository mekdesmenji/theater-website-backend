import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsString,
} from 'class-validator';
import { payment_method, PaymentStatus } from '../entities/order.entity';

export class CreateOrderDto {
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

  @IsEnum(payment_method)
  payment_method: payment_method;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  total_price: number;
}
