import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    // Sign in
    async signIn(SignInDto:SignInDto): Promise<any> {
        const user = await this.usersService.findOne(SignInDto.username);

        if(user?.password !== SignInDto.password) {
            throw new UnauthorizedException()
        }

        const payload = { username: user.username, sub: user.id };
        return {access_token: this.jwtService.sign(payload)};

        // const { password, ...result } = user;
        // return result;
    }

}
