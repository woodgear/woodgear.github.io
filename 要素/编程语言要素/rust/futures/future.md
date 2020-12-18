---
time: '1996-09-08T23:37:07+08:00'
id: '5s0btkc'
---

# 什么是future
就我目前的理解来看future是一种新型的书写方式 传统的代码按照线性顺序执行 但是在异步程序中为了表明异步逻辑 最简单的就是嵌套回调 future也是类似 只不过是通过and_then等方法将异步逻辑组合了起来 一个future就是一条调用链 调用链与调用链之间可以进行组合 组成的就是一个更大的future 但是future也仅仅是future而已其只是通过通过另一种方式描述了将要做的事情 就像一个蓝图 还要一个执行者 这个执行者就是tokio 所提供的东西

# park 是个什么概念

# how a task init?
# task 与thread是什么关系
## 根据操作系统概念的划分我们能够知道process与thread的区别 能够去调用current_process and current_thread but how can we call something like task::current 

## how task works
## Task::current的实现
```rust
pub fn current() -> Task {
    with(|borrowed| {
        let unpark = borrowed.unpark.to_owned();
        let events = borrowed.events.to_owned();

        Task {
            id: 'borrowed.id,'
            unpark: unpark,
            events: events,
        }
    })
}
```
```rust
fn with<F: FnOnce(&BorrowedTask) -> R, R>(f: F) -> R {
    unsafe {
        let task = get_ptr().expect("no Task is currently running");
        assert!(!task.is_null(), "no Task is currently running");
        f(&*(task as *const BorrowedTask))
    }
}
```
```rust
static GET: AtomicUsize = ATOMIC_USIZE_INIT;
static SET: AtomicUsize = ATOMIC_USIZE_INIT;

#[inline]
pub fn get_ptr() -> Option<*mut u8> {
    match GET.load(Relaxed) {
        0 => None,
        n => Some(unsafe { mem::transmute::<usize, fn() -> *mut u8>(n)() }),
    }
}
```
看起来GET 实质上是一个```fn() -> *mut u8```的函数指针 这个函数返回的是一个指向BorrowedTask的指针
那么问题在于谁设置的这个指针呢 这个函数又是怎么实现的呢?(为什么要用指针啊 transmute真的安全吗? 2333)
然后我就找到了注释
```rust
/// Initialize the `futures` task system.
///
/// This function is an unsafe low-level implementation detail typically only
/// used by crates using `futures` in `no_std` context. Users of this crate
/// who also use the standard library never need to invoke this function.
///
/// The task system in the `futures` crate relies on some notion of "local
/// storage" for the running thread and/or context. The `task::current` function
/// can get invoked in any context, for example, and needs to be able to return
/// a `Task`. Typically with the standard library this is supported with
/// thread-local-storage, but this is not available in `no_std` contexts!
///
/// This function is provided to allow `no_std` contexts to continue to be able
/// to use the standard task system in this crate. The functions provided here
/// will be used as-if they were thread-local-storage getters/setters. The `get`
/// function provided is used to retrieve the current thread-local value of the
/// task system's pointer, returning null if not initialized. The `set` function
/// updates the value of the pointer.
///
/// # Return value
///
/// This function will return whether initialization succeeded or not. This
/// function can be called concurrently and only the first invocation will
/// succeed. If `false` is returned then the `get` and `set` pointers provided
/// were *not* registered for use with the task system, but if `true` was
/// provided then they will be called when the task system is used.
///
/// Note that while safe to call concurrently it's recommended to still perform
/// external synchronization when calling this function. This task system is
/// not guaranteed to be ready to go until a call to this function returns
/// `true`. In other words, if you call this function and see `false`, the
/// task system may not be ready to go as another thread may still be calling
/// `init`.
///
/// # Unsafety
///
/// This function is unsafe due to the requirements on the behavior of the
/// `get` and `set` functions. The pointers returned from these functions must
/// reflect the semantics specified above and must also be thread-local,
/// depending on the definition of a "thread" in the calling context.

```
这个是std下的实现
```rust
thread_local!(static CURRENT_TASK: Cell<*mut u8> = Cell::new(ptr::null_mut()));

static INIT: Once = ONCE_INIT;

pub fn get_ptr() -> Option<*mut u8> {
    // Since this condition will always return true when TLS task storage is
    // used (the default), the branch predictor will be able to optimize the
    // branching and a dynamic dispatch will be avoided, which makes the
    // compiler happier.
    if core::is_get_ptr(0x1) {
        Some(CURRENT_TASK.with(|c| c.get()))
    } else {
        core::get_ptr()
    }
}
```

## 这个CURRENT_TASK是怎么样设置进去的 
看起来是下面这个函数设置的
```rust
pub fn set<'a, F, R>(task: &BorrowedTask<'a>, f: F) -> R
    where F: FnOnce() -> R
{
    // Lazily initialize the get / set ptrs
    //
    // Note that we won't actually use these functions ever, we'll instead be
    // testing the pointer's value elsewhere and calling our own functions.
    INIT.call_once(|| unsafe {
        let get = mem::transmute::<usize, _>(0x1);
        let set = mem::transmute::<usize, _>(0x2);
        init(get, set);
    });

    // Same as above.
    if core::is_get_ptr(0x1) {
        struct Reset(*const Cell<*mut u8>, *mut u8);

        impl Drop for Reset {
            #[inline]
            fn drop(&mut self) {
                unsafe {
                    (*self.0).set(self.1);
                }
            }
        }

        unsafe {
            let slot = tls_slot();
            let _reset = Reset(slot, (*slot).get());
            (*slot).set(task as *const _ as *mut u8);
            f()
        }
    } else {
        core::set(task, f)
    }
}

```
## 谁 init/update/set CURRENT_TASK

# 我们如何控制poll的频率 能不做到更精细的控制


# 相关阅读
[how-futures-tasks-work-with-executors](https://users.rust-lang.org/t/how-futures-tasks-work-with-executors/11585/8)  
[looking_into_the_future_a_post_explaining_how](https://www.reddit.com/r/rust/comments/73l6na/looking_into_the_future_a_post_explaining_how/)
[understanding-the-tokio-reactor-core](https://www.coredump.ch/2017/07/05/understanding-the-tokio-reactor-core/)