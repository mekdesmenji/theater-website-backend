import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Histories')
@Unique(['title', 'year', 'subTitle', 'description', 'image'])
export class History {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the history record',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'The Rise of Cinema',
    description: 'Title of the history record',
  })
  @Column({ type: 'text' })
  title: string;

  @ApiProperty({
    example: 'A deep dive into the evolution of film',
    description: 'Subtitle of the history record',
  })
  @Column({ type: 'text' })
  subTitle: string;

  @ApiProperty({
    example:
      'An exploration of the cinematic journey from silent films to modern blockbusters.',
    description: 'Description of the history record',
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({
    example: 'https://example.com/history.jpg',
    description: 'Image associated with the history record',
  })
  @Column({ type: 'text' })
  image: string;

  @ApiProperty({
    example: '2023',
    description: 'Year of the history record',
  })
  @Column({ type: 'varchar', length: 10 })
  year: string;

  @ApiProperty({
    example: '2025-10-01T12:00:00Z',
    description: 'Timestamp when the history record was created',
  })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({
    example: '2025-11-01T12:00:00Z',
    description: 'Timestamp when the history record was last updated',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
