---
id: '604886'
time: '2020-10-20T20:46:53+08:00'
---
[a-tour-of-metaprogramming-models-for-generics](https://thume.ca/2019/07/14/a-tour-of-metaprogramming-models-for-generics/)
范型的通用做法有两种一种是将所有的类型看做是同一的,也就是void*,存在堆上使用时在解回类型使用,另外一种是为每种类型真实的生成代码.  
## box
第一种的问题是
1. 每次使用时都要解回到原来的类型
2. 理论上来将可以将不同类型的值放在同一个队列中

解决这种问题的方法是在类型系统中增加对范型的支持,在编译时通过类型系统保证不会出现这种问题,在运行时不做任何的修改.这就是大家常讲的“type erasure”类型擦除.  
这个代码片段的第一段是没有范型之前java的写法,第二段是有范型之后写法,在有了范型之后,实际如代码所示我们就能在编译时将错误捕获住.

当我们将一个具体类型转换一个接口类型时,实际上发生的事情就是又创建了一个对象里面包含一个指向vtable(这个接口定义的函数)的指针,和一个指向原数据的指针.
>When you cast a type to an interface type for something it implements, it creates a wrapper that contains a pointer to the original object and a pointer to a vtable of the type-specific functions for that interface.
## 面向对象编程
面向对象编程是在vtable上的又一个强大的扩充,与其将vtable和原始数据分开,像是Java这样的面向对象语言的每一个对象都有vtable,面向对象的一大特点是这些vtable之间是有继承关系的
## 反射
如果编译器已经为我们生成了vtable那么实际上也可以为我们生成字段的名字,位置等信息,这种东西实际上就被称作反射,有了他之后我们就可以自动的做序列化之类的操作

