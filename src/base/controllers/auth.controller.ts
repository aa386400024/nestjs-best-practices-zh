/**
 * AuthController类定义了一个控制器，用于处理与用户身份验证相关的HTTP请求。
 * 提供了如下几个路由：/login, /logout, /check, /jwt/login, /jwt/check, /jwt/refresh。
 * 其中，/login和/jwt/login路由用于用户的登录操作，/logout路由用于用户的登出操作，
 * /check和/jwt/check路由用于验证用户的身份，/jwt/refresh路由用于刷新JWT。
 */

// 导入必需的模块和库
import { Controller, Get, Post, UseGuards, Req, Res, UnauthorizedException, Body } from '@nestjs/common'; // Nest.js的内置装饰器和函数
import type { Request, Response } from 'express'; // Express.js的类型定义

import { AuthService, LocalLoginGuard, Payload, AuthenticatedGuard, LocalAuthGuard, // 导入身份验证相关的服务和守卫
  JwtAuthGuard, JwtSign, JwtVerifyGuard } from '../../auth';
import { ReqUser } from '../../common'; // 导入用于获取请求中用户信息的装饰器

// 使用@Controller装饰器标记AuthController类作为控制器
@Controller()
export class AuthController {
  constructor(private auth: AuthService) {} // 使用AuthService作为依赖注入到构造函数

  // 定义处理POST请求的/login路由的方法
  @Post('login')
  @UseGuards(LocalLoginGuard) // 使用LocalLoginGuard守卫来验证请求
  public login(@ReqUser() user: Payload): Payload {
    return user;
  }

  // 定义处理GET请求的/logout路由的方法
  @Get('logout')
  public logout(@Req() req: Request, @Res() res: Response): void {
    req.logout(() => {
      res.redirect('/');
    });
  }

  // 定义处理GET请求的/check路由的方法
  @Get('check')
  @UseGuards(AuthenticatedGuard) // 使用AuthenticatedGuard守卫来验证请求
  public check(@ReqUser() user: Payload): Payload {
    return user;
  }

  // 定义处理POST请求的/jwt/login路由的方法
  @UseGuards(LocalAuthGuard) // 使用LocalAuthGuard守卫来验证请求
  @Post('jwt/login')
  public jwtLogin(@ReqUser() user: Payload): JwtSign {
    return this.auth.jwtSign(user);
  }

  // 定义处理GET请求的/jwt/check路由的方法
  @UseGuards(JwtAuthGuard) // 使用JwtAuthGuard守卫来验证请求
  @Get('jwt/check')
  public jwtCheck(@ReqUser() user: Payload): Payload {
    return user;
  }

  // 定义处理POST请求的/jwt/refresh路由的方法，用于刷新JWT
  @UseGuards(JwtVerifyGuard) // 使用JwtVerifyGuard守卫来验证请求
  @Post('jwt/refresh')
  public jwtRefresh(@ReqUser() user: Payload, @Body('refresh_token') token?: string): JwtSign {
    if (!token || !this.auth.validateRefreshToken(user, token)) {
      throw new UnauthorizedException('InvalidRefreshToken'); // 如果refresh_token无效，抛出未经授权的异常
    }

    return this.auth.jwtSign(user); // 返回新的JWT
  }
}
