---
time: '1996-09-08T23:37:07+08:00'
id: 'jdq2lc9'
---

```rust
#[derive(Debug)]
struct A {
    data: String,
}
impl A {
    fn show(&mut self) -> u64 {
        let p = self as *mut Self as u64;
        println!("in start p is {:x} {:?}", p, self);
        p
    }
}
static mut GLOBAL: Option<A> = None;

fn init() -> u64 {
    let p: u64 = {
        let mut a = A {
            data: "test".to_string(),
        };
        let p = a.show();
        unsafe { GLOBAL = Some(a) };
        p
    };
    p
}

pub fn main() {
    let a_pointer = init();
    unsafe { GLOBAL.as_mut().unwrap().show() };
    let a_ref: &mut A = unsafe { &mut *(a_pointer as *mut A) };
    a_ref.show();
}

```
这段代码会崩溃 因为 在init中我们将A构造出来了所得到的A的指针p在init函数后指向的就是非法的内存了. 在init 之后 A被存储在GLOBAL中其地址与被初始化时不同
解决的方法就是用Box
```rust
#[derive(Debug)]
struct A {
    data: String,
}

impl A {
    fn show(&mut self) -> u64 {
        let p = self as *mut Self as u64;
        println!("in start p is {:x} {:?}", p, self);
        p
    }
}
static mut GLOBAL: Option<Box<A>> = None;

fn init() -> u64 {
    let p: u64 = {
        let mut a = Box::new(A {
            data: "test".to_string(),
        });
        let p = a.show();
        unsafe { GLOBAL = Some(a) };
        p
    };
    p
}

pub fn main() {
    let a_pointer = init();
    unsafe { GLOBAL.as_mut().unwrap().show() };
    let a_ref: &mut A = unsafe { &mut *(a_pointer as *mut A) };
    a_ref.show();
}
```
实际上这样的代码就可以正常编译运行了 但是还有一个问题那就是show方法的定义 问题的本质在于我们希望在调用show方法时拿到的self是不变的 即A的内存地址在调用show之后就不能发生变化 那么就是Pin
```rust
#![feature(arbitrary_self_types)]
use core::pin::Pin;

#[derive(Debug)]
struct A {
    data: String,
}

impl A {
    fn show(self: Pin<&mut Self>) -> u64 {
        println!("in show self is {:?}", self);
        let p = self.get_mut() as *mut Self;
        println!("in start pointer is {:?}", p);
        p as u64
    }
}

static mut GLOBAL: Option<Pin<Box<A>>> = None;

fn init() -> u64 {
    let p: u64 = {
        let mut a = Pin::new(Box::new(A {
            data: "test".to_string(),
        }));
        let p = a.as_mut().show();
        unsafe { GLOBAL = Some(a) };
        p
    };
    p
}

pub fn main() {
    let a = init();
    let a= unsafe {&mut *(a as *mut A)};
    a.show();
    println!("a is {:?}",a);
}
```
这样好处就是我们无法在一个内存地址可能会发生变化的A上调用show 编译器会确保这一点