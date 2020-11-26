---
id: 'nkzzwhl'
time: '1996-09-08T23:37:07+08:00'
---

# how to build a windows dirver (cargo xbuild custom alloc)
首先要准备内核态驱动的编译环境 自然我们无法使用所有std下内容 但是可以通过配置自定义的alloc(堆内存分配器)来使用Vec Box String 等常用的的对象
```

```
# how to add binding of windows api (winapi and rust-bindgen)
# just write you driver
# 驱动开发环境配置
1. wdk
2. 双机调试配置
3. inf文件与测试签名

# acknowledge
[winapi-kmd-rs](https://github.com/pravic/winapi-kmd-rs)
[cargo-xbuild](https://github.com/rust-osdev/cargo-xbuild)
[winapi-rs](https://github.com/retep998/winapi-rs)
[rust-bindgen](https://github.com/rust-lang/rust-bindgen)