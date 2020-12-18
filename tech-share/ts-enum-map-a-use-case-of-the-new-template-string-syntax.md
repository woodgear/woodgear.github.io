---
id: a20e76
time: '2020-12-02T09:18:27+08:00'
---
template string的语法出来有段时间了,虽然字符串编程确实蛮有趣,但一直没有找到更接地气的使用场景,今天正好碰到了一个,以此与大家分享.
## 需求介绍
需求大概是这样的,不同的测试模式有不同的匹配规则,很明显测测试模式是一个枚举,问题是怎么把他和匹配规则联系起来。

在有些时候我们需要枚举来区分出一些模式,同时每个模式都有自己的值.也就是说在使用的时候我们希望首先获取到这个枚举的值,然后通过枚举的值在获取的具体的属性的值.
## 实现1
一个可能的方式是使用`string enum`直接作为map来使用
```ts
enum TestMode {
    AllTest="*spec.ts";
    UnitTest="*.spec.ts";
    IntegrationTest="*.integration-test.spec.ts"
}
```
这样的一个问题是TestMode这个枚举所表达出的概念是枚举,简单的讲就是用来区分不同的TestMode,他的值确是具体的测试模式的pattern,这是一件比较奇怪的事情
## 实现2
```ts
enum TestMode {
  AllTest = "All",
  UnitTest = "Unit",
  IntegrationTest = "Integration",
}

const TestModePatternMap = {
  All: "axxx",
  Unit: "uxxxx",
  Integration: "ixxxxx",
};
const allTestPattern = TestModePatternMap[TestMode.AllTest];
console.log(allTestPattern)
```
这样的一个问题是TestModePatternMap的类型是什么?就现在来讲的话他是`{[_:string]:string}`,当这并不是我们所期望的,TestModePatternMap的key不应当超出TestMode的取值。
## 实现3
```ts
type TestMode = "Unit" | "Integration" | "All"

const TestModePatternMap:{[k in TestMode]:string} = {
  All: "axxx",
  Unit: "uxxxx",
  Integration: "ixxxxx",
};
```
通过`union string`和对TestModePatternMap的类型加以限制我们便能够得尝所愿了