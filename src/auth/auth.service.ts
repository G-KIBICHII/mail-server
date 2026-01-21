import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    // Sign in
    async signIn(SignInDto:SignInDto): Promise<any> {
        const user = await this.usersService.findOne(SignInDto.username);

        if(user?.password !== SignInDto.password) {
            throw new UnauthorizedException()
        }

        const { password, ...result } = user;
        return result;
    }

}
