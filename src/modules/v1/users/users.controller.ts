/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import { Types } from 'mongoose';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import ParseObjectIdPipe from '@pipes/parse-object-id.pipe';
import UsersResponseDto, { UserResponseDto } from '@v1/users/dto/user-response.dto';
import Serialize from '@decorators/serialization.decorator';
import { MailerService } from '@nestjs-modules/mailer';
import Auth from '@decorators/auth.decorator';
import { ConfigService } from '@nestjs/config';
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import UsersService from './users.service';
import { User } from './schemas/users.schema';
import NotifyUserDto from './dto/notify-user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@ApiExtraModels(User)
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class UsersController {
  constructor(
		private readonly usersService: UsersService,
		private readonly mailerService: MailerService,
		private readonly configService: ConfigService,
  ) { }

  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(User),
        },
      },
    },
    description: '200. Success. Returns a user',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. User was not found',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  @Serialize(UserResponseDto)
  @Auth()
  async getById(
    @Param('id', ParseObjectIdPipe) id: Types.ObjectId,
  ): Promise<User> {
    const foundUser = await this.usersService.getVerifiedUserById(id);

    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return foundUser;
  }

  @ApiOkResponse({
    description: '200. Success. Returns all users',
    schema: {
      type: 'object',
      properties: {
        data: {
          $ref: getSchemaPath(User),
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @Get()
  @Serialize(UsersResponseDto)
  @Auth()
  async getAllVerifiedUsers() {
    const foundUsers = await this.usersService.getVerifiedUsers();

    return foundUsers;
  }

	@ApiOkResponse({
	  description: '200',
	  schema: {
	    type: 'object',
	    example: {
	      message: 'string',
	    },
	  },
	})
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        message: 'string',
      },
    },
    description: '401. UnauthorizedException.',
  })
  @Post('notify-user')
  @Auth()
  async notifyUser(@Body() notifyUserDto: NotifyUserDto) {
    const { email, postTitle, authorEmail } = notifyUserDto;

    await this.mailerService.sendMail({
      to: authorEmail,
      from: this.configService.get<string>('MAILER_FROM_EMAIL'),
      subject: 'Han respondido a tu publicacion',
      template: `${process.cwd()}/src/templates/notify-user`,
      context: {
        email,
        postTitle,
        host: this.configService.get<string>('SERVER_HOST'),
      },
    });

    return { message: 'Success! please verify your email' };
  }
}
