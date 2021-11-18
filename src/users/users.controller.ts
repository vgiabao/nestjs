import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Public } from '../decorators/public.decorator';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('user')
@Controller('/auth')
export class UsersController {
  constructor(private userService: UsersService, private authService: AuthService) {
  }

  @Roles('public')
  @Public()
  @Serialize(UserDto)
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    console.log('sign upp');
    return await this.authService.signUp(body.email, body.password);
  }

  @Roles('public')
  @Public()
  @Serialize(UserDto)
  @Post('admin/signup')
  async createAdmin(@Body() body: CreateUserDto) {
    return await this.authService.signUp(body.email, body.password, 'admin');
  }

  @Public()
  @Roles('public')
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }


  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  @Get('/pr')
  async getProfile(@Request() req) {
    console.log(req);
    console.log('user ', req.user);
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Roles('user', 'admin')
  @Get('/user')
  async getUserById(@Request() req) {
    console.log('user from controller ', req.user);
    return this.authService.getUserByJwt(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('admin')
  @Get('/users')
  async getUsers() {
    return await this.userService.getUsers();
  }


}
