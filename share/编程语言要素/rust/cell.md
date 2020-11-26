---
time: '1996-09-08T23:37:07+08:00'
id: 'vmfosh2'
---

# Cell
## Cell是什么东西
```rust
#[repr(transparent)]
pub struct Cell<T: ?Sized> {
    value: UnsafeCell<T>,
}
impl<T> Cell<T> {
    pub const fn new(value: T) -> Cell<T> {
        Cell {
            value: UnsafeCell::new(value),
        }
    }
    pub fn set(&self, val: T) {
        let old = self.replace(val);
        drop(old);
    }
}
```
Cell的set方法只要求拥有不可变的reference 这就是她最大的作用
## 有什么用 或者说在实际的例子中人们是怎么使用Cell的
### 假设我们希望不用mut ref 一个struct 来mut一个struct 
```rust
use std::cell::Cell;

struct SomeStruct {
    regular_field: u8,
    special_field: Cell<u8>,
}

let my_struct = SomeStruct {
    regular_field: 0,
    special_field: Cell::new(1),
};

let new_value = 100;

// ERROR, because my_struct is immutable
// my_struct.regular_field = new_value;

// WORKS, although `my_struct` is immutable, field `special_field` is mutable because it is Cell
my_struct.special_field.set(new_value);
assert_eq!(my_struct.special_field.get(), new_value);
```

### 希望做一些兼容性的操作 
or because you must employ mutation to implement a trait method that was originally defined to take &self.
### 偷偷的进行mut 理论上不用mut的地方在实现上需要mut
1. 例如实现memorize 每次只是get(&self) 但实际上要修改缓存(&mut self)
```rust
use std::cell::RefCell;

struct Graph {
    edges: Vec<(i32, i32)>,
    span_tree_cache: RefCell<Option<Vec<(i32, i32)>>>
}

impl Graph {
    fn minimum_spanning_tree(&self) -> Vec<(i32, i32)> {
        // Create a new scope to contain the lifetime of the
        // dynamic borrow
        {
            // Take a reference to the inside of cache cell
            let mut cache = self.span_tree_cache.borrow_mut();
            if cache.is_some() {
                return cache.as_ref().unwrap().clone();
            }

            let span_tree = self.calc_span_tree();
            *cache = Some(span_tree);
        }

        // Recursive call to return the just-cached value.
        // Note that if we had not let the previous borrow
        // of the cache fall out of scope then the subsequent
        // recursive borrow would cause a dynamic thread panic.
        // This is the major hazard of using `RefCell`.
        self.minimum_spanning_tree()
    }
}
```
2. 例如引用计数在clone(&self)时要增加count(&mut self)
```rust
#![feature(core_intrinsics)]
use std::cell::Cell;
use std::ptr::NonNull;
use std::intrinsics::abort;

struct Rc<T: ?Sized> {
    ptr: NonNull<RcBox<T>>
}

struct RcBox<T: ?Sized> {
    strong: Cell<usize>,
    refcount: Cell<usize>,
    value: T,
}

impl<T: ?Sized> Clone for Rc<T> {
    fn clone(&self) -> Rc<T> {
        self.inc_strong();
        Rc { ptr: self.ptr }
    }
}

trait RcBoxPtr<T: ?Sized> {

    fn inner(&self) -> &RcBox<T>;

    fn strong(&self) -> usize {
        self.inner().strong.get()
    }

    fn inc_strong(&self) {
        self.inner()
            .strong
            .set(self.strong()
                     .checked_add(1)
                     .unwrap_or_else(|| unsafe { abort() }));
    }
}

impl<T: ?Sized> RcBoxPtr<T> for Rc<T> {
   fn inner(&self) -> &RcBox<T> {
       unsafe {
           self.ptr.as_ref()
       }
   }
}
```
### 当我们有某个共有的变量 同时有多个struct希望能够修改她
```rust
struct A<'a>(&'a mut i32);

impl<'a> A<'a> {
    fn change_to(&mut self, v: i32) {
        *self.0 = v;
    }
}

fn main() {
    let mut x = 10;
    let mut a = A(&mut x);
    let mut b = A(&mut x);
    a.change_to(2);
    // b.change_to(1);
    println!("{:?}",x);
}

// use std::cell::Cell;

// struct A<'a>(&'a Cell::<i32>);

// impl<'a> A<'a> {
//     fn change_to(&self,v:i32){
//         self.0.set(v);
//     }
// }

// fn main() {
//     let x = Cell::new(10);
//     let a = A(&x);
//     let b = A(&x);
//     b.change_to(1);
//     a.change_to(2);
//     println!("{:?}",x);
// }
```

# RefCell