/**
 * 此文件定义了一个简单的日志控制器，名为SimpleLogController。
 * 该控制器使用了我们之前在log-controller.decorator.ts中定义的LogController装饰器来添加日志，并使用Get装饰器来定义路由。
 * LogController装饰器用于在控制器上添加日志，Get装饰器则用于定义一个处理GET请求的路由方法。
 */

import { Get } from '@nestjs/common';
import { LogController } from './log-controller.decorator';

@LogController({ context: 'Simple', path: 'debug/log' }) // 使用LogController装饰器添加日志，路由路径为'debug/log'
export class SimpleLogController {
  @Get() // 定义一个处理GET请求的路由方法，路由为'/debug/log'
  public log(): string {
    return 'OK'; // 返回'OK'字符串作为响应
  }
}
