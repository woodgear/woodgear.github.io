---
time: '1996-09-08T23:37:07+08:00'
id: 'pqlclaq'
---

--
link: https://github.com/rust-lang/chalk
--
[chalk book](https://rust-lang.github.io/chalk/book/)
rust trait的推理引擎 rust编译器中负责解析trait关系的一部分,看起来是按照某种推理的方式书写的.即给定条件和问题 由引擎给出答案.在这里条件就是我们所写的trait,和trait struct之间的依赖,问题类似于是否某个类型满足这个约束 可以使用这个trait之类的. 让人想起了[prolog](https://zh.wikipedia.org/zh-hans/Prolog) 


>Where does the name come from? chalk is named after Chalkidiki, the area where Aristotle was born. Since Prolog is a logic programming language, this seemed a suitable reference.