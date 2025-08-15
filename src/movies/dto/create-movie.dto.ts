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
  @IsString()
  title: string;

  @IsDateString()
  release_date: string;

  @IsString()
  duration: string;

  @IsArray()
  @IsString({ each: true })
  genres: string[];

  @IsString()
  language: string;

  @IsString()
  age_rating: string;

  @IsEnum(MovieStatus)
  status: MovieStatus;

  @IsBoolean()
  @IsOptional()
  featured?: boolean;

  @IsString()
  poster: string;
}
