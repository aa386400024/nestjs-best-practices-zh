/**
 * 此文件定义了一个名为middleware的函数，用于配置NestJS应用的中间件。
 * 它包含对应用程序的压缩、会话、Passport初始化、安全头配置等中间件的设置。
 * 这些中间件对于应用程序的安全性、性能优化、用户会话管理等方面起到关键作用。
 */

import type { INestApplication } from '@nestjs/common';
import compression from 'compression';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';

// 中间件函数，接受一个NestJS应用实例，对其应用一系列中间件配置，然后返回配置后的应用实例
export function middleware(app: INestApplication): INestApplication {
  // 判断当前是否为生产环境
  const isProduction = (process.env.NODE_ENV === 'production');

  // 应用compression中间件，进行gzip压缩
  app.use(compression());
  // 应用express-session中间件，进行会话管理
  app.use(session({
    // 在生产环境中，需要设置'store'来存储会话
    secret: 'tEsTeD',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: isProduction }, // 在生产环境中，cookie应设置为安全模式
  }));
  // 应用passport中间件，进行身份验证
  app.use(passport.initialize());
  app.use(passport.session());
  // 应用helmet中间件，设置各种HTTP安全头
  // 注意，在开发环境下可能需要禁用一些设置，以便正常使用GraphQL Playground等工具
  // https://github.com/graphql/graphql-playground/issues/1283#issuecomment-703631091
  // https://github.com/graphql/graphql-playground/issues/1283#issuecomment-1012913186
  app.use(helmet({
    contentSecurityPolicy: isProduction ? undefined : false,
    crossOriginEmbedderPolicy: isProduction ? undefined : false,
  }));
  // 在需要处理跨域请求时，可以启用CORS
  // app.enableCors();

  // 返回配置后的应用实例
  return app;
}
