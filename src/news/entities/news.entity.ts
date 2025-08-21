import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity('News')
export class News {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Unique identifier for the news record',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Breaking News: Major Event Happens',
    description: 'Title of the news article',
  })
  @Column({ type: 'text' })
  news_title: string;

  @ApiProperty({
    example: '2023-10-01',
    description: 'Date of the news article',
  })
  @Column({ type: 'date' })
  news_dates: string;

  @ApiProperty({
    example: 'A brief summary of the news article.',
    description: 'Summary of the news article',
  })
  @Column({ type: 'text' })
  news_summary: string;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'Image associated with the news article',
  })
  @Column({ type: 'text' })
  image: string;

  @ApiProperty({
    example: 'The full content of the news article goes here.',
    description: 'Full content of the news article',
  })
  @Column({ type: 'text' })
  news_content: string;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Timestamp when the news article was created',
  })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({
    example: '2023-10-02T12:00:00Z',
    description: 'Timestamp when the news article was last updated',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
