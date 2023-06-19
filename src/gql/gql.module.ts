/**
 * 此文件定义了一个NestJS模块，名为GqlModule。
 * 此模块集成了GraphQL，使得应用能够处理GraphQL查询。
 * 它使用GraphQLModule.forRootAsync方法初始化了GraphQL模块，并且使用TypeOrmModule.forFeature方法在数据库中注册了一个实体Sampletable1。
 * 该模块还定义了一些提供者，包括一个解析器SimpleResolver，一个服务SimpleService，以及一个标量DateScalar。
 */

import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sampletable1 } from '#entity/sampledb1';
import { SimpleService } from './providers';
import { SimpleResolver } from './resolvers';
import { DateScalar } from './scalars';

@Module({
  imports: [
    // 使用GraphQLModule.forRootAsync方法初始化了GraphQL模块
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      useFactory: (config: ConfigService) => ({
        ...config.get<GqlModuleOptions>('graphql'),
      }),
      inject: [ConfigService],
    }),
    // 使用TypeOrmModule.forFeature方法在数据库中注册了一个实体Sampletable1
    TypeOrmModule.forFeature([Sampletable1]),
  ],
  // 定义了一些提供者，包括一个解析器SimpleResolver，一个服务SimpleService，以及一个标量DateScalar
  providers: [SimpleResolver, SimpleService, DateScalar],
})
export class GqlModule {}
