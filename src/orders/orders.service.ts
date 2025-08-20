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

  create(createOrderDto: CreateOrderDto) {
    const order = this.ordersRepository.create(createOrderDto);
    return this.ordersRepository.save(order);
  }

  findAll() {
    return this.ordersRepository.find();
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
      console.error('Error saving updated order:', error);
      throw error;
    }
  }

  remove(id: string) {
    return this.ordersRepository.delete(id);
  }
}
