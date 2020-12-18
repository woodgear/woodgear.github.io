---
time: '1996-09-08T23:37:07+08:00'
id: 'ezt2gwq'
---

# pe文件
现在在createProcess时 我们拿到一堆bytes(PE格式)接下来操作系统做了什么呢?
此时执行权限已经被全部交到执行文件中,当调用系统函数时 实际上就是发送中断,cpu再跳到之前操作系统设置好的处理函数中
那么分时操作系统如何工作?在一个单核电脑上如果所有的权限交给了执行文件 而执行文件没有分时 如何分时?
# pdb
1. 给定一个PE 如何确定一个PDB文件是他的PDB?
> That’s done through a GUID that’s embedded in both the PDB file and the binary
```bash
# for pe
dumpbin /HEADERS  ./peparser_x64.exe |grep Debug
```

2. 给定一个PDB 如何找到 源代码? 如何确定源代码是他的源代码?
# ref
[1](https://blog.csdn.net/liuyez123/article/details/51281905)
[2](https://www.wintellect.com/pdb-files-what-every-developer-must-know/)