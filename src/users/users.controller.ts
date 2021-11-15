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
  UseGuards, Res, Request
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dtos/update-user-dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
@ApiTags('user')
@Controller('/auth')
export class UsersController {
  constructor(private userService: UsersService, private authService: AuthService) {
  }
  @Serialize(UserDto)
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session) {
    console.log("sign upp");
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req, @Session() session) {
    const access_token = await this.authService.login(req.user);
    session.token = access_token;
    return access_token
  }

  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  async signin(@Request() req) {
    // const user = await this.authService.signIn(body.email, body.password);
    // session.userId = user.id;
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Serialize(UserDto)
  @Get('/pr')
  async getProfile(@Request() req) {
    console.log(req)
    console.log("user ", req.user)
    return req.user;
  }


}
