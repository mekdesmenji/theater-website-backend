import { ApiProperty } from '@nestjs/swagger';

export class DashboardResponseDto {
  @ApiProperty({
    example: 12,
    description: 'Total number of movies available in the system',
  })
  totalMovies: number;

  @ApiProperty({
    example: 4500,
    description: 'Total sales amount from all orders',
  })
  totalSales: number;

  @ApiProperty({
    example: 300,
    description: 'Total number of tickets sold',
  })
  totalTickets: number;

  @ApiProperty({
    example: 250,
    description: 'Total number of successful check-ins',
  })
  totalCheckIns: number;

  @ApiProperty({
    example: 200,
    description: 'Total number of successful check-outs',
  })
  totalCheckOuts: number;

  @ApiProperty({
    example: 10,
    description: 'Total number of cancelled orders',
  })
  totalCancelled: number;
}
