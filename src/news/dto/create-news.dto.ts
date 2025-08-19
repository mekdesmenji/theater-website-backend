import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNewsDto {
  @ApiProperty({
    example: 'New Movie Release',
    description: 'Title of the news',
  })
  @IsNotEmpty()
  @IsString()
  news_title: string;

  @ApiProperty({ example: '2025-08-20', description: 'Date of the news' })
  @IsNotEmpty()
  @IsDateString()
  news_dates: string;

  @ApiProperty({
    example: 'A short summary of the news',
    description: 'Summary of the news',
  })
  @IsNotEmpty()
  @IsString()
  news_summary: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Image URL for the news',
  })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({
    example: 'Full content of the news...',
    description: 'Detailed content of the news',
  })
  @IsNotEmpty()
  @IsString()
  news_content: string;
}
