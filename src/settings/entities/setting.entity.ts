import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Settings')
export class Setting {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the setting',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'A cozy cinema in the heart of the city',
    description: 'Description of the cinema',
  })
  @Column({ type: 'text' })
  cinema_description: string;

  @ApiProperty({
    example: '2005-08-20',
    description: 'Date when the cinema was established',
  })
  @Column({ type: 'date' })
  established_date: string;

  @ApiProperty({
    example: 'https://example.com/cinema.jpg',
    description: 'Image of the cinema',
  })
  @Column({ type: 'text' })
  image: string;

  @ApiProperty({
    example: '2025-10-01T12:00:00Z',
    description: 'Timestamp when the setting was created',
  })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({
    example: '2025-11-01T12:00:00Z',
    description: 'Timestamp when the setting was last updated',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
