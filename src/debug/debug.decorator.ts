/**
 * \src\debug\debug.decorator.ts
 * 这个文件提供一个 Debug 装饰器，该装饰器用于为类、方法或属性添加自定义调试元数据。
 */

// 引入来自 '@nestjs/common' 的 'SetMetadata' 和 'CustomDecorator'。
// 'SetMetadata' 用于添加自定义的元数据，'CustomDecorator' 是用于表明自定义装饰器的返回值类型。
import { SetMetadata, CustomDecorator } from '@nestjs/common';

// 引入我们定义的常量 'DEBUG_METADATA'，作为我们自定义元数据的键。
import { DEBUG_METADATA } from './debug.constant';

// 引入我们定义的接口 'DebugOptions'，这个接口定义了调试选项的类型。
import type { DebugOptions } from './debug.interface';

// 定义一个 'Debug' 装饰器，这个装饰器接收一个可选参数 'options'，参数可以是字符串或 'DebugOptions' 类型。
// 通过调用 'SetMetadata' 函数，我们将 'options' 添加为 'DEBUG_METADATA' 键对应的元数据。
// 如果 'options' 是一个对象，那么我们将这个对象的所有属性也添加到元数据中。
export const Debug = (options?: string | DebugOptions): CustomDecorator => (
  SetMetadata(DEBUG_METADATA, { context: options, ...(typeof options === 'object' && options) })
);
