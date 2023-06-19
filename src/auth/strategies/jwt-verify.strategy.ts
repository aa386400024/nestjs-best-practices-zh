/**
 * JwtVerifyStrategy类用于实现基于JWT的refresh_token处理策略。
 * 使用passport-jwt库来提取JWT，不验证其过期时间，并解析其payload。
 * 这个策略主要用于在access_token过期后，处理refresh_token以获取新的access_token。
 */

// 导入必需的模块和库
import { Injectable } from '@nestjs/common'; // Nest.js的内置装饰器，用于标记类作为可以注入到其他类的依赖项
import { ConfigService } from '@nestjs/config'; // ConfigService用于获取环境变量
import { PassportStrategy } from '@nestjs/passport'; // PassportStrategy是Nest.js提供的通用策略的基类
import { ExtractJwt, Strategy } from 'passport-jwt'; // passport-jwt提供的从请求中提取JWT以及JWT策略

import type { JwtPayload, Payload } from '../auth.interface'; // 从 auth.interface 导入的类型定义

@Injectable() // 使用装饰器标记JwtVerifyStrategy类为可注入的
export class JwtVerifyStrategy extends PassportStrategy(Strategy, 'jwt-verify') { // JwtVerifyStrategy类继承自PassportStrategy，使用passport-jwt的策略
  constructor(config: ConfigService) { // 使用 ConfigService 作为依赖注入到构造函数
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从请求头的Authorization字段中提取JWT
      ignoreExpiration: true, // 在处理refresh_token时，不检查access_token的过期时间
      secretOrKey: config.get('jwtSecret'), // 使用环境变量中的jwtSecret作为JWT的密钥
    });
  }

  // validate方法是必需的，这个方法会根据我们的需要来提取并返回JWT的payload部分
  // 在每次需要验证JWT的请求时，Passport会自动调用这个方法
  public validate(payload: JwtPayload): Payload {
    // 这里我们从payload中提取了userId, username和roles，并返回
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}
