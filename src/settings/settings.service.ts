import { Injectable } from '@nestjs/common';
import { CreateSettingDto } from './dto/create-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Setting } from './entities/setting.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private settingsRepository: Repository<Setting>,
  ) {}

  async setSetting(createSettingDto: CreateSettingDto) {
    const settingExists = await this.settingsRepository.find();
    if (settingExists.length > 0) {
      return this.settingsRepository.update(
        settingExists[0].id,
        createSettingDto,
      );
    }
    const setting = this.settingsRepository.create(createSettingDto);
    return this.settingsRepository.save(setting);
  }

  async getSetting() {
    const settings = await this.settingsRepository.find();
    if (settings.length > 0) {
      return settings[0];
    }
    const setting = this.settingsRepository.create({
      cinema_description: '',
      established_date: null,
      image: '',
    });
    return this.settingsRepository.save(setting);
  }
}
