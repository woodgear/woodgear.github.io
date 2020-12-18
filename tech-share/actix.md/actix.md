---
time: '1996-09-08T23:37:07+08:00'
id: 'up0qo0g'
---

# 为什么能够通过addres 来send msg
contextimpl 中的poll中执行力self.mailbox.poll(self,act) 其中一直在读msg然后执行msg的handle方法 实际上就接收到了Msg
每个addres 通过Arc共享一份内存一直在push msg
# AddressSenderProducter的Send方法在做什么?
递增num_senders并构造AddressSender
只不过多线程问题 所以用了原子类型操作而已
# task current 在做什么
目前acti使用的时future 1.0 + tokio 1.x 并没有搞懂里面具体的逻辑 不过大意就是获得了一个当前线程的waker 以便在后面通过notify通知到对应的actor 可以参照 [rust async book](../aync_book)中的例子就懂了
# 当Actor启动时发生了什么
如actix.pdf

# 当我们在Handle Msg 时通过ctx 自己给自己notify 一个msg时 我们做了什么
类似于此的函数实质就是直接调用spawn
```rust
    /// Sends the message `msg` to self.
    fn notify<M>(&mut self, msg: M)
    where
        A: Handler<M>,
        M: Message + 'static,
    {
        if self.state() == ActorState::Stopped {
            error!("Context::notify called for stopped actor.");
        } else {
            self.spawn(ActorMessageItem::new(msg));
        }
    }

    fn notify_later<M>(&mut self, msg: M, after: Duration) -> SpawnHandle
    where
        A: Handler<M>,
        M: Message + 'static,
    {
        if self.state() == ActorState::Stopped {
            error!("Context::notify_later called for stopped actor.");
            SpawnHandle::default()
        } else {
            self.spawn(ActorDelayedMessageItem::new(msg, after))
        }
    }

    fn run_later<F>(&mut self, dur: Duration, f: F) -> SpawnHandle
    where
        F: FnOnce(&mut A, &mut A::Context) + 'static,
    {
        self.spawn(TimerFunc::new(dur, f))
    }

    /// Spawns a job to execute the given closure periodically, at a
    /// specified fixed interval.
    fn run_interval<F>(&mut self, dur: Duration, f: F) -> SpawnHandle
    where
        F: FnMut(&mut A, &mut A::Context) + 'static,
    {
        self.spawn(IntervalFunc::new(dur, f).finish())
    }
}

```
至于spawn 本身则是将这个这个future丢到了contextimpl的items中可以参见ContextFut的poll 这里又去poll了self.items实际上就是执行了一下这些fututre
```rust
    #[inline]
    /// Spawn new future to this context.
    pub fn spawn<F>(&mut self, fut: F) -> SpawnHandle
    where
        F: ActorFuture<Item = (), Error = (), Actor = A> + 'static,
    {
        let handle = self.handles[0].next();
        self.handles[0] = handle;
        let fut: Box<ActorFuture<Item = (), Error = (), Actor = A>> = Box::new(fut);
        self.items.push((handle, fut));
        handle
    }

```


# 当我们获得一个actor的address 并通过这个address send一个msg时 我们做了什么
每一个Actor的address实际上共享一个队列 send msg 时实际上就是将msg丢到Actor的message_queue中并且去notify这个Actor
```rust
pub struct AddressSender<A: Actor> {
    inner: Arc<Inner<A>>,
    // 省略
}
impl<A: Actor> AddressSender<A> {
    pub fn send<M>(&self, msg: M) -> Result<Receiver<M::Result>, SendError<M>>
    where
        A: Handler<M>,
        A::Context: ToEnvelope<A, M>,
        M::Result: Send,
        M: Message + Send,
    {
        if !self.poll_unparked(false).is_ready() {
            return Err(SendError::Full(msg));
        }
        let park_self = match self.inc_num_messages() {
            Some(park_self) => park_self,
            None => return Err(SendError::Closed(msg)),
        };

        if park_self {
            self.park(true);
        }
        let (tx, rx) = sync_channel();
        let env = <A::Context as ToEnvelope<A, M>>::pack(msg, Some(tx));
        self.queue_push_and_signal(env);
        Ok(rx)
    }
    fn queue_push_and_signal(&self, msg: Envelope<A>) {
        self.inner.message_queue.push(msg);
        self.signal();
    }
    
    fn signal(&self) {
        let task = {
            let mut recv_task = self.inner.recv_task.lock();
            if recv_task.unparked {
                return;
            }

            recv_task.unparked = true;
            recv_task.task.take()
        };

        if let Some(task) = task {
            task.notify();
        }
    }
}
```
剩下的问题就是address是怎么来的
1. Actor启动时返回的Address

