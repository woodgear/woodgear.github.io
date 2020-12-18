---
id: 'd4b784'
time: '2020-08-27T14:57:07+08:00'
---
本文主旨在于记录一些在阅读[ts handbook](https://www.typescriptlang.org/docs/handbook)时所遇到的值得记录的东西.

# type 和interface
其最大的不同在于其语义的不同.对于type我们的语义是&或者|.

# interface
## Excess Property Checks
```ts
interface SquareConfig {
  color?: string;
  width?: number;
}
function a(config: SquareConfig):void {
}
```
当我们声明了一个`SquareConfig`的时候,函数`a`中实际上不能填`a({a:1,color:"xx"})`,即
>Object literals get special treatment and undergo excess property checking when assigning them to other variables, or passing them as arguments. If an object literal has any properties that the “target type” doesn’t have.
但如果不是`Object literals`的话就可以,即
```ts
class SClass implements SquareConfig {
    width:number
    colour:string
    constructor() {
        this.width=10
        this.colour="xx"
    }
}
a(new SClass())
```
[struct-type-and-excess-property-checks](https://medium.com/@lemoine.benoit/why-does-typescript-sometimes-fails-to-type-check-extra-properties-fd230ebbc295)
>The TypeScript team made the hypothesis that when you’re declaring explicitly an object of a specific type, you probably don’t want to have extra properties. From my personal experience, I would agree with that. So they added a specific check in the compiler for this case.

翻译翻译就是TS team的人对对象字面量这种做了特殊的检查,filed的集合必须包含于interface的filed的集合.本质上说是当我们定义一个约束时,作用的范围只是那些我们定义的field.

## static and instance sides of classes
[ts-constructor-new](https://stackoverflow.com/a/39363229/5642024)
还是不是很理解.这个例子举得很奇怪.总的来讲,构造函数是静态函数,当实现interface时,只会检查实例函数.`new`是一个很特殊的函数,和class声明中的constructor关联.对于静态类型的约束可以用另外一种方法
```ts
interface ClockConstructor {
  new(hour: number, minute: number):IClock;
}

interface IClock {
}

function c(clock:ClockConstructor):IClock {
   return new clock(1,2)
}

class Clock implements IClock {
    constructor(h: number, m: number) {

    }
}

c(Clock)
```
## Extending Interfaces
可以多继承,field可以重复(struct type),但类型必须相同.
## Hybrid Types
惨,兼容JS痛并快乐着.
## Interfaces Extending Classes
暂时没有想到用途,可以确保实现interface的类必须是某个类的子类?
[what-interface-extend-class-for](https://stackoverflow.com/questions/39124915/in-typescript-an-interface-can-extend-a-class-what-for)
# function
## Overloads
这里想描述的是确实的一对一的类型转换,而不是枚举类型.
# Literal Type
## Unions and Intersection Types
在switch语句中,TS好像魔法般的便意识到state是NetworkFailedState,前面几行TS还在编译报错,后面几行就可以识别到类型了,这是因为在TS中有叫做`type narrowing`的操作.  

[type-narrowing-in-typescript](https://medium.com/@jackhmwilliams/type-narrowing-in-typescript-44a6757c5a64)
> However, recall that dynamic checks and predicates are all about extracting information from values! Using the information extracted from dynamic predicates allows us to transition from a less precise type U, to a more precise type T — this is exactly what narrowing is about.

[discriminated-unions](https://basarat.gitbook.io/typescript/type-system/discriminated-unions)

>If you use a type guard style check (==, ===, !=, !==) or switch on the discriminant property (here kind) TypeScript will realize that the object must be of the type that has that specific literal and do a type narrowing for you :)  

`switch`在有`discriminant property`会自动的做类型的特化.
# Enum
[const-enums-in-typescript-1-4-and-how-they-differ](https://tusksoft.com/blog/march-2015/const-enums-in-typescript-1-4-and-how-they-differ)
>And this is where the const part comes in. The const enum type doesn't care about the string name of each element in the enumeration. As we've seen, the const enum doesn't even compile into an object- for the default behavior of the compiler it's purely a design/compile time construct.

>"For heavy uses of enums, it’s helpful to have an even more restricted form that we know is safe to always inline. This helps with performance, code size, and with working with cases where the enum aliases themselves may not be exported"
# Advance
## User-Defined Type Guards
给予我们手动做类型标注的能力

# What's New
## Optional Chaining
有点类似Rust的?,总之不用再用[ramda](https://ramdajs.com/docs/#path)了
## Nullish Coalescing
undefined和null真是坑苦了广大JS程序员.
