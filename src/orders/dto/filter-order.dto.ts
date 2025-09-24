import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { OrderStatus, PriceRange, DateRange } from '../entities/order.entity';

export class FilterOrdersDto {
  @ApiPropertyOptional({
    description: 'Status of the order',
    enum: OrderStatus,
    example: OrderStatus.BOOKED,
  })
  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @ApiPropertyOptional({
    description: 'Filter orders by price range',
    enum: PriceRange,
    example: PriceRange.BELOW_500,
  })
  @IsOptional()
  @IsEnum(PriceRange)
  priceRange?: PriceRange;

  @ApiPropertyOptional({
    description: 'Filter orders by date range',
    enum: DateRange,
    example: DateRange.LAST_MONTH,
  })
  @IsOptional()
  @IsEnum(DateRange)
  dateRange?: DateRange;

  @ApiPropertyOptional({
    description: 'Custom start date (required if dateRange=CUSTOM)',
    example: '2025-09-01',
  })
  @IsOptional()
  @IsDateString()
  customStart?: string;

  @ApiPropertyOptional({
    description: 'Custom end date (required if dateRange=CUSTOM)',
    example: '2025-09-10',
  })
  @IsOptional()
  @IsDateString()
  customEnd?: string;
}
