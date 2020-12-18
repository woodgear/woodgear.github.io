---
time: '1996-09-08T23:37:07+08:00'
id: '2qqdnkv'
---

## status:draft

# 需求

在很多时候我们要对字符串做匹配和捕获  
举一个例子 要对命令行参数做匹配  
"add data1"  
"rm data2"  
给定上面两个字符串 如何以最优美的方式捕获到 data1,和 data2 以便于我们后面的操作?

# 实现

## rust

```rust
fn main() {
    let s1 = "add data1".to_string();
    let s2 = "rm data2".to_string();
    match s1.split_whitespace().collect::<Vec<_>>()[..] {
        ["add",data]=>{
          println!("in add {}",data);
        },
        ["rm",data]=>{
          println!("in rm {}",data);
        },
        _=>{
          println!("sth else");
        }
    }
}
```

## js

```nodejs

```

## haskhell

```haskhell

```

## python

```python

```

## c++

```c++

```

## c

```c

```

## java

```java

```