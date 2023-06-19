/**
 * 这个文件创建了一个NestJS应用，然后使用NestJS的Swagger模块为这个应用生成了一个OpenAPI文档，
 * 该文档为API的使用者提供了一个自动化的、描述性的API文档。这个文件也设置了一个HTTP端口用于访问这个OpenAPI文档。
 * OpenAPI文档被设置为在'/api'路径上可访问。你可以通过访问'http://localhost:8000/api'来查看这个文档，前提是你的NestJS应用正在本地的8000端口上运行。
 */

import { Logger as NestLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

// 异步函数，用于创建一个带有OpenAPI文档的NestJS应用
async function bootstrap(): Promise<string> {
  // 创建NestJS应用
  const app = await NestFactory.create(AppModule);

  // 构建OpenAPI文档的配置选项
  const options = new DocumentBuilder()
    .setTitle('OpenAPI Documentation') // 设置文档的标题
    .setDescription('The sample API description') // 设置文档的描述
    .setVersion('1.0') // 设置文档的版本号
    .addBearerAuth() // 添加一个Bearer身份认证方式
    .build();

  // 使用配置选项创建OpenAPI文档
  const document = SwaggerModule.createDocument(app, options);

  // 将OpenAPI文档绑定到NestJS应用的/api路径上
  SwaggerModule.setup('api', app, document);

  // 启动NestJS应用，使其开始监听HTTP请求
  await app.listen(process.env.PORT || 8000);

  // 返回NestJS应用的URL
  return app.getUrl();
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
