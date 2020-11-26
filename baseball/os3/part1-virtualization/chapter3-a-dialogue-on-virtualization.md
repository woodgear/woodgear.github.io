---
id: '47fb447'
time: '2020-08-03T21:12:32+08:00'
---

# 4.3 Process creation
> some memory must be allocated for the program's runtime stack (or just stack)
> as you should already know,C programs use stack for local variables,function paramters,and return address,
> the os will also likely initialize the stack with arguments;

在这里 当我们在讲stack时 我们在讲什么?
可以参照CSAPP第第三章3.7.1 运行时栈  
总的来讲 编译器产生的静态可执行文件中存储的是计算的指令,这些指令操作寄存器来进行各种运算,但
1. 寄存器是有限的
2. 计算是有中间状态的 我们需要一种东西能够存储这些状态 
3. 除了计算之外我们还要表达一些操作"过程"的逻辑 例如对于函数的抽象必然导致了 如何在存储调用函数之后下一个指令位置之类的问题,这些东西是没有办法在编译时确定的,目前约定俗程的就是通过rsp寄存器将(分配给这个进程)内存的某个地址理解为栈 将这些指令所需的空间以栈的形式表达出来 这就是所谓程序的运行时栈  
TODO 为什么使用栈 是否有其他方式? 是否有局限?   
> 函数调用约定 基于寄存器和栈的一种函数调用实现方式    

[为什么函数调用要用栈实现？ - RednaxelaFX的回答 - 知乎](https://www.zhihu.com/question/34499262/answer/59415153)  
[栈帧内返回地址是在local variables前还是在它们后面？ - RednaxelaFX的回答 - 知乎](https://www.zhihu.com/question/33920941/answer/57597076)

# 6.3 Switching Between Process
## Save and Restoring Context
栈是指令执行的空间所在,在切换到内核态,即 CPU处在高特权状态,RSP指向内核空间的指令序列,开始执行这些指令序列时,其所操作的空间 并不是用户态分配出来的那些空间,这就是用户态栈和内核栈的区别