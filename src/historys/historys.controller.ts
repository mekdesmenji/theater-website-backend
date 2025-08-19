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
import { HistorysService } from './historys.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';

@ApiTags('Historys')
@Controller('historys')
export class HistorysController {
  constructor(private readonly historysService: HistorysService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'History item created successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  create(@Body() createHistoryDto: CreateHistoryDto) {
    return this.historysService.create(createHistoryDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all history items' })
  findAll() {
    return this.historysService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'History item details' })
  @ApiResponse({ status: 404, description: 'History item not found' })
  findOne(@Param('id') id: string) {
    return this.historysService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'History item updated successfully',
  })
  @ApiResponse({ status: 404, description: 'History item not found' })
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historysService.update(id, updateHistoryDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'History item deleted successfully',
  })
  @ApiResponse({ status: 404, description: 'History item not found' })
  remove(@Param('id') id: string) {
    return this.historysService.remove(id);
  }
}
