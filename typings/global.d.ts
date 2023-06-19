/**
 * 这个文件是一个全局类型声明文件，它主要用于扩展一些全局的 TypeScript 类型，
 * 这样可以在你的应用程序中任何地方使用这些类型。这里的类型声明主要扩展了 NodeJS 和 Express 命名空间，并定义了一个全局的 AnyObject 类型。
 * 1. 在 NodeJS 命名空间下的 ProcessEnv 接口声明了一些环境变量的类型，这些环境变量包括 Node 运行环境、端口号、数据库配置和 JWT 配置等等。
 * 2. 在 Express 命名空间下的 Request 接口增加了一个 id 属性，这样你就可以在 Express 的请求对象中直接使用 request.id。
 * 3. 同样在 Express 命名空间下，User 接口被扩展为包括 Payload 类型，这样就可以在 Express 的用户对象中直接使用 Payload 类型的属性。
 */
import { Payload } from '../src/auth';

export declare global {
  // 定义一个全局的 AnyObject 类型，是一个键为字符串、值为任何类型的对象。
  type AnyObject = Record<string, unknown>;

  namespace NodeJS {
    interface ProcessEnv {
      // 声明环境变量类型
      NODE_ENV: string;
      PORT: string;
      DB_TYPE: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      JWT_SECRET: string;
      JWT_REFRESH_SECRET: string;
    }
  }

  namespace Express {
    interface Request {
      // 为 Express 请求对象添加一个 id 属性
      id: string;
    }
    // 扩展 Express 的 User 接口，使其包含从 '../src/auth' 导入的 Payload 类型
    interface User extends Payload {}
  }
}
