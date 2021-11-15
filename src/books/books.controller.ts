import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Roles } from '../decorators/roles.decorator';
import { Public } from '../guards/public.guard';
import { JwtAuthGuard } from '../users/auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {
  }
  @Public()
  @Roles('public')
  @Get('/')
  async getAllBooks(){
    return await  this.bookService.getAllBook()
  }

  @UseGuards(JwtAuthGuard)
  @Roles('1')
  @Post('/add')
  async addBook(@Body() body){
    const {author, title, roles, content, cover} = body
    return await this.bookService.addBook({ author, title, roles, content, cover })
  }
}
