/**
 * 此文件定义了一个自定义的GraphQL标量类型DateScalar。
 * 它实现了CustomScalar接口，用于解析和序列化Date类型的数据。
 * DateScalar类型的数据在从客户端发送到服务器时将被解析为Date对象，
 * 在从服务器发送到客户端时将被序列化为ISO格式的字符串。
 */

import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date', () => Date) // 此装饰器表明此类是一个GraphQL标量，名称为'Date'，对应的JavaScript类型为Date
export class DateScalar implements CustomScalar<string, Date | null> {
  public description: string = 'Date custom scalar type'; // 自定义标量的描述

  // 此方法用于解析从客户端发送到服务器的值
  public parseValue(value: unknown): Date {
    if (typeof value !== 'number') {
      throw new Error('DateScalar can only parse number values'); // 如果值不是数字，抛出错误
    }

    return new Date(value); // 返回解析后的Date对象
  }

  // 此方法用于序列化从服务器发送到客户端的值
  public serialize(value: unknown): string {
    if (!(value instanceof Date)) {
      throw new Error('DateScalar can only serialize Date values'); // 如果值不是Date对象，抛出错误
    }

    return value.toISOString(); // 返回ISO格式的字符串
  }

  // 此方法用于解析GraphQL语言中的字面值
  public parseLiteral(ast: ValueNode): Date | null {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value); // 如果字面值是整数，解析为Date对象
    }

    return null; // 否则返回null
  }
}
