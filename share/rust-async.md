---
id: 'a1d19e'
time: '2020-08-23T16:02:27+08:00'
status: draft
---
>Anyway. Async is way more complicated than sync and it's just for the fucking performance 

本文希望厘清Rust异步系统的原理,一些基础概念(building block)以及他们是如何协作的(How they connect).
# 当我们在谈论异步时我们在谈论什么
我们希望最大化的利用CPU来执行我们的业务逻辑. 因此之前的基于多线程等待的实现中,通过操作系统原生的实现多线程的方式(时间片切换)我们使得CPU能够同时处理多个执行流,这样的话当一个执行流发生阻塞(CPU空闲)时,可以去执行其他执行流,从而提升了CPU的使用率.  
但问题在于操作系统的线程切换是有代价的.如果使用成千上万的线程,操作系统的实现反而导致了其大部分的CPU不是花在业务上,而是花在了切换执行流上.因此我们不能寄希望于无脑的开线程来解决问题.线程只是我们的执行业务逻辑的容器罢了.一般来讲线程的数量等同于CPU的核数.
对此Rust的解决方案是将一个完整的执行流视作一个状态机.每一个非CPU逻辑(基本上就是文件读写,网络请求的IO)就是一个await.通过操作系统提供的对IO事件的订阅能力(epoll,iocp etc),使得所有的CPU时间都在执行我们的业务逻辑.从而提高了CPU的使用率.

那么对此就必须有某种DSL,我们使用他来描述业务,这种DSL的特点是 必须能够明确的区分出CPU逻辑和非CPU逻辑,也就是每次调用await的那些地方.

在rust中这种DSL就是新的async函数和await语法.编译器会将async函数编译成一个状态,交给后面的runtime去执行.本文便是希望梳理出runtime是如何工作的,其中涉及到哪些基础概念(building block),以及他们是如何协作的(How they connect).
## Future
一个future就是上文所描述的一个执行流.我们通过对一个future不停的应用变化(将其与其他future组合)最终得到了一个大的future.实际上观察js的代码和rust的代码特别使用aync/await的部分,会发现他们惊人的一致.因为他们都是通过这种语法来标记CPU逻辑和非CPU逻辑.作为程序来来将我们通过写await来在业务逻辑的happy path中显示的告诉了编译器.可以被切换的点在哪里.在JS中这些await点被实现成回调函数,在Rust中被实现成状态机的一个状态.所谓的future实际上就是一个多出来的可以让我们有空间有所指之物来表示这个await点的一个东西罢了.
在rust中对于这样的一个await点 我们需要描述的是 1. 是否已经结束 2. 类型是什么.描述清楚这两个东西后我们就可在后面继续写代码了,实际上在JS中类型也不用描述.

### 通过组合来构造Future
和通过组合来构造Js中的Promise一样,在可以组合时,Rust的异步代码同Js一样简单明了.
```rust
async fn main() {
    let a = async_read_file_to_string("./a.txt").await;
    println!("a {}",a);
}
```
read_file_to_string 函数返回的是一个Future.main函数通过组合read_file_string返回的future来构造出来自己的业务逻辑.

但当我们深入底层时,一切都变得不一样了.

```rust
pub trait Future {
    type Output;

    fn poll(self: Pin<&mut Self>, ctx: &mut Context<'_>) -> Poll<Self::Output>;
}
```
上述代码定义了Future.现在我们希望自己实现async_read_file_to_string.
```rust
fn async_read_file_to_string()->impl Future<String> {

}
```
这个trait就是在描述状态机.他可以被poll,在每次的poll中他的状态会不停的变化,直到达到最终的状态也就是Output.


>Executor为执行器，没有任何阻塞的等待，循环执行一系列就绪的Future，当Future返回pending的时候，会将Future转移到Reactor上等待进一步的唤醒。  
>Reactor为反应器(唤醒器)，轮询并唤醒挂载的事件，并执行对应的wake方法，通常来说，wake会将Future的状态变更为就绪，同时将Future放到Executor的队列中等待执行。

