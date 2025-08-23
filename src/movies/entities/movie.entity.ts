import { Schedule } from '../../schedules/entities/schedule.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

export enum MovieStatus {
  COMING_SOON = 'COMING_SOON',
  NOW_SHOWING = 'NOW_SHOWING',
}

@Entity('Movies')
export class Movie {
  @ApiProperty({
    example: '0000-0000-0000-0000',
    description: 'ID of the movie',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiPropertyOptional({
    example: [
      {
        id: '0000-0000-0000-0001',
        movie_id: '0000-0000-0000-0000',
        hall: 1,
        start_time: '2023-10-01T14:00:00Z',
        end_time: '2023-10-01T16:30:00Z',
      },
      {
        id: '0000-0000-0000-0002',
        movie_id: '0000-0000-0000-0000',
        hall: 2,
        start_time: '2023-10-01T17:00:00Z',
        end_time: '2023-10-01T19:30:00Z',
      },
    ],
    description: 'A list of schedules associated with this movie.',
    type: () => [Schedule],
  })
  @OneToMany(() => Schedule, (schedule) => schedule.movie)
  schedules: Schedule[];

  @ApiProperty({
    example: 'https://example.com/poster.jpg',
    description: 'URL of the movie poster',
  })
  @Column({ type: 'text' })
  poster: string;

  @ApiProperty({
    example: 'Inception',
    description: 'Title of the movie',
  })
  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ApiProperty({
    example: '2020-07-16',
    description: 'Release date of the movie',
  })
  @Column({ type: 'date' })
  release_date: string;

  @ApiProperty({ example: '3h 2m', description: 'Duration of the movie' })
  @Column({ type: 'varchar', length: 10 })
  duration: string;

  @ApiProperty({
    example: ['Action', 'Adventure'],
    description: 'Genres of the movie',
    type: [String],
  })
  @Column('text', { array: true })
  genres: string[];

  @ApiProperty({ example: 'English', description: 'Language of the movie' })
  @Column({ type: 'varchar', length: 50 })
  language: string;

  @ApiProperty({ example: 'PG-13', description: 'Age rating of the movie' })
  @Column({ type: 'varchar', length: 10 })
  age_rating: string;

  @ApiProperty({
    example: MovieStatus.NOW_SHOWING,
    description: 'Status of the movie',
    enum: MovieStatus,
    enumName: 'MovieStatus',
  })
  @Column({ type: 'enum', enum: MovieStatus })
  status: MovieStatus;

  @ApiProperty({
    example: true,
    description: 'Whether the movie is featured',
    required: false,
  })
  @Column({ type: 'boolean', default: false })
  featured: boolean;

  @ApiProperty({
    example: '2025-08-20T10:00:00Z',
    description: 'The date and time when the record was created.',
  })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({
    example: '2025-09-20T10:00:00Z',
    description: 'The date and time when the record was updated.',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
