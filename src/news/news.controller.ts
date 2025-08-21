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
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'News created successfully',
    type: News,
  })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'List of all news', type: [News] })
  findAll() {
    return this.newsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'News details', type: News })
  @ApiResponse({ status: 404, description: 'News not found' })
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'News updated successfully',
    type: News,
  })
  @ApiResponse({ status: 404, description: 'News not found' })
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'News deleted successfully',
    type: News,
  })
  @ApiResponse({ status: 404, description: 'News not found' })
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}
