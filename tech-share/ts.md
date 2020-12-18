---
id: '524e37'
time: '2020-10-20T16:07:43+08:00'
---
此处收集一些TS的豆知识
### 构造器带修饰符自动赋值
https://kendaleiv.com/typescript-constructor-assignment-public-and-private-keywords/

```typescript
class TestClass {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }
}
```
```typescript
class TestClass {
  constructor(private name: string) { }
}
```
这两段代码是等价的