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
const core_1 = require("@nestjs/core");
const create_module_1 = __importDefault(require("./task/create.module"));
const routes = [
    {
        path: '/v1',
        children: [
            { path: '/task', module: create_module_1.default },
        ],
    },
];
let CreateTask = class CreateTask {
};
CreateTask = __decorate([
    (0, common_1.Module)({
        imports: [
            core_1.RouterModule.register(routes),
            create_module_1.default
        ],
    })
], CreateTask);
exports.default = CreateTask;
//# sourceMappingURL=createTask.module.js.map