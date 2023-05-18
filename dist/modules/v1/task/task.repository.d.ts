import { Model } from 'mongoose';
import { TaskDocument, Task } from '@v1/task/schemas/task.schema';
export default class UsersRepository {
    private taskModel;
    constructor(taskModel: Model<TaskDocument>);
    getAllTask(): Promise<TaskDocument[]>;
    getTaskById(id: string): Promise<Task | null>;
    getTaskByUser(email: string): Promise<TaskDocument[]>;
    createTask(task: any): Promise<Task>;
    updateDesById(id: string, data: any): Promise<Task | null>;
    updateStatusById(id: string, data: any): Promise<Task | null>;
    findByIdAndDelete(id: string): Promise<Task | null>;
}
