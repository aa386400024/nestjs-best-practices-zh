# nestjs项目结构

Node.js框架NestJS项目结构
> 起始于此问题: [nestjs/nest#2249](https://github.com/nestjs/nest/issues/2249#issuecomment-494734673)

## 配置

1. 创建一个`.env`文件
    - 重命名[.env.sample](.env.sample)文件为`.env`进行修复。
2. 编辑环境配置
    - 编辑[config](src/config)文件夹中的文件。
    - `default`, `development`, `production`, `test`

## 安装

```sh
# 1. node_modules
npm ci
# 1-1. 如果npm版本小于7或Node.js版本小于等于14
npm i
# 2. 当需要从现有的实体同步数据库
npm run entity:sync
# 2-1. 当需要从现有的数据库中导入实体
npm run entity:load
```

如果在`entity:load`中使用多个数据库，[请修改它们](bin/entity.ts#L45)。

## 开发

```sh
npm run start:dev
# https://docs.nestjs.com/recipes/repl
npm run start:repl
```

运行 [http://localhost:3000](http://localhost:3000)

## 测试

```sh
npm test # 排除端到端测试
npm run test:e2e
```

## 生产环境

```sh
npm run lint
npm run build
# 定义环境变量
# NODE_ENV=production PORT=8000 NO_COLOR=true node dist/app
node dist/app
# 或者
npm start
```

## 文件夹结构

```js
│  .env                          // 环境配置文件
│  .eslintrc                     // ESLint配置文件
│  .gitattributes                // Git属性文件
│  .gitignore                    // Git忽略文件
│  .npmrc                        // npm配置文件
│  .nvmrc                        // Node版本管理配置文件
│  .prettierrc                   // Prettier配置文件
│  folder.txt                    // 文件夹示例文本
│  jest.config.ts                // Jest配置文件
│  LICENSE                       // 许可证文件
│  nest-cli.json                 // Nest CLI配置文件
│  package-lock.json             // npm包锁定文件
│  package.json                  // 项目配置文件
│  README.md                     // 项目说明文件
│  tsconfig.build.json           // TypeScript构建配置文件
│  tsconfig.json                 // TypeScript配置文件
│  
├─bin                            // 自定义任务目录
│      entity.ts                 // 实体文件示例
│      NamingStrategy.js         // 命名策略文件示例
│      ormconfig.ts              // TypeORM配置文件
│                
├─public                         // 静态文件目录
│      index.html                // HTML文件示例
│      
├─src                            // 源代码目录
│  │  app.middleware.ts          // 应用中间件示例
│  │  app.module.ts              // 应用模块文件
│  │  app.ts                     // 应用主文件
│  │  repl.ts                    // REPL文件
│  │  swagger.ts                 // Swagger配置文件
│  │  
│  ├─auth                        // 认证模块目录
│  │  │  auth.interface.ts       // 认证接口文件
│  │  │  auth.module.ts          // 认证模块文件
│  │  │  auth.serializer.ts      // 认证序列化器文件
│  │  │  auth.service.ts         // 认证服务文件
│  │  │  index.ts                // 认证模块索引文件
│  │  │  
│  │  ├─guards                          // 认证守卫目录
│  │  │      authenticated.guard.ts       // 身份验证守卫示例
│  │  │      index.ts                     // 守卫模块索引文件
│  │  │      jwt-auth.guard.ts            // JWT身份验证守卫示例
│  │  │      jwt-verify.guard.ts          // JWT验证守卫示例
│  │  │      local-auth.guard.ts          // 本地身份验证守卫示例
│  │  │      local-login.guard.ts         // 本地登录守卫示例
│  │  │      
│  │  └─strategies               // 认证策略目录
│  │          index.ts           // 认证策略模块索引文件
│  │          jwt-verify.strategy.ts    // JWT验证策略示例
│  │          jwt.strategy.ts           // JWT策略示例
│  │          local.strategy.ts         // 本地策略示例
│  │          
│  ├─base                        // 基础模块目录
│  │  │  base.module.ts          // 基础模块文件
│  │  │  index.ts                // 基础模块索引文件
│  │  │  
│  │  └─controllers              // 基础控制器目录
│  │          auth.controller.ts         // 基础认证控制器示例
│  │          health.controller.ts       // 基础健康检查控制器示例
│  │          index.ts                   // 基础控制器模块索引文件
│  │          
│  ├─common                      // 公共模块目录
│  │  │  common.module.ts        // 公共模块文件
│  │  │  index.ts                // 公共模块索引文件
│  │  │  
│  │  ├─decorators               // 装饰器目录
│  │  │      index.ts                 // 装饰器模块索引文件
│  │  │      public.decorator.ts      // 公共装饰器示例
│  │  │      req-user.decorator.ts    // 请求用户装饰器示例
│  │  │      roles.decorator.ts       // 角色装饰器示例
│  │  │      
│  │  ├─filters                  // 过滤器目录
│  │  │      exceptions.filter.ts     // 异常过滤器示例
│  │  │      index.ts                 // 过滤器模块索引文件
│  │  │      
│  │  ├─guards                   // 守卫目录
│  │  │      index.ts                // 守卫模块索引文件
│  │  │      roles.guard.ts          // 角色守卫示例
│  │  │      
│  │  ├─middleware               // 中间件目录
│  │  │      index.ts                        // 中间件模块索引文件
│  │  │      logger-context.middleware.ts    // 日志上下文中间件示例
│  │  │      
│  │  └─providers                // 提供者目录
│  │          config.service.ts              // 配置服务示例
│  │          index.ts                       // 提供者模块索引文件
│  │          util.service.ts                // 工具服务示例
│  │          
│  ├─config                      // 配置目录
│  │  │  config.interface.ts            // 配置接口文件
│  │  │  configuration.ts               // 配置文件
│  │  │  index.ts                       // 配置模块索引文件
│  │  │  logger.config.ts               // 日志配置文件
│  │  │  README.md                      // 配置说明文件
│  │  │  
│  │  └─envs                      // 环境配置目录
│  │          default.ts                // 默认环境配置示例
│  │          development.ts            // 开发环境配置示例
│  │          production.ts             // 生产环境配置示例
│  │          test.ts                   // 测试环境配置示例
│  │          
│  ├─debug                        // 调试目录
│  │  │  debug-log.decorator.ts         // 调试日志装饰器示例
│  │  │  debug.constant.ts              // 调试常量文件
│  │  │  debug.decorator.ts             // 调试装饰器示例
│  │  │  debug.explorer.ts              // 调试资源管理器示例
│  │  │  debug.interface.ts             // 调试接口文件
│  │  │  debug.module-definition.ts     // 调试模块定义文件
│  │  │  debug.module.ts                // 调试模块文件
│  │  │  index.ts                       // 调试模块索引文件
│  │  │  README.md                      // 调试模块说明文件
│  │  │  
│  │  └─sample                                 // 示例目录
│  │          index.ts                             // 示例模块索引文件
│  │          log-controller.decorator.ts          // 日志控制器装饰器示例
│  │          sample.controller.ts                 // 示例控制器示例
│  │          sample.module.ts                     // 示例模块文件
│  │          sample.service.ts                    // 示例服务示例
│  │          simple-log.controller.ts             // 简单日志控制器示例
│  │          
│  ├─entity                                    // 实体目录
│  │  ├─sampledb1                                  // 示例数据库1目录
│  │  │      index.ts                              // 示例数据库1模块索引文件
│  │  │      sampletable1.entity.ts                // 示例表1实体示例
│  │  │      
│  │  └─sampledb2                              // 示例数据库2目录
│  │          index.ts                             // 示例数据库2模块索引文件
│  │          sampletable2.entity.ts               // 示例表2实体示例
│  │          
│  ├─gql                                       // GraphQL目录
│  │  │  gql.module.ts                              // GraphQL模块文件
│  │  │  index.ts                                   // GraphQL模块索引文件
│  │  │  
│  │  ├─dto                                         // GraphQL DTO目录
│  │  │      index.ts                                   // DTO模块索引文件
│  │  │      simple.args.ts                             // 简单参数示例
│  │  │      simple.input.ts                            // 简单输入示例
│  │  │      
│  │  ├─models                                      // GraphQL模型目录
│  │  │      index.ts                                   // 模型模块索引文件
│  │  │      payload.model.ts                           // 载荷模型示例
│  │  │      simple.model.ts                            // 简单模型示例
│  │  │      user.model.ts                              // 用户模型示例
│  │  │      
│  │  ├─providers                                   // GraphQL提供者目录
│  │  │      index.ts                                   // 提供者模块索引文件
│  │  │      simple.service.ts                          // 简单服务示例
│  │  │      
│  │  ├─resolvers                                   // GraphQL解析器目录
│  │  │      index.ts                                   // 解析器模块索引文件
│  │  │      simple.resolver.ts                         // 简单解析器示例
│  │  │      
│  │  └─scalars                                     // GraphQL标量目录
│  │          date.scalar.ts                            // 日期标量示例
│  │          index.ts                                  // 标量模块索引文件
│  │          
│  ├─sample                                    // 示例目录
│  │  │  index.ts                                   // 示例模块索引文件
│  │  │  sample.module.ts                           // 示例模块文件
│  │  │  
│  │  ├─controllers                                 // 示例控制器目录
│  │  │      crud.controller.spec.ts                    // CRUD控制器测试示例
│  │  │      crud.controller.ts                         // CRUD控制器示例
│  │  │      index.ts                                   // 控制器模块索引文件
│  │  │      sample.controller.ts                       // 示例控制器示例
│  │  │      
│  │  ├─dto                                         // 示例DTO目录
│  │  │      create.dto.ts                              // 创建DTO示例
│  │  │      index.ts                                   // DTO模块索引文件
│  │  │      sample.dto.ts                              // 示例DTO示例
│  │  │      update.dto.ts                              // 更新DTO示例
│  │  │      
│  │  └─providers                                   // 示例提供者目录
│  │          crud.service.spec.ts                      // CRUD服务测试示例
│  │          crud.service.ts                           // CRUD服务示例
│  │          database.service.ts                       // 数据库服务示例
│  │          date.service.ts                           // 日期服务示例
│  │          index.ts                                  // 提供者模块索引文件
│  │          
│  └─shared                                    // 共享模块目录
│      │  README.md                                 // 共享模块说明文件
│      │  
│      ├─foobar                                     // Foobar目录
│      │      foobar.module.ts                          // Foobar模块文件
│      │      foobar.service.ts                         // Foobar服务示例
│      │      index.ts                                  // Foobar模块索引文件
│      │      
│      └─user                                       // 用户目录
│              index.ts                                 // 用户模块索引文件
│              user.interface.ts                        // 用户接口文件
│              user.module.ts                           // 用户模块文件
│              user.service.ts                          // 用户服务示例
│              
├─test                                         // 测试目录
│  │  .eslintrc                                     // ESLint配置文件
│  │  jest.e2e.transformer.ts                       // Jest E2E转换器示例
│  │  jest.e2e.ts                                   // Jest E2E测试文件
│  │  test.spec.ts                                  // 测试文件示例
│  │  tsconfig.e2e.json                             // E2E测试的TypeScript配置文件
│  │  
│  └─e2e                                            // E2E测试目录
│          crud.spec.ts                                 // CRUD测试示例
│          gql.spec.ts                                  // GraphQL测试示例
│          jwt-auth.spec.ts                             // JWT认证测试示例
│          local-auth.spec.ts                           // 本地认证测试示例
│          
└─typings                                      // 模块和全局类型定义目录
        global.d.ts                                 // 全局类型定义文件

// 模块结构
// 根据模块规模添加

文件夹。如果规模较小，不需要添加文件夹。
+-- src/greeter
|   +-- * // 文件夹
|   +-- greeter.constant.ts
|   +-- greeter.controller.ts
|   +-- greeter.service.ts
|   +-- greeter.module.ts
|   +-- greeter.*.ts
|   +-- index.ts
```

## 实现

- 参见 [bootstrap](src/app.ts), [app.module](src/app.module.ts)
  - 数据库，模块路由，静态文件，验证，Pino日志器
- [全局异常过滤器](src/common/filters/exceptions.filter.ts)
- [全局日志上下文中间件](src/common/middleware/logger-context.middleware.ts)
- 使用nestjs-pino的[自定义日志器](src/config/logger.config.ts)
- Nest级别的[自定义装饰器](src/debug)示例
- [配置](src/config)
- [认证](src/auth) - 使用Passport进行JWT和会话登录
- [基于角色的守卫](src/common/guards/roles.guard.ts)
- 控制器路由
  - [身份验证登录](src/base/controllers/auth.controller.ts)
  - [样例](src/sample/controllers/sample.controller.ts)参数和[DTO](src/sample/dto/sample.dto.ts)
  - [CRUD API](src/sample/controllers/crud.controller.ts)示例
- [数据库查询](src/sample/providers/database.service.ts)示例
- [单元测试](src/sample/providers/crud.service.spec.ts)
- [端到端测试](test/e2e)
- [共享模块](src/shared)示例
- [GraphQL结构](src/gql)示例

## 文档

```sh
# APP, Compodoc
npm run doc #> http://localhost:8080
# API, Swagger - src/swagger.ts
npm run doc:api #> http://localhost:8000/api
```

### 类文件命名

```ts
export class PascalCaseSuffix {} //= pascal-case.suffix.ts
// 除后缀外，PascalCase转为hyphen-case
class FooBarNaming {} //= foo-bar.naming.ts
class FooController {} //= foo.controller.ts
class BarQueryDto {} //= bar-query.dto.ts
```

### 接口命名

```ts
// https://stackoverflow.com/questions/541912
// https://stackoverflow.com/questions/2814805
interface User {}
interface CustomeUser extends User {}
interface ThirdCustomeUser extends CustomeUser {}
```

### 索引导出

```diff
# 建议在每个文件夹中放置index.ts并进行导出。
# 除非特殊情况，否则从文件夹而非直接从文件中导入。
- import { FooController } from './controllers/foo.controller';
- import { BarController } from './controllers/bar.controller';
+ import { FooController, BarController } from './controllers';
# 我的偏好方法是在路径末尾只放置一个文件或文件夹名。
- import { UtilService } from '../common/providers/util.service';
+ import { UtilService } from '../common';
```

#### 循环依赖

<https://docs.nestjs.com/fundamentals/circular-dependency>

```diff
# 不要使用以点结尾的路径。


- import { FooService } from '.';
- import { BarService } from '..';
+ import { FooService } from './foo.service';
+ import { BarService } from '../providers';
```

### 变量命名

> 参照 [命名速查表](https://github.com/kettanaito/naming-cheatsheet)

### 链接

- [更好的Nodejs项目](https://github.com/CatsMiaow/better-nodejs-project)
- [使用npm工作区的单体仓库](https://github.com/CatsMiaow/node-monorepo-workspaces)
- [NestJS](https://docs.nestjs.com)
  - [Nest样例](https://github.com/nestjs/nest/tree/master/sample)
  - [Awesome Nest](https://github.com/nestjs/awesome-nestjs)
- [TypeORM](https://typeorm.io)