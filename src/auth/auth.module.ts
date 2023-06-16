import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthSerializer } from './auth.serializer';
import { AuthService } from './auth.service';
import { LocalStrategy, JwtStrategy, JwtVerifyStrategy } from './strategies';
import { UserModule } from '../shared/user';

@Module({
  imports: [
    UserModule, // 导入User模块，这可能包含用户相关的服务，控制器和实体等
    JwtModule.registerAsync({ // 引入JwtModule，用于生成和验证JWTs（JSON Web Tokens）
      useFactory: (config: ConfigService) => ({ // 使用ConfigService从环境变量获取jwt的秘钥
        secret: config.get('jwtSecret'), // 获取JWT的秘钥
        signOptions: { expiresIn: '1d' }, // 设置JWT的过期时间为1天
      }),
      inject: [ConfigService], // 把ConfigService注入到这个模块，这样我们就可以使用ConfigService来获取环境变量了
    }),
  ],
  providers: [
    AuthService, // Auth服务提供了身份验证相关的功能，如登录和注册
    AuthSerializer, // AuthSerializer可能用于将用户对象序列化为可以发送到客户端的JSON
    LocalStrategy, // LocalStrategy用于处理用户名/密码的本地登录逻辑
    JwtStrategy, // JwtStrategy用于处理基于JWT的登录逻辑
    JwtVerifyStrategy, // JwtVerifyStrategy用于验证传入请求的JWT
  ],
  exports: [AuthService], // 导出AuthService，使其在其他模块中可用
})
export class AuthModule {} // 这是Auth模块，包含了所有的认证相关功能
