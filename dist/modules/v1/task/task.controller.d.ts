import TaskService from './task.service';
import { Task } from './schemas/task.schema';
export default class TasksController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getAllTask(): Promise<import("./schemas/task.schema").TaskDocument[]>;
    getById(id: string): Promise<Task>;
    getTaskByUser(task: any): Promise<import("./schemas/task.schema").TaskDocument[]>;
    createTask(task: any): Promise<Task>;
    updateTaskDescription(task: any): Promise<Task>;
    findByIdAndDelete(task: any): Promise<Task>;
}
