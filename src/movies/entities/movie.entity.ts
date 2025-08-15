import { Schedules } from '../../schedules/entities/schedule.entity';

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

export enum MovieStatus {
  COMING_SOON = 'COMING_SOON',
  NOW_SHOWING = 'NOW_SHOWING',
}

@Entity()
export class Movies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Schedules, (schedule) => schedule.movie)
  schedules: Schedules[];

  @Column({ type: 'text' })
  poster: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'date' })
  release_date: string;

  @Column({ type: 'varchar', length: 10 })
  duration: string;

  @Column('text', { array: true })
  genres: string[];

  @Column({ type: 'varchar', length: 50 })
  language: string;

  @Column({ type: 'varchar', length: 10 })
  age_rating: string;

  @Column({ type: 'enum', enum: MovieStatus })
  status: MovieStatus;

  @Column({ type: 'boolean', default: false })
  featured: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
