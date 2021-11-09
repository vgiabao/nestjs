import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {LocalStrategy} from './local.strategy';
import {JwtModule} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
@Module({
  imports: [TypeOrmModule.forFeature([User]),  LocalStrategy, JwtModule.register({
    secret: "beevo.contemi",
    signOptions: {expiresIn: "100d"}}), PassportModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService, {
    provide: APP_INTERCEPTOR,
    useClass: CurrentUserInterceptor,
  }],
})
export class UsersModule {
}
