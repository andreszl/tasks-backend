import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Task, TaskSchema } from './schemas/task.schema';

import CreateController from './create.controller';
import TaskService from './task.service';
import TaskRepository from './task.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Task.name,
      schema: TaskSchema,
    }]),
  ],
  controllers: [CreateController],
  providers: [TaskService, TaskRepository],
  exports: [TaskService, TaskRepository],
})
export default class TasksModule {}