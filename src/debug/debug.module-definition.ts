/**
 * 这个文件使用 Nest.js 的 ConfigurableModuleBuilder 构造了一个可配置模块，配置项保存在 DebugModuleOptions 中。
 * 配置方法名设置为 'forRoot'，最后生成了配置包括 ConfigurableModuleClass，MODULE_OPTIONS_TOKEN 和 OPTIONS_TYPE。
 */

// 导入必需的模块和类型
import { ConfigurableModuleBuilder } from '@nestjs/common'; // Nest.js 的可配置模块构造器

// 导入自定义模块和类型
import type { DebugModuleOptions } from './debug.interface'; // 自定义的调试模块选项接口

// 使用 ConfigurableModuleBuilder 构造一个可配置模块，配置项保存在 DebugModuleOptions 中。
// 设置配置方法名为 'forRoot' 并生成配置，配置包括 ConfigurableModuleClass，MODULE_OPTIONS_TOKEN 和 OPTIONS_TYPE。
export const {
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
} = new ConfigurableModuleBuilder<DebugModuleOptions>()
  .setClassMethodName('forRoot')
  .build();
