/**
 * 文件作用：这个文件定义了SampleDto类，这是一个数据传输对象（DTO）。
 * DTO是一种设计模式，常用于将内部数据结构转换为可以通过网络发送的格式。
 * 在Nest.js中，DTO常用于描述请求体数据结构，并用于验证这些数据。这个特定的DTO是用来定义样本请求的结构。
 */

import { Transform, TransformFnParams } from 'class-transformer'; // 引入class-transformer装饰器
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'; // 引入class-validator装饰器

import { DateService } from '../providers'; // 引入DateService服务

/**
 * https://github.com/typestack/class-validator#validation-decorators
 * https://docs.nestjs.com/techniques/serialization
 */

// 定义SampleDto类
export class SampleDto {
  @IsNumber() // IsNumber装饰器，表示id必须是数字
  public id!: number; // 必需的id属性

  @IsString() // IsString装饰器，表示title必须是字符串
  public title!: string; // 必需的title属性

  @IsOptional() // IsOptional装饰器，表示content是可选的
  @IsString() // IsString装饰器，表示content必须是字符串
  public content?: string; // 可选的content属性

  @IsDateString() // IsDateString装饰器，表示date必须是ISO 8601日期字符串
  public date: string = new Date().toISOString(); // 默认值为当前日期和时间的ISO 8601字符串

  @IsString() // IsString装饰器，表示datetime必须是字符串
  @Transform(({ value }: TransformFnParams) => DateService.format(String(value))) // Transform装饰器，使用DateService的format方法将日期时间字符串转换为特定的格式
  public datetime!: string; // 必需的datetime属性

  @IsNotEmpty() // IsNotEmpty装饰器，表示something不能为空
  public something!: string; // 必需的something属性

  @IsNumber() // IsNumber装饰器，表示page必须是数字
  public page: number = 1; // 默认值为1的page属性
}
