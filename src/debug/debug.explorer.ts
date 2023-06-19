/**
 * 这个文件定义了 DebugExplorer 类，该类用于在应用启动时遍历应用的所有模块，
 * 找出标记了特定装饰器（如 @DebugLog）的类，并对它们进行处理。
 */

import { Inject, Injectable, Type } from '@nestjs/common';
import { MODULE_METADATA } from '@nestjs/common/constants';
import { DiscoveryService, Reflector } from '@nestjs/core';
import type { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

import { DebugLog } from './debug-log.decorator';
import { DEBUG_METADATA } from './debug.constant';
import type { DebugModuleOptions, DebugOptions, Metatype } from './debug.interface';
import { MODULE_OPTIONS_TOKEN } from './debug.module-definition';

@Injectable() // 声明此类可由依赖注入系统管理
export class DebugExplorer {
  // 定义一个集合用于存储需要排除的类的名字，如 'Logger', 'ConfigService' 等
  private exclude: Set<string> = new Set(['Logger', 'ConfigService']);

  // 依赖注入构造函数
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: DebugModuleOptions, // 注入 DebugModuleOptions
    private discoveryService: DiscoveryService, // 注入 DiscoveryService
    private reflector: Reflector, // 注入 Reflector
  ) {
    // 添加额外的排除项
    this.addExcludeOption();

    // 获取所有的控制器和提供者
    const instanceWrappers: InstanceWrapper[] = [
      ...this.discoveryService.getControllers(),
      ...this.discoveryService.getProviders(),
    ];

    // 遍历每个实例，提取出元信息，应用装饰器
    for (const wrapper of instanceWrappers.filter((wrap: InstanceWrapper) => !wrap.isNotMetatype)) {
      const { instance, metatype } = wrapper;
      if (!instance || !Object.getPrototypeOf(instance)) {
        continue;
      }

      const metadata = this.reflector.get<DebugOptions | undefined>(DEBUG_METADATA, metatype);
      if (!metadata) {
        continue;
      }

      this.applyDecorator(metatype, metadata);
    }
  }

  // 将 options 中的 exclude 项添加到 exclude 集合中
  private addExcludeOption(): void {
    if (!Array.isArray(this.options.exclude)) {
      return;
    }

    this.options.exclude.forEach((type: string) => this.exclude.add(type));
  }

  // 在 metatype 上应用装饰器
  private applyDecorator(metatype: Metatype, metadata: DebugOptions): void {
    const instanceMetatypes: Type[] = [
      ...(this.reflector.get(MODULE_METADATA.CONTROLLERS, metatype) || []),
      ...(this.reflector.get(MODULE_METADATA.PROVIDERS, metatype) || []),
    ];

    for (const meta of instanceMetatypes) {
      if (typeof meta !== 'function' || this.exclude.has(meta.name) || metadata.exclude?.includes(meta)) {
        continue;
      }

      this.exclude.add(meta.name);
      DebugLog(metadata.context)(meta);
    }

    const imports = this.reflector.get<Type[] | undefined>('imports', metatype) || [];
    for (const module of imports) {
      this.applyDecorator(module, metadata);
    }
  }
}

