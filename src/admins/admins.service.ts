import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const admin = this.adminsRepository.create(createAdminDto);

    try {
      return await this.adminsRepository.save(admin);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Email already exists');
      }
      throw error;
    }
  }

  findAll() {
    return this.adminsRepository.find();
  }

  async findOne(id: string) {
    try {
      const admin = await this.adminsRepository.findOne({
        where: { id },
      });

      if (!admin) {
        throw new Error('Admin not found');
      }
      return admin;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Admin not found',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.findOne(id);

    Object.assign(admin, updateAdminDto);

    try {
      return await this.adminsRepository.save(admin);
    } catch (error) {
      console.error('Error saving updated admin:', error);
      throw error;
    }
  }

  async remove(id: string) {
    const admin = await this.findOne(id);
    try {
      return await this.adminsRepository.remove(admin);
    } catch (error) {
      console.error('Error removing admin:', error);
      throw error;
    }
  }
}
