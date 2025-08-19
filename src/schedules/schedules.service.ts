import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';

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
    return this.schedulesRepository.find();
  }

  findOne(id: string) {
    return this.schedulesRepository.findOne({ where: { id } });
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
      throw new BadRequestException(
        'Another schedule already exists with this movie, hall, and start time',
      );
    }

    return this.schedulesRepository.update(id, updateScheduleDto);
  }

  remove(id: string) {
    return this.schedulesRepository.delete(id);
  }
}
