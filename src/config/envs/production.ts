/**
 * 这个文件定义了在生产环境中使用的一组应用程序配置。
 * 这些配置包括数据库的主从复制配置信息，以及开启/关闭GraphQL的调试和游乐场模式。
 * 另外，这个文件也包含了一些特定于生产环境的其他配置，如foo的值为'pro-bar'。
 */

export const config = {
  db: {
    // 数据库类型，默认为mysql
    type: process.env.DB_TYPE || 'mysql',

    // 是否同步数据库，默认不同步
    synchronize: false,

    // 是否开启数据库操作的日志，在生产环境默认关闭
    logging: false,

    // 数据库复制配置，包括一个主数据库和多个从数据库
    replication: {
      master: {
        // 主数据库主机地址，默认为'masterHost'
        host: process.env.DB_HOST || 'masterHost',

        // 主数据库端口，默认为3306
        port: process.env.DB_PORT || 3306,

        // 主数据库用户名，默认为'username'
        username: process.env.DB_USER || 'username',

        // 主数据库密码，默认为'password'
        password: process.env.DB_PASSWORD || 'password',

        // 主数据库名，默认为'dbname'
        database: process.env.DB_NAME || 'dbname',
      },

      // 从数据库配置，需要根据实际情况进行调整
      slaves: [{
        host: 'slaveHost',
        port: 3306,
        username: 'username',
        password: 'password',
        database: 'dbname',
      }],
    },

    // 额外的数据库配置，例如连接池的限制
    extra: {
      connectionLimit: 30, // 连接池限制为30
    },

    // 是否自动加载实体，默认自动加载
    autoLoadEntities: true,
  },
  
  // GraphQL配置
  graphql: {
    // 在生产环境下关闭debug模式
    debug: false,

    // 在生产环境下关闭playground模式
    playground: false,
  },
  
  // 示例配置项foo，其值为'pro-bar'，表示这是在生产环境下的配置
  foo: 'pro-bar',
};
