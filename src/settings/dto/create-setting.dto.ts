import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSettingDto {
  @ApiProperty({
    example: 'A cozy cinema in the heart of the city',
    description: 'Description of the cinema',
  })
  @IsNotEmpty()
  @IsString()
  cinema_description: string;

  @ApiProperty({
    example: '2005-08-20',
    description: 'Date when the cinema was established',
  })
  @IsNotEmpty()
  @IsDateString()
  established_date: string;

  @ApiProperty({
    example: 'https://example.com/cinema.jpg',
    description: 'Image of the cinema',
  })
  @IsNotEmpty()
  @IsString()
  image: string;
}