>Reactor会不断的poll就绪的事件，然后依次唤醒绑定在事件上的waker，waker唤醒的时候会把对应的task移动到Executor的就绪队列上安排执行。

[Mio](https://github.com/tokio-rs/mio): Rust封装的底层(主要是网络)事件库,屏蔽操作系统区别,提供了操作系统层面的异步网络事件的能力.  
## 从Waker开始
当仅仅是使用Rust提供的异步组合子,实际上不会涉及到Waker的概念.
```rust
// those code copy from https://zhuanlan.zhihu.com/p/66028983
pub trait Future {
    /// future 结束时产生的结果类型
    type Output;

    /// 返回 `Poll::Pending`表示需要等待
    /// 返回`Poll::Ready(val)`表示异步已完成
    fn poll(self: Pin<&mut Self>, ctx: &mut Context<'_>) -> Poll<Self::Output>;
}

pub enum Poll<T> {
    Ready(T),
    Pending,
}

// Context结构目前其实就当作Waker用，主要是考虑向前兼容性，以防后面需要增加其他内容。
pub struct Context<'a> {
 Waker: &'a Waker,
    //...
}
```
>Future本身定义比较简单：实现一个poll的方法，参数包含了Executor传递的Waker。如果整个异步完成了，则返回相应的结果，如果需要等待， 则将Context中的 Waker注册到底层的Reactor中。  

# Waker的wake到底做了什么
这个实际上要看不同的Runtime的实现,思路最起码有下面两种
## ThreadNotify
Waker实际上是ThreadNotify,当Executor执行某个Task发现其NotReady时,就直接调用`thread::park();`沉睡当前的线程,而等到对应的事件发生时,例如在Rust Async Book中TimeFuture的实现中另一个线程调用了waker的wake方法此时实际上就是将这个Executor的线程给`arc_self.thread.unpark();`了
future-rs自带的[local_pool executor](https://github.com/rust-lang/futures-rs/blob/master/futures-executor/src/local_pool.rs)大概是这种实现.

## 将Task重新发送到Executor的执行队列中
等到某个Executor执行时窃取到这个Task并调用Poll.
这里的Executor可以用类似channel的机制来操作,没有Task来时也是park的状态
[AsyncBook中的示例executor](https://rust-lang.github.io/async-book/02_execution/04_executor.html)大概是这种实现.  

### asyn-std 实现分析 
[async-std使用async-executor](https://github.com/async-rs/async-std/blob/280f2244be94224259caba7e1f472ecff3325885/src/rt/mod.rs#L30)
而[async-excutor使用 mutli-task](https://github.com/stjepang/async-executor/blob/152afac61fc1442c38888036e8c47d9d4dd9bd8f/src/lib.rs#L76)
1. [spawn task add to queue](https://github.com/stjepang/multitask/blob/27dbb51083a769646b66f9177850dae24e83dcd9/src/lib.rs#L413)  
2. [read from queue](https://github.com/stjepang/multitask/blob/27dbb51083a769646b66f9177850dae24e83dcd9/src/lib.rs#L548)  
3. [poll it again](https://github.com/stjepang/async-executor/blob/152afac61fc1442c38888036e8c47d9d4dd9bd8f/src/lib.rs#L182)  


# ref
[Rust异步浅谈](https://zhuanlan.zhihu.com/p/112237024)  
[Futures Explained in 200 Lines of Rust](https://cfsamson.github.io/books-futures-explained/introduction.html)  
[Rust异步与并发](https://zhuanlan.zhihu.com/c_1217841610177937408)  
[Rust Async Book](https://rust-lang.github.io/async-book/)  
[stjepang's blog](https://stjepang.github.io/)  
[How does async work in async-std?](https://gist.github.com/Phaiax/dd3476f13b4542492f79e3ab2171eb8c)