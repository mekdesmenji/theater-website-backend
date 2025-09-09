import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiQuery, ApiOkResponse } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { TicketDto } from './dto/tickets.dto';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  @ApiQuery({
    name: 'filter',
    enum: ['day', 'week', 'month', 'year'],
    required: true,
    description: 'Time filter for ticket sales',
  })
  @ApiOkResponse({
    type: TicketDto,
    isArray: true,
    description: 'List of ticket sales data grouped by the selected filter',
  })
  async getTickets(@Query('filter') filter: string): Promise<TicketDto[]> {
    return this.ticketsService.getTickets(filter);
  }
}
