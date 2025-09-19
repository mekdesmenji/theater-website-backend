import { ApiTags, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { Express } from 'express';
import { diskStorage } from 'multer';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: './uploads/posters',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'Inception' },
        release_date: { type: 'string', example: '2025-09-17' },
        duration: { type: 'string', example: '148 min' },
        status: { type: 'string', example: 'NOW_SHOWING' },
        language: { type: 'string', example: 'English' },
        age_rating: { type: 'string', example: 'PG-13' },
        genres: {
          type: 'array',
          items: { type: 'string' },
          example: ['Action', 'Sci-Fi'],
        },
        poster: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Movie successfully created',
    schema: {
      example: {
        id: 1,
        title: 'Inception',
        release_date: '2025-09-17',
        duration: '148 min',
        status: 'NOW_SHOWING',
        language: 'English',
        age_rating: 'PG-13',
        genres: ['Action', 'Sci-Fi'],
        poster: 'poster-123456789.jpg',
      },
    },
    type: Movie,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request – Invalid input or missing file',
  })
  create(@UploadedFile() poster: Express.Multer.File, @Body() body: any) {
    const genresArray = body.genres ? JSON.parse(body.genres) : [];
    const movieData: CreateMovieDto = {
      ...body,
      poster: poster.filename,
      genres: genresArray,
    };
    return this.moviesService.create(movieData);
  }

  @Get('coming-soon')
  @ApiResponse({
    status: 200,
    description: 'List of movies that are coming soon',
    type: [Movie],
  })
  async getComingSoon(): Promise<Movie[]> {
    return this.moviesService.getComingSoonMovies();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of all movies',
    type: [Movie],
  })
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Movie details', type: Movie })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('poster', {
      storage: diskStorage({
        destination: './uploads/posters',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  @ApiResponse({
    status: 200,
    description: 'Movie updated successfully',
    type: Movie,
  })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  update(
    @Param('id') id: string,
    @UploadedFile() poster: Express.Multer.File,
    @Body() body: any,
  ) {
    const genresArray = body.genres ? JSON.parse(body.genres) : undefined;
    const updateMovieDto: UpdateMovieDto = {
      ...body,
      genres: genresArray,
    };

    if (poster) {
      updateMovieDto.poster = poster.filename;
    }

    return this.moviesService.update(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Movie deleted successfully',
    type: Movie,
  })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}
