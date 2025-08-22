import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { Setting } from './entities/setting.entity';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Setting created successfully',
    type: Setting,
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  setSetting(@Body() createSettingDto: CreateSettingDto) {
    return this.settingsService.setSetting(createSettingDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'get setting',
    type: Setting,
  })
  getSetting() {
    return this.settingsService.getSetting();
  }
}
