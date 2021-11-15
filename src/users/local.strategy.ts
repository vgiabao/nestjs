import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import {AuthService} from './auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
    console.log(authService);
    console.log("constructed");
    
  }

  async validate(email: string, password: string): Promise<any> {
    console.log('run here')
    const user = await this.authService.validate(email, password);
    console.log("validating")
    if (!user) {
      console.log("not user");
      throw new UnauthorizedException()
      
          }
    return user
  }
}