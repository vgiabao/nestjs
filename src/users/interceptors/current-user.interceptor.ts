import { NestInterceptor, ExecutionContext, CallHandler, Injectable, UnauthorizedException } from '@nestjs/common';
import {UsersService} from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
 constructor(private  userService: UsersService) {
 }
 async intercept(context: ExecutionContext, handler: CallHandler){
  const request = context.switchToHttp().getRequest()
  const { userId } = request.session || {};
 if (userId) {
  const user = this.userService.getUser(userId);
  request.currentUser = user;
 }
  return handler.handle()
 }
}