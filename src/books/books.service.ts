import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './books.entity';
import { CreateBookDto } from './dtos/create-book.dto';
import { Public } from '../decorators/public.decorator';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private repo: Repository<Book>) {
  }
  addBook(bookInformation){
    const bookEntity = this.repo.create(bookInformation)
    return  this.repo.save(bookEntity)
  }
  @Public()
  async getAllBook(){
    return await this.repo.find()
  }

}
