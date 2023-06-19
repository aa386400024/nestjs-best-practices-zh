/**
 * BaseModule类定义了一个基础模块，该模块集成了几个其他模块：TerminusModule, AuthModule和HttpModule。
 * 这个模块可以作为应用程序的基础，为应用程序提供一组基础功能，例如健康检查、用户身份验证和HTTP请求等。
 */

// 导入必需的模块和库
import { HttpModule } from '@nestjs/axios'; // 导入axios模块，用于HTTP请求
import { Module } from '@nestjs/common'; // Nest.js的内置装饰器，用于定义模块
import { TerminusModule } from '@nestjs/terminus'; // 导入Terminus模块，用于健康检查等

import * as controllers from './controllers'; // 导入当前目录下的所有控制器
import { AuthModule } from '../auth'; // 导入Auth模块，用于用户身份验证

@Module({
  imports: [TerminusModule, AuthModule, HttpModule], // 导入其他模块，使得BaseModule可以使用它们提供的功能
  controllers: Object.values(controllers), // 声明这个模块下的控制器
})
export class BaseModule {} // 定义BaseModule类作为模块
