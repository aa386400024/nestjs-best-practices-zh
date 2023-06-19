/**
 * 这个文件定义了在开发环境中使用的一组应用程序配置。这些配置包括数据库的各种配置信息。
 * 另外，这个文件也包含了一些特定于开发环境的其他配置，如foo的值为'dev-bar'。
 */

export const config = {
  db: {
    // 数据库类型，默认为mysql
    type: process.env.DB_TYPE || 'mysql',

    // 是否同步数据库，默认不同步
    synchronize: false,

    // 是否开启数据库操作的日志，默认开启
    logging: true,

    // 数据库主机地址，默认为本地地址'127.0.0.1'
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
      connectionLimit: 10, // 连接池限制为10
    },

    // 是否自动加载实体，默认自动加载
    autoLoadEntities: true,
  },
  
  // 示例配置项foo，其值为'dev-bar'，表示这是在开发环境下的配置
  foo: 'dev-bar',
};
