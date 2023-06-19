/**
 * 这个文件定义了在测试环境中使用的一组应用程序配置。
 * 这些配置包括数据库连接的配置信息，以及GraphQL游乐场模式的关闭。这个文件也包含了一些特定于测试环境的其他配置。
 */

// export * from './development';

export const config = {
  db: {
    // 数据库类型，固定为mysql
    type: 'mysql',

    // 是否同步数据库，固定为false
    synchronize: false,

    // 是否开启数据库操作的日志，在测试环境固定关闭
    logging: false,

    // 数据库主机地址，默认为'127.0.0.1'
    host: process.env.DB_HOST || '127.0.0.1',

    // 数据库端口，默认为3306
    port: process.env.DB_PORT || 3306,

    // 数据库用户名，默认为'username'
    username: process.env.DB_USER || 'username',

    // 数据库密码，默认为'password'
    password: process.env.DB_PASSWORD || 'password',

    // 数据库名，默认为'dbname'
    database: process.env.DB_NAME || 'dbname',

    // 额外的数据库配置，例如连接池的限制
    extra: {
      connectionLimit: 5, // 连接池限制为5
    },

    // 是否自动加载实体，固定为true
    autoLoadEntities: true,
  },
  
  // GraphQL配置
  graphql: {
    // 在测试环境下关闭playground模式
    playground: false,
  },
};
