/**
 * 此文件是一个NestJS控制器，使用了Controller和DebugLog装饰器来定义路由和添加日志。
 * 装饰器"Controller"定义了控制器的基本路由为'debug'，意味着此控制器处理所有以'debug'开头的路由。
 * 装饰器"DebugLog"在类级别和方法级别添加了日志，可用于跟踪和调试。
 */

import { Controller, Get } from '@nestjs/common';
import { SampleService } from './sample.service';
import { DebugLog } from '../debug-log.decorator';

@Controller('debug') // 定义控制器的基本路由为'debug'
@DebugLog('ClassContext') // 在类级别添加日志，日志的上下文为'ClassContext'
export class SampleController {
  constructor(private sample: SampleService) {}

  @Get() // 定义一个处理GET请求的路由方法，路由为'/debug'
  @DebugLog('MethodContext') // 在方法级别添加日志，日志的上下文为'MethodContext'
  public step(): string {
    this.sample.stepOne('hello');
    this.sample.stepTwo('world');
    this.sample.stepThree();
    return 'OK'; // 返回'OK'字符串作为响应
  }

  @Get('chain') // 定义一个处理GET请求的路由方法，路由为'/debug/chain'
  public stepChain(): string {
    return this.sample.stepStart(); // 调用SampleService的stepStart方法并返回其结果作为响应
  }
}
