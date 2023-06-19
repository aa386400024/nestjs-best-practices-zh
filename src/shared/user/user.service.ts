/**
 * 此文件定义了一个名为UserService的服务。
 * UserService提供一个异步的fetch方法，该方法根据用户名返回一个包含用户详细信息的对象。
 * 在实际的项目中，此方法可能会从数据库或其他数据源获取用户信息。
 */

import { Injectable } from '@nestjs/common';

import type { User } from './user.interface';

@Injectable() // Injectable装饰器，表示此类可以被NestJS IoC容器实例化并管理
export class UserService {
  // fetch方法接收一个用户名作为参数，返回一个包含用户详细信息的Promise对象
  public async fetch(username: string): Promise<User & { password: string }> {
    // 目前，这个方法直接返回一个硬编码的对象，真实项目中，此处应从数据库或其他数据源获取用户信息
    return Promise.resolve({
      id: 'test',
      password: 'crypto',
      name: username,
      email: `${username}@test.com`,
      roles: ['test'], // ['admin', 'etc', ...]
    });
  }
}
