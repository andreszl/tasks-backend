import { Injectable } from '@nestjs/common';
import TasksRepository from './task.repository';
import { Task } from './schemas/task.schema';

@Injectable()
export default class TaskService {
  constructor(private readonly tasksRepository: TasksRepository) { }

  public getAllTask() {
    return this.tasksRepository.getAllTask();
  }

  public getTaskById(id: string): Promise<Task | null> {
    return this.tasksRepository.getTaskById(id);
  }

  public getTaskByUser(email: string) {
    return this.tasksRepository.getTaskByUser(email);
  }
  public updateDesById(task: any): Promise<Task | null> {
    return this.tasksRepository.updateDesById(task.id, task);
  }

  public updateStatusById(task: any): Promise<Task | null> {
    return this.tasksRepository.updateStatusById(task.id, task);
  }

   public findByIdAndDelete(task: any): Promise<Task | null> {
    return this.tasksRepository.findByIdAndDelete(task.id);
  }

  public createTask(task: any): Promise<Task | null> {
    return this.tasksRepository.createTask(task);
  }
}



