/**
 * 此文件定义了一个NestJS服务，名为FoobarService。
 * 此服务使用TypeORM库的Repository来操作数据库中的Sampletable1实体。
 * 通过使用@InjectRepository装饰器，我们可以把TypeORM的Repository注入到服务中，然后在服务的方法中使用Repository的方法来操作数据库。
 * 在此服务中，我们定义了一个getFoobars方法，这个方法使用Repository的find方法来从数据库中获取数据。
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Sampletable1 } from '#entity/sampledb1';

@Injectable() // 该装饰器标记此类为一个NestJS服务
export class FoobarService {
  constructor(
    @InjectRepository(Sampletable1) // 使用@InjectRepository装饰器把TypeORM的Repository注入到服务中
    private sampletable1: Repository<Sampletable1>,
  ) {}

  // 使用Repository的find方法来从数据库中获取数据
  public async getFoobars(): Promise<Sampletable1[]> {
    return this.sampletable1.find({ take: 10 });
  }
}
