import { Types } from 'mongoose';
import { RolesEnum } from '@decorators/roles.decorator';
export interface DecodedUser {
    readonly _id: Types.ObjectId;
    readonly email: string;
    readonly password: string;
    readonly roles: RolesEnum[];
    readonly iat?: number;
    readonly exp?: number;
}
