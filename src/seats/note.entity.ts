import { IsOptional } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  size: number;
  @Column()
  isAvailable: boolean;
}
