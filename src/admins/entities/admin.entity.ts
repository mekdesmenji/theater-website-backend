import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export enum AdminRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
}

export enum AdminStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity('Admins')
export class Admin {
  @ApiProperty({
    example: '0000-0000-0000-0000',
    description: 'ID of the admin',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'John',
    description: 'First name of the admin',
  })
  @Column({ type: 'text' })
  first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the admin',
  })
  @Column({ type: 'text' })
  last_name: string;

  @Exclude()
  @Column({ type: 'text' })
  password: string;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Role of the admin',
    enum: AdminRole,
    enumName: 'AdminRole',
  })
  @Column({ type: 'enum', enum: AdminRole })
  role: AdminRole;

  @ApiProperty({
    example: 'ACTIVE',
    description: 'Status of the admin',
    enum: AdminStatus,
    enumName: 'AdminStatus',
  })
  @Column({ type: 'enum', enum: AdminStatus })
  status: AdminStatus;

  @ApiProperty({
    example: 'admin@example.com',
    description: 'Email of the admin',
  })
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Creation timestamp of the admin',
  })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Last update timestamp of the admin',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
