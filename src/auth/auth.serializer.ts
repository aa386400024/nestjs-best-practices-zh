import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import type { Payload } from './auth.interface'; // 引入Payload类型，可能在这里表示JWT的载荷部分

@Injectable() // @Injectable()装饰器标注该类可以被注入到其他类中
export class AuthSerializer extends PassportSerializer {
  public serializeUser(
    user: Payload,
    done: (err: Error | null, data?: Payload) => void
  ): void {
    // 序列化用户实例到会话中，这里简单地把用户数据作为回调的第二个参数传递
    // 实际情况下，你可能只会序列化用户ID或其他唯一标识
    done(null, user);
  }

  public deserializeUser(
    data: Payload,
    done: (err: Error | null, user?: Payload) => void
  ): void {
    try {
      // 反序列化从会话中取得的数据到一个用户实例，这通常涉及到在数据库中通过ID查找用户
      // 这里的代码并未执行任何操作，只是把数据直接传给回调函数
      // const user = await fetchMore(); // 这里注释掉的代码可能是一个示例，说明你可以在这里从数据库获取更多的用户数据
      done(null, data);
    } catch (err) {
      // 如果在反序列化过程中遇到错误，应该传递错误给回调函数
      done(<Error>err);
    }
  }
}
