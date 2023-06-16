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
+-- bin // 自定义任务
+-- dist // 源代码构建
+-- public // 静态文件
+-- src
|   +-- config // 环境配置
|   +-- entity // TypeORM 实体
|   +-- auth // 认证
|   +-- common // 全局Nest模块
|   |   +-- constants // 常量和枚举
|   |   +-- controllers // Nest 控制器
|   |   +-- decorators // Nest 装饰器
|   |   +-- dto // DTO (数据传输对象) 模式，验证
|   |   +-- filters // Nest 过滤器
|   |   +-- guards // Nest 守卫
|   |   +-- interceptors // Nest 拦截器
|   |   +-- interfaces // TypeScript 接口
|   |   +-- middleware // Nest 中间件
|   |   +-- pipes // Nest 管道
|   |   +-- providers // Nest 提供者
|   |   +-- * // 模型，仓库，服务...
|   +-- shared // 共享的Nest模块
|   +-- gql // GraphQL结构
|   +-- * // 其他Nest模块，非全局，与上面的common结构相同
+-- test // Jest 测试
+-- typings // 模块和全局类型定义

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