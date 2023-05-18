"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const task_reponse_dto_1 = require("./dto/task-reponse.dto");
const serialization_decorator_1 = __importDefault(require("../../../decorators/serialization.decorator"));
const auth_decorator_1 = __importDefault(require("../../../decorators/auth.decorator"));
const wrap_response_interceptor_1 = __importDefault(require("../../../interceptors/wrap-response.interceptor"));
const task_service_1 = __importDefault(require("./task.service"));
const task_schema_1 = require("./schemas/task.schema");
const ok_response_1 = __importDefault(require("../../../responses/ok.response"));
const unauthorize_response_1 = __importDefault(require("../../../responses/unauthorize.response"));
const not_found_response_1 = __importDefault(require("../../../responses/not-found.response"));
let TasksController = class TasksController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async getAllTask() {
        const foundTask = await this.taskService.getAllTask();
        return foundTask;
    }
    async getById(id) {
        const foundTask = await this.taskService.getTaskById(id);
        if (!foundTask) {
            throw new common_1.NotFoundException('The task does not exist');
        }
        return foundTask;
    }
    async getTaskByUser(task) {
        const email = task.email;
        const foundTask = await this.taskService.getTaskByUser(email);
        return foundTask;
    }
    async createTask(task) {
        const foundTask = await this.taskService.createTask(task);
        if (!foundTask) {
            throw new common_1.NotFoundException('The task does not create ');
        }
        return foundTask;
    }
    async updateTaskDescription(task) {
        const foundTask = await this.taskService.updateDesById(task);
        if (!foundTask) {
            throw new common_1.NotFoundException('The task does not update description ');
        }
        return foundTask;
    }
    async findByIdAndDelete(task) {
        const foundTask = await this.taskService.findByIdAndDelete(task);
        if (!foundTask) {
            throw new common_1.NotFoundException('The task does not delete  task');
        }
        return foundTask;
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)(ok_response_1.default),
    (0, swagger_1.ApiUnauthorizedResponse)(unauthorize_response_1.default),
    (0, common_1.Get)(),
    (0, serialization_decorator_1.default)(task_reponse_dto_1.TaskResponseDto),
    (0, auth_decorator_1.default)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getAllTask", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(ok_response_1.default),
    (0, swagger_1.ApiNotFoundResponse)(not_found_response_1.default),
    (0, swagger_1.ApiUnauthorizedResponse)(unauthorize_response_1.default),
    (0, swagger_1.ApiParam)({ name: 'id', type: String }),
    (0, common_1.Get)(':id'),
    (0, serialization_decorator_1.default)(task_reponse_dto_1.TaskResponseDto),
    (0, auth_decorator_1.default)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getById", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(ok_response_1.default),
    (0, swagger_1.ApiNotFoundResponse)(not_found_response_1.default),
    (0, swagger_1.ApiUnauthorizedResponse)(unauthorize_response_1.default),
    (0, common_1.Post)('get-task-by-user'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_decorator_1.default)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "getTaskByUser", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(ok_response_1.default),
    (0, swagger_1.ApiUnauthorizedResponse)(unauthorize_response_1.default),
    (0, common_1.Post)('create-task'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, auth_decorator_1.default)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "createTask", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(ok_response_1.default),
    (0, swagger_1.ApiUnauthorizedResponse)(unauthorize_response_1.default),
    (0, common_1.Post)('update-task-description'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_decorator_1.default)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "updateTaskDescription", null);
__decorate([
    (0, swagger_1.ApiOkResponse)(ok_response_1.default),
    (0, swagger_1.ApiUnauthorizedResponse)(unauthorize_response_1.default),
    (0, common_1.Post)('delete-task-by-id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, auth_decorator_1.default)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findByIdAndDelete", null);
TasksController = __decorate([
    (0, swagger_1.ApiTags)('Task'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiExtraModels)(task_schema_1.Task),
    (0, common_1.UseInterceptors)(wrap_response_interceptor_1.default),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [task_service_1.default])
], TasksController);
exports.default = TasksController;
//# sourceMappingURL=task.controller.js.map