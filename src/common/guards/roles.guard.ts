/**
 * RolesGuard类定义了一个守卫，用于处理角色访问控制。
 * 当特定的角色试图访问受保护的路由时，这个守卫可以阻止或允许访问。
 * 角色的信息在请求对象中获取，并与控制器和方法的角色元数据进行对比。
 */

// 导入必需的模块和装饰器
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'; // Nest.js的内置装饰器和函数
import { Reflector } from '@nestjs/core'; // Nest.js核心模块的Reflector类
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql'; // Nest.js GraphQL模块的类型和执行上下文
import type { Request } from 'express'; // Express模块的请求对象类型

@Injectable() // 使用@Injectable装饰器标记RolesGuard类作为一个可注入的提供者
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {} // 通过依赖注入获取Reflector实例

  // 实现CanActivate接口的canActivate方法，确定一个请求是否能被执行
  public canActivate(context: ExecutionContext): boolean {
    // 使用Reflector获取"roles"元数据
    const roles = this.reflector.getAllAndOverride<string[] | undefined>('roles', [
      context.getHandler(), // 方法的角色
      context.getClass(), // 控制器的角色
    ]);

    // 如果没有角色元数据，直接返回true，允许访问
    if (!roles) {
      return true;
    }

    let request: Request;
    // 判断是否是GraphQL的请求
    if (context.getType<GqlContextType>() === 'graphql') {
      const ctx = GqlExecutionContext.create(context).getContext();
      request = <Request>ctx.req;
    } else {
      request = context.switchToHttp().getRequest<Request>();
    }

    // 获取请求中的用户
    const { user } = request;
    // 如果没有用户，返回false，禁止访问
    if (!user) {
      return false;
    }

    // 判断用户的角色是否在允许的角色列表中，如果在，返回true，允许访问，否则，返回false，禁止访问
    return user.roles.some((role: string) => roles.includes(role));
  }
}
