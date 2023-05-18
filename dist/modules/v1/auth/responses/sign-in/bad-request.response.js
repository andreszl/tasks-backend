"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    schema: {
        type: 'object',
        example: {
            message: [
                {
                    target: {
                        email: 'string',
                        password: 'string',
                    },
                    value: 'string',
                    property: 'string',
                    children: [],
                    constraints: {},
                },
            ],
            error: 'Bad Request',
        },
    },
    description: '400. ValidationException',
};
//# sourceMappingURL=bad-request.response.js.map