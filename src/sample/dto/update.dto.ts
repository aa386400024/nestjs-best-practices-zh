/**
 * 文件作用：这个文件定义了UpdateDto类，这也是一个数据传输对象（DTO）。
 * 此特定的DTO用于表示应用程序中的更新操作所需的数据。
 * UpdateDto类是从CreateDto类中删除了'title'属性后的结果，这是使用OmitType函数实现的，
 * 它来自@nestjs/mapped-types库。这意味着UpdateDto类中有CreateDto类的所有属性，除了'title'属性。
 */

/**
 * https://github.com/nestjs/mapped-types
 * https://docs.nestjs.com/openapi/mapped-types for swagger
 */
import { OmitType } from '@nestjs/mapped-types'; // 引入nestjs映射类型的OmitType函数
// import { OmitType } from '@nestjs/swagger'; // 如果使用swagger，可以从这个库导入OmitType函数

import { CreateDto } from './create.dto'; // 引入CreateDto类

/**
 * Mapped Types: PartialType, PickType, OmitType, IntersectionType
 */

// 定义UpdateDto类，它是OmitType函数的结果，函数的参数是CreateDto类和一个包含'title'的数组
export class UpdateDto extends OmitType(CreateDto, ['title']) {}
