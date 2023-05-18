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
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("@nestjs/config");
const users_service_1 = __importDefault(require("../users/users.service"));
const wrap_response_interceptor_1 = __importDefault(require("../../../interceptors/wrap-response.interceptor"));
const auth_decorator_1 = __importDefault(require("../../../decorators/auth.decorator"));
const auth_constants_1 = __importDefault(require("./auth-constants"));
const local_auth_guard_1 = __importDefault(require("./guards/local-auth.guard"));
const auth_service_1 = __importDefault(require("./auth.service"));
const sign_in_dto_1 = __importDefault(require("./dto/sign-in.dto"));
const sign_up_dto_1 = __importDefault(require("./dto/sign-up.dto"));
const jwt_tokens_dto_1 = __importDefault(require("./dto/jwt-tokens.dto"));
const send_change_password_code_dto_1 = __importDefault(require("./dto/send-change-password-code.dto"));
const change_password_dto_1 = __importDefault(require("./dto/change-password.dto"));
const ok_response_1 = __importDefault(require("./responses/sign-up/ok.response"));
const ok_response_2 = __importDefault(require("./responses/sign-in/ok.response"));
const bad_request_response_1 = __importDefault(require("./responses/sign-up/bad-request.response"));
const ok_response_3 = __importDefault(require("../../../responses/ok.response"));
const ok_response_4 = __importDefault(require("../../../responses/ok.response"));
const conflict_response_1 = __importDefault(require("../../../responses/conflict.response"));
const internal_server_error_response_1 = __importDefault(require("../../../responses/internal-server-error.response"));
const unauthorize_response_1 = __importDefault(require("../../../responses/unauthorize.response"));
const no_content_response_1 = __importDefault(require("../../../responses/no-content.response"));
let AuthController = class AuthController {
    constructor(authService, usersService, mailerService, configService) {
        this.authService = authService;
        this.usersService = usersService;
        this.mailerService = mailerService;
        this.configService = configService;
    }
    async signIn(req) {
        const user = req.user;
        return this.authService.login(user);
    }
    async signUp(user) {
        const { _id, email } = await this.usersService.create(user);
        const token = this.authService.createVerifyToken(_id);
        await this.mailerService.sendMail({
            to: email,
            from: this.configService.get('MAILER_FROM_EMAIL'),
            subject: auth_constants_1.default.mailer.verifyEmail.subject,
            template: `${process.cwd()}/src/templates/verify-password`,
            context: {
                token,
                email,
                host: this.configService.get('SERVER_HOST'),
            },
        });
        return { message: 'Success! please verify your email' };
    }
    async sendChangePasswordCode(sendChangePasswordCodedto) {
        const { email } = sendChangePasswordCodedto;
        const code = Math.floor((Math.random() * 9999) + 9999);
        const foundUser = await this.usersService.getVerifiedUserByEmail(email);
        await this.mailerService.sendMail({
            to: email,
            from: this.configService.get('MAILER_FROM_EMAIL'),
            subject: auth_constants_1.default.mailer.verifyEmail.subject,
            template: `${process.cwd()}/src/templates/change-password-code`,
            context: {
                code,
                host: this.configService.get('SERVER_HOST'),
            },
        });
        this.usersService.update(foundUser._id, { code, verified: true });
        return { message: 'Success! please verify your email' };
    }
    async changePassword(changePasswordDto) {
        const { email, password, code } = changePasswordDto;
        const foundUser = await this.usersService.getVerifiedUserByEmail(email);
        if (code === foundUser.code) {
            this.usersService.changePassword(foundUser._id, password);
            return { message: 'Success!' };
        }
        throw new common_1.UnauthorizedException('Code credentials were missing or incorrect');
    }
    async logout(token) {
        const decodedUser = await this.authService.verifyToken(token, this.configService.get('ACCESS_TOKEN') || 'domina');
        if (!decodedUser) {
            throw new common_1.ForbiddenException('Incorrect token');
        }
        const deletedUsersCount = await this.authService.deleteTokenByEmail(decodedUser.email);
        if (deletedUsersCount === 0) {
            throw new common_1.NotFoundException();
        }
        return {};
    }
};
__decorate([
    (0, swagger_1.ApiBody)({ type: sign_in_dto_1.default }),
    (0, swagger_1.ApiOkResponse)(ok_response_2.default),
    (0, swagger_1.ApiBadRequestResponse)(ok_response_4.default),
    (0, swagger_1.ApiInternalServerErrorResponse)(internal_server_error_response_1.default),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(local_auth_guard_1.default),
    (0, common_1.Post)('sign-in'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: sign_up_dto_1.default }),
    (0, swagger_1.ApiOkResponse)(ok_response_1.default),
    (0, swagger_1.ApiBadRequestResponse)(bad_request_response_1.default),
    (0, swagger_1.ApiConflictResponse)(conflict_response_1.default),
    (0, swagger_1.ApiInternalServerErrorResponse)(internal_server_error_response_1.default),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('sign-up'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [sign_up_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: send_change_password_code_dto_1.default }),
    (0, swagger_1.ApiOkResponse)(ok_response_3.default),
    (0, swagger_1.ApiBadRequestResponse)(ok_response_4.default),
    (0, swagger_1.ApiConflictResponse)(conflict_response_1.default),
    (0, swagger_1.ApiInternalServerErrorResponse)(internal_server_error_response_1.default),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('send-change-password-code'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_change_password_code_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendChangePasswordCode", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: send_change_password_code_dto_1.default }),
    (0, swagger_1.ApiOkResponse)(ok_response_3.default),
    (0, swagger_1.ApiBadRequestResponse)(ok_response_4.default),
    (0, swagger_1.ApiConflictResponse)(conflict_response_1.default),
    (0, swagger_1.ApiInternalServerErrorResponse)(internal_server_error_response_1.default),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_dto_1.default]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, swagger_1.ApiNoContentResponse)(no_content_response_1.default),
    (0, swagger_1.ApiUnauthorizedResponse)(unauthorize_response_1.default),
    (0, swagger_1.ApiInternalServerErrorResponse)(internal_server_error_response_1.default),
    (0, swagger_1.ApiBearerAuth)(),
    (0, auth_decorator_1.default)(),
    (0, common_1.Delete)('logout/:token'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.UseInterceptors)(wrap_response_interceptor_1.default),
    (0, swagger_1.ApiExtraModels)(jwt_tokens_dto_1.default),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [auth_service_1.default,
        users_service_1.default,
        mailer_1.MailerService,
        config_1.ConfigService])
], AuthController);
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map