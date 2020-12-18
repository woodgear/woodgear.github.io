---
id: "39szixm"
time: "2020-01-13T09:56:23+08:00"
---

# function declare

```ts
function add(x: number, y: number): number {
  return x + y;
}
```

# class

```ts
class A {
  // instance variable
  public name;
  // construct/new etc
  public constructor(name) {
    this.name = name;
  }
}
```

# enum
## l-enum-string
```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```
从枚举值中获取其字符串表示
[typescript-enums-to-string](http://geekswithblogs.net/PhubarBaz/archive/2013/11/25/typescript-enums-to-string.aspx)

```ts
enum Numbers {
  zero,
  one,
  two,
  three,
  four,
}
var myNumber = Numbers.two;
var twoAsString = Numbers[myNumber]; // twoAsString == "two"
```

[ts-playground](https://www.typescriptlang.org/play?#code/KYOwrgtgBAcpBGwBOBnKBvKAvZB7ANFLiMIQC4DuBUZAFksKVAGa5hJQC+AUAG4CGHCAE84ERBwC8sBMhQA6SrgDcfQTSoBBFAGUySAJYgA5lGliJKANoiLyALrKoAemcbc2vYZNnpAIiU-bgBjYhRcABtgeQjcYwAKJU99I2MASiA)

# l-interface

https://www.tslang.cn/docs/handbook/generics.html

```ts
function identity<T>(arg: T): T {
  return arg;
}

interface GenericIdentityFn {
  <T>(arg: T): T;
}

let myIdentity: GenericIdentityFn = identity;

interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

# l-var-define-array

```
let a :Array<number>  = [1,2,3]
```

https://www.typescriptlang.org/docs/handbook/basic-types.html

# l-array-index

```ts
array.slice( begin [,end] );
array.slice(-2);//获取倒数两个元素
```

### l-construct-map-from-array
```ts

```

https://www.tutorialspoint.com/typescript/typescript_array_slice.htm

# l-type-define

## map index-signature

```ts
{ [index:string] : {message: string} }
```

## lambda

```ts
export interface IParam {
  title: string;
  callback: (arg1: number, arg2: number) => number;
}
```

# l-function

## l-function-default-argument

```ts
function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}
```

## l-type-option-argument

```ts
function buildName(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}
```

## l-language-formal-define

Ts 看起来并没有实时维护的语法定义

## l-concept-option-method

通过 merge interface 实现
https://stackoverflow.com/questions/44153378/typescript-abstract-optional-method/44154690

## l-constructor-assignment

即通过构造器给类的属性赋值的能力

```ts
class TestClass {
  constructor(name: string, private address: string, public city) {}

  testMethod() {
    console.log(this.name); // Compiler error: Property 'name' does not exist on type 'TestClass'.
    console.log(this.address);
    console.log(this.city);
  }
}

const testClass = new TestClass("Jane Doe", "123 Main St.", "Cityville");

testClass.testMethod();

console.log(testClass.name); // Compiler error: Property 'name' does not exist on type 'TestClass'.
console.log(testClass.address); // Compiler error: 'address' is private and only accessible within class 'TestClass'.
console.log(testClass.city);
```

# l-type-cast

已某种方式我们能够手动的指定类型

```ts
<number>1.0;
```

### l-type-guard

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

# l-export

export 本质是暴露不同的命名空间,模块系统的一部分

```ts
// a.ts start
const a = 10;
export { a };
export default a; // default export
// a.ts end
// b.ts start
import * as allA from "a.ts"; // allA.a = 10
import { a } from "a.ts"; // a=10
import v from "a.ts"; // v=10  For default exports the name does not matter. When importing the client code can specify whatever name they want for the import
// b.ts end
```

## l-import-and-export-rename


## l-cycle-dependency
```bash
sudo npm install -g dpdm
dpdm
```