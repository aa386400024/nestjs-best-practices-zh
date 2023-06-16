# 调试

`DebugModule` 注册了一个装饰器，用于在应用到 `@Debug` 装饰器的模块的所有 `controllers` 和 `providers` 的方法中输出日志以及执行时间。 \
通过使用一个装饰器，你可以在所有方法中留下执行日志，而不需要逐个方法添加日志。 \
它也可以仅应用于特定的类或方法。

## 使用方法

请参考 [sample](./sample) 文件夹中的示例。

### 模块

```ts
@Debug('ModuleContext')
@Module({
  imports: [DebugModule.forRoot()],
  controllers: [...],
  providers: [...],
})
export class AppModule {}
```

要在模块中排除特定的类

```ts
@Debug({ context: 'ModuleContext', exclude: [AppService] })
// 或者
DebugModule.forRoot({ exclude: ['SampleService'] })
```

### 类

当在类中使用时，你无需导入 `DebugModule` 和 `@Debug`。它作为一个独立的装饰器工作。 \
在类中注册 `@DebugLog` 将应用于类中的所有方法，因此不需要在方法中注册 `@DebugLog`。

```ts
@Controller()
@DebugLog('ClassContext')
export class AppController {
  @Get()
  @DebugLog('MethodContext')
  public method() {}
}
```

## 日志记录

请参考 [Logger](./debug-log.decorator.ts#L15-L21) 来编辑日志格式。

[step](./sample/sample.controller.ts#L16) 方法的日志输出示例 \
![step](https://user-images.githubusercontent.com/1300172/179880495-dea3c467-0088-40a9-b44a-150b4166a081.png)

[chain](./sample/sample.controller.ts#L24) 方法的日志输出示例 \
![chain](https://user-images.githubusercontent.com/1300172/179880502-a84157f9-38dc-45d6-a2c9-34e3be85f0a6.png)