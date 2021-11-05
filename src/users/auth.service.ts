import {BadRequestException, Injectable} from "@nestjs/common";
import {UsersService} from "./users.service";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {
    }

    async signUp(email: string, password: string) {
        //    see if email is in use
        const user = await this.userService.getUserByEmail(email)
        if (user.length) throw new BadRequestException('The user is existed')
        //    hash the user password

        //    create new user and save it

        //    return the user

    }

    signIn() {

    }
}