import { ApiTags, ApiResponse } from '@nestjs/swagger';
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

  // @Post()
  // @UseInterceptors(
  //   FileInterceptor('poster', {
  //     storage: diskStorage({
  //       destination: './uploads/posters',
  //       filename: (req, file, cb) => {
  //         const uniqueSuffix =
  //           Date.now() + '-' + Math.round(Math.random() * 1e9);
  //         const ext = extname(file.originalname);
  //         cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  //       },
  //     }),
  //   }),
  // )
  // @ApiResponse({
  //   status: 201,
  //   description: 'Movie created successfully',
  //   type: Movie,
  // })
  // @ApiResponse({ status: 400, description: 'Validation failed' })
  // create(
  //   @UploadedFile() poster: Express.Multer.File,
  //   @Body() createMovieDto: CreateMovieDto,
  // ) {
  //   if (poster) createMovieDto.poster = poster.filename;
  //   if (typeof createMovieDto.genres === 'string') {
  //     createMovieDto.genres = JSON.parse(createMovieDto.genres);
  //   }
  //   return this.moviesService.create(createMovieDto);
  // }

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
  @ApiResponse({
    status: 200,
    description: 'Movie updated successfully',
    type: Movie,
  })
  @ApiResponse({ status: 404, description: 'Movie not found' })
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
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
