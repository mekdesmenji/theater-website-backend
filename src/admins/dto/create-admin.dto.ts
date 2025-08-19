import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AdminRole, AdminStatus } from '../entities/admin.entity';

export class CreateAdminDto {
  @ApiProperty({ example: 'Sophia', description: 'First name of the admin' })
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ example: 'Quan', description: 'Last name of the admin' })
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ example: 'secret123', description: 'Password of the admin' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({
    example: AdminRole.ADMIN,
    description: 'Role of the admin',
    enum: AdminRole,
  })
  @IsEnum(AdminRole)
  role: AdminRole;

  @ApiProperty({
    example: AdminStatus.ACTIVE,
    description: 'Status of the admin',
    enum: AdminStatus,
  })
  @IsEnum(AdminStatus)
  status: AdminStatus;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Email of the admin',
  })
  @IsEmail()
  email: string;
}
