import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Order } from 'src/orders/entities/order.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (!createUserDto.email) {
      throw new BadRequestException('Email is required');
    }

    const userExists = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (userExists) {
      return userExists;
    }

    const user = this.usersRepository.create(createUserDto);
    return await this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });

      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'User not found',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    Object.assign(user, updateUserDto);

    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      console.error('Error saving updated user:', error);
      throw error;
    }
  }

  async remove(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) throw new NotFoundException('User not found');

    await this.ordersRepository
      .createQueryBuilder()
      .update(Order)
      .set({
        deleted_user_info: `${user.customer_name} (${user.email})`,
        user_id: null,
      })
      .where('user_id = :id', { id: user.id })
      .execute();

    return this.usersRepository.remove(user);
  }
}
