import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';

@ApiTags('Settings')
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Setting created successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  create(@Body() createSettingDto: CreateSettingDto) {
    return this.settingsService.create(createSettingDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all settings' })
  findAll() {
    return this.settingsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Setting details' })
  @ApiResponse({ status: 404, description: 'Setting not found' })
  findOne(@Param('id') id: string) {
    return this.settingsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Setting updated successfully' })
  @ApiResponse({ status: 404, description: 'Setting not found' })
  update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
    return this.settingsService.update(id, updateSettingDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Setting deleted successfully' })
  @ApiResponse({ status: 404, description: 'Setting not found' })
  remove(@Param('id') id: string) {
    return this.settingsService.remove(id);
  }
}
