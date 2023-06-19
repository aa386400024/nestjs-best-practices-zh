/**
 * ExceptionsFilter类定义了一个异常过滤器，用于处理和记录应用中抛出的异常。
 * 它覆盖了基础的异常过滤器BaseExceptionFilter，并实现了GqlExceptionFilter以适应GraphQL的环境。
 * 对于HTTP状态码是500的异常，会被记录到日志中。
 */

// 导入必需的模块和装饰器
import { ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from '@nestjs/common'; // Nest.js的内置装饰器和函数
import { BaseExceptionFilter } from '@nestjs/core'; // Nest.js核心模块的异常过滤器基类
import { GqlArgumentsHost, GqlContextType, GqlExceptionFilter } from '@nestjs/graphql'; // Nest.js GraphQL模块的异常过滤器接口和其他类型

@Catch() // 使用@Catch装饰器标记ExceptionsFilter类作为异常过滤器
export class ExceptionsFilter extends BaseExceptionFilter implements GqlExceptionFilter {
  private readonly logger: Logger = new Logger(); // 使用Nest.js的内置Logger类创建一个logger实例

  // 重写BaseExceptionFilter类的catch方法，处理并记录异常
  public override catch(exception: unknown, host: ArgumentsHost): void {
    let args: unknown;
    // 判断是否是GraphQL的请求
    if (host.getType<GqlContextType>() === 'graphql') {
      const gqlHost = GqlArgumentsHost.create(host);
      const { req: { body: { operationName, variables } } } = gqlHost.getContext();
      args = `${operationName} ${JSON.stringify(variables)}`;
    } else {
      super.catch(exception, host); // 如果不是GraphQL的请求，调用父类的catch方法处理异常
      // const req = host.switchToHttp().getRequest<Request>();
      // req.method, req.originalUrl...
      // args = req.body;
    }

    // 获取HTTP状态码
    const status = this.getHttpStatus(exception);
    // 如果HTTP状态码是500（内部服务器错误），记录异常信息
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      if (exception instanceof Error) {
        this.logger.error(`${exception.message}: ${args}`, exception.stack);
      } else {
        // Error Notifications
        this.logger.error('UnhandledException', exception);
      }
    }
  }

  // 获取HTTP状态码的私有方法
  private getHttpStatus(exception: unknown): number {
    return exception instanceof HttpException
      ? exception.getStatus() // 如果异常是HttpException，获取其HTTP状态码
      : HttpStatus.INTERNAL_SERVER_ERROR; // 如果不是HttpException，返回500（内部服务器错误）作为默认的HTTP状态码
  }
}
