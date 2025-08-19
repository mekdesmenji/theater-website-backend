import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHistoryDto {
  @ApiProperty({
    example: 'The Beginning',
    description: 'Title of the history item',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'How it all started',
    description: 'Subtitle of the history item',
  })
  @IsNotEmpty()
  @IsString()
  subTitle: string;

  @ApiProperty({
    example: 'This is the story of...',
    description: 'Description of the history item',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Image URL for the history item',
  })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ example: '2020', description: 'Year of the history item' })
  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  year: string;
}
