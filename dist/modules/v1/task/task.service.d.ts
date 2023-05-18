import TasksRepository from './task.repository';
import { Task } from './schemas/task.schema';
export default class TaskService {
    private readonly tasksRepository;
    constructor(tasksRepository: TasksRepository);
    getAllTask(): Promise<import("./schemas/task.schema").TaskDocument[]>;
    getTaskById(id: string): Promise<Task | null>;
    getTaskByUser(email: string): Promise<import("./schemas/task.schema").TaskDocument[]>;
    updateDesById(task: any): Promise<Task | null>;
    updateStatusById(task: any): Promise<Task | null>;
    findByIdAndDelete(task: any): Promise<Task | null>;
    createTask(task: any): Promise<Task | null>;
}
