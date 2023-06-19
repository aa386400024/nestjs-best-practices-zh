/**
 * 此文件定义了一个NestJS服务，名为SimpleService。
 * 此服务使用Pino日志库（通过InjectPinoLogger装饰器注入），TypeORM库的Repository（通过InjectRepository装饰器注入）以及一个UtilService来处理数据库中的Sampletable1实体。
 * 这个服务提供了create、read、find、remove四个方法，用于进行对Sampletable1实体的基本的增删查改（CRUD）操作。
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';

import { Sampletable1 } from '#entity/sampledb1';
import { UtilService } from '../../common';
import type { SimpleInput, SimpleArgs } from '../dto';
import { Simple } from '../models';

@Injectable() // 该装饰器标记此类为一个NestJS服务
export class SimpleService {
  constructor(
    @InjectPinoLogger(SimpleService.name) private readonly logger: PinoLogger, // 使用Pino日志库
    @InjectRepository(Sampletable1) private sampletable: Repository<Sampletable1>, // 使用TypeORM库的Repository来操作数据库中的Sampletable1实体
    private util: UtilService, // 使用UtilService来处理一些工具性质的操作
  ) {}

  // create方法用于创建一个新的Sampletable1实体
  public async create(data: SimpleInput): Promise<Simple> {
    this.logger.info('create'); // 记录日志

    return this.sampletable.save(data); // 使用Repository的save方法保存数据
  }

  // read方法用于读取一个Sampletable1实体
  public async read(id: number): Promise<Simple | null> {
    this.logger.info('read'); // 记录日志

    const row = await this.sampletable.findOneBy({ id }); // 使用Repository的findOneBy方法查找数据
    if (!row) {
      return null;
    }

    // 返回找到的数据，并处理createdAt字段
    return Object.assign(new Simple(), row, { createdAt: row.created_at });
  }

  // find方法用于查找符合条件的Sampletable1实体
  public async find(args: SimpleArgs): Promise<Simple[]> {
    this.logger.info('find'); // 记录日志

    const result = await this.sampletable.find(this.util.removeUndefined({ // 使用Repository的find方法查找数据，并使用UtilService的removeUndefined方法处理条件参数
      title: args.title,
      content: args.content,
    }));

    // 返回找到的数据，并处理createdAt字段
    return result.map((row: Sampletable1) => Object.assign(new Simple(), row, { createdAt: row.created_at }));
  }

  // remove方法用于删除一个Sampletable1实体
  public async remove(id: number): Promise<boolean> {
    this.logger.info('remove'); // 记录日志

    const result = await this.sampletable.delete(id); // 使用Repository的delete方法删除数据

    return !!result.affected; // 如果删除操作影响了数据，则返回true，否则返回false
  }
}
