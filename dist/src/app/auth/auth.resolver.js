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
var AuthResolver_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
const users_service_1 = require("../users/users.service");
const common_1 = require("@nestjs/common");
const entities_1 = require("../../../libs/entities");
const guards_1 = require("./guards/");
const decorators_1 = require("./decorators");
let AuthResolver = AuthResolver_1 = class AuthResolver {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
        this.logger = new common_1.Logger(AuthResolver_1.name);
    }
    profile(user) {
        return this.authService.getProfile(user.id);
    }
    async login(email, password) {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException({
                status: 401,
                message: 'El correo y/o contraseña es erronea. Verifique e intente nuevamente.',
            });
        }
        if (!user.active) {
            throw new common_1.UnauthorizedException({
                status: 401,
                message: 'El usuario se encuentra inactivo. Contacte al administrador para mas información.',
            });
        }
        this.logger.log(`User with email: ${email} logged in.`);
        const token = { token: await this.authService.login(user) };
        return token;
    }
    async register(registerUserInput) {
        if (await this.usersService.findOneByEmail(registerUserInput.email, false)) {
            this.logger.log('Register User Fail: Duplicate Email');
            throw new common_1.BadRequestException({
                status: 400,
                message: 'Error',
            });
        }
        const user = await this.usersService.register(registerUserInput);
        this.logger.log(`User with email: ${user.email} created.`);
        return 'Registro realizado con éxito.';
    }
};
exports.AuthResolver = AuthResolver;
__decorate([
    (0, graphql_1.Query)(() => entities_1.User),
    (0, common_1.UseGuards)(guards_1.GqlAuthGuard),
    __param(0, (0, decorators_1.CurrentUser)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [entities_1.User]),
    __metadata("design:returntype", void 0)
], AuthResolver.prototype, "profile", null);
__decorate([
    (0, graphql_1.Mutation)(() => entities_1.Token),
    __param(0, (0, graphql_1.Args)('email')),
    __param(1, (0, graphql_1.Args)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Mutation)(() => String),
    __param(0, (0, graphql_1.Args)('registerUserInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RegisterUserInput]),
    __metadata("design:returntype", Promise)
], AuthResolver.prototype, "register", null);
exports.AuthResolver = AuthResolver = AuthResolver_1 = __decorate([
    (0, graphql_1.Resolver)(() => entities_1.User),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthResolver);
//# sourceMappingURL=auth.resolver.js.map