/**
 * ConfigService 类继承自 Nest.js 的内置 ConfigService 类，提供配置项的获取服务。
 * 该类扩展了父类的 get 方法，以便在请求的配置项未找到时抛出错误。
 */

// 导入必需的模块和类型
import { Injectable } from '@nestjs/common'; // Nest.js 的内置装饰器
import { ConfigService as NestConfig, Path, PathValue } from '@nestjs/config'; // Nest.js 的配置服务类以及相关类型

import type { Config } from '../../config'; // 自定义的配置项类型

@Injectable() // 使用 @Injectable 装饰器标记 ConfigService 类作为一个可注入的提供者
export class ConfigService<K = Config> extends NestConfig<K> {
  // 重写了父类的 get 方法
  public override get<P extends Path<K>>(path: P): PathValue<K, P> {
    const value = super.get(path, { infer: true }); // 调用父类的 get 方法获取配置项的值

    // 如果获取到的配置项值是 undefined，说明没有找到该配置项，抛出一个错误
    if (value === undefined) {
      throw new Error(`NotFoundConfig: ${path}`);
    }

    // 返回配置项的值
    return value;
  }
}
