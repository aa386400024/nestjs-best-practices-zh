/**
 * 文件作用：这个文件定义了CrudController类，该类定义了一些HTTP请求处理方法，用于处理针对/crud路径的GET、POST、PUT和DELETE请求。
 */

// 导入相关模块和类
import { Body, Controller, Get, Param, Post, Put, Delete,
  NotFoundException, InternalServerErrorException, ParseIntPipe } from '@nestjs/common';

import type { Sampletable1 } from '#entity/sampledb1';
import { CreateDto, UpdateDto } from '../dto';
import { CrudService } from '../providers';

/**
 * 路由 /test/crud/*
 */
@Controller('crud') // 控制器装饰器，定义了这个类对应的路由路径
export class CrudController {
  constructor(private crud: CrudService) {} // 注入CrudService

  @Get(':id') // Get装饰器，定义了对应的HTTP请求方法和路由参数
  public async read(@Param('id', ParseIntPipe) id: number): Promise<Sampletable1> { // 对应的请求处理方法
    const result = await this.crud.read(id); // 调用CrudService的read方法
    if (!result) { // 如果没有找到对应的数据，则抛出NotFoundException
      throw new NotFoundException('NotFoundData');
    }

    return result;
  }

  @Post() // Post装饰器，定义了对应的HTTP请求方法
  public async create(@Body() body: CreateDto): Promise<{ id: number }> { // 对应的请求处理方法
    const result = await this.crud.create(body); // 调用CrudService的create方法
    if (!result.id) { // 如果创建失败，则抛出InternalServerErrorException
      throw new InternalServerErrorException('NotCreatedData');
    }

    return { id: result.id };
  }

  @Put(':id') // Put装饰器，定义了对应的HTTP请求方法和路由参数
  public async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateDto): Promise<{ success: boolean }> { // 对应的请求处理方法
    const result = await this.crud.update(id, body); // 调用CrudService的update方法

    return { success: !!result.affected };
  }

  @Delete(':id') // Delete装饰器，定义了对应的HTTP请求方法和路由参数
  public async remove(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean }> { // 对应的请求处理方法
    const result = await this.crud.remove(id); // 调用CrudService的remove方法

    return { success: !!result.affected };
  }
}
