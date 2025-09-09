import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { Movie } from '../movies/entities/movie.entity';
import { Order } from '../orders/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Order])],
  providers: [DashboardService],
  controllers: [DashboardController],
})
export class DashboardModule {}
