/**
 * UtilService 类提供了一些实用的辅助函数，包括处理模板字符串、检查键是否存在于特定对象中以及移除对象中的 undefined 值。
 */

// 导入必需的模块和类型
import { Injectable } from '@nestjs/common'; // Nest.js 的内置装饰器

// 定义模板参数类型为任意类型的数组
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TemplateParameter = any[];

@Injectable() // 使用 @Injectable 装饰器标记 UtilService 类作为一个可注入的提供者
export class UtilService {
  // 模板字符串处理方法
  public template<T>(templateData: TemplateStringsArray, param: T[], delimiter: string = '\n'): string {
    let output = '';
    for (let i = 0; i < param.length; i += 1) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      output += templateData[i] + param[i];
    }
    output += templateData[param.length];

    const lines: string[] = output.split(/(?:\r\n|\n|\r)/);

    return lines.map((text: string) => text.replace(/^\s+/gm, '')).join(delimiter).trim();
  }

  // 返回带换行符的模板字符串
  public pre(templateData: TemplateStringsArray, ...param: TemplateParameter): string {
    return this.template(templateData, param, '\n');
  }

  // 返回带空格分隔符的模板字符串
  public line(templateData: TemplateStringsArray, ...param: TemplateParameter): string {
    return this.template(templateData, param, ' ');
  }

  // 检查给定的键是否存在于特定的对象中
  public isKeyOfSchema<T extends object>(key: unknown, schema: T): key is keyof T {
    return (typeof key === 'string') && key in schema;
  }

  // 移除对象中的 undefined 值
  public removeUndefined<T extends object>(argv: T): Record<string, unknown> {
    // https://stackoverflow.com/questions/25421233
    // JSON.parse(JSON.stringify(args));
    return Object.fromEntries(Object.entries(argv).filter(([, value]: [string, unknown]) => value !== undefined));
  }
}
