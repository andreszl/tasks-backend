/* eslint-disable max-classes-per-file */
import { Type, Transform } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ObjectId } from 'mongodb';

export class TaskResponseDto {
  @Transform(({ value }) => value.toString(), { toPlainOnly: true })

  _id: ObjectId = new ObjectId();
  
  email: string = '';

  title: string = '';

  describe: string = '';

  status: string = '';

}

export default class TasksResponseDto {
  @ValidateNested({ each: true })
  @Type(() => TaskResponseDto)
    data?: TaskResponseDto[] = [];
}
