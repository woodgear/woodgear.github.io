---
time: '1996-09-08T23:37:07+08:00'
id: 'agugu9w'
---

所以实际上讲重新poll一次future实际上是重新clone一个task丢到task的调用队列中再调用一次?
所以讲实际上根本不存在调用 所有的future poll完一遍又会被重新丢到队列中直到下次被poll?那这样的话不就相当于死循环吗?
不是的 例如例子上的TimeFuture实际上是TimeFuture自己调用的wake
```rust
impl TimerFuture {
    /// Create a new `TimerFuture` which will complete after the provided
    /// timeout.
    pub fn new(duration: Duration) -> Self {
        let shared_state = Arc::new(Mutex::new(SharedState {
            completed: false,
            waker: None,
        }));

        dbg!("TimerFuture new");
        // Spawn the new thread
        let thread_shared_state = shared_state.clone();
        thread::spawn(move || {
            dbg!("TimerFuture start thread");
            thread::sleep(duration);
            dbg!("TimerFuture time consumed");

            let mut shared_state = thread_shared_state.lock().unwrap();
            // Signal that the timer has completed and wake up the last
            // task on which the future was polled, if one exists.
            shared_state.completed = true;
            if let Some(waker) = &shared_state.waker {
                dbg!("TimeFuture state completed wakeup task");
                waker.wake();
            }
        });

        TimerFuture { shared_state }
    }
}
impl Wake for Task {
    fn wake(arc_self: &Arc<Self>) {
        // Implement `wake` by sending this task back onto the task channel
        // so that it will be polled again by the executor.
        let cloned = arc_self.clone();
        arc_self.task_sender.send(cloned).expect("too many tasks queued");
    }
}

impl Executor {
    fn run(&self) {
        dbg!("execute start to run");
        while let Ok(task) = self.ready_queue.recv() {
            dbg!("get a task");

            let mut future_slot = task.future.lock().unwrap();
            // Take the future, and if it has not yet completed (is still Some),
            // poll it in an attempt to complete it.
            if let Some(mut future) = future_slot.take() {
                // Create a `LocalWaker` from the task itself
                let lw = local_waker_from_nonlocal(task.clone());
                if let Poll::Pending = Pin::new(&mut future).poll(&lw) {
                    dbg!("excuttor try to poll and task is pending restore the task");

                    // We're not done processing the future, so put it
                    // back in its task to be run again in the future.
                    *future_slot = Some(future);
                }
            }
        }
    }
}
```