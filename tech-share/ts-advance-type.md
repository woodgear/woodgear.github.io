---
id: '30085f'
time: '2020-09-08T17:57:36+08:00'
---

```ts
type Tail<T extends any[]> = ((...t:T)=>any) extends ((_:any,...tail: infer TT)=>any)?TT:T
type HasTail<T extends any[]> = ((...t:T)=>any) extends ((_:any,...tail: any)=>any)?true:false
type Head<T extends any[]> = T extends [any,...any[]]?T[0]:never



type Curry00<P extends any[],R> = (arg0:Head<P>)=> HasTail<P> extends true?Curry01<Tail<P>,R>:R


declare function curry00<P extends any[],R>(f:(...arg:P)=>R):Curry00<P,R>


// 无法理解这里的代码
type Curry01<P extends any[],R> = 
(arg0:Head<P>,...rest:Tail<Partial<P>>) => HasTail<P> extends true?Curry01<Tail<P>,R>:R

declare function curry01<P extends any[],R>(f:(...arg:P)=>R):Curry01<P,R>


const curry:typeof curry01 = curry01


const toCurry01 = (name:string,age:number,single:boolean)=>true
const curried01 = curry(toCurry01)

const test011  = curried01("wu")(25)(true)
const test012 = toCurry01("wu",25,true)


const toCurry07 = (name:string,age:number,...nicknames:string[])=>true
const curried07 = curry(toCurry07)

const test071  = curried07("wu")(25)("a","b")

```