/**
 * LocalStrategy类用于实现基于用户名和密码的本地身份验证策略。
 * 使用AuthService的validateUser方法来验证用户的用户名和密码。
 * 如果用户存在且密码正确，返回用户的信息；如果用户不存在或者密码错误，抛出未经授权的异常。
 * 这个策略主要用于用户的登录操作。
 */

// 导入必需的模块和库
import { Injectable, UnauthorizedException } from '@nestjs/common'; // Nest.js的内置装饰器，用于标记类作为可以注入到其他类的依赖项，以及用于处理未经授权的异常
import { PassportStrategy } from '@nestjs/passport'; // PassportStrategy是Nest.js提供的通用策略的基类
import { Strategy } from 'passport-local'; // passport-local提供的本地认证策略

import type { Payload } from '../auth.interface'; // 从 auth.interface 导入的类型定义
import { AuthService } from '../auth.service'; // 导入 AuthService，用于验证用户

@Injectable() // 使用装饰器标记LocalStrategy类为可注入的
export class LocalStrategy extends PassportStrategy(Strategy) { // LocalStrategy类继承自PassportStrategy，使用passport-local的策略
  constructor(private auth: AuthService) { // 使用 AuthService 作为依赖注入到构造函数
    super();
  }

  // validate方法是必需的，这个方法会验证用户名和密码
  // 在每次需要进行本地身份验证的请求时，Passport会自动调用这个方法
  public async validate(username: string, password: string): Promise<Payload> {
    const user = await this.auth.validateUser(username, password); // 使用 AuthService 的 validateUser 方法验证用户
    if (!user) {
      throw new UnauthorizedException('NotFoundUser'); // 如果用户不存在或者密码错误，抛出未经授权的异常
    }

    // 如果用户存在且密码正确，返回用户的信息
    return { userId: user.id, username: user.name, roles: user.roles };
  }
}
