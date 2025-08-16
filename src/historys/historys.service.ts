import { Injectable } from '@nestjs/common';
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

  create(createHistoryDto: CreateHistoryDto) {
    const history = this.historyRepository.create(createHistoryDto);
    return this.historyRepository.save(history);
  }

  findAll() {
    return this.historyRepository.find();
  }

  findOne(id: string) {
    return this.historyRepository.findOne({ where: { id } });
  }

  update(id: string, updateHistoryDto: UpdateHistoryDto) {
    return this.historyRepository.update(id, updateHistoryDto);
  }

  remove(id: string) {
    return this.historyRepository.delete(id);
  }
}
