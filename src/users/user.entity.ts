import { IsBoolean, IsOptional } from 'class-validator';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  IsNull, OneToMany
} from 'typeorm';
import { Book } from '../books/books.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({unique: true,
    nullable: true})
  @Column({
    unique: true,
    nullable: true,
  })  @IsOptional()
  tokens: string | ""
  @Column()
  roles: number | 1

}
