import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector : Reflector) {
  }
  canActivate(context: ExecutionContext): boolean {

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (roles.includes("public")) return true;
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log('request from admin guard, ', request.user)
    const user = request.user;
    return roles.includes(user.roles);
  }
}
