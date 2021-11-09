import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Delete,
  Patch,
  NotFoundException,
  Session,
  UseGuards, Res
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
// import {AuthGuard} from '../guards/app.guard';
import {Response} from 'express';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('user')
@Controller('/auth')
@Serialize(UserDto)
export class UsersController {
  constructor(private userService: UsersService, private authService: AuthService) {
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session) {
    console.log("sign upp");
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }
  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  async signin(@Body() body: CreateUserDto) {
    const user = await this.authService.signIn(body.email, body.password);
    // session.userId = user.id;
    return user;
  }

  @Get('/whoami')
  @UseGuards(AuthGuard('local'))
  getCurrentUser(@CurrentUser() user: User) {
    return user;
  }

  // @Get('/whoami')
  // async getCurrentUser(@Session() session:any){
  //   return await  this.userService.getUser(session.userId)
  // }
  @Post('/signout')
  signOut(@Session() session: any) {
    session.userId = null;
    return "logged out "
  }


  @Get('/:id')
  async getUser(@Param() id: number) {
    const user = await this.userService.getUser(id);
    if (!user) throw new NotFoundException('not found user');
    return user;
  }

  @Get('/admin/:id')
  async getUserForAdmin(@Param() id: number) {
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
