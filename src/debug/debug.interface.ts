/**
 * 这个文件定义了用于描述调试模块和调试选项的数据结构的 TypeScript 类型。
 */

/* eslint-disable @typescript-eslint/ban-types */ // 关闭 ESLint 中禁止使用某些类型（如 Function）的规则
import type { Type } from '@nestjs/common'; // 从 Nest.js 中导入 Type 类型

// 定义一个类引用类型，其中索引是字符串，值是类型
export class ClassRef {
  [index: string]: Type;
}

// 定义一个 Function 类型
export type Func = Function;
// 定义一个元类型，它可以是类型或者函数
export type Metatype = Type | Func;

// 定义调试模块的选项接口，包含一个可选的字符串数组属性 exclude
export interface DebugModuleOptions {
  exclude?: string[];
}

// 定义调试选项接口，包含一个可选的字符串属性 context 和一个可选的元类型数组属性 exclude
export interface DebugOptions {
  context?: string;
  exclude?: Metatype[];
}
