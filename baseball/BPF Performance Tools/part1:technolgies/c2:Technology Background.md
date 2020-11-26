---
id: 'fb773c'
time: '2020-11-17T21:56:37+08:00'
---
## 2.3.4 Viewing BPF Instruction: bpftool
安装: `sudo apt install linux-tools-5.4.0-52-generic` `sudo apt install linux-tools-common`
bpftool 能够管理所有的bpfobject,应该是和操作系统某个对应的概念交互.所以在使用bpftool 来查看和管理bpfobject时一定要先有正在运行的bpf程序才能看出东西来.

使用`sudo opensnoop-bpfcc`可以跑一个带有btf_id的bpf程序出来然后就可以使用`linum`看出这两者的差别了.感觉bcc果然不愧是自带debuginfo

## 2.3.1 BPF-CE
compiler-once run everywhere(原来你是JAVA)

## 2.4 Stack Trace Walking
我们希望能有一种能力 能够跟踪到当前函数的调用路径,目前有两种提供这种能力的实现方法
### 2.4.1 Frame Pointer-Based Stacks
调用约定中栈指针一般在某个固定的寄存器(在x86_64机器上是RBP)上,一般来讲函数的返回地址就在RBP+8的位置上.函数的返回地址指向的就是调用函数(调用链上一级函数的地址),通过这种方式我们就能顺着这种调用链向上找上去,从而能够得到这个调用链.
[:part_xmind_preview#bpf["stack trace walking"]](./bpf.xmind)


## 2.5 Flame Graphs
### 2.5.3 Flame Graph
火焰图要从看最上面一层 竖轴代表的是调用深度
[:part_xmind_preview#bpf["flame graph"]](./bpf.xmind)
## 2.6 Event sources
看图说话
## 2.7 kprobes
### 2.7.1 How kprobes Work

断点技术 
1. 保存目标函数地址
2. 把对应函数的地址直接换成断点(int3)或者直接换成jmp
3. 执行到对应函数 实际上调换kprobe的处理函数上 经过处理(记录) 然后在跳回去
4. 卸载时 将换掉的函数在换回去
### 2.8 uprobes
原理和kprobe一样 有个叫LTTng-UST的技术可以加速BPF tracing
### 2.9 TracePoint
一个有人来维护的类似的kprobe的eventsource 不过他是逻辑性的不像kprobe就是每个内核函数
实现原理: 编译时实际上tracepoint是一个noop指令
#### 2.9.5 BPF Raw TracePoint
某种加速tracepoint的手段
## 2.10 USDT user-level statically defined tracing
在代码中增加tracepoint的方式
## 2.11 Dynamic USDT
在动态语言或者虚拟机语言中增加tracepoint的方式 原理应该是调DLL然后在DLL中实现
## 2.12 PMCs
处理器提供的event
例如cpu cache missing,page fault等
