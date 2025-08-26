import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  // async create(createOrderDto: CreateOrderDto) {
  //   const order = this.ordersRepository.create(createOrderDto as any);

  //   try {
  //     return await this.ordersRepository.save(order);
  //   } catch (error) {
  //     if (error.code === '23505') {
  //       order.public_id = Math.floor(10000 + Math.random() * 90000).toString();
  //       return await this.ordersRepository.save(order);
  //     }
  //     throw error;
  //   }
  // }

  create(createOrderDto: CreateOrderDto) {
    const order = this.ordersRepository.create(createOrderDto);
    return this.ordersRepository.save(order);
  }

  findAll() {
    return this.ordersRepository.find({
      relations: ['user', 'schedule', 'schedule.movie'],
      order: { created_at: 'DESC' },
    });
  }

  async findOne(id: string) {
    try {
      const order = await this.ordersRepository.findOne({ where: { id } });

      if (!order) {
        throw new Error('Order not found');
      }
      return order;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Order not found',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.findOne(id);

    Object.assign(order, updateOrderDto);

    try {
      return await this.ordersRepository.save(order);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Failed to update order with ID ${id}`,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async remove(id: string) {
    const order = await this.findOne(id);

    try {
      await this.ordersRepository.remove(order);

      return {
        status: HttpStatus.OK,
        message: `Order with ID ${id} has been removed successfully`,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Failed to remove order with ID ${id}`,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
