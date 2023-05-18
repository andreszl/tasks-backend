import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiOkResponse,
  ApiTags,
  ApiParam,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { TaskResponseDto } from '@v1/task/dto/task-reponse.dto';
import Serialize from '@decorators/serialization.decorator';
import Auth from '@decorators/auth.decorator';
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import TaskService from './task.service';
import { Task } from './schemas/task.schema';

import OkResponse from '../../../responses/ok.response';
import UnauthorizeResponse from '../../../responses/unauthorize.response';
import NotFoundResponse from '@responses/not-found.response';

@ApiTags('Task')
@ApiBearerAuth()
@ApiExtraModels(Task)
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class TasksController {
  constructor(
		private readonly taskService: TaskService,
  ) { }

  @ApiOkResponse(OkResponse)
  @ApiUnauthorizedResponse(UnauthorizeResponse)
  @Get()
  @Serialize(TaskResponseDto)
  @Auth()
  async getAllTask() {
    const foundTask = await this.taskService.getAllTask();

    return foundTask;
  }

  @ApiOkResponse(OkResponse)
  @ApiNotFoundResponse(NotFoundResponse)
  @ApiUnauthorizedResponse(UnauthorizeResponse)
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  @Serialize(TaskResponseDto)
  @Auth()
  async getById(
    @Param('id') id: string,
  ): Promise<Task> {
    const foundTask = await this.taskService.getTaskById(id);

    if (!foundTask) {
      throw new NotFoundException('The task does not exist');
    }

    return foundTask;
  }


  @ApiOkResponse(OkResponse)
  @ApiNotFoundResponse(NotFoundResponse)
  @ApiUnauthorizedResponse(UnauthorizeResponse)
  @Post('get-task-by-user')
  @HttpCode(HttpStatus.OK)
  @Auth()
  async getTaskByUser(
    @Body() task: any
  ) {
    const email = task.email;
    const foundTask = await this.taskService.getTaskByUser(email);

    return foundTask;
  }

  @ApiOkResponse(OkResponse)
  @ApiUnauthorizedResponse(UnauthorizeResponse)
  @Post('create-task')
  @HttpCode(HttpStatus.CREATED)
  @Auth()
  async createTask(
    @Body() task: any
  ): Promise<Task> {
    const foundTask = await this.taskService.createTask(task);
    if (!foundTask) {
      throw new NotFoundException('The task does not create ');
    }
    return foundTask;
  }

  @ApiOkResponse(OkResponse)
  @ApiUnauthorizedResponse(UnauthorizeResponse)
  @Post('update-task-description')
  @HttpCode(HttpStatus.OK)
  @Auth()
  async updateTaskDescription(
    @Body() task: any
  ): Promise<Task> {
    const foundTask = await this.taskService.updateDesById(task);
    if (!foundTask) {
      throw new NotFoundException('The task does not update description ');
    }
    return foundTask;
  }


  @ApiOkResponse(OkResponse)
  @ApiUnauthorizedResponse(UnauthorizeResponse)
  @Post('delete-task-by-id')
  @HttpCode(HttpStatus.OK)
  @Auth()
  async findByIdAndDelete(
    @Body() task: any
  ): Promise<Task> {
    const foundTask = await this.taskService.findByIdAndDelete(task);
    if (!foundTask) {
      throw new NotFoundException('The task does not delete  task');
    }
    return foundTask;
  }
}