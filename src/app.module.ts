import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_PIPE, RouterModule } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';

import { BaseModule } from './base';
import { CommonModule, ExceptionsFilter } from './common';
import { configuration, loggerOptions } from './config';
import { SampleModule as DebugSampleModule } from './debug';
import { GqlModule } from './gql';
import { SampleModule } from './sample';

@Module({
  imports: [
    // 引入pino日志库来记录日志，帮助跟踪和诊断应用程序行为
    // https://github.com/iamolegga/nestjs-pino
    LoggerModule.forRoot(loggerOptions),
    // ConfigModule允许您在整个项目中使用您的配置文件
    // https://docs.nestjs.com/techniques/configuration
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // TypeOrmModule提供与数据库的连接和交互
    // https://docs.nestjs.com/techniques/database
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        ...config.get<TypeOrmModuleOptions>('db'),
      }),
      inject: [ConfigService],
    }),
    // ServeStaticModule用于提供静态文件，如HTML、CSS和JavaScript文件
    // https://docs.nestjs.com/recipes/serve-static
    // https://docs.nestjs.com/techniques/mvc
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../public`,
      renderPath: '/',
    }),
    // 这些是您项目中的各种功能模块
    CommonModule, // 全局功能模块
    BaseModule,
    SampleModule,
    GqlModule,
    DebugSampleModule,
    // RouterModule允许您在应用程序级别控制路由
    // https://docs.nestjs.com/recipes/router-module
    RouterModule.register([{
      path: 'test',
      module: SampleModule,
    }, {
      path: 'test',
      module: DebugSampleModule,
    }]),
  ],
  providers: [
    // 守卫是Nestjs中用来决定是否可以处理请求的一种方法
    // 这里被注释掉的代码是一个全局的身份验证守卫，用于在所有路由上检查身份验证
    // { provide: APP_GUARD, useClass: AuthenticatedGuard },
    // 过滤器可以截取并处理抛出的异常，这里使用的全局过滤器主要用于处理异常
    { provide: APP_FILTER, useClass: ExceptionsFilter },
    // 管道可以处理输入数据，如验证和转换数据。这里的全局管道用于验证请求数据
    // https://docs.nestjs.com/pipes#global-scoped-pipes
    // https://docs.nestjs.com/techniques/validation
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        // disableErrorMessages: true,
        transform: true, // 将对象转换为DTO类
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {} // AppModule是应用程序的主模块，它导入了其他所有模块
