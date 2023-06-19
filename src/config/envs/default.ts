/**
 * 这个文件定义了一组应用程序的默认配置。这些配置可以通过环境变量进行重写。
 * 配置包括数据库、GraphQL等多个部分的配置信息。此外，这个文件也包含了一些应用程序的其他配置，如jwtSecret和jwtRefreshSecret等。
 */

export const config = {
  db: {
    // 实体路径，通常指向包含typeorm实体的目录，当前被注释掉了
    // entities: [`${__dirname}/../../entity/**/*.{js,ts}`],
    
    // 订阅者路径，通常指向包含typeorm订阅者的目录，当前被注释掉了
    // subscribers: [`${__dirname}/../../subscriber/**/*.{js,ts}`],
    
    // 迁移路径，通常指向包含typeorm数据迁移脚本的目录，当前被注释掉了
    // migrations: [`${__dirname}/../../migration/**/*.{js,ts}`],
  },
  graphql: {
    // 是否开启graphql的调试模式
    debug: true,

    // 设置graphql playground的配置
    playground: {
      settings: {
        'request.credentials': 'include', // 请求中包含credentials
      },
    },

    // 是否自动生成schema文件
    autoSchemaFile: true,

    // 是否自动转化HTTP错误
    autoTransformHttpErrors: true,

    // 设置cors，当前被注释掉了
    // cors: { credentials: true },
    
    // 是否对schema进行排序，当前被注释掉了
    // sortSchema: true,

    // 是否安装订阅处理器，当前被注释掉了
    // installSubscriptionHandlers: true,
  },

  // 示例配置项hello，其值为'world'
  hello: 'world',

  // jwt secret，从环境变量中获取
  jwtSecret: process.env.JWT_SECRET,

  // jwt刷新secret，从环境变量中获取
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
};
