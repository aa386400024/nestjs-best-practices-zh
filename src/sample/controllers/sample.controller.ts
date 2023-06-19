/**
 * 这个文件定义了SampleController类，该类定义了一些HTTP请求处理方法，用于处理对应/test/sample路径的GET和POST请求。
 */

import { BadRequestException, Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

import type { Sampletable1 } from '#entity/sampledb1';
import { Roles, RolesGuard, ConfigService } from '../../common';
import { FoobarService } from '../../shared/foobar';
import { SampleDto } from '../dto';
import { DatabaseService } from '../providers';

/**
 * 路由 /test/sample/*
 */
@UseGuards(RolesGuard) // 使用RolesGuard作为路由守卫
@Controller('sample') // 控制器装饰器，定义了这个类对应的路由路径
export class SampleController {
  constructor(
    @InjectPinoLogger(SampleController.name) private readonly logger: PinoLogger, // 注入PinoLogger用于日志记录
    private config: ConfigService, // 注入ConfigService用于获取配置信息
    private dbquery: DatabaseService, // 注入DatabaseService用于数据库查询
    private foobarService: FoobarService, // 注入FoobarService用于获取foobar信息
  ) {}

  @Get() // Get装饰器，定义了对应的HTTP请求方法
  public sample(): Record<string, unknown> { // 对应的请求处理方法
    this.logger.info('this is sample'); // 记录日志信息

    return {
      hello: this.config.get('hello'), // 获取配置信息
      foo: this.config.get('foo'),
    };
  }

  @Get('hello') // Get装饰器，定义了对应的HTTP请求方法和路径
  public hello(@Req() req: Request, @Res() res: Response): void { // 对应的请求处理方法
    // 返回JSON响应
    res.json({
      message: req.originalUrl, // 获取请求的原始URL
    });
  }

  @Get('hello/query') // Get装饰器，定义了对应的HTTP请求方法和路径
  public helloQuery(@Query('name') name: string): string { // 对应的请求处理方法
    // 如果查询参数name不存在，抛出BadRequestException异常
    if (!name) {
      throw new BadRequestException('InvalidParameter');
    }

    // 返回查询参数name
    return `helloQuery: ${name}`;
  }

  @Get('hello/param/:name') // Get装饰器，定义了对应的HTTP请求方法和路径
  public helloParam(@Param('name') name: string): string { // 对应的请求处理方法
    // 返回路径参数name
    return `helloParam: ${name}`;
  }

  @Get('hello/number/:foo') // Get装饰器，定义了对应的HTTP请求方法和路径
  public helloNumber(@Param('foo') foo: number, @Query('bar') bar: string, @Query('blah', ParseIntPipe) blah: number): AnyObject {
    // 返回路径参数foo和查询参数bar和blah
    return { foo, bar, blah };
  }

  @Post('hello/body') // Post装饰器，定义了对应的HTTP请求方法和路径
  public helloBody(@Body() param: SampleDto): string { // 对应的请求处理方法
    // 返回请求体参数param
    return `helloBody: ${JSON.stringify(param)}`;
  }

  @Get('database') // Get装饰器，定义了对应的HTTP请求方法和路径
  public async database(): Promise<Sampletable1[]> { // 对应的请求处理方法
    // 返回数据库查询结果
    return this.dbquery.sample1();
  }

  @Get('foobars') // Get装饰器，定义了对应的HTTP请求方法和路径
  public async foobars(): Promise<Sampletable1[]> { // 对应的请求处理方法
    // 返回获取的foobar信息
    return this.foobarService.getFoobars();
  }

  @Roles('admin') // Roles装饰器，定义了访问该方法需要的角色
  @Get('admin') // Get装饰器，定义了对应的HTTP请求方法和路径
  public admin(): string { // 对应的请求处理方法
    // 如果访问者的角色为admin，返回特定的字符串
    return 'Need admin role';
  }
}
