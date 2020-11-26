---
time: '1996-09-08T23:37:07+08:00'
id: 'z5op8ft'
---

# rust driver alloc error
时间: 20190310
猜测: alloc 内存类型/内存不够
预计时间: 2天
实际时间: 2天
发现过程: 他人提示
实际原因: 
初始化结构体栈上分配内存 保存指针 赋值给全局变量 然后使用 就野指针了 参见
[pin_box_self_pointer_and_global_callback](I Want To Talk\rust\pin_box_self_pointer_and_global_callback.md)

# sciter read file could not find file
时间: 20190311
猜测: 调用姿势/路径查找/sciter bug/
预计时间: 30m
实际时间: 6h(一下午)
实际结果: https://github.com/c-smile/sciter-sdk/issues/107 某些开关没有打开 权限问题

# read json fail invallid character at col 1 column 1
文件编码