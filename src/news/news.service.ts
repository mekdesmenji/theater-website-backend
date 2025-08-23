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

  async findOne(id: string) {
    try {
      const news = await this.newsRepository.findOne({ where: { id } });

      if (!news) {
        throw new Error('News not found');
      }
      return news;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'News not found',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    const news = await this.findOne(id);

    Object.assign(news, updateNewsDto);

    try {
      return await this.newsRepository.save(news);
    } catch (error) {
      console.error('Error saving updated news:', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const news = await this.newsRepository.findOne({ where: { id } });

      if (!news) {
        throw new HttpException(
          `News with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return await this.newsRepository.remove(news);
    } catch (error) {
      console.error('Error removing news:', error);
      throw error;
    }
  }
}
