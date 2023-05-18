"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_1 = require("@nestjs/swagger");
const jwt_tokens_dto_1 = __importDefault(require("../../dto/jwt-tokens.dto"));
exports.default = {
    schema: {
        type: 'object',
        properties: {
            data: {
                $ref: (0, swagger_1.getSchemaPath)(jwt_tokens_dto_1.default),
            },
        },
    },
    description: 'Returns jwt tokens',
};
//# sourceMappingURL=ok.response.js.map