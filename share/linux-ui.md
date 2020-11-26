---
time: '1996-09-08T23:37:07+08:00'
id: '7hfp0ea'
---

> there are too many new concept about ui,im confuse now.
# gtk qt kde gnome unity
两种底层技术 gtk/qt
两种基于此的桌面系统 gtk-> gnome/unity qt->kde
# x-window wayland
问题在于显示逻辑桌面系统如何工作 linux 内核不处理任何图形界面的部分 需要有人处理并使用 显示器与输入设备 即需要有人接受输入设备事件 计算出图形 丢给显示器显示 
[](https://blog.csdn.net/EFL_GUI/article/details/6546524)

gtk qt 提供了组件ui的跨平台的能力
x-window wayland 是gtk/qt 支持的后端之一
# ubuntu
ubuntu 20.04 基于 gnome