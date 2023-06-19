/**
 * 这是一个NestJS应用的启动文件。
 * 它首先创建了一个NestFactory实例，然后对应用进行了一些配置，
 * 包括设置日志记录器、添加全局拦截器、启用反向代理（如果在生产环境）、
 * 应用Express中间件，最后在指定端口启动了应用。
 */

import { Logger as NestLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

import { middleware } from './app.middleware';
import { AppModule } from './app.module';

// 异步函数，负责启动NestJS应用
async function bootstrap(): Promise<string> {
  const isProduction = (process.env.NODE_ENV === 'production');
  // 创建NestFactory实例，传入的参数是AppModule
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  // 设置应用的日志记录器为nestjs-pino的Logger
  app.useLogger(app.get(Logger));
  // 添加全局拦截器LoggerErrorInterceptor，用于拦截并记录错误
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  // 如果在生产环境，启用反向代理
  if (isProduction) {
    app.enable('trust proxy');
  }

  // 应用Express中间件
  middleware(app);

  // 在指定的端口上启动应用
  await app.listen(process.env.PORT || 3000);

  // 返回应用的URL
  return app.getUrl();
}

// 自执行的异步函数，用于启动并记录应用的URL
(async (): Promise<void> => {
  try {
    const url = await bootstrap();
    // 启动成功后，打印应用的URL
    NestLogger.log(url, 'Bootstrap');
  } catch (error) {
    // 启动失败时，打印错误信息
    NestLogger.error(error, 'Bootstrap');
  }
})();
