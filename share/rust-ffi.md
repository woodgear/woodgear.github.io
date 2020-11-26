---
tag: 'rust,ffi,dll-as-interface,c/c++'
subtitle:
  - dll as microservice
time: '1996-09-08T23:37:07+08:00'
id: 'pcqgi2i'
---

> 通过channel来通信,不要通过共享变量来通信
不同语言之间的调用就目前来看,dll或者讲c的ABI是最为稳固的,为了提供这个接口,我们不得不写出一些胶水代码,将我们的语意转换成dll的接口.但dll的接口实际上无关紧要的,我们想要的仅仅是跨语言调用这个结果罢了,这种抽象在某种程度上与微服务是类似的


# c 调用 rust dll
常见的操作是rust编译成dll,c/c++ 通过操作dll来完成对rust的操作
一般来讲,这样就涉及到两个问题
1. 如何将数据传递到rust
2. 如何从rust读取出数据
也就是说作为一个dll的通用接口是
```c
int pass_to_rust(char* buff,int bufflen)
int read_from_rust(char* buff,int writeed_bufflen,int max_len)
```
## pass to rust
```c
int pass_to_rust(char* buff,int bufflen)
```
buff指的是我们在c中准备好的想传递过去的内存的地址 bufflen 是总长度
在这种场景中 我们总是能完整的准备好所有想要传递过去的数据
## read from rust



# combine
实际上这两者是相同的 在很多时候我们既要读 又要写 而这就是rpc
在进一步的讲 我们可以将所有dll的接口写出protobuf的形式