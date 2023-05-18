import { Request as ExpressRequest } from 'express';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import UsersService from '@v1/users/users.service';
import AuthService from './auth.service';
import SignUpDto from './dto/sign-up.dto';
import JwtTokensDto from './dto/jwt-tokens.dto';
import SendChangePasswordCodeDto from './dto/send-change-password-code.dto';
import ChangePasswordDto from './dto/change-password.dto';
export default class AuthController {
    private readonly authService;
    private readonly usersService;
    private readonly mailerService;
    private readonly configService;
    constructor(authService: AuthService, usersService: UsersService, mailerService: MailerService, configService: ConfigService);
    signIn(req: ExpressRequest): Promise<JwtTokensDto>;
    signUp(user: SignUpDto): Promise<any>;
    sendChangePasswordCode(sendChangePasswordCodedto: SendChangePasswordCodeDto): Promise<any>;
    changePassword(changePasswordDto: ChangePasswordDto): Promise<any>;
    logout(token: string): Promise<{} | never>;
}
