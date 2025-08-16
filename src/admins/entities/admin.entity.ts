import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AdminRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
}

export enum AdminStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity('Admins')
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  first_name: string;

  @Column({ type: 'text' })
  last_name: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'enum', enum: AdminRole })
  role: AdminRole;

  @Column({ type: 'enum', enum: AdminStatus })
  status: AdminStatus;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
