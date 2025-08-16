import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
} from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';

@Entity('Schedules')
@Unique(['movie_id', 'hall', 'start_time'])
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  movie_id: string;

  @ManyToOne(() => Movie, (movie) => movie.schedules)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @Column({ type: 'varchar', length: 10 })
  day: string;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'varchar', length: 50 })
  hall: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
