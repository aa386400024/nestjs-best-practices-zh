/**
 * 这个文件定义了CreateDto类，这是一个数据传输对象（DTO），
 * 用于描述在创建Sampletable1实例时的数据结构。DTO是一种设计模式，
 * 常用于将内部数据结构转换为可以通过网络发送的格式。在Nest.js中，DTO常用于描述请求体数据结构，并用于验证这些数据。
 */

import { ArrayNotEmpty, IsOptional, IsString } from 'class-validator'; // 引入class-validator装饰器

import type { Sampletable1 } from '#entity/sampledb1'; // 引入Sampletable1类型

// 定义CreateDto类，Omit<Sampletable1, 'id' | 'updated_at' | 'created_at'>表示忽略Sampletable1的id、updated_at和created_at属性
export class CreateDto implements Omit<Sampletable1, 'id' | 'updated_at' | 'created_at'> {
  @IsString() // IsString装饰器，表示title必须是字符串
  public title!: string; // 必需的title属性

  @IsOptional() // IsOptional装饰器，表示content是可选的
  @IsString() // IsString装饰器，表示content必须是字符串
  public content?: string; // 可选的content属性

  @ArrayNotEmpty() // ArrayNotEmpty装饰器，表示tags数组不能为空
  @IsString({ each: true }) // IsString装饰器，表示tags数组中的每个元素都必须是字符串
  public tags!: string[]; // 必需的tags属性
}
