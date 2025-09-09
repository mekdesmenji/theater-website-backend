import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { TicketDto } from './dto/tickets.dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getTickets(filter: string): Promise<TicketDto[]> {
    const query = this.orderRepository.createQueryBuilder('order');

    if (filter === 'day') {
      query
        .select('EXTRACT(HOUR FROM order.created_at)::int', 'date')
        .addSelect('SUM(order.total_price)::float', 'money')
        .addSelect('SUM(order.quantity)::int', 'ticketsSold')
        .where('DATE(order.created_at) = CURRENT_DATE')
        .groupBy('EXTRACT(HOUR FROM order.created_at)')
        .orderBy('EXTRACT(HOUR FROM order.created_at)');
    }

    if (filter === 'week') {
      query
        .select("TO_CHAR(order.created_at, 'Day')", 'date')
        .addSelect('SUM(order.total_price)::float', 'money')
        .addSelect('SUM(order.quantity)::int', 'ticketsSold')
        .where(
          'EXTRACT(WEEK FROM order.created_at) = EXTRACT(WEEK FROM CURRENT_DATE)',
        )
        .groupBy("TO_CHAR(order.created_at, 'Day')")
        .orderBy('MIN(EXTRACT(DOW FROM order.created_at))');
    }

    if (filter === 'month') {
      query
        .select("TO_CHAR(order.show_date, 'Mon DD')", 'date')
        .addSelect('SUM(order.total_price)::float', 'money')
        .addSelect('SUM(order.quantity)::int', 'ticketsSold')
        .where(
          'EXTRACT(MONTH FROM order.show_date) = EXTRACT(MONTH FROM CURRENT_DATE)',
        )
        .groupBy("TO_CHAR(order.show_date, 'Mon DD'), order.show_date")
        .orderBy('order.show_date');
    }

    if (filter === 'year') {
      query
        .select("TO_CHAR(order.show_date, 'Mon')", 'date')
        .addSelect('SUM(order.total_price)::float', 'money')
        .addSelect('SUM(order.quantity)::int', 'ticketsSold')
        .where(
          'EXTRACT(YEAR FROM order.show_date) = EXTRACT(YEAR FROM CURRENT_DATE)',
        )
        .groupBy(
          "TO_CHAR(order.show_date, 'Mon'), EXTRACT(MONTH FROM order.show_date)",
        )
        .orderBy('EXTRACT(MONTH FROM order.show_date)');
    }

    return query.getRawMany();
  }
}
