---
id: 'ee099a'
time: '2020-11-26T14:25:29+08:00'
---
## 查询 get_ns_by_pid
获取当前shell的network namespace/给定进程查询network namespace
ls -l /proc/$$/ns/net | awk '{print $1, $9, $10, $11}'
## 改变
```bash
# 进入pid为399747的network namespace 并执行bash
nsenter -t 399747 -n bash
```