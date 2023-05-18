import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { TaskDocument, Task } from '@v1/task/schemas/task.schema';
import { ObjectId } from 'mongodb';

@Injectable()
export default class UsersRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) { }


  public getAllTask() {
    return this.taskModel.find().exec();
  }
  
  public async getTaskById(id: string): Promise<Task | null> {
    return this.taskModel.findOne({
      _id: id,
    }).exec();
  }
  
  public async getTaskByUser(email: string) {
    return this.taskModel.find({
      email: email,
    }).exec();
  }

  public async createTask(task: any): Promise<Task> {
    const newTask = await this.taskModel.create({
      _id:  new ObjectId(),
      email: task.email,
      title: task.title,
      description: task.description,
      status: 'false',
    });

    return newTask.toJSON();
  }

  public async updateDesById(id: string, data:  any): Promise<Task | null> {
    return this.taskModel.findByIdAndUpdate(
      id,
      {
        $set: { description: data.description },
      },
    ).exec();
  }


  public async updateStatusById(id: string, data:  any): Promise<Task | null> {
    return this.taskModel.findByIdAndUpdate(
      id,
      {
        $set: { status: data.status },
      },
    ).exec();
  }
  public async findByIdAndDelete(id: string): Promise<Task | null> {
    return this.taskModel.findByIdAndDelete(
      id,
    ).exec();
  }
}