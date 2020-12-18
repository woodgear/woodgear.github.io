---
time: '1996-09-08T23:37:07+08:00'
id: 'tbsalta'
---

# 定义
我们想存储某些线程私有的数据  希望能有某种手段给线程增加metainfo 类似于全局变量 只不过是是对于每个线程而言的  
在常用的表示方法中一般通过某种标示符表明变量的这个特性 在常用的变量定义的语义中新加了一层语义 即此变量是线程私有的 结果就是 每个线程私有数据的初始值 类型 数量 都相同 每个线程访问时 每个线程对其的访问 查询/修改是独立的 这种与一般变量定义正交的结果 在大部分情况下是能够满足使用的

# 常用场景
1. 类型是不是多线程安全
2. 存储线程的metainfo
# 如何实现
正如[Nikita Salnikov-Tarnovski][2]所说的 在外部实现ThreadLocal一定会面临线程安全的问题 所以在Java中ThreadLocal是Thread对象本身的一个属性

[1]:https://stackoverflow.com/questions/817856/when-and-how-should-i-use-a-threadlocal-variable
[2]:https://plumbr.io/blog/java/how-is-threadlocal-implemented