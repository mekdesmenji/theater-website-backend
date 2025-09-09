import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/users/entities/user.entity';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  private buildSearchTags(order: Order, user?: User | null) {
    const parts = [
      user?.customer_name ?? '',
      user?.email ?? '',
      order.status ?? '',
      order.payment_method ?? '',
      order.show_date ?? '',
      order.show_time ?? '',
      order.public_id ?? '',
      order.deleted_user_info ?? '',
      Array.isArray(order.seats) ? order.seats.join(' ') : '',
    ];
    return parts.filter(Boolean).join(' ').trim();
  }

  private async generateUniquePublicId(): Promise<string> {
    const randomId = Math.floor(10000 + Math.random() * 90000).toString();
    const existing = await this.ordersRepository.findOne({
      where: { public_id: randomId },
    });

    if (existing) {
      return this.generateUniquePublicId();
    }

    return randomId;
  }

  async create(createOrderDto: CreateOrderDto) {
    try {
      let user: User | null = null;

      if (createOrderDto.user_id) {
        user = await this.usersRepository.findOne({
          where: { id: createOrderDto.user_id },
        });
      }

      const order = this.ordersRepository.create(createOrderDto);

      order.public_id = await this.generateUniquePublicId();

      order.searchTags = this.buildSearchTags(order, user);

      return this.ordersRepository.save(order);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to create order. Please try again.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
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

    let user: User | null = null;
    if (order.user_id) {
      user = await this.usersRepository.findOne({
        where: { id: order.user_id },
      });
    }

    order.searchTags = this.buildSearchTags(order, user);

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

  async search(q: string) {
    return this.ordersRepository
      .createQueryBuilder('o')
      .where('o.searchTags ILIKE :q', { q: `%${q}%` })
      .orderBy('o.created_at', 'DESC')
      .getMany();
  }
}
