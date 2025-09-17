import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Movie } from '../../movies/entities/movie.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from 'src/orders/entities/order.entity';

@Entity('Schedules')
@Unique(['movie_id', 'hall', 'start_time'])
export class Schedule {
  @ApiProperty({
    example: '0000-0000-0000-0000',
    description: 'ID of the schedule',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiPropertyOptional({
    example: [
      {
        id: 1,
        totalPrice: 25.5,
        status: 'BOOKED',
      },
      {
        id: 2,
        totalPrice: 42.0,
        status: 'EXPIRED',
      },
    ],
    description: 'A list of orders associated with this schedule.',
    type: () => [Order],
  })
  @OneToMany(() => Order, (order) => order.schedule)
  order: Order[];

  @ApiProperty({
    example: '0000-0000-0000-0000',
    description: 'ID of the movie associated with the schedule',
  })
  @Column({ type: 'uuid' })
  movie_id: string;

  @ApiPropertyOptional({
    example: {
      id: 456,
      title: 'Inception',
      director: 'Christopher Nolan',
    },
    description:
      'The movie associated with this schedule. It will be deleted if the movie is deleted.',
    type: () => Movie,
  })
  @ManyToOne(() => Movie, (movie) => movie.schedules, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @ApiProperty({
    example: 'Monday',
    description: 'Day of the week for the schedule',
  })
  @Column({ type: 'varchar', length: 10 })
  day: string;

  @ApiProperty({
    example: '10:00:00',
    description: 'Start time of the schedule',
  })
  @Column({
    type: 'time',
    transformer: {
      to: (value: string | null) => value,
      from: (value: string | null) => (value ? value.slice(0, 5) : value),
    },
  })
  start_time: string;

  @ApiProperty({
    example: 'Hall 1',
    description: 'The hall where the movie will play',
  })
  @Column({ type: 'varchar', length: 50 })
  hall: string;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Creation timestamp of the schedule',
  })
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ApiProperty({
    example: '2023-10-01T12:00:00Z',
    description: 'Last update timestamp of the schedule',
  })
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
