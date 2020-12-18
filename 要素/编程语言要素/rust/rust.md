---
time: '1996-09-08T23:37:07+08:00'
id: 'vryfnf9'
---

# online playground
[rust playground](https://play.rust-lang.org/)
# define a vairable
define_var  => let|const|static   [mut] name [:type] = V;  
type => [& [mut] ] | [* [mut]] type_name;
# init given size vec with generater function
## rust
```rust
 let res:Vec<T> = (1..11).map(|_| T::new()).collect(); 
 ```
 不是很优雅
# macro
```rust
#[macro_export]
macro_rules! log {
    ($lvl:expr, $($arg:tt)+) => ({
        let meta = format!("{} {} {}",line!(),file!(),module_path!());
        let msg = format_args!($($arg)*);
        println!("{:?} {} {}",$lvl,meta,msg);
    })
}

#[macro_export]
macro_rules! info {
    ($($arg:tt)*) => (log!(crate::util::LogLevel::Info, $($arg)*))
}
```
1. macro 会提升到root crate

# 类型标注
## turbofish
```rust
let a  = Vec::new::<u32>();
```
# trait
## 相等性约束(type equality constraints)
```rust
//complete the below code
struct A<T>{
    data:Vec<T>
}
impl<T> A<T> {
    fn new<I>(iter:I) ->Self 
    where I:???, 
    {
        let data = iter.collect();
        Self {
            data
        }
    }
}

fn main() {
    let a = A::new(vec![1,2,3].iter());
}
// where I:Iterator<Item=T>, 
```
[rust-play-ground](https://play.rust-lang.org/?version=stable&mode=debug&edition=2018&code=struct%20A%3CT%3E%7B%0D%0A%20%20%20%20data%3AVec%3CT%3E%0D%0A%7D%0D%0Aimpl%3CT%3E%20A%3CT%3E%20%7B%0D%0A%20%20%20%20fn%20new%3CI%3E(iter%3AI)%20-%3ESelf%20%0D%0A%20%20%20%20where%20I%3AIterator%3CItem%3DT%3E%2C%20%0D%0A%20%20%20%20%7B%0D%0A%20%20%20%20%20%20%20%20let%20data%20%3D%20iter.collect()%3B%0D%0A%20%20%20%20%20%20%20%20Self%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%20%20data%0D%0A%20%20%20%20%20%20%20%20%7D%0D%0A%20%20%20%20%7D%0D%0A%7D%0D%0A%0D%0Afn%20main()%20%7B%0D%0A%20%20%20%20let%20a%20%3D%20A%3A%3Anew(vec!%5B1%2C2%2C3%5D.iter())%3B%0D%0A%7D)

## 不同trait 相同函数名

# clippy
disable line in some line
```rust
#[allow(clippy::wrong_self_convention)] 
fn xxx(){
    
}
```
# dependency
## special dependency
```toml
[target.'cfg(windows)'.dependencies]
winhttp = "0.4.0"
```


### l-array-range
```rust
fn main() {
    let a = vec![1, 2, 3, 4];
    let b = &a[0..1];
    println!("{:?}", a);
    println!("{:?}", b);
}
// [1, 2, 3, 4]
// [1]
```
# 类型 引用指针