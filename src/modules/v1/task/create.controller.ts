import { Body, Controller, HttpCode, HttpStatus, NotFoundException, Post, UseInterceptors, } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiOkResponse, ApiTags, ApiUnauthorizedResponse, } from '@nestjs/swagger';
import Auth from '@decorators/auth.decorator';
import WrapResponseInterceptor from '@interceptors/wrap-response.interceptor';
import TaskService from './task.service';
import { Task } from './schemas/task.schema';

import OkResponse from '../../../responses/ok.response';
import UnauthorizeResponse from '../../../responses/unauthorize.response';

@ApiTags('Task')
@ApiBearerAuth()
@ApiExtraModels(Task)
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class CreateController {
  constructor(
		private readonly taskService: TaskService,
  ) { }

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
}