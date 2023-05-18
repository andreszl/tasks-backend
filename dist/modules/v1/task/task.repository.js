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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const task_schema_1 = require("./schemas/task.schema");
const mongodb_1 = require("mongodb");
let UsersRepository = class UsersRepository {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    getAllTask() {
        return this.taskModel.find().exec();
    }
    async getTaskById(id) {
        return this.taskModel.findOne({
            _id: id,
        }).exec();
    }
    async getTaskByUser(email) {
        return this.taskModel.find({
            email: email,
        }).exec();
    }
    async createTask(task) {
        const newTask = await this.taskModel.create({
            _id: new mongodb_1.ObjectId(),
            email: task.email,
            title: task.title,
            description: task.description,
            status: 'false',
        });
        return newTask.toJSON();
    }
    async updateDesById(id, data) {
        return this.taskModel.findByIdAndUpdate(id, {
            $set: { description: data.description },
        }).exec();
    }
    async updateStatusById(id, data) {
        return this.taskModel.findByIdAndUpdate(id, {
            $set: { status: data.status },
        }).exec();
    }
    async findByIdAndDelete(id) {
        return this.taskModel.findByIdAndDelete(id).exec();
    }
};
UsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(task_schema_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], UsersRepository);
exports.default = UsersRepository;
//# sourceMappingURL=task.repository.js.map