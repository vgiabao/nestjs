import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "beevo.contemi",
      usernameField: 'email'
    });
  }

  async validate(payload: any) {
    console.log("payload jwt", payload)
    return { userId: payload.sub, email: payload.email, roles: payload.roles };
  }
}