import { ApiProperty } from '@nestjs/swagger';
import { MovieStatus } from '../entities/movie.entity';
import {
  IsString,
  IsDateString,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsArray,
} from 'class-validator';
export class CreateMovieDto {
  @ApiProperty({
    example: 'Avengers: Endgame',
    description: 'Title of the movie',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '2019-04-26',
    description: 'Release date of the movie',
  })
  @IsDateString()
  release_date: string;

  @ApiProperty({ example: '3h 2m', description: 'Duration of the movie' })
  @IsString()
  duration: string;

  @ApiProperty({
    example: ['Action', 'Adventure'],
    description: 'Genres of the movie',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @ApiProperty({ example: 'English', description: 'Language of the movie' })
  @IsString()
  language: string;

  @ApiProperty({ example: 'PG-13', description: 'Age rating of the movie' })
  @IsString()
  age_rating: string;

  @ApiProperty({
    example: MovieStatus.NOW_SHOWING,
    description: 'Status of the movie',
    enum: MovieStatus,
  })
  @IsEnum(MovieStatus)
  status: MovieStatus;

  @ApiProperty({
    example: true,
    description: 'Whether the movie is featured',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @ApiProperty({
    example: 'https://imageurl.com/poster.jpg',
    description: 'URL of the movie poster',
  })
  @IsString()
  poster: string;
}

