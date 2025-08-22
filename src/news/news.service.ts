import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { News } from './entities/news.entity';
@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(News)
    private newsRepository: Repository<News>,
  ) {}

  async create(createNewsDto: CreateNewsDto) {
    const newsexistes = await this.newsRepository.findOne({
      where: {
        news_title: createNewsDto.news_title,
        news_summary: createNewsDto.news_summary,
        news_content: createNewsDto.news_content,
      },
    });
    if (newsexistes) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'News already exists',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const news = this.newsRepository.create(createNewsDto);
    return this.newsRepository.save(news);
  }

  findAll() {
    return this.newsRepository.find();
  }

  findOne(id: string) {
    return this.newsRepository.findOne({ where: { id } });
  }

  update(id: string, updateNewsDto: UpdateNewsDto) {
    return this.newsRepository.update(id, updateNewsDto);
  }

  remove(id: string) {
    return this.newsRepository.delete(id);
  }
}
