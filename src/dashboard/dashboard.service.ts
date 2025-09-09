import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../movies/entities/movie.entity';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { DashboardResponseDto } from './dto/dashboard-response.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,

    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getDashboard(): Promise<DashboardResponseDto> {
    const totalMovies = await this.movieRepository.count();

    const { sum } = await this.orderRepository
      .createQueryBuilder('o')
      .select('SUM(o.total_price)', 'sum')
      .getRawOne();
    const totalSales = Number(sum) || 0;

    const { sum: totalTicketsSum } = await this.orderRepository
      .createQueryBuilder('o')
      .select('SUM(o.quantity)', 'sum')
      .getRawOne();

    const totalTickets = Number(totalTicketsSum) || 0;

    const totalCheckIns = await this.orderRepository.count({
      where: { status: OrderStatus.CHECKED_IN },
    });

    const totalCheckOuts = await this.orderRepository.count({
      where: { status: OrderStatus.CHECKED_OUT },
    });

    const totalCancelled = await this.orderRepository.count({
      where: { status: OrderStatus.CANCELLED },
    });

    return {
      totalMovies,
      totalSales,
      totalTickets,
      totalCheckIns,
      totalCheckOuts,
      totalCancelled,
    };
  }
}
