import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean, IsOptional } from 'class-validator';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  author: string;
  @Column()
  title: string;
  @Column()
  roles: string;
  @Column()
  content: string;
  @Column()
  @IsOptional()
  cover: string;
}
