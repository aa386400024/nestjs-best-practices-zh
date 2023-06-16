// 文件作用：定义了用于用户认证的服务，包括验证用户、验证刷新令牌和生成 JWT 的功能
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import type { JwtPayload, JwtSign, Payload } from './auth.interface';
import { User, UserService } from '../shared/user';

@Injectable()
export class AuthService {
  // 使用依赖注入，注入 JwtService, UserService 和 ConfigService
  constructor(
    private jwt: JwtService,
    private user: UserService,
    private config: ConfigService,
  ) {}

  // 验证用户凭证，成功则返回用户，否则返回 null
  public async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.user.fetch(username); // 通过 username 获取用户

    if (user.password === password) { // 检查密码是否匹配
      const { password: pass, ...result } = user; // 去除 password 属性
      return result;
    }

    return null;
  }

  // 验证刷新令牌是否有效，如果有效且令牌中的用户 ID 匹配，则返回 true
  public validateRefreshToken(data: Payload, refreshToken: string): boolean {
    // 使用 jwt.verify 验证刷新令牌是否有效
    if (!this.jwt.verify(refreshToken, { secret: this.config.get('jwtRefreshSecret') })) {
      return false;
    }

    const payload = <{ sub: string }> this.jwt.decode(refreshToken); // 解码令牌获取载荷
    return (payload.sub === data.userId); // 检查令牌中的用户 ID 是否匹配
  }

  // 为给定的用户数据生成访问令牌和刷新令牌
  public jwtSign(data: Payload): JwtSign {
    const payload: JwtPayload = { sub: data.userId, username: data.username, roles: data.roles }; // 创建 JWT 载荷

    return {
      access_token: this.jwt.sign(payload), // 使用 JwtService 生成访问令牌
      refresh_token: this.getRefreshToken(payload.sub), // 获取刷新令牌
    };
  }

  // 生成刷新令牌
  private getRefreshToken(sub: string): string {
    return this.jwt.sign({ sub }, { // 使用 JwtService 生成刷新令牌
      secret: this.config.get('jwtRefreshSecret'), // 使用刷新令牌的密钥
      expiresIn: '7d', // 设置刷新令牌的过期时间为 7 天
    });
  }
}
