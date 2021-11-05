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
import {CreateUserDto} from './dtos/create-user.dto';
import {UsersService} from './users.service';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {User} from './user.entity';
import {UpdateUserDto} from './dtos/update-user-dto';
import {UserDto} from './dtos/user.dto';
import {AdminDto} from './dtos/admin.dto';
import {Serialize} from "../interceptors/serialize.interceptor";

@ApiTags('user')
@Controller('/auth')
@Serialize(UserDto)
export class UsersController {
    constructor(private userService: UsersService) {
    }

    @Post('/signup')
    createUser(@Body() body: CreateUserDto) {
        this.userService.create(body.email, body.password);
        return 'success';
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
