---
time: '1996-09-08T23:37:07+08:00'
id: 'ktxpwmp'
---

# nfs
总而言之 一种类似文件共享的机制 能够使得你访问其他机器上的文件
[how-to-mount-nfs](https://linuxize.com/post/how-to-mount-an-nfs-share-in-linux/)

# verify
showmount -e IP
# mount
sudo mount -t nfs 10.10.0.10:/backups /var/backups 
# fstab
```sh
# <file system>     <dir>       <type>   <options>   <dump>	<pass>
10.10.0.10:/backups /var/backups  nfs      defaults    0       0
```