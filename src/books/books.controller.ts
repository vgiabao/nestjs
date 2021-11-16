import { Body, Controller, Get, Post, UseGuards, Request, Put, Param } from '@nestjs/common';
import { BooksService } from './books.service';
import { Roles } from '../decorators/roles.decorator';
import { Public } from '../guards/public.guard';
import { JwtAuthGuard } from '../users/auth/jwt-auth.guard';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDtos } from './dtos/update-book.dtos';

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

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Post('/add')
  async addBook(@Body() body, @Request() req){
    const {author, title, roles, content, cover} = body
    return await this.bookService.addBook({ author, title, roles, content, cover })
  }

  @Roles('user', 'admin')
  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getBookById(@Body() body){
    const id = body.id
    return await  this.bookService.getBookById(id)
  }

  @Roles('admin')
  @UseGuards(JwtAuthGuard)
  @Put('admin/update/:id')
  async updateBook(@Param() param,  @Body() body:UpdateBookDtos){
    const id = param.id;
    return await this.bookService.updateBookInformation(id, body);
  }

}
