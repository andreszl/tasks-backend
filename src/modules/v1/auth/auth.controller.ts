import { Body, Controller, HttpCode, Get, Post, Delete, Param, Request, UnauthorizedException, UseGuards, NotFoundException, ForbiddenException, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiBody, ApiOkResponse, ApiNotFoundResponse, ApiInternalServerErrorResponse, ApiUnauthorizedResponse, ApiBearerAuth, ApiBadRequestResponse, ApiConflictResponse, ApiNoContentResponse, ApiExtraModels } from '@nestjs/swagger';
import { Request as ExpressRequest } from 'express';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

import UsersService from '@v1/users/users.service';
import { User, UserDocument } from '@v1/users/schemas/users.schema';
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';

import Auth from '@decorators/auth.decorator';
import authConstants from '@v1/auth/auth-constants';
import { DecodedUser } from './interfaces/decoded-user.interface';
import LocalAuthGuard from './guards/local-auth.guard';
import AuthService from './auth.service';
import SignInDto from './dto/sign-in.dto';
import SignUpDto from './dto/sign-up.dto';
import JwtTokensDto from './dto/jwt-tokens.dto';
import SendChangePasswordCodeDto from './dto/send-change-password-code.dto';
import ChangePasswordDto from './dto/change-password.dto';

import SignUpOkResponse from './responses/sign-up/ok.response';
import SignInOkResponse from './responses/sign-in/ok.response';
import SignUpBadRequestResponse from './responses/sign-up/bad-request.response';
import OkResponse from '../../../responses/ok.response';
import BadRequestResponse from '../../../responses/ok.response';
import ConflictResponse from '../../../responses/conflict.response';
import InternalServerErrorResponse from '../../../responses/internal-server-error.response';
import UnauthorizeResponse from '../../../responses/unauthorize.response';
import NoContentResponse from '../../../responses/no-content.response';
import NotFoundResponse from '../../../responses/not-found.response';

@ApiTags('Auth')
@UseInterceptors(WrapResponseInterceptor)
@ApiExtraModels(JwtTokensDto)
@Controller()
export default class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) { }

  @ApiBody({ type: SignInDto })
  @ApiOkResponse(SignInOkResponse)
  @ApiBadRequestResponse(BadRequestResponse)
  @ApiInternalServerErrorResponse(InternalServerErrorResponse)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Request() req: ExpressRequest): Promise<JwtTokensDto> {
    const user = req.user as User;
    return this.authService.login(user);
  }

  @ApiBody({ type: SignUpDto })
  @ApiOkResponse(SignUpOkResponse)
  @ApiBadRequestResponse(SignUpBadRequestResponse)
  @ApiConflictResponse(ConflictResponse)
  @ApiInternalServerErrorResponse(InternalServerErrorResponse)
  @HttpCode(HttpStatus.CREATED)
  @Post('sign-up')
  async signUp(@Body() user: SignUpDto): Promise<any> {
    const { _id, email } = await this.usersService.create(user) as UserDocument;

    const token = this.authService.createVerifyToken(_id);

    await this.mailerService.sendMail({
      to: email,
      from: this.configService.get<string>('MAILER_FROM_EMAIL'),
      subject: authConstants.mailer.verifyEmail.subject,
      template: `${process.cwd()}/src/templates/verify-password`,
      context: {
        token,
        email,
        host: this.configService.get<string>('SERVER_HOST'),
      },
    });

    return { message: 'Success! please verify your email' };
  }

  @ApiBody({ type: SendChangePasswordCodeDto })
  @ApiOkResponse(OkResponse)
  @ApiBadRequestResponse(BadRequestResponse)
  @ApiConflictResponse(ConflictResponse)
  @ApiInternalServerErrorResponse(InternalServerErrorResponse)
  @HttpCode(HttpStatus.CREATED)
  @Post('send-change-password-code')
  async sendChangePasswordCode(@Body() sendChangePasswordCodedto: SendChangePasswordCodeDto): Promise<any> {
		const { email } = sendChangePasswordCodedto;
		const code = Math.floor((Math.random() * 9999) + 9999);

		const foundUser = await this.usersService.getVerifiedUserByEmail(email) as UserDocument;

    await this.mailerService.sendMail({
      to: email,
      from: this.configService.get<string>('MAILER_FROM_EMAIL'),
      subject: authConstants.mailer.verifyEmail.subject,
      template: `${process.cwd()}/src/templates/change-password-code`,
      context: {
        code,
        host: this.configService.get<string>('SERVER_HOST'),
      },
    });

		this.usersService.update(foundUser._id, { code, verified: true });

    return { message: 'Success! please verify your email' };
  }

	@ApiBody({ type: SendChangePasswordCodeDto })
  @ApiOkResponse(OkResponse)
  @ApiBadRequestResponse(BadRequestResponse)
  @ApiConflictResponse(ConflictResponse)
  @ApiInternalServerErrorResponse(InternalServerErrorResponse)
  @HttpCode(HttpStatus.CREATED)
  @Post('change-password')
  async changePassword(@Body() changePasswordDto: ChangePasswordDto): Promise<any> {
		const { email, password, code } = changePasswordDto;
		const foundUser = await this.usersService.getVerifiedUserByEmail(email) as UserDocument;

		if (code === foundUser.code) {
			this.usersService.changePassword(foundUser._id, password);
			return { message: 'Success!' };
		}

		throw new UnauthorizedException(
			'Code credentials were missing or incorrect',
		);
  }


  @ApiNoContentResponse(NoContentResponse)
  @ApiUnauthorizedResponse(UnauthorizeResponse)
  @ApiInternalServerErrorResponse(InternalServerErrorResponse)
  @ApiBearerAuth()
  @Auth()
  @Delete('logout/:token')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Param('token') token: string): Promise<{} | never> {
    const decodedUser: DecodedUser | null = await this.authService.verifyToken(
      token,
      this.configService.get<string>('ACCESS_TOKEN') || 'domina',
    );

    if (!decodedUser) {
      throw new ForbiddenException('Incorrect token');
    }

    const deletedUsersCount = await this.authService.deleteTokenByEmail(
      decodedUser.email,
    );

    if (deletedUsersCount === 0) {
      throw new NotFoundException();
    }

    return {};
  }

  @ApiNoContentResponse(NoContentResponse)
  @ApiNotFoundResponse(NotFoundResponse)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Get('verify/:token')
  async verifyUser(@Param('token') token: string): Promise<User | null> {
    const { id } = await this.authService.verifyEmailVerToken(
      token,
      this.configService.get<string>('ACCESS_TOKEN') || 'domina',
    );
    const foundUser = await this.usersService.getUnverifiedUserById(id) as UserDocument;

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return this.usersService.update(foundUser._id, { code: 0, verified: true });
  }
  
}
