---
id: 'owb22fb'
time: '2020-01-07T14:03:26+08:00'
state: draft
---

```rust
#[derive(Debug)]
pub enum E {
    a(A),
    b(B),
    c(C),
}
```
假设E的每个Item都实现了
```rust
fn decode(buffer: Vec<u8>) -> Self;
fn id() -> u32;
```
那么如何`优雅的`实现
```rust
fn decode(id:u32,buffer:Vec<u8>) -> E
```