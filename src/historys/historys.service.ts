import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';

@Injectable()
export class HistorysService {
  constructor(
    @InjectRepository(History)
    private historyRepository: Repository<History>,
  ) {}

  async create(createHistoryDto: CreateHistoryDto) {
    const existingHistory = await this.historyRepository.findOne({
      where: {
        year: createHistoryDto.year,
        title: createHistoryDto.title,
        subTitle: createHistoryDto.subTitle,
        description: createHistoryDto.description,
      },
    });
    if (existingHistory) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'History record already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const history = this.historyRepository.create(createHistoryDto);
    return await this.historyRepository.save(history);
  }

  findAll() {
    return this.historyRepository.find();
  }

  async findOne(id: string) {
    try {
      const history = await this.historyRepository.findOne({
        where: { id },
      });

      if (!history) {
        throw new Error('History not found');
      }
      return history;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'History not found',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async update(id: string, updateHistoryDto: UpdateHistoryDto) {
    const history = await this.findOne(id);

    Object.assign(history, updateHistoryDto);

    try {
      return await this.historyRepository.save(history);
    } catch (error) {
      console.error('Error saving updated history:', error);
      throw error;
    }
  }

  async remove(id: string) {
    const history = await this.findOne(id);
    try {
      return await this.historyRepository.remove(history);
    } catch (error) {
      console.error('Error removing history:', error);
      throw error;
    }
  }
}
