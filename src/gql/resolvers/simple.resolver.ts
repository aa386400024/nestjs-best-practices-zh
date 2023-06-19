/**
 * 此文件定义了一个GraphQL解析器，名为SimpleResolver。
 * 解析器包含了一些GraphQL查询和变更的处理函数，以对Sampletable1实体进行增删查改（CRUD）操作。
 * 它使用了Pino日志库（通过InjectPinoLogger装饰器注入）和SimpleService（自动注入）。
 */

import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import { JwtAuthGuard } from '../../auth';
import { ReqUser, Roles, RolesGuard } from '../../common';
import { SimpleInput, SimpleArgs } from '../dto';
import { Simple, Payload } from '../models';
import { SimpleService } from '../providers';

@Resolver(() => Simple) // 此装饰器表明此类是一个GraphQL解析器，主要处理Simple类型的数据
export class SimpleResolver {
  constructor(
    @InjectPinoLogger(SimpleService.name) private readonly logger: PinoLogger, // 使用Pino日志库
    private simpleService: SimpleService, // 使用SimpleService进行实体操作
  ) {}

  // 此函数处理user查询，返回当前登录的用户的信息
  @Query(() => Payload) // 此装饰器表明此函数处理名为'user'的GraphQL查询，返回Payload类型的数据
  @UseGuards(JwtAuthGuard, RolesGuard) // 使用JwtAuthGuard和RolesGuard两个守卫
  @Roles('test') // 角色为'test'的用户可以访问此查询
  public user(@ReqUser() user: Payload): Payload {
    this.logger.info('user'); // 记录日志

    return user; // 返回当前登录的用户的信息
  }

  // 此函数处理create变更，创建一个新的Simple实体
  @Mutation(() => Simple) // 此装饰器表明此函数处理名为'create'的GraphQL变更，返回Simple类型的数据
  public async create(@Args('simpleData') simpleData: SimpleInput): Promise<Simple> {
    this.logger.info('create'); // 记录日志

    return this.simpleService.create(simpleData); // 使用SimpleService的create方法创建实体
  }

  // 此函数处理read查询，读取一个Simple实体
  @Query(() => Simple) // 此装饰器表明此函数处理名为'read'的GraphQL查询，返回Simple类型的数据
  public async read(@Args('id', { type: () => ID }) id: number): Promise<Simple> {
    this.logger.info('read'); // 记录日志

    const simple = await this.simpleService.read(id); // 使用SimpleService的read方法读取实体
    if (!simple) {
      throw new NotFoundException('NotFoundData'); // 如果没有找到实体，抛出NotFoundException异常
    }

    return simple; // 返回找到的实体
  }

  // 此函数处理find查询，查找符合条件的Simple实体
  @Query(() => [Simple]) // 此装饰器表明此函数处理名为'find'的GraphQL查询，返回Simple类型的数组
  public async find(@Args() simpleArgs: SimpleArgs): Promise<Simple[]> {
    this.logger.info('find'); // 记录日志

    return this.simpleService.find(simpleArgs); // 使用SimpleService的find方法查找实体
  }

  // 此函数处理remove变更，移除一个Simple实体
  @Mutation(() => Boolean) // 此装饰器表明此函数处理名为'remove'的GraphQL变更，返回Boolean类型的数据
  public async remove(@Args('id', { type: () => ID }) id: number): Promise<boolean> {
    this.logger.info('remove'); // 记录日志

    return this.simpleService.remove(id); // 使用SimpleService的remove方法移除实体
  }
}
