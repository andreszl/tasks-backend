import { ObjectId } from 'mongodb';
export declare class TaskResponseDto {
    _id: ObjectId;
    email: string;
    title: string;
    describe: string;
    status: string;
}
export default class TasksResponseDto {
    data?: TaskResponseDto[];
}
