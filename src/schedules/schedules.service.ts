import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Repository } from 'typeorm/repository/Repository';
import { Schedules } from './entities/schedule.entity';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedules)
    private schedulesRepository: Repository<Schedules>,
  ) {}
  create(createScheduleDto: CreateScheduleDto) {
    const schedule = this.schedulesRepository.create(createScheduleDto);
    return this.schedulesRepository.save(schedule);
  }

  findAll() {
    return this.schedulesRepository.find();
  }

  findOne(id: string) {
    return this.schedulesRepository.findOne({ where: { id } });
  }

  update(id: string, updateScheduleDto: UpdateScheduleDto) {
    return this.schedulesRepository.update(id, updateScheduleDto);
  }

  remove(id: string) {
    return this.schedulesRepository.delete(id);
  }
}
