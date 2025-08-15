import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movies } from '../../movies/entities/movie.entity';

@Entity()
export class Schedules {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  movie_id: string;

  @ManyToOne(() => Movies, (movie) => movie.schedules)
  @JoinColumn({ name: 'movie_id' })
  movie: Movies;

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
