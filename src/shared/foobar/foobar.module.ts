/**
 * 此文件定义了一个NestJS模块，名为FoobarModule。
 * 在此模块中，我们使用TypeOrmModule.forFeature方法在数据库中注册了一个实体Sampletable1，并且定义了一个服务FoobarService。
 * 这个服务不仅在本模块中可用，还通过exports属性导出，使其可以在其他模块中使用。
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Sampletable1 } from '#entity/sampledb1';
import { FoobarService } from './foobar.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sampletable1])], // 在数据库中注册Sampletable1实体
  providers: [FoobarService], // 定义服务提供者为FoobarService
  exports: [FoobarService], // 将FoobarService服务导出，使其可以在其他模块中使用
})
export class FoobarModule {}
