import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { AdminRole, AdminStatus } from '../entities/admin.entity';

export class CreateAdminDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(AdminRole)
  role: AdminRole;

  @IsEnum(AdminStatus)
  status: AdminStatus;

  @IsEmail()
  email: string;
}
