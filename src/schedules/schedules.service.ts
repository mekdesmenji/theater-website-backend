import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private schedulesRepository: Repository<Schedule>,
  ) {}

  async create(createScheduleDto: CreateScheduleDto) {
    const existing = await this.schedulesRepository.findOne({
      where: {
        movie_id: createScheduleDto.movie_id,
        hall: createScheduleDto.hall,
        start_time: createScheduleDto.start_time,
      },
    });

    if (existing) {
      throw new BadRequestException(
        'A schedule already exists for this movie, hall, and start time',
      );
    }

    const schedule = this.schedulesRepository.create(createScheduleDto);
    return this.schedulesRepository.save(schedule);
  }

  findAll() {
    return this.schedulesRepository.find({
      relations: ['movie'],
    });
  }

  async findOne(id: string) {
    try {
      const schedule = await this.schedulesRepository.findOne({
        where: { id },
      });

      if (!schedule) {
        throw new Error('Schedule not found');
      }
      return schedule;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Schedule not found',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async update(id: string, updateScheduleDto: UpdateScheduleDto) {
    const existing = await this.schedulesRepository.findOne({
      where: {
        movie_id: updateScheduleDto.movie_id,
        hall: updateScheduleDto.hall,
        start_time: updateScheduleDto.start_time,
      },
    });

    if (existing && existing.id !== id) {
      throw new Error(
        'Schedule already exists with this movie, hall, and start time',
      );
    }
    const schedule = await this.findOne(id);
    Object.assign(schedule, updateScheduleDto);

    try {
      return await this.schedulesRepository.save(schedule);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Failed to update schedule with ID ${id}`,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async remove(id: string) {
    const schedule = await this.findOne(id);

    try {
      await this.schedulesRepository.remove(schedule);

      return {
        status: HttpStatus.OK,
        message: `Schedule with ID ${id} has been removed successfully`,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `Failed to remove schedule with ID ${id}`,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
