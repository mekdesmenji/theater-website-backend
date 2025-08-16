import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('News')
export class News {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  news_title: string;

  @Column({ type: 'date' })
  news_dates: string;

  @Column({ type: 'text' })
  news_summary: string;

  @Column({ type: 'text' })
  image: string;

  @Column({ type: 'text' })
  news_content: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
