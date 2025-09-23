import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus } from '../entities/order.entity';

export class FilterOrdersDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}
