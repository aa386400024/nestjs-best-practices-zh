/**
 * HealthController类定义了一个控制器，用于处理与应用程序健康检查相关的HTTP请求。
 * 提供了一个/health的路由，这个路由返回应用程序的健康状况，包括DNS和数据库的状态。
 */

// 导入必需的模块和库
import { Controller, Get } from '@nestjs/common'; // Nest.js的内置装饰器和函数
import { HealthCheck, HealthCheckResult, HealthCheckService, // 导入Nest.js Terminus模块相关的类型和服务
  HealthIndicatorResult, HttpHealthIndicator, TypeOrmHealthIndicator } from '@nestjs/terminus';

import { Public } from '../../common'; // 导入一个装饰器，用于标记路由为公开路由

// 使用@Controller装饰器标记HealthController类作为控制器
@Controller()
export class HealthController {
  // 使用HealthCheckService、HttpHealthIndicator和TypeOrmHealthIndicator作为依赖注入到构造函数
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private db: TypeOrmHealthIndicator,
  ) {}

  // 定义处理GET请求的/health路由的方法，返回应用程序的健康状况
  @Public()
  @Get('health')
  @HealthCheck()
  public async check(): Promise<HealthCheckResult> {
    return this.health.check([
      async (): Promise<HealthIndicatorResult> => this.http.pingCheck('dns', 'https://1.1.1.1'), // 检查DNS的健康状况
      async (): Promise<HealthIndicatorResult> => this.db.pingCheck('database'), // 检查数据库的健康状况
    ]);
  }
}
