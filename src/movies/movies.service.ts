import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  create(createMovieDto: CreateMovieDto) {
    const movie = this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(movie);
  }

  findAll() {
    return this.movieRepository.find({
      relations: ['schedules'],
    });
  }

  async findOne(id: string) {
    try {
      const movie = await this.movieRepository.findOne({ where: { id } });

      if (!movie) {
        throw new Error('Movie not found');
      }
      return movie;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Movie not found',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  async update(id: string, updateMovieDto: UpdateMovieDto) {
    const movie = await this.findOne(id);

    Object.assign(movie, updateMovieDto);

    try {
      return await this.movieRepository.save(movie);
    } catch (error) {
      console.error('Error saving updated movie:', error);
      throw error;
    }
  }

  async remove(id: string) {
    const movie = await this.findOne(id);
    try {
      return await this.movieRepository.remove(movie);
    } catch (error) {
      console.error('Error removing movie:', error);
      throw error;
    }
  }
}
