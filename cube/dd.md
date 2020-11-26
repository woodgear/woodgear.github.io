---
time: '1996-09-08T23:37:07+08:00'
id: 'lnti9ro'
---

# what it is

# use case
## 读取/dev/sda 的前512byte到./sda-mbr 中
```
sudo dd if=/dev/sda of=./sda-mbr bs=1b count=1
```
bs: block size 
>c =1, w =2, b =512, kB =1000, K =1024, MB =1000*1000, M =1024*1024,  xM  =M,  GB =1000*1000*1000, G =1024*1024*1024, and so on for T, P,E, Z, Y.


count: block count