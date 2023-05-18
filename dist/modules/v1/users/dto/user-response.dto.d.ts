import { ObjectId } from 'mongodb';
import { RolesEnum } from '@decorators/roles.decorator';
export declare class UserResponseDto {
    _id: ObjectId;
    roles: RolesEnum[];
    verified: boolean;
    email: string;
    code: number;
    password: string;
}
export default class UsersResponseDto {
    data?: UserResponseDto[];
}
