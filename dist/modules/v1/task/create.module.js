"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const task_schema_1 = require("./schemas/task.schema");
const create_controller_1 = __importDefault(require("./create.controller"));
const task_service_1 = __importDefault(require("./task.service"));
const task_repository_1 = __importDefault(require("./task.repository"));
let TasksModule = class TasksModule {
};
TasksModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: task_schema_1.Task.name,
                    schema: task_schema_1.TaskSchema,
                }]),
        ],
        controllers: [create_controller_1.default],
        providers: [task_service_1.default, task_repository_1.default],
        exports: [task_service_1.default, task_repository_1.default],
    })
], TasksModule);
exports.default = TasksModule;
//# sourceMappingURL=create.module.js.map