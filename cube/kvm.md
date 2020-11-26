---
time: '1996-09-08T23:37:07+08:00'
id: '4g3gt5w'
---

# install
```bash
sudo apt install qemu qemu-kvm libvirt-bin  bridge-utils  virt-manager
sudo service libvirtd start
sudo update-rc.d libvirtd enable
```

# windows-virtio
https://linuxhint.com/install_virtio_drivers_kvm_qemu_windows_vm/

# tips
## virsh start need root priva
## network-default-is-not-active
```bash
// 手动启动
sudo virsh net-start default
// 设置为自动启动
virsh net-autostart default
```
## virt-viewer connect error
```bash
virt-viewer test-win10
# Failed to connect: no virtual machine found
nohup virt-viewer -c qemu:///system test-win10 &
# that's fine
```
# libvirt
>libvirt提供了跨VM平台的功能，它可以控制除了QEMU之外的模拟器，包括vmware, virtualbox， xen等等
# network
## network source
## device model

# concept
self:kvm
virsh virt-manager libvirt qemu


win10专业版激活码：RJ4PG-K9RW2-B648D-WYGFC-VR479

# cpu
current alloction # 这个虚拟机允许被用线程数 = socket*core*thread
socket #主板上有几个cpu接口
core   #一个cpu上有几核
thread   #一核能开多少线程

# 复制粘贴
## windows 
安装[spice-guest-tools](https://www.spice-space.org/download/windows/spice-guest-tools/spice-guest-tools-latest.exe)
# virsh
## list all vm
virsh --list # list all active vm
virsh --list # list all vm


# network
要想guest之间能够互相连接,需要使用bridge模式
大致的模型为 将电脑视为虚拟的交换器 实体机和虚拟机都是连接到此虚拟机上的电脑
1. 建立虚拟的网桥
2. 连接实体机
3. 连接虚拟机

```
// 增加一个bridge 名字是bro
nmcli connection add type bridge ifname br0 stp no
// 查看所有的connection 可以用来确认上面的命令   
nmcli connection
// 将真实的物理网卡设为此bridge的 slave 
nmcli con add type bridge-slave ifname eno1 master br0
// 启动此bridge 这样我们就可以将虚拟机连接到此 bridge上
nmcli con up br0
```
## virt-manager
之后在virt-manager中将虚拟机的network设备 设为 spcial device name br0即可
## qemu
[nic](https://www.qemu.org/2018/05/31/nic-parameter/)

# kvm 双屏显示
增加Video QXL的硬件 使用virt-viewer连接 即可
会跳出来两个窗口 使用 `--full-screen=auto-conf` 自动全屏