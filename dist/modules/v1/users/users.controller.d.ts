import { Types } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import UsersService from './users.service';
import { User } from './schemas/users.schema';
import NotifyUserDto from './dto/notify-user.dto';
export default class UsersController {
    private readonly usersService;
    private readonly mailerService;
    private readonly configService;
    constructor(usersService: UsersService, mailerService: MailerService, configService: ConfigService);
    getById(id: Types.ObjectId): Promise<User>;
    getAllVerifiedUsers(): Promise<import("./schemas/users.schema").UserDocument[]>;
    notifyUser(notifyUserDto: NotifyUserDto): Promise<{
        message: string;
    }>;
}
