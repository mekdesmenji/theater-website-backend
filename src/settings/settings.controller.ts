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
// import { UpdateSettingDto } from './dto/update-setting.dto';
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
  SetSetting(@Body() createSettingDto: CreateSettingDto) {
    return this.settingsService.SetSetting(createSettingDto);
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

  //   @Get(':id')
  //   @ApiResponse({ status: 200, description: 'Setting details', type: Setting })
  //   @ApiResponse({ status: 404, description: 'Setting not found' })
  //   findOne(@Param('id') id: string) {
  //     return this.settingsService.findOne(id);
  //   }

  //   @Patch(':id')
  //   @ApiResponse({
  //     status: 200,
  //     description: 'Setting updated successfully',
  //     type: Setting,
  //   })
  //   @ApiResponse({ status: 404, description: 'Setting not found' })
  //   update(@Param('id') id: string, @Body() updateSettingDto: UpdateSettingDto) {
  //     return this.settingsService.update(id, updateSettingDto);
  //   }

  //   @Delete(':id')
  //   @ApiResponse({
  //     status: 200,
  //     description: 'Setting deleted successfully',
  //     type: Setting,
  //   })
  //   @ApiResponse({ status: 404, description: 'Setting not found' })
  //   remove(@Param('id') id: string) {
  //     return this.settingsService.remove(id);
  //   }
}
