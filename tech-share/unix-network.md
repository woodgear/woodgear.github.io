---
id: f677e6
time: '2020-11-27T16:00:28+08:00'
---
# 虚拟化
bridge 负责将虚拟网卡和物理网卡联系起来 使得虚拟网卡能够通过物理网卡联网 实际上是一个虚拟的网桥 因此其所需要的是一个是物理网卡 一个是与其联系起来的虚拟网卡 tap 就是在host中的虚拟网卡 其对应的是VM中的在VM看来的物理网卡
tap 应当是一种类型 不同的程序创造这个虚拟网卡 然后别人就将其当作真实的网卡使用 具体里面做了什么 就是这个程序的事情了 例如 OpenVpn 发送给这个网卡的 通过vpn 发到别的机子上去 回来的信息也通过他在回到电脑中 虚拟机的也是类似 发给他的实际上发给虚拟机 虚拟发出来的也是通过他发到host上 然后再通过bridge机制连到真实的网络中
## ??
1. 创建bridge时如何知道那个是物理网卡那个是虚拟网卡?
2. bridge底层到底做了什么?
3. 假设我有多个物理网卡 多个虚拟网卡 我能任意的将其链接起来吗?
4. 假设给我一个VM我怎么知道这个VN的物理网卡连的是host上的什么?
5. tap 到底做了什么?

>在Linux内核里，每个network namespace都有它自己的网络设置，比如像：网络接口(network interfaces)，路由表(routing tables)等。我们利用network namespace，可以把不同的网络设置彼此隔离开来。当运行多个Docker容器的时候，Docker会在每个容器内部创建相应的network namespace，从而实现不同容器之间的网络隔离。
>但是光有隔离还不行，因为容器还要和外界进行网络联通，所以除了network namespace以外，另一个重要的概念是网桥(network bridge)。它是由Linux内核提供的一种链路层设备，用于在不同网段之间转发数据包。Docker就是利用网桥来实现容器和外界之间的通信的。默认情况下，Docker服务会在它所在的机器上创建一个名为docker0的网桥

>brctl show的interfaces字段的位置有一个名叫vethe657f66的网络接口。实际上，这是一种虚拟以太网设备(Virtual Ethernet Device，简称veth)。确切地说，这不是一个设备，而是一对设备，所以也被称为“veth pair”。它包含两个总是成对出现的网络接口，分别连接不同的network namespace。一端的网络接口接收到数据以后，就会立刻传送给另一端，从而在两个network namespace之间建立起了一个“通道”，实现了彼此之间的网络连通。通常，这一对接口本身并不会被分配IP地址。在我们的例子里，这个veth pair的一端位于容器busybox1里，另一端则位于宿主机上，也就是这里的vethe657f66。执行ip addr show命令查看该接口的详细信息：
```
ip addr show vethe657f66
6: vethe657f66@if5: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master docker0 state UP group default 
```
>可以看到，vethe657f66后面跟着一个后缀@if5。其中的数字5，代表了作为这个veth pair的另一端（即位于busybox1容器里的那个网络接口）在对应的network namespace里所有网络接口中的位置序号。也就是每当我们执行ip addr show命令的时候，输出结果里每个网络接口前面的那个数字。如果我们在busybox1里执行ip addr show：

>多个network namespace只要被路由到同一网段（也就是加入到同一网络），那它们之间就可以实现互通。在Docker里，多个容器通过加入同一bridge网络实现互通，就是这个原理

对于网桥这个对象我们能做的是
1. 创建
2. 指定ip地址段

对于networknamespace(ns)这个对象我们能做的是
1. 创建
2. 列出所有的ns


对与veth这个对象我们能做的是
1. 创建(创建一对)
2. 改名
3. 设置ip地址
4. 启动

ns+veth
1. 将veth移入某个ns
bridge+veth
1. 将某个veth移入某个bridge

router
1. 列出路由规则