---
time: '1996-09-08T23:37:07+08:00'
id: '6ucdzxt'
---

[原子类型](https://doc.rust-lang.org/nomicon/atomics.html)  
我们可以放心的多线程环境中使用原子类型 但是很明显的要赋予其面对多线程访问时如何处理的信息 
## Sequentially Consistent (SeqCst)
all accesses on one thread that happen before and after a SeqCst access stay before and after it  
序列固化是的编译器不再重排关于这个类型的操作
## Acquire and Release
an acquire access ensures that every access after it stays after it. However operations that occur before an acquire are free to be reordered to occur after it. Similarly, a release access ensures that every access before it stays before it. However operations that occur after a release are free to be reordered to occur before it.  
Acquire 后方固化保证在Acquire之后的操作永远在Acquire之后  
Release 前方固化保证在Release之前的操作永远在Release之前
```rust
use std::sync::Arc;
use std::sync::atomic::{AtomicBool, Ordering};
use std::thread;

fn main() {
    let lock = Arc::new(AtomicBool::new(false)); // value answers "am I locked?"

    // ... distribute lock to threads somehow ...

    // Try to acquire the lock by setting it to true
    while lock.compare_and_swap(false, true, Ordering::Acquire) { }
    // broke out of the loop, so we successfully acquired the lock!

    // ... scary data accesses ...

    // ok we're done, release the lock
    lock.store(false, Ordering::Release);
}
```
## Relaxed 
Relaxed accesses are the absolute weakest. They can be freely re-ordered and provide no happens-before relationship. Still, relaxed operations are still atomic. That is, they don't count as data accesses and any read-modify-write operations done to them occur atomically. Relaxed operations are appropriate for things that you definitely want to happen, but don't particularly otherwise care about. For instance, incrementing a counter can be safely done by multiple threads using a relaxed fetch_add if you're not using the counter to synchronize any other accesses.