import TaskService from './task.service';
import { Task } from './schemas/task.schema';
export default class CreateController {
    private readonly taskService;
    constructor(taskService: TaskService);
    createTask(task: any): Promise<Task>;
}
