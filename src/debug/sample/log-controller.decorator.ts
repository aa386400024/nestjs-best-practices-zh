/**
 * 此文件是装饰器工厂函数，主要用于创建带有日志功能的控制器装饰器。
 * 它使用nestjs的applyDecorators函数来应用DebugLog和Controller两个装饰器。
 * 其中，DebugLog装饰器用于输出日志，Controller装饰器用于标记类作为控制器。
 */

import { applyDecorators, Controller, ControllerOptions } from '@nestjs/common';

import { DebugLog } from '../debug-log.decorator';
import type { Func } from '../debug.interface';

// LogController是一个装饰器工厂，接收一个对象作为参数，该对象中的context属性会被用作DebugLog装饰器的参数，其他属性会被用作Controller装饰器的参数。
// 这个装饰器工厂返回一个装饰器，这个装饰器会同时应用DebugLog和Controller两个装饰器。
export const LogController = ({ context, ...options }: ControllerOptions & { context?: string }): Func => (
  applyDecorators(
    DebugLog(context), // 应用DebugLog装饰器，用于输出日志
    Controller(options), // 应用Controller装饰器，标记类作为控制器
  )
);
