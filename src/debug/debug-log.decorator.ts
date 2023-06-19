/**
 * 这个文件提供了一个 DebugLog 装饰器，可以用于打印类或方法的调试日志。日志内容包括执行时间和方法参数。
 */

// 导入 NestJS 的 Logger 服务，用于日志打印
import { Logger } from '@nestjs/common';
// 导入 Node.js 的性能钩子库，用于计算函数执行时间
import { performance } from 'perf_hooks';
// 导入 Node.js 的 util/types 模块，用于检测函数是否是异步函数
import { types } from 'util';

// 导入类型定义
import type { Func } from './debug.interface';

// 定义一个方法装饰器，用于记录并打印方法的执行时间和参数
const MethodLog = (context?: string): MethodDecorator => (
  // target 是装饰的类，propertyKey 是装饰的方法名，descriptor 是该方法的属性描述符
  (target: object, propertyKey: string | symbol, descriptor: PropertyDescriptor): void => {
    // 保存原方法的引用
    const originalMethod: unknown = descriptor.value;
    // 如果装饰的不是方法，则直接返回
    if (typeof originalMethod !== 'function') {
      return;
    }

    // 定义一个打印日志的方法
    const log = function (time: number, args: unknown[]): void {
      // 如果 target 是函数（类），则其名称为 target.name，否则为空字符串
      const ownKey = (typeof target === 'function') ? `${target.name}` : '';
      // 如果存在 context，name 为 "ownKey.propertyKey"，否则为 "propertyKey"
      const name = context ? `${ownKey}.${String(propertyKey)}` : String(propertyKey);
      // 如果存在参数，params 为 "(args)"，否则为 ""
      const params = (args.length > 0) ? `(${args})` : '';

      // 使用 Logger 的 debug 方法打印日志，日志内容包括方法名、参数和执行时间
      Logger.debug(`${name}${params} +${time.toFixed(2)}ms`, context || ownKey);
    };

    // 如果装饰的方法是异步函数
    if (types.isAsyncFunction(originalMethod)) {
      // 修改 descriptor 的 value 属性为新的异步函数，该函数在执行时先记录开始时间，然后调用原方法并等待结果，最后记录结束时间并打印日志
      descriptor.value = async function (...args: unknown[]): Promise<unknown> {
        const start = performance.now();
        const result: unknown = await originalMethod.apply(this, args);
        const end = performance.now();

        log(end - start, args);
        // or Use result to add response log
        return result;
      };
    } else { // 如果装饰的方法是同步函数
      // 修改 descriptor 的 value 属性为新的同步函数，该函数在执行时先记录开始时间，然后调用原方法并获取结果，最后记录结束时间并打印日志
      descriptor.value = function (...args: unknown[]): unknown {
        const start = performance.now();
        const result: unknown = originalMethod.apply(this, args);
        const end = performance.now();

        log(end - start, args);
        return result;
      };
    }
  }
);

// 定义一个类装饰器，用于给类的所有方法添加 MethodLog 装饰器
const ClassLog = (context?: string): ClassDecorator => (
  (target: Func): void => {
    // 获取 target 的原型上的所有属性描述符
    const descriptors = Object.getOwnPropertyDescriptors(target.prototype);

    // 遍历所有属性
    for (const [propertyKey, descriptor] of Object.entries(descriptors)) {
      // 保存原方法的引用
      const originalMethod: unknown = descriptor.value;
      // 如果装饰的不是方法或装饰的是构造函数，则跳过当前循环
      if (!(originalMethod instanceof Function) || propertyKey === 'constructor') {
        continue;
      }

      // 为当前属性添加 MethodLog 装饰器
      MethodLog(context)(target, propertyKey, descriptor);

      // 如果原方法与新方法不同，则将原方法的所有元数据复制到新方法上
      if (originalMethod !== descriptor.value) {
        const metadataKeys = Reflect.getMetadataKeys(originalMethod);
        for (const key of metadataKeys) {
          const value: unknown = Reflect.getMetadata(key, originalMethod);
          Reflect.defineMetadata(key, value, <object>descriptor.value);
        }
      }

      // 重新定义 target 的当前属性
      Object.defineProperty(target.prototype, propertyKey, descriptor);
    }
  }
);

// 定义 DebugLog 装饰器，如果装饰的是类，则使用 ClassLog 装饰器；如果装饰的是方法，则使用 MethodLog 装饰器
export const DebugLog = (context?: string): ClassDecorator & MethodDecorator => (
  (target: object, propertyKey?: string | symbol, descriptor?: PropertyDescriptor): void => {
    if (!descriptor) {
      ClassLog(context)(<Func>target);
    } else if (propertyKey) {
      MethodLog(context)(target, propertyKey, descriptor);
    }
  }
);
