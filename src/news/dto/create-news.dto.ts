import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateNewsDto {
  @IsNotEmpty()
  @IsString()
  news_title: string;

  @IsNotEmpty()
  @IsDateString()
  news_dates: string;

  @IsNotEmpty()
  @IsString()
  news_summary: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsNotEmpty()
  @IsString()
  news_content: string;
}
