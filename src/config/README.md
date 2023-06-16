# 配置

<https://trilon.io/blog/announcing-nestjs-8-whats-new#Template-literal-types-and-ConfigService>
> 借助 TypeScript v4.2 中引入的模板字面类型，我们现在能够实现一种新的推断功能，使我们能够推断出嵌套自定义配置对象属性的类型，即使使用了点表示法。

由于 `infer` 选项是非默认选项，需要在每次使用时添加，我们通过在 Nest 中扩展 ConfigService 将其实现为默认选项。

请参考 `CommonModule` 中的 [ConfigService](../common/providers/config.service.ts)

## 使用示例

请参考 `SampleController` 中的 [sample](../sample/controllers/sample.controller.ts#L28-L31) 方法

![example](https://user-images.githubusercontent.com/1300172/127599201-8491e7bb-76f3-4dbc-9a62-97b6832bb882.png)