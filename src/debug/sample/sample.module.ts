/**
 * 此文件定义了一个NestJS模块，名为SampleModule。
 * 一个模块是组织代码的基本单位，可以包含控制器、服务、提供者和其他模块。
 * 在此模块中，我们导入了DebugModule，添加了SampleController和SimpleLogController两个控制器，
 * 并定义了SampleService为服务提供者。
 * 另外，还在模块上使用了Debug装饰器添加日志，便于调试和跟踪。
 */

import { Module } from '@nestjs/common';
import { SampleController } from './sample.controller';
import { SampleService } from './sample.service';
import { SimpleLogController } from './simple-log.controller';
import { Debug } from '../debug.decorator';
import { DebugModule } from '../debug.module';

@Debug('ModuleContext') // 在模块上添加Debug装饰器，用于输出日志，日志的上下文为'ModuleContext'
@Module({
  imports: [DebugModule.forRoot({})], // 导入DebugModule模块
  controllers: [SampleController, SimpleLogController], // 添加两个控制器：SampleController和SimpleLogController
  providers: [SampleService], // 定义服务提供者为SampleService
})
export class SampleModule {}
