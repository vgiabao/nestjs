import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user-dto';
import { SerializeInterceptor } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AdminDto } from './dtos/admin.dto';
@ApiTags('user')
@Controller('/auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
    return 'sucess';
  }
  @UseInterceptors(new SerializeInterceptor(UserDto))
  @Get('/:id')
  async getUser(@Param() id: number) {
    console.log('handler is running');
    const user = await this.userService.getUser(id);
    if (!user) throw new NotFoundException('not found user');
    return user;
  }
  @UseInterceptors(new SerializeInterceptor(AdminDto))
  @Get('/admin/:id')
  async getUserForAdmin(@Param() id: number) {
    console.log('handler is running');
    const user = await this.userService.getUser(id);
    if (!user) throw new NotFoundException('not found user');
    return user;
  }
  @Get('/')
  getUsers() {
    return this.userService.findAll();
  }
  @Delete('/:id')
  deleteUser(@Param() id: number) {
    return this.userService.remove(id);
  }
  @Patch('/:id')
  updateUser(id: number, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }
}