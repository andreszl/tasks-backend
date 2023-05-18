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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const task_repository_1 = __importDefault(require("./task.repository"));
let TaskService = class TaskService {
    constructor(tasksRepository) {
        this.tasksRepository = tasksRepository;
    }
    getAllTask() {
        return this.tasksRepository.getAllTask();
    }
    getTaskById(id) {
        return this.tasksRepository.getTaskById(id);
    }
    getTaskByUser(email) {
        return this.tasksRepository.getTaskByUser(email);
    }
    updateDesById(task) {
        return this.tasksRepository.updateDesById(task.id, task);
    }
    updateStatusById(task) {
        return this.tasksRepository.updateStatusById(task.id, task);
    }
    findByIdAndDelete(task) {
        return this.tasksRepository.findByIdAndDelete(task.id);
    }
    createTask(task) {
        return this.tasksRepository.createTask(task);
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [task_repository_1.default])
], TaskService);
exports.default = TaskService;
//# sourceMappingURL=task.service.js.map