import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from './auth.guards';
import { SignupDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('/signin')
    signIn(@Body() body: SignInDto) {
        return this.authService.signIn(body);
    }

    @Post('/signup')
    signUp(@Body() signupDto: SignupDto) {
        return this.authService.signUp(signupDto);
    }


    @UseGuards(AuthGuard)
    @Get('/profile')
    getProfile(@Req() req:any){
        return req.user;
    }
}
    