/**
 * CommonModule是一个全局模块，被其他模块共享使用。
 * 这个模块提供了一些全局的服务（service）和中间件（middleware）。
 * 它还配置了一个全局中间件LoggerContextMiddleware，对所有路由进行日志记录。
 */

// 导入必需的模块和装饰器
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common'; // Nest.js的内置装饰器和函数

import { LoggerContextMiddleware } from './middleware'; // 导入中间件
import * as providers from './providers'; // 导入提供者（services）

const services = Object.values(providers); // 获取所有的服务

@Global() // 使用@Global装饰器标记CommonModule类为全局模块
@Module({
  providers: services, // 声明模块的服务
  exports: services, // 导出模块的服务
})
export class CommonModule implements NestModule {
  // 实现NestModule接口的configure方法，配置全局中间件
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerContextMiddleware).forRoutes('*'); // 对所有路由应用LoggerContextMiddleware中间件
  }
}
