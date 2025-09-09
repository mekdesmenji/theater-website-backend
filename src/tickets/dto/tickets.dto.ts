import { ApiProperty } from '@nestjs/swagger';

export class TicketDto {
  @ApiProperty({
    example: 'Jun 5',
    description:
      'The label for the period (hour, day, or month) depending on the filter',
  })
  date: string;

  @ApiProperty({
    example: 120,
    description: 'Total number of tickets sold in that period',
  })
  ticketsSold: number;

  @ApiProperty({
    example: 3500.5,
    description: 'Total money earned from sales in that period',
  })
  money: number;
}
