import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './books.entity';
import { UpdateBookDtos } from './dtos/update-book.dtos';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private repo: Repository<Book>) {
  }
  addBook(bookInformation){
    const bookEntity = this.repo.create(bookInformation)
    return  this.repo.save(bookEntity)
  }
  async getAllBook(){
    return await this.repo.find()
  }
  async getBookById(id: number){
    return this.repo.findOne({id: id})
  }
  async updateBookInformation(id: number, newProps: Partial<UpdateBookDtos>){
    const book = await this.getBookById(id);
    if (!book) throw new NotFoundException('Book not found');
    Object.assign(book, newProps);
    return this.repo.save(book);
  }
  async deleteBook(id: number){
    const book = await this.repo.findOne({id})
    if (!book) throw new NotFoundException('not found');
    await  this.repo.remove(book)
    return `remote book ${id}`
  }
  async getReadingBook(uid: number){
    return await this.repo.find({ where: { uid: uid, type: 'reading' } })
  }
  async getReadBook(uid: number){
    return await this.repo.find({ where: { uid: uid, type: 'read' } })
  }
  async getFavouriteBook(uid: number){
    return await this.repo.find({ where: { uid: uid, type: 'favourite' } })
  }

}
