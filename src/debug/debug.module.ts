/**
 * DebugModule 类是一个 Nest.js 模块，它提供了一个 forRoot 静态方法用于配置模块并返回一个动态模块。
 * 在非生产环境中，这个模块会导入 DiscoveryModule 并提供 DebugExplorer。
 */

// 导入必需的模块和类型
import { Module, DynamicModule } from '@nestjs/common'; // Nest.js 的内置模块
import { DiscoveryModule } from '@nestjs/core'; // Nest.js 核心模块中的服务发现模块

// 导入自定义模块和类型
import { DebugExplorer } from './debug.explorer'; // 自定义的调试探测器
import { ConfigurableModuleClass, OPTIONS_TYPE } from './debug.module-definition'; // 自定义的模块定义

@Module({}) // 使用 @Module 装饰器标记 DebugModule 类作为一个 Nest.js 模块
export class DebugModule extends ConfigurableModuleClass {
  // 提供一个静态方法 forRoot，用于配置模块并返回一个动态模块
  public static override forRoot(options: typeof OPTIONS_TYPE): DynamicModule {
    const module = super.forRoot(options);

    // 在非生产环境中，导入 DiscoveryModule 并提供 DebugExplorer
    if (process.env.NODE_ENV !== 'production') {
      (module.imports ||= []).push(DiscoveryModule);
      (module.providers ||= []).push(DebugExplorer);
    }

    return module;
  }
}
