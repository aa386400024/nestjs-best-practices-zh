/**
 * LoggerContextMiddleware类定义了一个中间件，用于处理请求的日志上下文。
 * 这个中间件通过将用户ID添加到日志上下文中，帮助我们在日志中跟踪用户的行为。
 */

// 导入必需的模块和类型
import { Injectable, NestMiddleware } from '@nestjs/common'; // Nest.js的内置装饰器和函数
import type { Request, Response } from 'express'; // Express模块的请求对象和响应对象类型
import { PinoLogger } from 'nestjs-pino'; // Nest.js中用于Pino日志处理的模块

@Injectable() // 使用@Injectable装饰器标记LoggerContextMiddleware类作为一个可注入的提供者
export class LoggerContextMiddleware implements NestMiddleware {
  // GraphQL的日志处理使用的是apollo的插件
  // 参考这两个链接：
  // https://docs.nestjs.com/graphql/plugins
  // https://docs.nestjs.com/graphql/field-middleware

  // 通过依赖注入获取PinoLogger实例
  constructor(private readonly logger: PinoLogger) {}

  // 实现NestMiddleware接口的use方法，处理每个请求
  public use(req: Request, _res: Response, next: () => void): void {
    const user = req.user?.userId; // 获取请求中的用户ID
    // 在日志上下文中添加额外的字段
    this.logger.assign({ user });

    return next(); // 调用next函数，进入下一个中间件或路由处理器
  }
}
