---
time: '1996-09-08T23:37:07+08:00'
id: 'zuebbhj'
---

# 检查安装
去控制面板看 https://www.winpcap.org/misc/faq.htm#Q-1
# 原理
一个新数据包到来的事件通过`Packet_tap`通知NPF
在IoCreateDevice 可以指定DEVICE_EXTENSION的大小,然后就可以用这个空间初始化自己的DEVICE_EXTENSION了

通过DeviceIoCtontrol 将ReadEvent发送到驱动中

npf_open 打开一个适配器 然后如果有流量进来才会调用npf_tap 第一个参数 ProtocolBindingContext 实际上是我们OpenAdapter时自己定义的

读取时的ReadTimeout 实际上是设置给WaitForsingleObject的如果没设 就会用INFIINTE,直到驱动设置了ReadEvent的状态 真正读取内容时还是直接到ReadFile来做