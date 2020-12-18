---
time: '1996-09-08T23:37:07+08:00'
id: 'x0pdaf9'
---

# note of exploring-async-basics
[book-exploring-async-basics](https://cfsamson.github.io/book-exploring-async-basics/introduction.html)

# timeout
使用epoll(minimio)挂起线程等到timeout时处理那些即将过期的事件
# dispatch
每个回调函数仅依赖于参数 将函数对象直接保存起来到丢到线程池中执行 给每个callback分配一个id用来标识 这样就能维护出callback之间的调用关系