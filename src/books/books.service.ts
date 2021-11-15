import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { Book } from './books.entity';
import { CreateBookDto } from './dtos/create-book.dto';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(User) private repo: Repository<Book>) {
  }
  addBook(bookInformation){
    const bookEntity = this.repo.create(bookInformation)
    return  this.repo.save(bookEntity)
  }
  async getAllBook(){
    return await this.repo.find()
  }

}
