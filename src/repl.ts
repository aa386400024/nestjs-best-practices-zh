/**
 * 这个文件使用了NestJS的REPL (Read–Eval–Print Loop) 工具。
 * 通过repl()函数，可以在命令行中交互地运行NestJS代码。
 * REPL工具通常用于在开发过程中进行快速的实验和调试。
 * 这个文件的主要目标是在REPL环境中启动NestJS应用，
 * 所以它的行为可能会与通常的NestJS应用启动过程略有不同。
 * 例如，这个文件并没有在应用启动后设置任何网络监听，因为REPL环境通常用于本地的、交互式的代码运行和调试，而不是作为一个网络服务运行。
 */

import { Logger as NestLogger } from '@nestjs/common';
import { repl } from '@nestjs/core';

import { AppModule } from './app.module';

// 异步函数，用于启动NestJS的REPL环境
async function bootstrap(): Promise<void> {
  await repl(AppModule);
}

// 自执行的异步函数，用于启动并记录应用的URL
(async (): Promise<void> => {
  try {
    const url = await bootstrap();
    // 启动成功后，打印应用的URL
    NestLogger.log(url, 'Bootstrap');
  } catch (error) {
    // 启动失败时，打印错误信息
    NestLogger.error(error, 'Bootstrap');
  }
})();
