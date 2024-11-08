"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.appModules = void 0;
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const default_1 = require("@apollo/server/plugin/landingPage/default");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../../libs/entities");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
exports.appModules = [auth_module_1.AuthModule];
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (configService) => {
                    return {
                        type: configService.get('DB_TYPE'),
                        host: configService.get('DB_HOST'),
                        port: configService.get('DB_PORT'),
                        username: configService.get('DB_USERNAME'),
                        password: configService.get('DB_PASSWORD'),
                        database: configService.get('DB_DATABASE'),
                        supportBigNumbers: true,
                        bigNumberStrings: false,
                        autoLoadEntities: false,
                        entities: [...entities_1.typeOrmEntities],
                        synchronize: configService.get('DB_SYNC'),
                        legacySpatialSupport: false,
                        debug: false,
                    };
                },
                inject: [config_1.ConfigService],
            }),
            ...exports.appModules,
            graphql_1.GraphQLModule.forRootAsync({
                driver: apollo_1.ApolloDriver,
                useFactory: () => ({
                    autoSchemaFile: (0, path_1.join)(process.cwd(), 'scholar-schema.gql'),
                    playground: false,
                    plugins: [(0, default_1.ApolloServerPluginLandingPageLocalDefault)()],
                    path: '/graphql',
                    include: [...exports.appModules],
                }),
            }),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map