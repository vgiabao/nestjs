import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { use } from 'passport';
import { JwtService } from '@nestjs/jwt';
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UsersService, private jwtService: JwtService    ) {
  }

  async signUp(email: string, password: string, roles: string = "user") {
    //    see if email is in use
    const user = await this.userService.getUserByEmail(email);
    if (user.length) throw new BadRequestException('The user is existing');
    //    hash the user password
    // generate a salt
    const salt = randomBytes(8).toString('hex');
    //do hashing
    const hash = (await scrypt(password, salt, 32) as Buffer);
    //  do combine hashing and salt
    const combine = salt + '.' + hash.toString('hex');
    //    create new user and save it
    return await this.userService.create(email, combine, roles);
  }

  async signIn(email: string, password: string) {
    const [user] = await this.userService.getUserByEmail(email);
    const [salt, storedHash] = user.password.split('.');
    const hash = await scrypt(password, salt, 32) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Not Valid');
    }
    return user;
  }
  // async login(user:any){
  //   const payload = {email: user.email, sub: user.userId}
  //   return {
  //     access_token: this.jwtService.sign(payload)
  //   }
  // }


  async validate(email: string, password: string) {
    const [user] = await this.userService.getUserByEmail(email);
    const [salt, storedHash] = user.password.split('.');
    const hash = await scrypt(password, salt, 32) as Buffer;
    console.log(hash)
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Not Valid');
    }
    return user;
  }
  async login(user: any) {
    const payload = { email: user.email, sub: user.id, roles: user.roles };
    console.log("payload from auth service: ",  payload)
    const access_tokens =   this.jwtService.sign(payload)
    return  {
      access_tokens
    };
  }
}