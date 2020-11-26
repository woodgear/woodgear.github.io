---
id: 'a61279'
time: '2020-11-12T23:14:48+08:00'
---
## 1.2 What are Tracing,snooping,Sampling,Profiling,and Observability
Tracing和Snooping指的是同一回事:收集事件,或者收集实践能力的容器.snoop只是早期的一个概念的指代.  

Sampling: 采样,和Tracing类似 不过一般来讲指的是在一段时间内的对一堆事件的收集.  

Observability:可观察性,指的我们对操作系统可以理解其运行状态的能力.  

## 1.3 What Are BCC,bpftrace,and IO Visor?
BCC:最早的tracing framework 底层用C,可以外接各种语言(python/lua/c++)
bpftrace:新出的tracing framework的前端. 自己使用了一种语言.

BCC和bpftrace都是前端,都依赖了相同的底层工具 libbcc/libbpf

BCC和bpftrace都放在一个叫[IO Visor](https://github.com/iovisor)的项目中

## 1.4 A first Look at BCC: Quick Wins
```bash
# install in ubuntu
sudo apt-get install bpfcc-tools linux-headers-$(uname -r)
```
这种方法安装的bcc的工具会带有后缀`-bpfcc`所以实际执行的是
```bash
sudo execsnoop-bpfcc  # 展示进程创建
sudo biolatency-bpfcc -m # 展示IO读写时间
```
## 1.8 A first Look at bpftrace: Tracing Open()
在ubuntu下使用`sudo apt install bpftrace -y`去安装bpftrace,不要装snap版的
