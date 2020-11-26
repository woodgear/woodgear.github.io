---
time: '1996-09-08T23:37:07+08:00'
id: 'vrralqn'
---

## 单步调试

管理员权限开 windng file 中选择 attach to process 即可

## 忽略不想关注的 exception

sxi {code}

## 以调试模式启动

在注册表中设置即可 关键词 [ Image File Execution Options ](https://blog.malwarebytes.com/101/2015/12/an-introduction-to-image-file-execution-options/)

# 双机调试
.sympath cache*;srv*https://msdl.microsoft.com/download/symbols
[](https://bbs.pediy.com/thread-228575.htm)
# 断点
```
sxe ld xx.sys
bm harpon!on_process

bm xxx rem 设置断点
bl  rem 列出断点
bc  rem 取消断点
```

## 常用命令
```
x /D /f harpon!a*   rem 列出模块的符号列表

```
### dd 显示内存

dd {start} {end} //显示 start 至 end 的内存值