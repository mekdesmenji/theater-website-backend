import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScheduleDto {
  @ApiProperty({ example: 'uuid-of-movie', description: 'ID of the movie' })
  @IsString()
  @IsNotEmpty()
  movie_id: string;

  @ApiProperty({
    example: '2025-08-20',
    description: 'Day of the schedule (YYYY-MM-DD)',
  })
  @IsString()
  @IsNotEmpty()
  day: string;

  @ApiProperty({ example: '18:00', description: 'Start time of the schedule' })
  @IsString()
  @IsNotEmpty()
  start_time: string;

  @ApiProperty({
    example: 'Hall 1',
    description: 'The hall where the movie will play',
  })
  @IsString()
  @IsNotEmpty()
  hall: string;
}
