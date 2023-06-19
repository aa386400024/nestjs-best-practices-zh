/**
 * 此文件定义了一个名为SampleModule的NestJS模块。
 * 在NestJS中，一个模块就像一个组织单元，它将相关的功能组织在一起。
 * SampleModule模块导入了两个实体Sampletable1和Sampletable2，这些实体在TypeORM中表示数据库表。
 * 它还导入了FoobarModule模块，这是一个共享模块，可以被多个其他模块使用。
 * 此模块中定义了controllers和providers，分别表示处理HTTP请求的控制器和提供各种服务的服务提供者。
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sampletable1 } from '#entity/sampledb1';
import { Sampletable2 } from '#entity/sampledb2';
import * as controllers from './controllers';
import * as providers from './providers';
import { FoobarModule } from '../shared/foobar';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // 这里导入了TypeORM模块，使SampleModule可以使用Sampletable1和Sampletable2这两个数据库表
      Sampletable1, Sampletable2,
    ]),
    FoobarModule, // 这里导入了FoobarModule，这是一个共享模块
  ],
  controllers: Object.values(controllers), // 这里注册了处理HTTP请求的控制器
  providers: Object.values(providers), // 这里注册了提供各种服务的服务提供者
})
export class SampleModule {} // 导出SampleModule模块
