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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = AuthService_1 = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(AuthService_1.name);
    }
    async validateUser(email, pass) {
        try {
            const user = await this.usersService.findOneByEmail(email);
            const passOk = await bcrypt.compare(pass, user.password);
            if (user && passOk) {
                this.logger.log(`User with email: ${email} validated.`);
                const { password, ...result } = user;
                return result;
            }
            this.logger.log(`User with email: ${email} fail validation.`);
            return null;
        }
        catch (e) {
            this.logger.log(`User with email: ${email} fail validation.`);
            return null;
        }
    }
    async login(user) {
        const payload = {
            email: user.email,
            id: user.id,
        };
        return this.jwtService.sign(payload);
    }
    async getProfile(id) {
        try {
            const user = await this.usersService.findOne(id);
            this.logger.log(`User with email: ${user.email} get profile.`);
            if (user) {
                return user;
            }
            return null;
        }
        catch (e) {
            return null;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map