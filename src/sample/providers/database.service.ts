/**
 * 文件作用：这个文件定义了DatabaseService类，该类提供了一些基于Sampletable1和Sampletable2实体的数据库查询方法。
 */

// 导入相关模块和类
import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { Sampletable1 } from '#entity/sampledb1';
import { Sampletable2 } from '#entity/sampledb2';

/**
 * 数据库查询执行示例
 */
@Injectable()
export class DatabaseService {
  private tablerepo: Repository<Sampletable1>;

  constructor(
    /**
     * 示例1
     * https://typeorm.io/#/working-with-repository
     * https://typeorm.io/#/repository-api
     * 需要在TypeOrmModule.forFeature([])中导入
     */
    @InjectRepository(Sampletable1)
    private sampletable1: Repository<Sampletable1>,

    /**
     * 示例2
     * https://typeorm.io/#/working-with-entity-manager
     * https://typeorm.io/#/entity-manager-api
     */
    @InjectEntityManager()
    private manager: EntityManager,
  ) {
    /**
     * 示例3
     * https://typeorm.io/#/entity-manager-api - getRepository
     */
    this.tablerepo = this.manager.getRepository(Sampletable1);
  }

  /**
   * https://typeorm.io/#/find-options
   */
  // 使用 Repository 进行查找的方法
  public async sample1(): Promise<Sampletable1[]> {
    return this.sampletable1.find();
  }

  // 使用 EntityManager 进行查找的方法
  public async sample2(): Promise<Sampletable1[]> {
    return this.manager.find(Sampletable1);
  }

  // 使用通过 EntityManager 获取的 Repository 进行查找的方法
  public async sample3(): Promise<Sampletable1[]> {
    return this.tablerepo.find();
  }

  /**
   * https://typeorm.io/#/select-query-builder
   */
  // 执行带连接操作的查询的方法
  public async joinQuery(): Promise<boolean> {
    // 各种连接操作的查询示例
    await this.sampletable1.createQueryBuilder('tb1')
      .innerJoin('sampletable2', 'tb2', 'tb2.id = tb1.id') // 内连接或左连接
      .select(['tb1', 'tb2.title'])
      .where('tb1.id = :id', { id: 123 })
      .getRawOne(); // getOne, getMany, getRawMany ...

    await this.sampletable1.createQueryBuilder('tb1')
      .innerJoinAndSelect('sampletable2', 'tb2', 'tb2.id = tb1.id')
      .getOne();

    await this.sampletable1.createQueryBuilder('tb1')
      .leftJoinAndSelect(Sampletable2, 'tb2', 'tb2.id = tb1.id')
      .getRawMany();

    await this.sampletable1.createQueryBuilder('tb1')
      .leftJoinAndMapOne('tb1.tb2row', 'sampletable2', 'tb2', 'tb2.id = tb1.id')
      .getOne();

    await this.sampletable1.createQueryBuilder('tb1')
      .leftJoinAndMapMany('tb1.tb2row', Sampletable2, 'tb2', 'tb2.id = tb1.id')
      .getMany();

    return true;
  }
}
