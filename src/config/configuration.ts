// 引入类型定义
import type { Config, Default, Objectype, Production } from './config.interface';

// 定义一个工具对象，提供一些工具函数
const util = {
  // 判断一个值是否为对象类型
  isObject<T>(value: T): value is T & Objectype {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  },

  // 深度合并两个对象
  merge<T extends Objectype, U extends Objectype>(target: T, source: U): T & U {
    // 遍历source对象的每一个属性
    for (const key of Object.keys(source)) {
      const targetValue = target[key];
      const sourceValue = source[key];

      // 如果target对象和source对象的当前属性都是对象，那么递归合并这两个属性
      if (this.isObject(targetValue) && this.isObject(sourceValue)) {
        Object.assign(sourceValue, this.merge(targetValue, sourceValue));
      }
    }

    // 使用ES6的扩展操作符将target对象和source对象合并
    return { ...target, ...source };
  },
};

export const configuration = async (): Promise<Config> => {
  // 导入默认配置
  const { config } = <{ config: Default }> await import(`${__dirname}/envs/default`);

  // 根据当前环境变量NODE_ENV导入相应的环境配置，如果没有设置NODE_ENV则默认导入开发环境的配置
  const { config: environment } = <{ config: Production }> await import(`${__dirname}/envs/${process.env.NODE_ENV || 'development'}`);

  // 使用深度合并的方式将默认配置和环境配置合并，得到最终的配置
  return util.merge(config, environment);
};
