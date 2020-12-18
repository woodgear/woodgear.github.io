---
time: '1996-09-08T23:37:07+08:00'
id: 'tfyuhwu'
---

sorry for my English. if you could not understand what I talk just point it out.  
I am currently try to figure out how task::current works.  
after digging some source code. I think I understand the call stack of task::current but still sth confuse me like the title. 
there is something I found out, correct me if I was wrong.  

current use a function called get_ptr to get a pointer of BorrowedTask.the BorrowedTask  is the current task.  
source code under blow  
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
fn with<F: FnOnce(&BorrowedTask) -> R, R>(f: F) -> R {
 unsafe {
 let task = get_ptr().expect("no Task is currently running");
 assert!(!task.is_null(), "no Task is currently running");
 f(&*(task as *const BorrowedTask))
    }
}

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
so the question is who and when to set/update/init the CURRENT_TASK.  
this is a function called set, seems the only way to do those stuff.
```rust
 
fn tls_slot() -> *const Cell<*mut u8> {
    CURRENT_TASK.with(|c| c as *const _)
}

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
and then the question is who calls the set function.  
and I find than I could not find whom to call set.  
the calling chain seems broken.  
after some search 
>  It is initialized by a reactor before polling a task and as discussed  above, may be overridden by specific futures within the task 

I found some word come from [Looking into the Future](https://gist.github.com/Diggsey/6f924bf3f741bcdffd240faee102fe92)

It seems to say that is there some code under tokio-reactor to called the set function, but after a search in tokio I still could not find anything about that.

please help me with that.