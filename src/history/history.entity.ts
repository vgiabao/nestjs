import {
  Entity,
  PrimaryGeneratedColumn, OneToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Book } from '../books/books.entity';
@Entity()
export class History {
  @PrimaryGeneratedColumn()
  id: number;
  @OneToOne(type => User, user => user.id)
  uid: number;
  @OneToOne(type => Book, book=> book.id)
  bid: number;
}
