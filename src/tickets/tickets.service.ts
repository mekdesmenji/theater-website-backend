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
    console.log('Filter selected:', filter);

    const now = new Date();

    if (filter === 'day') {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      const startUtc = startOfDay.toISOString();
      const endUtc = endOfDay.toISOString();

      console.log('Start UTC:', startUtc);
      console.log('End UTC:', endUtc);

      const results = await this.orderRepository
        .createQueryBuilder('order')
        .select('EXTRACT(HOUR FROM order.created_at)::int', 'hour')
        .addSelect('SUM(order.total_price)::float', 'money')
        .addSelect('SUM(order.quantity)::int', 'ticketsSold')
        .where('order.created_at BETWEEN :start AND :end', {
          start: startUtc,
          end: endUtc,
        })
        .groupBy('hour')
        .orderBy('hour')
        .getRawMany();

      console.log('Query results:', results);

      const data: TicketDto[] = Array.from({ length: 24 }, (_, i) => {
        const found = results.find((r) => Number(r.hour) === i);
        const hourLabel = i === 0 ? 12 : i > 12 ? i - 12 : i;
        const amPm = i < 12 ? 'AM' : 'PM';
        return {
          date: `${hourLabel} ${amPm}`,
          ticketsSold: found ? Number(found.ticketsSold) : 0,
          money: found ? Number(found.money) : 0,
        };
      });

      console.log('Final data for chart:', data);
      return data;
    }

    if (filter === 'week') {
      // Start of the week (Sunday)
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);

      // End of the week (Saturday)
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      const startUtc = startOfWeek.toISOString();
      const endUtc = endOfWeek.toISOString();

      console.log('Start of week UTC:', startUtc);
      console.log('End of week UTC:', endUtc);

      const results = await this.orderRepository
        .createQueryBuilder('order')
        .select("TO_CHAR(order.created_at, 'Dy')", 'day')
        .addSelect('SUM(order.total_price)::float', 'money')
        .addSelect('SUM(order.quantity)::int', 'ticketsSold')
        .where('order.created_at BETWEEN :start AND :end', {
          start: startUtc,
          end: endUtc,
        })
        .groupBy("TO_CHAR(order.created_at, 'Dy')")
        .orderBy('MIN(EXTRACT(DOW FROM order.created_at))')
        .getRawMany();

      console.log('Query results:', results);

      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const data: TicketDto[] = days.map((d) => {
        const found = results.find((r) => r.day.trim() === d);
        return {
          date: d,
          ticketsSold: found ? Number(found.ticketsSold) : 0,
          money: found ? Number(found.money) : 0,
        };
      });

      console.log('Final data for week chart:', data);
      return data;
    }
    if (filter === 'month') {
      // Start and end of the month in local time
      const startOfMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1,
        0,
        0,
        0,
      );
      const endOfMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
      );

      const startUtc = startOfMonth.toISOString();
      const endUtc = endOfMonth.toISOString();

      console.log('Start of month UTC:', startUtc);
      console.log('End of month UTC:', endUtc);

      // Query: sum tickets and money per day
      const results = await this.orderRepository
        .createQueryBuilder('o')
        .select(
          "TO_CHAR(o.created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Africa/Addis_Ababa', 'DD Mon')",
          'day',
        )
        .addSelect('SUM(o.total_price)::float', 'money')
        .addSelect('SUM(o.quantity)::int', 'ticketsSold')
        .where('o.created_at BETWEEN :start AND :end', {
          start: startUtc,
          end: endUtc,
        })
        .groupBy(
          "TO_CHAR(o.created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Africa/Addis_Ababa', 'DD Mon')",
        )
        .orderBy(
          "TO_CHAR(o.created_at AT TIME ZONE 'UTC' AT TIME ZONE 'Africa/Addis_Ababa', 'DD Mon')",
        )
        .getRawMany();

      console.log('Query results:', results);

      const daysInMonth = endOfMonth.getDate();
      const monthName = now.toLocaleString('default', { month: 'short' });

      const data: TicketDto[] = Array.from({ length: daysInMonth }, (_, i) => {
        const dayNumber = i + 1;
        const dayLabel = `${dayNumber.toString().padStart(2, '0')} ${monthName}`;

        // Compare using strings instead of converting to Date
        const found = results.find((r) => r.day === dayLabel);

        return {
          date: dayLabel,
          ticketsSold: found ? Number(found.ticketsSold) : 0,
          money: found ? Number(found.money) : 0,
        };
      });

      console.log('Final data for month chart:', data);
      return data;
    }

    if (filter === 'year') {
      const startOfYear = new Date(now.getFullYear(), 0, 1, 0, 0, 0);
      const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

      const startUtc = startOfYear.toISOString();
      const endUtc = endOfYear.toISOString();

      console.log('Start of year UTC:', startUtc);
      console.log('End of year UTC:', endUtc);

      const results = await this.orderRepository
        .createQueryBuilder('order')
        .select("TO_CHAR(order.show_date, 'Mon')", 'month')
        .addSelect('SUM(order.total_price)::float', 'money')
        .addSelect('SUM(order.quantity)::int', 'ticketsSold')
        .where('order.show_date BETWEEN :start AND :end', {
          start: startUtc,
          end: endUtc,
        })
        .groupBy(
          "TO_CHAR(order.show_date, 'Mon'), EXTRACT(MONTH FROM order.show_date)",
        )
        .orderBy('EXTRACT(MONTH FROM order.show_date)')
        .getRawMany();

      console.log('Query results:', results);

      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      const data: TicketDto[] = months.map((m) => {
        const found = results.find((r) => r.month === m);
        return {
          date: m,
          ticketsSold: found ? Number(found.ticketsSold) : 0,
          money: found ? Number(found.money) : 0,
        };
      });

      console.log('Final data for year chart:', data);
      return data;
    }

    // fallback
    const fallbackResult = await this.orderRepository
      .createQueryBuilder('order')
      .getRawMany();
    console.log('Fallback query results:', fallbackResult);
    return fallbackResult;
  }
}
