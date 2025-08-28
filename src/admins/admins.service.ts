import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private adminsRepository: Repository<Admin>,
  ) {}

  async signup(createAdminDto: CreateAdminDto): Promise<Admin> {
    const existingAdmin = await this.adminsRepository.findOne({
      where: { email: createAdminDto.email },
    });

    if (existingAdmin) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'Admin with this email already exists',
        },
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    const admin = this.adminsRepository.create({
      first_name: createAdminDto.first_name,
      last_name: createAdminDto.last_name,
      email: createAdminDto.email,
      role: createAdminDto.role,
      status: createAdminDto.status,
      password: hashedPassword,
    });

    try {
      return await this.adminsRepository.save(admin);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Failed to create admin',
        },
        HttpStatus.BAD_REQUEST,
        { cause: error },
      );
    }
  }

  async validateAdmin(email: string, password: string) {
    const admin = await this.adminsRepository.findOne({ where: { email } });
    if (!admin) return null;

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return null;

    return admin;
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
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Failed to update admin with ID ${id}`,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async remove(id: string) {
    const admin = await this.findOne(id);

    try {
      await this.adminsRepository.remove(admin);

      return {
        status: HttpStatus.OK,
        message: `Admin with ID ${id} has been removed successfully`,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Failed to remove admin with ID ${id}`,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
