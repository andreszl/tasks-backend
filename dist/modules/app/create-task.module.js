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
const nestjs_redis_1 = require("@liaoliaots/nestjs-redis");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const createTask_module_1 = __importDefault(require("../v1/createTask.module"));
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGODB_URL, {
                autoReconnect: true,
                useCreateIndex: true,
                reconnectTries: Number.MAX_VALUE,
                reconnectInterval: 1000,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }),
            nestjs_redis_1.RedisModule.forRootAsync({
                useFactory: (cfg) => ({
                    config: {
                        url: cfg.get('REDIS_URL'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            createTask_module_1.default,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.default = AppModule;
//# sourceMappingURL=create-task.module.js.map