import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmEntities } from '../../entities';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';

export const appModules = [AuthModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          type: configService.get<'postgres'>('DB_TYPE'),
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          supportBigNumbers: true,
          bigNumberStrings: false,
          autoLoadEntities: false,
          entities: [...typeOrmEntities],
          synchronize: configService.get<boolean>('DB_SYNC'),
          legacySpatialSupport: false,
          debug: false,
        };
      },
      inject: [ConfigService],
    }),
    ...appModules,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        autoSchemaFile: join(process.cwd(), 'scholar-schema.gql'),
        playground: false,
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        path: '/graphql',
        include: [...appModules],
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
