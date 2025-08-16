import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateSettingDto {
  @IsNotEmpty()
  @IsString()
  cinema_description: string;

  @IsNotEmpty()
  @IsDateString()
  established_date: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}
