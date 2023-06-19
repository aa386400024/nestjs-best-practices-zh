/**
 * 这个文件定义了CrudService类，该类提供了基于Sampletable1实体的基础增删改查（CRUD）操作方法。
 */

// 导入相关模块和类
import { Injectable } from '@nestjs/common'; // NestJS 的装饰器，表示这个类可以被注入到其他类中
import { InjectRepository } from '@nestjs/typeorm'; // NestJS 的装饰器，用于注入Repository对象
import { Repository, UpdateResult, DeleteResult } from 'typeorm'; // TypeORM 的类和类型

import { Sampletable1 } from '#entity/sampledb1'; // 数据表对应的实体类

@Injectable() // 将这个类标记为可注入的服务
export class CrudService {
  constructor(
    @InjectRepository(Sampletable1) // 使用装饰器注入数据表对应的 Repository 对象
    private table: Repository<Sampletable1>, // 声明并初始化私有变量
  ) {}

  // 创建数据的方法
  public async create(data: Partial<Sampletable1>): Promise<Sampletable1> {
    // 调用 Repository 的 save 方法来保存数据，并返回保存后的数据
    return this.table.save(data);
  }

  // 读取数据的方法
  public async read(id: number): Promise<Sampletable1 | null> {
    // 调用 Repository 的 findOne 方法来查找数据，并返回查找到的数据
    return this.table.findOneBy({ id });
  }

  // 更新数据的方法
  public async update(id: number, data: Partial<Sampletable1>): Promise<UpdateResult> {
    // 调用 Repository 的 update 方法来更新数据，并返回更新结果
    return this.table.update(id, data);
  }

  // 删除数据的方法
  public async remove(id: number): Promise<DeleteResult> {
    // 调用 Repository 的 delete 方法来删除数据，并返回删除结果
    return this.table.delete(id);
  }
}
