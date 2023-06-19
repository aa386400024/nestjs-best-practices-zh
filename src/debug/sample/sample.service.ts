/**
 * 此文件定义了一个NestJS服务，名为SampleService。
 * 在NestJS中，服务用于封装业务逻辑，一般会被注入到控制器中使用。
 * 该服务定义了一系列的方法，包括stepOne、stepTwo、stepThree、stepStart、stepChainOne、stepChainTwo、stepChainThree和stepChainFour。
 */

import { Injectable } from '@nestjs/common';

@Injectable() // 该装饰器标记此类为一个NestJS服务
export class SampleService {
  // 下面是一系列的方法，可以在其他地方（如控制器）中调用

  public stepOne(foo: string): string {
    return foo;
  }

  public stepTwo(bar: string): string {
    return bar;
  }

  public stepThree(): string {
    return 'step3';
  }

  // 下面是一系列的链式调用方法，stepStart方法会依次调用stepChainOne、stepChainTwo、stepChainThree和stepChainFour方法

  public stepStart(): string {
    return this.stepChainOne();
  }

  public stepChainOne(): string {
    return this.stepChainTwo();
  }

  public stepChainTwo(): string {
    return this.stepChainThree();
  }

  public stepChainThree(): string {
    return this.stepChainFour();
  }

  public stepChainFour(): string {
    return 'OK';
  }
}
