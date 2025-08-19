import { IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: '+251911234567',
    description: 'Phone number of the user',
  })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({
    example: 'Sophia Quan',
    description: 'Full name of the user',
  })
  @IsNotEmpty()
  @IsString()
  customer_name: string;

  @ApiProperty({
    example: 'sophia@example.com',
    description: 'Email of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
