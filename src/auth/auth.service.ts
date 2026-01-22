import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/sign-up.dto';
import  * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService) { }

    // Sign in
    async signIn(SignInDto: SignInDto): Promise<any> {
        const user = await this.usersService.findByUsername(SignInDto.username);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(SignInDto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    // signup 
    async signUp(signUpDto: SignupDto): Promise<any> {
        {
            // check if username exists
            const existingUserByUsername = await this.usersService.findByUsername(signUpDto.username);
            if (existingUserByUsername) {
                throw new UnauthorizedException('Username already in use');
            }
            // check if email exists
            const existingUser = await this.usersService.findByEmail(signUpDto.email);
            if (existingUser) {
                throw new UnauthorizedException('Email already in use');
            }

            // check if phone number exists
            const existingUserByPhone = await this.usersService.findByPhoneNumber(signUpDto.phoneNumber);
            if (existingUserByPhone) {
                throw new UnauthorizedException('Phone number already in use');
            }

            // hash password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(signUpDto.password, saltRounds);
            signUpDto.password = hashedPassword;
            // save user
            const newUser = this.usersService.create({
                username: signUpDto.username,
                firstName: signUpDto.firstName,
                lastName: signUpDto.lastName,
                phoneNumber: signUpDto.phoneNumber,
                email: signUpDto.email,
                password: signUpDto.password,
            });
            const payload = { username: newUser.username, sub: newUser.userId };
            return {
                access_token: this.jwtService.sign(payload),
            };
            
        }
    }

}
