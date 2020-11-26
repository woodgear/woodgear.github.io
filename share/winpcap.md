---
time: '1996-09-08T23:37:07+08:00'
id: 'aa0omkv'
---

# 驱动log
没有找到好的方法 直接将Debug.h中 #if DBG 改成 #if 1

# prefast 是什么
windows上的一个代码检查工具 看起来是某种编译器的wrapper 
```
Type prefast build, followed by any Build utility parameters that are required to build your code
```
通过同一目录下名为DIRS的文件指定真正的代码目录
```
DIRS=driver   \
     
```