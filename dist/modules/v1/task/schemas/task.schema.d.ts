import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
export declare class Task {
    _id: ObjectId;
    email: string;
    title: string;
    description: string;
    status: string;
}
export declare type TaskDocument = Task & Document;
export declare const TaskSchema: import("mongoose").Schema<Document<Task, any, any>, import("mongoose").Model<Document<Task, any, any>, any, any>, undefined, {}>;
