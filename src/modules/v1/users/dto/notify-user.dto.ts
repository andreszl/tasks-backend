import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class NotifyUserDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(3)
  @MaxLength(128)
  readonly email: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MinLength(3)
  @MaxLength(128)
  readonly authorEmail: string = '';

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(900)
  readonly postTitle: string = '';
}
