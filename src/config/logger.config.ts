/**
 * 这个文件的主要作用是为了配置nestjs项目中的日志系统，主要使用了pino-http和pino-pretty这两个库。
 * 它可以生成请求ID，根据环境变量设置日志级别，设置自动记录日志以及将不同级别的日志输出到不同的流中。
 */

import type { Request } from 'express'; // 引入express的Request类型
import type { IncomingMessage } from 'http'; // 引入http的IncomingMessage类型
import { nanoid } from 'nanoid'; // 引入nanoid，它是一个用于生成唯一ID的库
import type { Params } from 'nestjs-pino'; // 引入nestjs-pino的Params类型
import { multistream } from 'pino'; // 引入pino的multistream，用于创建一个可以写入到多个流的日志器
import type { ReqId } from 'pino-http'; // 引入pino-http的ReqId类型

// 创建一个新的Set对象，包含"/health"和"/graphql"两个路径，这两个路径的日志将被忽略
const passUrl = new Set(['/health', '/graphql']);

// loggerOptions是用于配置日志记录器的对象
export const loggerOptions: Params = {
  pinoHttp: [{
    // 在生产环境的日志中更改时间值
    // 详情参考：https://getpino.io/#/docs/api?id=timestamp-boolean-function
    // timestamp: stdTimeFunctions.isoTime,

    // 静默请求日志
    quietReqLogger: true,

    // 生成请求ID，如果请求头中没有'X-Request-Id'，则使用nanoid生成一个新的唯一ID
    genReqId: (req: IncomingMessage): ReqId => (<Request>req).header('X-Request-Id') || nanoid(),

    // 如果环境变量NODE_ENV的值为'production'，则使用空对象，否则设置日志级别为'debug'
    // 并使用'pino-pretty'进行美化，设置同步输出，以及单行输出
    // 详情参考：https://github.com/pinojs/pino-pretty
    ...(process.env.NODE_ENV === 'production'
      ? {}
      : {
        level: 'debug',
        transport: {
          target: 'pino-pretty',
          options: { sync: true, singleLine: true },
        },
      }),

    // 设置自动记录日志，如果请求的路径在passUrl中，则忽略这个请求的日志
    autoLogging: {
      ignore: (req: IncomingMessage) => passUrl.has((<Request>req).originalUrl),
    },
  }, multistream([
    // 设置不同级别的日志输出到不同的流中
    // 详情参考：https://getpino.io/#/docs/help?id=log-to-different-streams
    { level: 'debug', stream: process.stdout },
    { level: 'error', stream: process.stderr },
    { level: 'fatal', stream: process.stderr },
  ], { dedupe: true })],
};
