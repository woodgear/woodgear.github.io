---
id: b082d9
time: '2020-12-10T23:11:03+08:00'
---
本文主要记录一些k8s无处安放的豆知识
## kubeadm/kubelet/kubectl 版本与源码
给定这三个binary如果得知编译他们的源代码
```bash
kubeadm version
# kubeadm version: &version.Info{Major:"1", Minor:"19", GitVersion:"v1.19.4", GitCommit:"d360454c9bcd1634cf4cc52d1867af5491dc9c5f", GitTreeState:"clean", BuildDate:"2020-11-18T09:02:42Z", GoVersion:"go1.15.2", Compiler:"gc", Platform:"linux/amd64"}

```
然后在[k8s](https://github.com/kubernetes/kubernetes)的代码库中可以切换到对应的tag,后面还有commit以供确认