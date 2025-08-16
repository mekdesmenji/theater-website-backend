import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';
@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private settingsRepository: Repository<Setting>,
  ) {}

  create(createSettingDto: CreateSettingDto) {
    const setting = this.settingsRepository.create(createSettingDto);
    return this.settingsRepository.save(setting);
  }

  findAll() {
    return this.settingsRepository.find();
  }

  findOne(id: string) {
    return this.settingsRepository.findOne({ where: { id } });
  }

  update(id: string, updateSettingDto: UpdateSettingDto) {
    return this.settingsRepository.update(id, updateSettingDto);
  }

  remove(id: string) {
    return this.settingsRepository.delete(id);
  }
}
