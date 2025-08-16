import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';

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

  findOne(id: string) {
    return this.adminsRepository.findOne({ where: { id } });
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminsRepository.update(id, updateAdminDto);
  }

  remove(id: string) {
    return this.adminsRepository.delete(id);
  }
}