```rust
impl<A> Context<A>
where
    A: Actor<Context = Self>,
{
    #[inline]
    pub(crate) fn new() -> Context<A> {
        let mb = Mailbox::default();
        Context {
            parts: ContextParts::new(mb.sender_producer()),
            mb: Some(mb),
        }
    }
    #[inline]
    pub fn run(self, act: A) -> Addr<A> {
        let fut = self.into_future(act);
        let addr = fut.address();
        Arbiter::spawn(fut);
        addr
    }

}
impl<A, C> ContextFut<A, C>
where
    C: AsyncContextParts<A>,
    A: Actor<Context = C>,
{
        #[inline]
    pub fn address(&self) -> Addr<A> {
        self.mailbox.address()
    }
}
impl<A> Mailbox<A>
where
    A: Actor,
    A::Context: AsyncContext<A>,
{
    pub fn address(&self) -> Addr<A> {
        Addr::new(self.msgs.sender())
    }
}
```
问题就是MailBox的msgs到底是什么
```rust
impl<A> Default for Mailbox<A>
where
    A: Actor,
    A::Context: AsyncContext<A>,
{
    #[inline]
    fn default() -> Self {
        let (_, rx) = channel::channel(DEFAULT_CAPACITY);
        Mailbox { msgs: rx }
    }
}
```
channel又是一个很麻烦的东西
```rust
pub fn channel<A: Actor>(buffer: usize) -> (AddressSender<A>, AddressReceiver<A>) {
    // Check that the requested buffer size does not exceed the maximum buffer
    // size permitted by the system.
    assert!(buffer < MAX_BUFFER, "requested buffer size too large");

    let inner = Arc::new(Inner {
        buffer: AtomicUsize::new(buffer),
        state: AtomicUsize::new(INIT_STATE),
        message_queue: Queue::new(),
        parked_queue: Queue::new(),
        num_senders: AtomicUsize::new(1),
        recv_task: Mutex::new(ReceiverTask {
            unparked: false,
            task: None,
        }),
    });

    let tx = AddressSender {
        inner: Arc::clone(&inner),
        sender_task: Arc::new(Mutex::new(SenderTask::new())),
        maybe_parked: Arc::new(AtomicBool::new(false)),
    };

    let rx = AddressReceiver { inner };

    (tx, rx)
}
```
在这里我们可以看到Inner终于被创建出来的 下面的无论是sender 还是sender_producer 实质上使用的都是同一份inner 也就是说通过Actor的address() 就能够将Msg丢到Actor的MailBox中这样在Actor被poll时他就会通过self.mailbox.poll()来调用真正的处理函数
```rust
impl<A: Actor> AddressReceiver<A> {
    pub fn sender(&self) -> AddressSender<A> {
        // this code same as Sender::clone
        let mut curr = self.inner.num_senders.load(SeqCst);

        loop {
            // If the maximum number of senders has been reached, then fail
            if curr == self.inner.max_senders() {
                panic!("cannot clone `Sender` -- too many outstanding senders");
            }

            let next = curr + 1;
            let actual = self.inner.num_senders.compare_and_swap(curr, next, SeqCst);

            // The ABA problem doesn't matter here. We only care that the
            // number of senders never exceeds the maximum.
            if actual == curr {
                return AddressSender {
                    inner: Arc::clone(&self.inner),
                    sender_task: Arc::new(Mutex::new(SenderTask::new())),
                    maybe_parked: Arc::new(AtomicBool::new(false)),
                };
            }

            curr = actual;
        }
    }

    /// Creates the sender producer.
    pub fn sender_producer(&self) -> AddressSenderProducer<A> {
        AddressSenderProducer {
            inner: self.inner.clone(),
        }
    }
}
## ReceiverTask 中的task什么时候被设置进去的
初始化时为none在AddressReceiver被poll时 (mailbox被poll时) 的try_park中被设置
也就是在Actor第一次被Poll时设置 也就是Arbiter::spawn时被设置
```rust
impl<A: Actor> Stream for AddressReceiver<A> {
    type Item = Envelope<A>;
    type Error = ();

    fn poll(&mut self) -> Poll<Option<Self::Item>, Self::Error> {
        loop {
            // Try to read a message off of the message queue.
            let msg = match self.next_message() {
                Async::Ready(msg) => msg,
                Async::NotReady => {
                    // There are no messages to read, in this case, attempt to
                    // park. The act of parking will verify that the channel is
                    // still empty after the park operation has completed.
                    match self.try_park() {
                        TryPark::Parked => {
                            // The task was parked, and the channel is still
                            // empty, return NotReady.
                            return Ok(Async::NotReady);
                        }
                        TryPark::NotEmpty => {
                            // A message has been sent while attempting to
                            // park. Loop again, the next iteration is
                            // guaranteed to get the message.
                            continue;
                        }
                    }
                }
            };

            // If there are any parked task handles in the parked queue, pop
            // one and unpark it.
            self.unpark_one();

            // Decrement number of messages
            self.dec_num_messages();

            // Return the message
            return Ok(Async::Ready(msg));
        }
    }
}
impl<A: Actor> AddressReceiver<A> {
    fn try_park(&self) -> TryPark {
        // First, track the task in the `recv_task` slot
        let mut recv_task = self.inner.recv_task.lock();

        if recv_task.unparked {
            // Consume the `unpark` signal without actually parking
            recv_task.unparked = false;
            return TryPark::NotEmpty;
        }

        recv_task.task = Some(task::current());
        TryPark::Parked
    }
}

```
至此一切就已经联系起来了
当我们向adr中send msg 时实际上在向这个Actor的mailbox中的message_queue中推Envelope 

并且notify下Actor的Task因为Actor的第一次被poll就会设置task所以send了一个msg时能够找到Actor的task并去notify他

# 为什么Actor启动必须要System?
# Service 是如何工作的
# 如何将Actor启动在不同的线程中
# 当某个Actor阻塞时 之前在其中设置的Timer会有什么样的表现行为 为什么