---
tag: actor model
time: '1996-09-08T23:37:07+08:00'
id: 'sjragyn'
---

# 纯函数 业务 check triger 永不停止
将程序看作一堆Actor 那么就有几个问题
* What: Actor想干什么 Actor有哪些部分组成
* Why: 为什么会执行这个Actor

>you only know what you want to do and what you have
q: who am i  
a: what you do is who you are  
q: when should i do
a: that not your business
q: i am a part of entirety how should i tell the other part i have finshed? how could i manager the entirety
a: that not your business . i will tell the other part which depend on you  the whole chain is  entirety

# What
一个Actor所做的事情 定义了这个Actor Actor是一个没有任何参数的纯函数 允许她获取状态 根据不同的状态来决定如何执行自己
Actor的返回值是一种特殊的类型 Actor-Ret
# Why
即谁来触发Actor
1. 自己定义Actor之间的关系 此时会把A的返回值作为B的参数
2. check triger 触发 checktriger 会定时执行并检查状态 满足状态 调用Actor